export function parseLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function serializeLines(items: string[]): string {
  return items.join("\n");
}

export function parsePairs(text: string): { a: string; b: string }[] {
  return parseLines(text).map((line) => {
    const [a = "", b = ""] = line.split("|").map((part) => part.trim());
    return { a, b };
  });
}

export function serializePairs(items: { a: string; b: string }[]): string {
  return items.map(({ a, b }) => `${a} | ${b}`).join("\n");
}
