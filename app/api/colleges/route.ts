import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { handleError } from "@/lib/errors";
import { Prisma } from "@prisma/client";

const querySchema = z.object({
  search: z.string().optional(),
  state: z.string().optional(),
  type: z.enum(["PUBLIC", "PRIVATE", "DEEMED"]).optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
  minFees: z.coerce.number().min(0).optional(),
  maxFees: z.coerce.number().min(0).optional(),
  sortBy: z.enum(["rating", "name", "fees"]).optional().default("rating"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
  page: z.coerce.number().min(1).optional().default(1),
  limit: z.coerce.number().min(1).max(50).optional().default(10),
});

export async function GET(req: NextRequest) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams.entries());
    const query = querySchema.parse(params);

    const { search, state, type, minRating, minFees, maxFees, sortBy, order, page, limit } = query;

    // Build WHERE clause
    const where: Prisma.CollegeWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { city: { contains: search, mode: "insensitive" } },
        { state: { contains: search, mode: "insensitive" } },
      ];
    }
    if (state) where.state = { equals: state, mode: "insensitive" };
    if (type) where.type = type;
    if (minRating) where.overallRating = { gte: minRating };

    // Fee filter requires joining through courses
    if (minFees !== undefined || maxFees !== undefined) {
      where.courses = {
        some: {
          feesPerYear: {
            ...(minFees !== undefined && { gte: minFees }),
            ...(maxFees !== undefined && { lte: maxFees }),
          },
        },
      };
    }

    // Build ORDER BY
    let orderBy: Prisma.CollegeOrderByWithRelationInput = {};
    if (sortBy === "rating") orderBy = { overallRating: order };
    else if (sortBy === "name") orderBy = { name: order };
    // fees sorting is handled post-query since it's relational

    const skip = (page - 1) * limit;

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        orderBy,
        skip,
        take: limit,
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
          description: true,
          courses: {
            select: { feesPerYear: true },
            take: 1,
            orderBy: { feesPerYear: "asc" },
          },
        },
      }),
      prisma.college.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: {
        colleges,
        pagination: {
          total,
          page,
          limit,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      },
    });
  } catch (error) {
    return handleError(error);
  }
}
