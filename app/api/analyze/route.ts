import { NextResponse } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import { canUseFullScan } from "../../../lib/access";

// ---- TAG → ADVICE MAP ----
const adviceMap: Record<string, string[]> = {
  acne: [
    "Consider low-dose isotretinoin (consult a professional).",
    "Use SPF50 daily + non-comedogenic moisturiser.",
    "Use retinoids (tretinoin/tazarotene) 2–3x/week.",
  ],
  body_fat: [
    "Calorie deficit + high protein intake.",
    "Daily steps + resistance training.",
    "Focus on sleep + consistency.",
  ],
  hair_thinning: [
    "Topical minoxidil + microneedling.",
    "Consider finasteride/dutasteride (research first).",
  ],
  low_muscle: [
    "Progressive overload training.",
    "Increase protein intake.",
    "Optimize sleep + recovery.",
  ],
  posture: [
    "Train upper back + core.",
    "Fix daily posture habits.",
  ],
};

// ---- MAIN ROUTE ----
export async function POST(req: Request) {
  try {
    // 🔐 AUTH
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in." },
        { status: 401 }
      );
    }

    // 📦 BODY
    const body = await req.json();
    const images: string[] = body.images;

    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: "No images provided." },
        { status: 400 }
      );
    }

    // 👤 USER PROFILE
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    const hasFullAccess = canUseFullScan(profile);

    // 🤖 AI REQUEST
    const aiRes = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: `
Analyze these images and return JSON ONLY.

Rules:
- No markdown
- No extra text
- Only return JSON

Return format:
{
  "score": number,
  "summary": "short summary",
  "tags": ["acne","body_fat","hair_thinning","low_muscle","posture"]
}
                `,
              },
              ...images.map((img) => ({
                type: "input_image",
                image_url: img,
              })),
            ],
          },
        ],
      }),
    });

    const data = await aiRes.json();

    const raw =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "";

    if (!raw) {
      return NextResponse.json(
        { error: "AI returned nothing." },
        { status: 500 }
      );
    }

    // 🧠 SAFE PARSE
    let parsed: any;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json({
        error: "Invalid AI response",
        raw,
      });
    }

    const tags: string[] = parsed.tags || [];

    // 🧾 MAP ADVICE
    const advice = tags.flatMap((tag) => adviceMap[tag] || []);

    // 🆓 FREE PREVIEW
    if (!hasFullAccess) {
      return NextResponse.json({
        preview: true,
        score: parsed.score,
        summary: parsed.summary,
        tags: tags.slice(0, 2), // only show 2
        message: "Unlock full report for full analysis + advice",
      });
    }

    // 💰 FULL REPORT
    return NextResponse.json({
      preview: false,
      score: parsed.score,
      summary: parsed.summary,
      tags,
      advice,
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Server error." },
      { status: 500 }
    );
  }
}