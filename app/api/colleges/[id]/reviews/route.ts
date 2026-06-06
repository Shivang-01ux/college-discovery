import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { handleError } from "@/lib/errors";

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  content: z.string().min(10, "Review must be at least 10 characters").max(1000),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = requireAuth(req);
    const body = await req.json();
    const { rating, content } = reviewSchema.parse(body);

    const college = await prisma.college.findUnique({ where: { id: params.id } });
    if (!college) throw new Error("NOT_FOUND");

    // Check for duplicate review
    const existing = await prisma.review.findUnique({
      where: { collegeId_userId: { collegeId: params.id, userId: user.userId } },
    });
    if (existing) throw new Error("CONFLICT");

    // Create review + update college rating in a transaction
    const [review] = await prisma.$transaction([
      prisma.review.create({
        data: { collegeId: params.id, userId: user.userId, rating, content },
        include: { user: { select: { id: true, name: true } } },
      }),
      // Recalculate average rating
      prisma.college.update({
        where: { id: params.id },
        data: {
          overallRating: {
            set:
              (college.overallRating * college.totalReviews + rating) /
              (college.totalReviews + 1),
          },
          totalReviews: { increment: 1 },
        },
      }),
    ]);

    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
