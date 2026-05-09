import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      return NextResponse.json({
        overallScore: 78,
        scoreBreakdown: { keywordsMatch: 72, experienceMatch: 85, readability: 80 },
        missingKeywords: ["microservices", "CI/CD", "agile", "scrum", "kubernetes"],
        improvementSuggestions: [
          "Add more quantified achievements (numbers, percentages, dollar amounts)",
          "Include keywords like 'microservices' and 'CI/CD' from the job description",
          "Strengthen your summary to directly mirror the role requirements",
          "Add a 'Projects' section to showcase relevant side projects",
        ],
        suggestedSummary: "Results-driven Software Engineer with 5+ years of experience in full-stack development, specializing in React, Node.js, and cloud-native architectures. Proven ability to deliver scalable microservices and lead cross-functional agile teams.",
        _demo: true,
      });
    }

    const { resumeText, jobDescription } = await req.json();

    if (!resumeText || !jobDescription) {
      return NextResponse.json({ error: 'Missing resumeText or jobDescription' }, { status: 400 });
    }

    const { GoogleGenAI, Type } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
      You are an expert ATS (Applicant Tracking System) algorithm and a senior technical recruiter.
      Analyze the provided resume against the provided job description.
      
      Job Description:
      """
      ${jobDescription}
      """

      Resume:
      """
      ${resumeText}
      """

      Provide a detailed analysis including:
      1. An overall ATS match score (0-100).
      2. A breakdown of the score (keywords, formatting, experience).
      3. A list of missing keywords.
      4. Specific, actionable suggestions to improve the resume for this role.
      5. A rewritten summary that better matches the job description.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallScore: { type: Type.INTEGER },
            scoreBreakdown: {
              type: Type.OBJECT,
              properties: {
                keywordsMatch: { type: Type.INTEGER },
                experienceMatch: { type: Type.INTEGER },
                readability: { type: Type.INTEGER },
              }
            },
            missingKeywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            improvementSuggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            suggestedSummary: { type: Type.STRING }
          },
          required: ["overallScore", "scoreBreakdown", "missingKeywords", "improvementSuggestions", "suggestedSummary"]
        }
      }
    });

    const rawText = response.text ?? '{}';
    const result = JSON.parse(rawText);
    return NextResponse.json(result);

  } catch (error) {
    console.error("ATS Analysis Error:", error);
    return NextResponse.json({ error: 'Failed to analyze resume' }, { status: 500 });
  }
}

