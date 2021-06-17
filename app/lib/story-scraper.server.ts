import ogScraper from "open-graph-scraper";

export async function scrape(url: string) {
  return await ogScraper({ url });
}
