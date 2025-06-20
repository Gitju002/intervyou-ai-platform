import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { career, experience, goals } = await request.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an expert career planning consultant with deep knowledge of industry trends and skill requirements. Create a comprehensive, personalized career roadmap.

**Target Career:** ${career}
**Current Experience:** ${experience}
**Specific Goals:** ${goals || "Not specified"}

Please create a detailed roadmap in the following format:

**CAREER ROADMAP: ${career}**
**Estimated Duration:** [Total time needed]

**PHASE 1: Foundation (Duration: X months)**
**Description:** [What this phase covers, make it short and clear]
**Skills to Learn:** [You need to make the list concise and relevant not too much information]
- [Skill 1]
- [Skill 2]
- [Skill 3]
**Recommended Resources:**
- [Resource 1]
- [Resource 2]
- [Resource 3]
**Projects to Build:**
- [Project 1]
- [Project 2]

**PHASE 2: Intermediate (Duration: X months)**
[Same format as Phase 1]

**PHASE 3: Advanced (Duration: X months)**
[Same format as Phase 1]

**PHASE 4: Specialization (Duration: X months)**
[Same format as Phase 1]

**MILESTONES & CHECKPOINTS:**
- [Milestone 1 - Timeline]
- [Milestone 2 - Timeline]
- [Milestone 3 - Timeline]

**INDUSTRY INSIGHTS:**
- [Current trends]
- [Future outlook]
- [Salary expectations]

**NETWORKING & COMMUNITY:**
- [Communities to join]
- [Events to attend]
- [People to follow]

Make the roadmap practical, achievable, and tailored to the current experience level. Include specific timelines, resources, and actionable steps.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const roadmap = response.text();

    return Response.json({ roadmap });
  } catch (error) {
    console.error("Error generating roadmap with Gemini:", error);
    return Response.json(
      { error: "Failed to generate roadmap" },
      { status: 500 }
    );
  }
}
