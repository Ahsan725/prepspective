// app/api/quiz/route.ts

import { NextResponse } from "next/server";
import { OpenAI } from "openai";

export async function GET(request: Request) {
  // Parse the query parameters from the URL
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic") || "datastructures";
  const normalizedTopic = topic.toLowerCase();

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // Construct the prompt for quiz generation
  const prompt = `
Generate a leetcode style problem set consisting of exactly 3 medium difficulty questions for the leetcode topic "${normalizedTopic}". Each question should challenge users to apply their problem-solving skills to analyze and complete an incomplete Python code snippet. The code snippet should be relevant to the question but not make the correct answer obvious, encouraging careful thought to determine the best approach.

Please output a JSON array where each element is an object with the following fields:
- id: a unique integer starting from 1.
- question: a string containing a leetcode style question.
- codeSnippet: a non-empty string containing a Python code snippet. Ensure the snippet is long enough and functional, even if incomplete.
- options: an array of exactly four string options.
- correctAnswer: the index (0-3) of the correct option.
- topic: a distinct, randomly generated subtopic derived from the main topic "${normalizedTopic}" that tests a specific aspect of the problem.

Ensure that the JSON output is valid and that no extra text is included.

  `.trim();

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that generates quiz questions in a strict JSON format.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

      let responseText = response.choices[0].message?.content || "";
      console.log(responseText);

    // Remove markdown code block markers if present
    if (responseText.startsWith("```")) {
      responseText = responseText
        .replace(/^```(?:json)?\n?/, "")
        .replace(/\n```$/, "");
    }

    let questions;
    try {
      questions = JSON.parse(responseText);
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
      return NextResponse.json(
        { error: "Failed to parse quiz data from OpenAI." },
        { status: 500 }
      );
    }
    return NextResponse.json(questions);
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz data." },
      { status: 500 }
    );
  }
}
