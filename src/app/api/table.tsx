import { NextApiRequest, NextApiResponse } from "next";
import { scrapeTable } from "./scrapers/pointsScraping";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const points = await scrapeTable();
    res.status(200).json({ points });
  } catch (error) {
    res.status(500).json({
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
}
