import { NextApiRequest, NextApiResponse } from "next";
import { scrapeFixtures } from "./scrapers/fixturesScraping";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const fixtures = await scrapeFixtures();
    res.status(200).json({ fixtures });
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
  }
}
