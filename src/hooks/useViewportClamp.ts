import { useEffect, useState, useCallback } from "react";

export function useViewportClamp(anchorRect: DOMRect | null, hudSize: { w: number; h: number } | null, gap = 12) {
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const clamp = useCallback(() => {
    if (!anchorRect || !hudSize) return null;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let left = anchorRect.left + anchorRect.width / 2 - hudSize.w / 2;
    let top = anchorRect.top - hudSize.h - gap;
    // clamp horizontally
    left = Math.max(12, Math.min(left, vw - hudSize.w - 12));
    // if not enough space on top, place below
    if (top < 12) top = anchorRect.bottom + gap;
    // if still out of viewport vertically, clamp
    if (top + hudSize.h > vh - 12) top = vh - hudSize.h - 12;
    return { left, top };
  }, [anchorRect, hudSize, gap]);

  useEffect(() => {
    setPos(clamp());
    const onResize = () => setPos(clamp());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [clamp]);

  return pos;
}
