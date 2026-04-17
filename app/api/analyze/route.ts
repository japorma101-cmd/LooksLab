import { NextResponse } from "next/server";

const adviceMap = {
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
    "low dose Melatonin + Trazadone every night for sleep.",
    "Hydroquinone cream to brighten under eyes.",
    "Reduce stress and fatigue in every day activities.",
  ],
  fine_lines: [
    "Use daily sunscreen.",
    "Tretinon adjusted to your skin 3-5x a week.",
    "Heavy moisturisers.",
  ],
  hair_thinning: [
    "Topicals such as minoxidil and ru58841 + microneedling.",
    "Orals such as minoxidil, dutasteride or finasteride for dht blocking.",
    "Natural whole food diet + low stress levels.",
  ],
  higher_body_fat_appearance: [
    "Basics such as a whole food diet mostly meat and less calories in then out.",
    "Fat loss agents such as Retatrutide, Tesamorelin, Telmisartan.",
    "Prioritize protein intake, sleep, and daily movement.",
  ],
  low_muscle_definition: [
    "Low dose testosterone + Low dose hgh",
    "Aim for consistent protein intake and recovery.",
    "Possibly add an androgen such as low dose tren or anavar",
  ],
  posture_issue: [
    "Focus on upper-back and core training.",
    "Practice better standing posture during daily life.",
    "Retake scans standing tall and front-facing for cleaner comparisons.",
  ],
  asymmetry_mild: [
    "Sleep on your back and work on neck strength.",
    "Track changes over time instead of judging one photo too heavily.",
  ],
  jawline_softness: [
    "Leaner body composition may improve facial definition.",
    "Use consistent posture and neck position in repeat scans.",
  ],
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

const displayNameMap = {
  acne_like_breakouts: "Acne",
  skin_texture_issue: "Skin texture",
  under_eye_tiredness: "Under-eye tiredness",
  fine_lines: "Fine lines",
  hair_thinning: "Hair thinning",
  higher_body_fat_appearance: "Higher body fat",
  low_muscle_definition: "Low muscle definition",
  posture_issue: "Posture",
  asymmetry_mild: "Mild asymmetry",
  jawline_softness: "Soft jawline",
  bloated_appearance: "Bloated look",
  unhealthy_appearance: "Unhealthy appearance",
  low_bone_mass_appearance: "Weak bone mass look",
  low_facial_contrast: "Low facial contrast",
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
Analyze ALL uploaded photos together.

Rules:
- Detect clearly visible appearance patterns
- Be reasonably thorough
- Prefer medium and high confidence tags
- Return 3 to 6 tags when supported by the photos
- Return JSON only
- Do not include markdown fences

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

Return exactly:
{
  "overall_rating": 7.4,
  "summary": "Short realistic summary here.",
  "priority_focus": ["item 1", "item 2", "item 3"],
  "tags": [
    {
      "name": "acne_like_breakouts",
      "confidence": "high"
    }
  ],
  "scan_quality": "medium",
  "scan_quality_tips": [
    "tip 1",
    "tip 2",
    "tip 3"
  ]
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

    if (!rawText) {
      return NextResponse.json(
        { error: "No result returned from AI" },
        { status: 500 }
      );
    }

    let parsed;

    try {
      parsed = JSON.parse(rawText);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON from AI", raw: rawText },
        { status: 500 }
      );
    }

    const rawTags = Array.isArray(parsed.tags) ? parsed.tags : [];

    const tags = rawTags
      .filter((tag: any) => {
        return (
          tag &&
          tag.name &&
          (tag.confidence === "high" || tag.confidence === "medium")
        );
      })
      .map((tag: any) => ({
        name: tag.name,
        confidence: tag.confidence,
        display:
          displayNameMap[tag.name as keyof typeof displayNameMap] || tag.name,
      }))
      .sort((a: any, b: any) => a.display.localeCompare(b.display));

    const mappedAdvice = tags.flatMap(
      (tag: any) =>
        adviceMap[tag.name as keyof typeof adviceMap] || []
    );

    return NextResponse.json({
      overall_rating: parsed.overall_rating ?? null,
      summary: parsed.summary ?? "",
      priority_focus: Array.isArray(parsed.priority_focus)
        ? parsed.priority_focus
        : [],
      tags,
      scan_quality: parsed.scan_quality ?? "medium",
      scan_quality_tips: Array.isArray(parsed.scan_quality_tips)
        ? parsed.scan_quality_tips
        : [],
      mapped_advice: [...new Set(mappedAdvice)],
    });
  } catch (error) {
    console.error("Analyze route error:", error);

    return NextResponse.json(
      { error: "Failed to analyze" },
      { status: 500 }
    );
  }
}