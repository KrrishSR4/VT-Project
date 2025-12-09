import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topic, type } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Generating ${type} for topic: ${topic}`);

    let systemPrompt = "";
    let userPrompt = "";

    switch (type) {
      case "notes":
        systemPrompt = "You are an expert teacher who creates concise, well-structured notes. Write clear and organized notes that help students understand and remember key concepts. Use bullet points and short paragraphs.";
        userPrompt = `Create comprehensive study notes about "${topic}". Include key definitions, important concepts, and main points. Make it easy to understand and remember. Keep it under 500 words.`;
        break;
      case "explanation":
        systemPrompt = "You are a patient and skilled teacher who explains complex topics in simple, easy-to-understand language. Use analogies and real-world examples.";
        userPrompt = `Explain "${topic}" in a clear and detailed way. Start from basics and gradually build up understanding. Use simple language and relatable examples. Keep it under 600 words.`;
        break;
      case "examples":
        systemPrompt = "You are a practical teacher who provides real-world examples to illustrate concepts. Each example should be clear and demonstrate the concept in action.";
        userPrompt = `Provide 5 practical, real-world examples related to "${topic}". Each example should clearly demonstrate how this concept works in practice. Be specific and detailed.`;
        break;
      case "quiz":
        systemPrompt = "You are a quiz creator. Generate quiz questions in a specific JSON format only. No additional text.";
        userPrompt = `Create 10 multiple choice questions about "${topic}". Make sure questions cover different aspects of the topic with varying difficulty levels.
        
Return ONLY a valid JSON array with this exact format:
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": 0
  }
]

The "answer" field should be the index (0-3) of the correct option. Do not include any text outside the JSON array. Generate exactly 10 questions.`;
        break;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Failed to generate content" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    console.log(`Successfully generated ${type} content`);

    return new Response(
      JSON.stringify({ content, type }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating content:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
