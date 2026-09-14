import type { Lang } from "./i18n";
import type { Project } from "../types/project";

export function projectTagline(project: Project, lang: Lang) {
  if (lang === "en") return project.taglineEN;
  if (lang === "pt") return project.taglinePT ?? project.taglineEN;
  if (lang === "fr") return project.taglineFR ?? project.taglineEN;
  return project.taglineES;
}

export function projectFeature(project: Project, lang: Lang) {
  if (lang === "en") return project.featureEN ?? project.feature;
  if (lang === "pt") return project.featurePT ?? project.featureEN ?? project.feature;
  if (lang === "fr") return project.featureFR ?? project.featureEN ?? project.feature;
  return project.feature;
}

export function projectDescription(project: Project, lang: Lang) {
  if (lang === "en") return project.descriptionEN ?? project.taglineEN;
  if (lang === "pt") return project.descriptionPT ?? project.descriptionEN ?? project.taglinePT ?? project.taglineEN;
  if (lang === "fr") return project.descriptionFR ?? project.descriptionEN ?? project.taglineFR ?? project.taglineEN;
  return project.descriptionES ?? project.taglineES;
}

export function projectHighlights(project: Project, lang: Lang) {
  if (lang === "en") return project.highlightsEN ?? project.highlightsES;
  if (lang === "pt") return project.highlightsPT ?? project.highlightsEN ?? project.highlightsES;
  if (lang === "fr") return project.highlightsFR ?? project.highlightsEN ?? project.highlightsES;
  return project.highlightsES;
}
