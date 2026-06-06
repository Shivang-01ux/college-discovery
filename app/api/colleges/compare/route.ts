import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { handleError } from "@/lib/errors";

const compareSchema = z.object({
  ids: z.string().transform((val) => val.split(",").map((id) => id.trim())),
});

export async function GET(req: NextRequest) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams.entries());
    const { ids } = compareSchema.parse(params);

    if (ids.length < 2 || ids.length > 3) {
      return NextResponse.json(
        { success: false, error: "Provide 2 or 3 college IDs to compare." },
        { status: 400 }
      );
    }

    const colleges = await prisma.college.findMany({
      where: { id: { in: ids } },
      include: {
        courses: { orderBy: { feesPerYear: "asc" } },
        placements: { orderBy: { year: "desc" }, take: 1 },
        _count: { select: { reviews: true } },
      },
    });

    if (colleges.length !== ids.length) {
      return NextResponse.json(
        { success: false, error: "One or more college IDs not found." },
        { status: 404 }
      );
    }

    // Structure comparison data
    const comparison = colleges.map((c) => ({
      id: c.id,
      name: c.name,
      location: c.location,
      type: c.type,
      overallRating: c.overallRating,
      totalReviews: c._count.reviews,
      lowestFees: c.courses[0]?.feesPerYear ?? null,
      latestPlacement: c.placements[0] ?? null,
      courseCount: c.courses.length,
    }));

    return NextResponse.json({ success: true, data: comparison });
  } catch (error) {
    return handleError(error);
  }
}
