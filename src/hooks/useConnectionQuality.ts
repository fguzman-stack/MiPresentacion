import { useEffect, useState } from "react";

export type ConnectionQuality = "fast" | "slow" | "unknown";

type NavigatorWithConnection = Navigator & {
  connection?: {
    effectiveType?: string;
    downlink?: number;
    saveData?: boolean;
    addEventListener?: (type: string, listener: () => void) => void;
    removeEventListener?: (type: string, listener: () => void) => void;
  };
  mozConnection?: { effectiveType?: string; downlink?: number; saveData?: boolean };
  webkitConnection?: { effectiveType?: string; downlink?: number; saveData?: boolean };
};

function getNetworkInfoQuality(): ConnectionQuality | null {
  const nav = navigator as NavigatorWithConnection;
  const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
  if (!conn) return null;
  // saveData => slow
  if (conn.saveData) return "slow";
  const effectiveType = conn.effectiveType;
  const downlink = conn.downlink;
  if (effectiveType) {
    if (effectiveType === "4g" && (downlink === undefined || downlink >= 1.5)) return "fast";
    if (effectiveType === "4g" && downlink !== undefined && downlink < 1.5) return "slow";
    if (effectiveType === "3g" || effectiveType === "2g" || effectiveType === "slow-2g") return "slow";
  }
  if (downlink !== undefined) {
    return downlink >= 1.5 ? "fast" : "slow";
  }
  return null;
}

async function measureDownloadSpeed(): Promise<ConnectionQuality> {
  // Fallback: measure time to fetch a small image from public/images (/images/ o ./images/) con cache bust
  const base = import.meta.env.BASE_URL || "/";
  const prefix = base.startsWith(".") ? "./images/" : "/images/";
  const testUrl = `${prefix}Ai-Boost.webp?cb=${Date.now()}`;
  const start = performance.now();
  try {
    const res = await fetch(testUrl, { cache: "no-store" });
    // Consume body to get accurate timing (clone)
    await res.blob();
    const durationMs = performance.now() - start;
    // If fetch takes > 1200ms likely slow, >600ms medium, else fast
    // Thresholds tuned for perceived fluency: < 800ms => fast, else slow
    if (durationMs < 900) return "fast";
    return "slow";
  } catch {
    // On error, assume slow to be safe (show static)
    return "slow";
  }
}

export function useConnectionQuality(): ConnectionQuality {
  const [quality, setQuality] = useState<ConnectionQuality>("unknown");

  useEffect(() => {
    let mounted = true;

    const apply = (q: ConnectionQuality) => {
      if (mounted) setQuality(q);
    };

    // Respect offline immediately
    if (!navigator.onLine) {
      apply("slow");
      return;
    }

    const networkQuality = getNetworkInfoQuality();

    if (networkQuality) {
      apply(networkQuality);
      // Verifica con medición real también — DevTools throttling (3G) no cambia effectiveType
      // Si la medición dice slow, prevalece slow para mostrar imagen estática
      const t = setTimeout(async () => {
        const measured = await measureDownloadSpeed();
        if (mounted && measured === "slow") apply("slow");
      }, 350);
      // Listen for changes
      const nav = navigator as NavigatorWithConnection;
      const conn = nav.connection;
      const handler = () => {
        const q = getNetworkInfoQuality();
        if (q) apply(q);
      };
      if (conn?.addEventListener) {
        conn.addEventListener("change", handler);
        return () => {
          clearTimeout(t);
          conn.removeEventListener?.("change", handler);
        };
      }
      return () => clearTimeout(t);
    }

    // Fallback: manual measurement (Safari sin Network Information API)
    const t2 = setTimeout(async () => {
      const measured = await measureDownloadSpeed();
      apply(measured);
    }, 300);

    return () => {
      mounted = false;
      clearTimeout(t2);
    };
  }, []);

  return quality;
}
