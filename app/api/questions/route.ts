import { GoogleGenerativeAI } from "@google/generative-ai";
import { v4 as uuidv4 } from "uuid";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { topic, role, difficulty, type, companyTags } = await request.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are an expert interview coach. Generate a JSON array of 20 realistic interview questions. Format them like this:

{
  id: string,
  question: string,
  topic: string,
  difficulty: "Easy" | "Medium" | "Hard",
  type: "Behavioral" | "Technical" | "Situational" | "General",
  tags: string[],
  role?: string,
  companyTags?: string[],
  sampleAnswer?: string
}

Filters to apply:
- Topic: ${topic || "Any"}
- Difficulty: ${difficulty || "Any"}
- Type: ${type || "Any"}
- Role: ${role || "Any"}
- CompanyTags: ${companyTags || "Any"}

Return ONLY a JSON array. Do not include markdown or explanation.
    `.trim();

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const start = text.indexOf("[");
    const end = text.lastIndexOf("]") + 1;
    const jsonString = text.slice(start, end);
    const rawQuestions = JSON.parse(jsonString);

    // Assign unique IDs if not present
    const questions = rawQuestions.map((q: any) => ({
      ...q,
      id: q.id || uuidv4(),
    }));

    return Response.json({ questions });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return Response.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}
