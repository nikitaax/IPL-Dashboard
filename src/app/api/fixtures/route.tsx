import { NextResponse } from "next/server";
import { scrapeFixtures } from "../scrapers/fixturesScraping";
export const revalidate = 3600;

export async function GET() {
  try {
    const fixtures = await scrapeFixtures();
    return NextResponse.json({ fixtures });
  } catch (error) {
    return NextResponse.json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}
