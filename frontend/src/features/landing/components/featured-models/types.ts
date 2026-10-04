export interface ProjectItem {
  id: string;
  titleEn: string;
  titleFa: string;
  categoryEn: string;
  categoryFa: string;
  descEn: string;
  descFa: string;
  image: string;
  accentColor: string;
  link?: string;
  year?: string;
  client?: string;
  techStack?: string[];
  metrics?: { labelEn: string; labelFa: string; value: string }[];
}
