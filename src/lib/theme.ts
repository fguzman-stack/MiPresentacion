export const spaceThemes = [
  { id: "purple", color: "#9b7bff" },
  { id: "green", color: "#57dfad" },
  { id: "red", color: "#ff717c" },
  { id: "sky", color: "#54dcff" },
  { id: "supernova", color: "#ffca64" },
] as const;

export type SpaceTheme = (typeof spaceThemes)[number]["id"];

export function getStoredTheme(): SpaceTheme {
  try {
    const saved = localStorage.getItem("space-theme");
    return spaceThemes.find((theme) => theme.id === saved)?.id ?? "purple";
  } catch {
    return "purple";
  }
}

export function applyTheme(theme: SpaceTheme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", spaceThemes.find((item) => item.id === theme)!.color);
}

// Apply before React renders so the portfolio and the 404 share the saved theme.
applyTheme(getStoredTheme());
