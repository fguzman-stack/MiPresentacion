import { useEffect, useRef, useState } from "react";
import { Check, Paintbrush } from "lucide-react";
import { t, type Lang } from "../lib/i18n";
import { applyTheme, getStoredTheme, spaceThemes, type SpaceTheme } from "../lib/theme";

export function ThemePicker({ lang }: { lang: Lang }) {
  const [theme, setTheme] = useState<SpaceTheme>(getStoredTheme);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    applyTheme(theme);
    try { localStorage.setItem("space-theme", theme); } catch { /* The selection still works without storage. */ }
  }, [theme]);

  useEffect(() => {
    if (!open) return;
    rootRef.current?.querySelector<HTMLButtonElement>('[aria-pressed="true"]')?.focus();
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); triggerRef.current?.focus(); }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="theme-picker" ref={rootRef} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <button type="button" className="theme-trigger" ref={triggerRef} aria-label={`${t(lang, "theme_label")}: ${t(lang, `theme_${theme}`)}`} title={t(lang, "theme_label")} aria-expanded={open} aria-controls="space-theme-options" onClick={() => setOpen(!open)}>
        <Paintbrush size={18} aria-hidden="true" /><span className="theme-trigger-dot" aria-hidden="true" />
      </button>
      {open && <div className="theme-popover" id="space-theme-options" role="group" aria-label={t(lang, "theme_label")}>
        <p className="eyebrow">{t(lang, "theme_heading")}</p>
        {spaceThemes.map((item) => <button type="button" className="theme-option" key={item.id} aria-pressed={theme === item.id} onClick={() => {
          setTheme(item.id); setOpen(false); triggerRef.current?.focus();
        }}>
          <span className="theme-swatch" style={{ backgroundColor: item.color }} aria-hidden="true" />
          <span>{t(lang, `theme_${item.id}`)}{item.id === "supernova" && <small>{t(lang, "theme_supernova_detail")}</small>}</span>
          {theme === item.id && <Check size={16} aria-hidden="true" />}
        </button>)}
      </div>}
    </div>
  );
}
