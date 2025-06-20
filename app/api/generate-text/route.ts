import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(request: Request) {
  try {
    const { prompt, context, type = "general" } = await request.json()

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    let systemPrompt = ""

    switch (type) {
      case "interview":
        systemPrompt = `You are an expert AI interview coach with years of experience in helping candidates prepare for job interviews. You provide detailed, constructive feedback and realistic interview scenarios. Always be encouraging, specific, and actionable in your responses. Focus on practical advice that candidates can immediately implement.`
        break
      case "cv-analysis":
        systemPrompt = `You are a professional CV/Resume analyzer and career consultant. Analyze CVs comprehensively and provide detailed feedback including:
        1. Overall score (0-100)
        2. Section-by-section analysis
        3. Strengths and areas for improvement
        4. Keyword optimization suggestions
        5. Formatting recommendations
        6. Industry-specific advice
        Be specific, constructive, and actionable in your feedback.`
        break
      case "roadmap":
        systemPrompt = `You are an expert career planning consultant. Create detailed, personalized career roadmaps that include:
        1. Learning phases with realistic timelines
        2. Required skills and technologies
        3. Recommended resources and courses
        4. Project ideas for practice
        5. Milestone markers and checkpoints
        6. Industry insights and trends
        Make the roadmap practical, achievable, and tailored to the user's current level.`
        break
      case "chat":
        systemPrompt = `You are an AI interview coach and career advisor. You help students and professionals prepare for job interviews by providing detailed feedback, career guidance, and interview practice. Always be encouraging, constructive, and specific in your responses. Provide actionable advice that users can implement immediately.`
        break
      default:
        systemPrompt = `You are a helpful AI assistant specializing in career development and interview preparation. Provide clear, actionable advice.`
    }

    const fullPrompt = `${systemPrompt}\n\n${context ? `Context: ${context}\n\n` : ""}User Query: ${prompt}`

    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    const text = response.text()

    return Response.json({ text })
  } catch (error) {
    console.error("Error generating text with Gemini:", error)
    return Response.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
