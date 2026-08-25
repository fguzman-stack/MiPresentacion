export type Constellation = "nebula-tech" | "orbita-reservas" | "aurora-creative" | "satellites";
export type ProjectType = "web" | "mobile";

export interface Project {
  id: string;
  name: string;
  taglineES: string;
  taglineEN: string;
  url: string;
  type: ProjectType;
  tech: string[];
  constellation: Constellation;
  color: string;
  color2: string;
  preview: string;
  feature: string;
  // legacy aliases for backward compat
  featureHighlight?: string;
  previewColor?: string;
}
