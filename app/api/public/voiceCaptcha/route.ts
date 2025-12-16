import { NextRequest, NextResponse } from "next/server";
import { transcribeFromFile, transcribeFromUrl } from "@/lib/voiceToText";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let audioUrl: string | null = null;
    let file: Blob | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const maybeFile = formData.get("file");
      const maybeUrl = formData.get("url");

      if (maybeFile instanceof Blob) {
        file = maybeFile;
      }

      if (typeof maybeUrl === "string") {
        audioUrl = maybeUrl;
      }
    } else {
      const body = await request.json().catch(() => null);
      if (body && typeof body.url === "string") {
        audioUrl = body.url;
      }
    }

    if (!file && !audioUrl) {
      return NextResponse.json(
        { error: "Provide either a 'file' (multipart/form-data) or a 'url'." },
        { status: 400 }
      );
    }

    const result = file
      ? await transcribeFromFile(file)
      : await transcribeFromUrl(audioUrl as string);

    return NextResponse.json(
      {
        sentence: result.sentence,
      },
      { status: 200 }
    );
  } catch (error) {
    const err = error as Error;
    console.error("voiceCaptcha error", err);
    return NextResponse.json(
      { error: err.message || "Failed to transcribe audio" },
      { status: 500 }
    );
  }
}
