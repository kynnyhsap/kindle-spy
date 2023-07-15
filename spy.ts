import { scrapeNotes } from "./scrape.ts";

const HEARTRATE = 1000;
const heartbeat = () =>
  new Promise((resolve) => setTimeout(resolve, HEARTRATE));

const PATH_TO_NOTES = "/Volumes/Kindle/documents/My Clippings.txt";

// while (true) {
console.log("Spying on kindle notes...");

try {
  const notesText = await Deno.readTextFile(PATH_TO_NOTES).catch(() =>
    console.warn("Kindle not connected.")
  );

  const parsed = await scrapeNotes(notesText);
  console.log(parsed.sort((a, b) => b.date.getTime() - a.date.getTime()));
} catch (e) {
  console.log(e);
}

await heartbeat();
// }
