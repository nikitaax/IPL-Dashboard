import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium";

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
];

export async function scrapeTable() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath:
      process.env.NODE_ENV === "development"
        ? puppeteer.executablePath()
        : await chromium.executablePath(),
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)]
  );
  await page.goto("https://www.iplt20.com/points-table/men", {
    waitUntil: "networkidle0",
  });
  await page.waitForSelector("tbody#pointsdata");

  const rows = await page.$$eval("tbody#pointsdata tr", (rowElements) => {
    return rowElements.map((row) => {
      const cells = Array.from(row.querySelectorAll("td")).map(
        (cell) => cell.textContent?.trim() || ""
      );
      const keys = [
        "position",
        "status",
        "team_name",
        "played",
        "won",
        "lost",
        "no_result",
        "nrr",
        "for",
        "against",
        "points",
        "recent",
      ];
      return Object.fromEntries(keys.map((key, i) => [key, cells[i]]));
    });
  });

  await browser.close();
  return rows;
}
