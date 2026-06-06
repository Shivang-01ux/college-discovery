import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleError } from "@/lib/errors";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const college = await prisma.college.findUnique({
      where: { id: params.id },
      include: {
        courses: {
          orderBy: { feesPerYear: "asc" },
        },
        placements: {
          orderBy: { year: "desc" },
          take: 3,
        },
        reviews: {
          orderBy: { createdAt: "desc" },
          take: 10,
          include: {
            user: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    if (!college) throw new Error("NOT_FOUND");

    return NextResponse.json({ success: true, data: college });
  } catch (error) {
    return handleError(error);
  }
}
