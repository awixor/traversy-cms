export function secondsToISO8601Duration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return (
    `PT${h > 0 ? `${h}H` : ""}${m > 0 ? `${m}M` : ""}${s > 0 ? `${s}S` : ""}` || "PT0S"
  );
}
