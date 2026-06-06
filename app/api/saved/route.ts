import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { handleError } from "@/lib/errors";

export async function GET(req: NextRequest) {
  try {
    const user = requireAuth(req);

    const saved = await prisma.savedCollege.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: "desc" },
      include: {
        college: {
          select: {
            id: true,
            name: true,
            location: true,
            city: true,
            state: true,
            type: true,
            overallRating: true,
            totalReviews: true,
            imageUrl: true,
            courses: {
              select: { feesPerYear: true },
              take: 1,
              orderBy: { feesPerYear: "asc" },
            },
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    return handleError(error);
  }
}
