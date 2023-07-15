const LIMIT_LINE = "<You have reached the clipping limit for this item>";

export async function scrapeNotes(text: string) {
  const parsed = text
    .split("==========")
    .map((raw) => {
      let [_, titleAndAuthor, meta, __, highlight] = raw.split("\r\n");

      if (!titleAndAuthor || !meta || !highlight) {
        return null;
      }

      const match = titleAndAuthor.match(/^(.*) \((.*)\)$/);
      let [title, author] = match ? match.slice(1).map((s) => s.trim()) : [];
      const [, page] = meta.match(/on page (\d+)/) ?? [];

      const [, rawDate] = meta.match(/Added on (.*)$/) ?? [];
      const [, locationStart, locationEnd] =
        meta.match(/Location (\d+)-(\d+)/) ?? [];

      return {
        title: title ? title.trim() : null,
        author: author ? author.trim() : null,
        highlight: highlight?.trim() === LIMIT_LINE ? null : highlight,
        page: Number(page),
        location: [Number(locationStart), Number(locationEnd)],
        date: new Date(rawDate),
        raw,
      };
    })
    .filter(Boolean);

  return parsed;
}
