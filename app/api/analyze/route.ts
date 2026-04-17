import { NextResponse } from "next/server";

const adviceMap: Record<string, string[]> = {
  acne_like_breakouts: [
    "10mg Accutane every other day.",
    "Use a heavy moisturiser and SPF50 daily.",
    "Tazarotene or Tretinoin 2–3x a week.",
  ],
  skin_texture_issue: [
    "Keep routine simple.",
    "Use sunscreen daily.",
    "Exfoliate 2–3x a week.",
  ],
  under_eye_tiredness: [
    "Improve sleep consistency.",
    "Reduce stress.",
    "Hydrate properly.",
  ],
  fine_lines: [
    "Use daily sunscreen.",
    "Tretinoin 3–5x a week.",
    "Use moisturisers.",
  ],
  hair_thinning: [
    "Consider minoxidil + microneedling.",
    "Track progression.",
    "Reduce stress.",
  ],
  higher_body_fat_appearance: [
    "Calorie deficit.",
    "Whole food diet.",
    "Daily movement.",
  ],
  low_muscle_definition: [
    "Resistance training.",
    "Protein intake.",
    "Track strength.",
  ],
  posture_issue: [
    "Train upper back + core.",
    "Fix daily posture habits.",
  ],
  asymmetry_mild: [
    "Improve posture + sleep position.",
  ],
  jawline_softness: [
    "Lower body fat.",
    "Improve neck posture.",
  ],
  bloated_appearance: [
    "Reduce inflammatory foods.",
    "Improve gut health.",
  ],
  unhealthy_appearance: [
    "Fix sleep + diet first.",
    "Improve recovery.",
  ],
  low_bone_mass_appearance: [
    "Increase calcium + vitamin D.",
    "Resistance training.",
  ],
  low_facial_contrast: [
    "Improve grooming + skin tone.",
    "Better lighting helps.",
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
You are a STRICT visual classifier.

Your job:
- Only detect CLEARLY visible traits
- DO NOT guess
- DO NOT vary outputs
- Be consistent across repeated scans

Rules:
- Only include HIGH confidence tags
- If unsure → DO NOT include
- Prefer fewer tags over inconsistent ones

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

Return JSON ONLY:

{
  "overall_rating": number,
  "summary": string,
  "priority_focus": ["string"],
  "tags": [
    {
      "name": "tag_name",
      "confidence": "high"
    }
  ],
  "scan_quality": "low | medium | high",
  "scan_quality_tips": ["string"]
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

    // ✅ ONLY HIGH CONFIDENCE TAGS
    const tags = (parsed.tags || []).filter(
      (tag: { confidence: string }) => tag.confidence === "high"
    );

    // ✅ CLEAN + FORMAT TAG NAMES
    const cleanedTags = tags.map((tag: any) => ({
      ...tag,
      display: tag.name
        .replace("_appearance", "")
        .replaceAll("_", " ")
        .replace(/\b\w/g, (c: string) => c.toUpperCase()),
    }));

    // ✅ SORT TAGS (CONSISTENCY)
    cleanedTags.sort((a: any, b: any) =>
      a.name.localeCompare(b.name)
    );

    const mappedAdvice = tags.flatMap((tag: any) => {
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