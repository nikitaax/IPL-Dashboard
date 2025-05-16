import { Match } from "../../types/Match";
import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium";

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
];

const isProd = process.env.AWS_LAMBDA_FUNCTION_VERSION || process.env.VERCEL;

export async function scrapeFixtures() {
  const browser = await puppeteer.launch(
    isProd
      ? {
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          headless: chromium.headless,
          executablePath: await chromium.executablePath(),
        }
      : {
          headless: true, // Use Puppeteer's default Chromium for local
        }
  );

  const page = await browser.newPage();

  await page.setUserAgent(
    USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)]
  );
  await page.goto("https://www.iplt20.com/matches/fixtures", {
    waitUntil: "networkidle0",
  });
  await page.waitForSelector("span.versus");

  const TEAM_LOGO_MAP = {
    "Chennai Super Kings": "CSK",
    "Mumbai Indians": "MI",
    "Royal Challengers Bengaluru": "RCB",
    "Kolkata Knight Riders": "KKR",
    "Delhi Capitals": "DC",
    "Rajasthan Royals": "RR",
    "Sunrisers Hyderabad": "SRH",
    "Punjab Kings": "PBKS",
    "Lucknow Super Giants": "LSG",
    "Gujarat Titans": "GT",
    "TBD ": "TBD",
  };

  const TBD_IMAGE_URL =
    "https://scores.iplt20.com/ipl/images/default-team-logo.png";

  const fixtures = await page.$$eval(
    "#team_archive li",
    (
      elements,
      TEAM_LOGO_MAP: Record<string, string>,
      TBD_IMAGE_URL: string
    ) => {
      return Array.from(elements).map((fixture) => {
        const textLines = fixture.innerText
          .replace("Match Centre", "")
          .split("\n")
          .filter((line) => line.trim());
        const keys = [
          "match_number",
          "venue",
          "date",
          "time",
          "team1",
          "team2",
        ];
        const data: Match = Object.fromEntries(
          keys.map((key, i) => [key, textLines[i]])
        ) as unknown as Match;

        const team1Key = data.team1 ? data.team1.trim() : "";
        const team2Key = data.team2 ? data.team2.trim() : "";

        data["team1_logo"] =
          team1Key === "TBD"
            ? TBD_IMAGE_URL
            : TEAM_LOGO_MAP[team1Key]
            ? `https://scores.iplt20.com/ipl/teamlogos/${TEAM_LOGO_MAP[team1Key]}.png`
            : /^[A-Z]{2,4}$/.test(team1Key)
            ? `https://scores.iplt20.com/ipl/teamlogos/${team1Key}.png`
            : TBD_IMAGE_URL;

        data["team2_logo"] =
          team2Key === "TBD"
            ? TBD_IMAGE_URL
            : TEAM_LOGO_MAP[team2Key]
            ? `https://scores.iplt20.com/ipl/teamlogos/${TEAM_LOGO_MAP[team2Key]}.png`
            : /^[A-Z]{2,4}$/.test(team2Key)
            ? `https://scores.iplt20.com/ipl/teamlogos/${team2Key}.png`
            : TBD_IMAGE_URL;

        // Assign a boolean value to live_match
        data["live_match"] =
          fixture.querySelectorAll("div.livematchIcon").length > 0;

        if (data["live_match"]) {
          const teamElements = Array.from(
            fixture.querySelectorAll(".vn-shedTeam")
          );

          // Find team1 status
          const team1Element = teamElements.find((el) =>
            el.textContent?.includes(data.team1)
          );
          data["team1_status"] =
            team1Element?.textContent?.replace(data.team1, "").trim() || "";

          // Find team2 status
          const team2Element = teamElements.find((el) =>
            el.textContent?.includes(data.team2)
          );
          data["team2_status"] =
            team2Element?.textContent?.replace(data.team2, "").trim() || "";

          // Match status
          data["status"] =
            fixture.querySelector("div.vn-ticketTitle")?.textContent?.trim() ||
            "";
        }
        return data;
      });
    },
    TEAM_LOGO_MAP,
    TBD_IMAGE_URL
  );

  await browser.close();
  return fixtures;
}
