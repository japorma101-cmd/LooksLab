import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    result: `Face Score: 7.8/10
Body Score: 7.2/10

Top Issues:
- Mild skin texture inconsistency
- Slight posture imbalance
- Soft jawline definition
- Under-eye tiredness
- Average shoulder width presentation

Suggestions:
- Accutane + retinoids + sleep
- Strength training + hgh + testosterone
- Calorie deficit + retatrutide
- Whole food diet
- Improve grooming and hairstyle framing`,
  });
}