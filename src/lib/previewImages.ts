const imageMap: Record<string, string> = {
  "ai-boost": "Ai-Boost.png",
  "aimpact": "Aimpact.png",
  "nexusstream": "NexusStream.png",
  "promptflow": "PromptFlow.png",
  "reviewroom": "reviewroom.png",
  "latambooker": "LatamBooker.png",
  "bookingsuite": "BookingSuite.png",
  "nichebooker": "NicheBooker.png",
  "barberia": "Barberia-Plantilla.png",
  "vetflow": "VetFlow.png",
  "auradesign": "AuraDesing.png",
  "creatorflow": "CreatorFlow.png",
  "comidacallejera": "RutaCallejera.png",
};

export function getPreviewImage(projectId: string): string | null {
  const file = imageMap[projectId];
  if (!file) return null;
  // Solo WebP — PNG borrados (ahorra ~88% peso). Vite sirve public/images en /images/ o ./images/
  const webp = file.replace(/\.png$/i, ".webp");
  const base = import.meta.env.BASE_URL || "/";
  const prefix = base.startsWith(".") ? "./images/" : "/images/";
  return `${prefix}${webp}`;
}
