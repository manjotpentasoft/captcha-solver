import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function extractTextFromImage(
  imageUrl: string
): Promise<string | null> {
  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text:
              "Extract all readable text from the image exactly as it appears. " +
              "Preserve original casing, spacing, punctuation, and line breaks. " +
              "Do not add, remove, or correct characters. Output only the extracted text.",
          },
          {
            type: "input_image",
            image_url: imageUrl,
            detail: "auto",
          },
        ],
      },
    ],
  });

  return response.output_text ?? null;
}

