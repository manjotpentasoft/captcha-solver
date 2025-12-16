import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function parseFinalAnswer(
  text: string
): Promise<{ answer: string }> {
  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `
You are an assistant that extracts the final answer from text.

INSTRUCTIONS:
1. Extract ONLY the final answer.
2. Do NOT explain, reason, or add commentary.
3. If the text contains a question where the “answer” is the text itself (copy task), copy it exactly.
4. If multiple answers exist, return the most direct and concise one.
5. Return strictly valid JSON, parseable by JSON.parse:
   { "answer": "<answer>" }
6. Do NOT include any extra characters, whitespace, or formatting outside the JSON object.
7. Do NOT include Markdown fences.

TEXT:
${text}
            `,
          },
        ],
      },
    ],
  });

  let raw = response.output_text ?? "";

  raw = raw.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("Model did not return valid JSON:\n" + raw);
  }
}
