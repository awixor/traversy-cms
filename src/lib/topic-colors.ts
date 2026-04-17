const GOLDEN_ANGLE = 137.508;

export function getTopicColor(id: number): { hsl: string; hex: string } {
  const hue = (id * GOLDEN_ANGLE) % 360;
  return {
    hsl: `hsl(${hue.toFixed(1)}, 70%, 60%)`,
    hex: hslToHex(hue, 70, 60),
  };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
  };
  return (
    "#" +
    [f(0), f(8), f(4)]
      .map((v) => Math.round(v * 255).toString(16).padStart(2, "0"))
      .join("")
  );
}
