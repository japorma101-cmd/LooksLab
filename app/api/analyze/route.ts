import { NextResponse } from "next/server";

const adviceMap: Record<string, string[]> = {
  acne_like_breakouts: [
    "10mg Accutane every other day.",
    "Use a heavy, thick moisturiser and spf50 daily.",
    "0.05% Tazarotene cream or Tretinoin 2-3x a week.",
  ],
  skin_texture_issue: [
    "Keep routine simple and avoid breaking skin barrier.",
    "Use sunscreen daily and avoid harsh overuse of products.",
    "Exfoliate 2-3x a week.",
  ],
  under_eye_tiredness: [
    "Low dose melatonin + trazodone for sleep.",
    "Hydroquinone cream to brighten under eyes.",
    "Reduce stress and fatigue.",
  ],
  fine_lines: [
    "Use daily sunscreen.",
    "Tretinoin 3-5x a week.",
    "Heavy moisturisers.",
  ],
  hair_thinning: [
    "Topicals like minoxidil + microneedling.",
    "DHT blockers if needed.",
    "Lower stress + better diet.",
  ],
  higher_body_fat_appearance: [
    "Calorie deficit + whole food diet.",
    "Fat loss agents if needed.",
    "Daily movement + sleep.",
  ],
  low_muscle_definition: [
    "Resistance training + protein.",
    "Hormonal optimization if needed.",
    "Track strength weekly.",
  ],
  posture_issue: [
    "Upper-back + core training.",
    "Fix daily posture habits.",
    "Retake scan standing straight.",
  ],
  asymmetry_mild: [
    "Improve sleep posture.",
    "Track over time.",
  ],
  jawline_softness: [
    "Lower body fat.",
    "Improve neck posture.",
  ],

  // NEW TAGS
  bloated_appearance: [
    "Reduce inflammatory foods.",
    "Improve gut health.",
    "Lower sodium swings + stay hydrated.",
  ],
  unhealthy_appearance: [
    "Fix sleep, diet, and hydration first.",
    "Reduce stress + improve recovery.",
    "Focus on consistent daily habits.",
  ],
  low_bone_mass_appearance: [
    "Increase calcium + vitamin D intake.",
    "Resistance training + impact exercises.",
    "Improve overall nutrition.",
  ],
  low_facial_contrast: [
    "Improve skin tone consistency.",
    "Hair styling / grooming can increase contrast.",
    "Better lighting and tanning can help.",
  ],
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const images = body.images;

    if (!images || images.length === 0) {
      return NextResponse.json(
        { error: "No images provided" },
        { status: 400 }
      );
    }

    const res = await fetch("https://api.openai.com/v1/responses", {
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
Analyze the uploaded appearance photos.

Rules:
- Only identify visually observable appearance patterns
- Return JSON only

Allowed tags:
- acne_like_breakouts
- skin_texture_issue
- under_eye_tiredness
- fine_lines
- hair_thinning
- higher_body_fat_appearance
- low_muscle_definition
- posture_issue
- asymmetry_mild
- jawline_softness
- bloated_appearance
- unhealthy_appearance
- low_bone_mass_appearance
- low_facial_contrast

Return exactly this JSON:
{
  "overall_rating": 7.4,
  "summary": "Short realistic summary",
  "priority_focus": ["item 1", "item 2", "item 3"],
  "tags": [
    { "name": "acne_like_breakouts", "confidence": "high" }
  ],
  "scan_quality": "medium",
  "scan_quality_tips": ["tip 1", "tip 2"]
}
                `,
              },
              ...images.map((img: string) => ({
                type: "input_image",
                image_url: img,
              })),
            ],
          },
        ],
      }),
    });

    const data = await res.json();
    console.log("OPENAI RESPONSE:", JSON.stringify(data, null, 2));

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error?.message || "OpenAI request failed", raw: data },
        { status: 500 }
      );
    }

    const rawText =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      "";

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON from AI", raw: rawText },
        { status: 500 }
      );
    }

    const tags = Array.isArray(parsed.tags) ? parsed.tags : [];

    // 👇 CLEAN TAG NAMES HERE
    const cleanedTags = tags.map((tag: { name: string; confidence: string }) => ({
      ...tag,
      display: tag.name
        .replace("_appearance", "")
        .replaceAll("_", " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
    }));

    const mappedAdvice = tags.flatMap((tag: { name: string }) => {
      return adviceMap[tag.name] || [];
    });

    return NextResponse.json({
      overall_rating: parsed.overall_rating ?? null,
      summary: parsed.summary ?? "",
      priority_focus: parsed.priority_focus ?? [],
      tags: cleanedTags,
      scan_quality: parsed.scan_quality ?? "medium",
      scan_quality_tips: parsed.scan_quality_tips ?? [],
      mapped_advice: [...new Set(mappedAdvice)],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to analyze" },
      { status: 500 }
    );
  }
}