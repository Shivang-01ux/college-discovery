import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { handleError } from "@/lib/errors";

export async function POST(
  req: NextRequest,
  { params }: { params: { collegeId: string } }
) {
  try {
    const user = requireAuth(req);

    const college = await prisma.college.findUnique({ where: { id: params.collegeId } });
    if (!college) throw new Error("NOT_FOUND");

    const existing = await prisma.savedCollege.findUnique({
      where: { userId_collegeId: { userId: user.userId, collegeId: params.collegeId } },
    });
    if (existing) throw new Error("CONFLICT");

    const saved = await prisma.savedCollege.create({
      data: { userId: user.userId, collegeId: params.collegeId },
    });

    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { collegeId: string } }
) {
  try {
    const user = requireAuth(req);

    await prisma.savedCollege.delete({
      where: { userId_collegeId: { userId: user.userId, collegeId: params.collegeId } },
    });

    return NextResponse.json({ success: true, message: "College unsaved." });
  } catch (error) {
    return handleError(error);
  }
}
