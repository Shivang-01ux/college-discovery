import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function handleError(error: unknown) {
  console.error(error);

  if (error instanceof ZodError) {
    return NextResponse.json(
      { success: false, error: "Validation failed", details: error.errors },
      { status: 400 }
    );
  }

  if (error instanceof Error) {
    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please login." },
        { status: 401 }
      );
    }
    if (error.message === "NOT_FOUND") {
      return NextResponse.json(
        { success: false, error: "Resource not found." },
        { status: 404 }
      );
    }
    if (error.message === "CONFLICT") {
      return NextResponse.json(
        { success: false, error: "Resource already exists." },
        { status: 409 }
      );
    }
  }

  return NextResponse.json(
    { success: false, error: "Internal server error." },
    { status: 500 }
  );
}
