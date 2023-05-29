import { Article } from "../types/Article";

export const isEqual = (articles: Article[]): Article[] => {
  const uniqueArticles = [];
  const hashMap: Record<string, boolean> = {};

  for (const article of articles) {
    if (!(article.id in hashMap)) {
      hashMap[article.id] = true;
      uniqueArticles.push(article);
    }
  }

  return uniqueArticles;
};
