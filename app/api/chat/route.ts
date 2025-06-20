import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Get the latest user message
    const userMessage = messages[messages.length - 1]?.content || "";

    // Build conversation context
    const conversationHistory = messages
      .slice(-5) // Keep last 5 messages for context
      .map(
        (msg: any) =>
          `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
      )
      .join("\n");

    const prompt = `You are an AI interview coach and career advisor specializing in helping students and professionals prepare for job interviews. You provide detailed feedback, career guidance, and interview practice support.

**Your Expertise:**
- Interview preparation and practice
- Resume/CV optimization
- Career development advice
- Behavioral and technical interview questions
- Salary negotiation
- Industry insights
- Professional development

**Conversation History:**
${conversationHistory}

**Current User Query:**
${userMessage}

**Instructions:**
- Be encouraging, constructive, and specific
- Provide actionable advice that users can implement immediately
- Use examples and scenarios when helpful
- If asked about interview questions, provide sample answers using the STAR method when appropriate
- Keep responses conversational but professional
- If the query is not related to careers/interviews, politely redirect to career-related topics
- Always connect the user with real-life examples and scenarios

Please provide a helpful, detailed response to the user's query but for general questions do not reply with than 100 characters.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return Response.json({
      choices: [
        {
          message: {
            content: text,
            role: "assistant",
          },
        },
      ],
    });
  } catch (error) {
    console.error("Error in chat with Gemini:", error);
    return Response.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
