import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { cvContent, targetRole } = await request.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an expert CV analyzer with extensive experience in recruitment.

**Target Role:** ${targetRole || "General position"}

**CV Content:**
${cvContent}

Return the result in the following strict JSON format:
    {
  "overallScore": number,
  "sections": [
    {
      "name": string,
      "score": number,
      "status": "excellent" | "good" | "poor",
      "feedback": string
    }
  ],
  "strengths": [string],
  "improvements": [string],
  "keywords": {
    "present": [string],
    "missing": [string]
  }
}
...
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const json = response.text(); // This is still a string, so you'll need:

    // Clean malformed JSON (e.g., from AI)
    const parsed = JSON.parse(json.replace(/```(json)?/g, "").trim());
    return Response.json(parsed);
  } catch (error) {
    console.error("Error analyzing CV with Gemini:", error);
    return Response.json({ error: "Failed to analyze CV" }, { status: 500 });
  }
}
