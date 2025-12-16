import { NextRequest, NextResponse } from "next/server";
import { parseFinalAnswer } from "@/lib/textToText";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { success: false, error: "text is required" },
        { status: 400 }
      );
    }

    const result = await parseFinalAnswer(text);

    return NextResponse.json(
      {
        ...result,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
