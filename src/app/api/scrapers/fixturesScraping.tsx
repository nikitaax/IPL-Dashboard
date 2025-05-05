import { Match } from "../../types/Match";
import puppeteer from "puppeteer";

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
];

export async function scrapeFixtures() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setUserAgent(
    USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)]
  );
  await page.goto("https://www.iplt20.com/matches/fixtures");
  await page.waitForSelector("span.versus");

  const fixtures = await page.$$eval("#team_archive li", (elements) => {
    return elements.map((fixture) => {
      const textLines = fixture.innerText
        .replace("Match Centre", "")
        .split("\n")
        .filter((line) => line.trim());
      const keys = ["match_number", "venue", "date", "time", "team1", "team2"];
      const data: Match = Object.fromEntries(
        keys.map((key, i) => [key, textLines[i]])
      ) as unknown as Match;

      data[
        "team1_logo"
      ] = `https://scores.iplt20.com/ipl/teamlogos/${data.team1}.png`;
      data[
        "team2_logo"
      ] = `https://scores.iplt20.com/ipl/teamlogos/${data.team2}.png`;

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
  });

  await browser.close();
  return fixtures;
}
