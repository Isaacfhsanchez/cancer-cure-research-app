import { NextRequest, NextResponse } from "next/server";
import { researchEntries } from "@/data/research";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("query") || "").trim().toLowerCase();
  const selectedCancer = searchParams.get("cancer") || "All";

  const filtered = researchEntries.filter((entry) => {
    const cancerMatches = selectedCancer === "All" || entry.cancerType === selectedCancer;
    const haystack = [
      entry.cancerType,
      entry.biomarker,
      entry.therapy,
      entry.summary,
      entry.status,
      entry.tags.join(" "),
      entry.keyFindings.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    const textMatches = query.length === 0 || haystack.includes(query);
    return cancerMatches && textMatches;
  });

  const highPriority = filtered.filter((entry) => entry.score >= 90).length;
  const activeTrials = filtered.filter((entry) => entry.status.includes("Phase")).length;
  const promisingTherapies = filtered
    .slice()
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((entry) => entry.therapy);

  return NextResponse.json({
    data: filtered,
    summary: {
      totalStudies: filtered.length,
      highPriority,
      activeTrials,
      promisingTherapies,
    },
  });
}
