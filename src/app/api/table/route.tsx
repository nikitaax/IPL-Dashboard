import { NextResponse } from "next/server";
import { scrapeTable } from "../scrapers/pointsScraping";
export const revalidate = 3600;

export async function GET() {
  try {
    const table = await scrapeTable();
    return NextResponse.json({ table });
  } catch (error) {
    return NextResponse.json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}
