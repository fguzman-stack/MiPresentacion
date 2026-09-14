export type Constellation = "nebula-tech" | "orbita-reservas" | "aurora-creative" | "satellites" | "desktop-apps";
export type ProjectType = "web" | "mobile" | "desktop";

export interface Project {
  id: string;
  name: string;
  taglineES: string;
  taglineEN: string;
  taglinePT?: string;
  taglineFR?: string;
  url: string;
  type: ProjectType;
  tech: string[];
  constellation: Constellation;
  color: string;
  color2: string;
  preview: string;
  feature: string;
  featureEN?: string;
  featurePT?: string;
  featureFR?: string;
  descriptionES?: string;
  descriptionEN?: string;
  descriptionPT?: string;
  descriptionFR?: string;
  highlightsES?: string[];
  highlightsEN?: string[];
  highlightsPT?: string[];
  highlightsFR?: string[];
  screenshot?: string;
  screenshots?: string[];
  downloadUrl?: string;
  // legacy aliases for backward compat
  featureHighlight?: string;
  previewColor?: string;
}
