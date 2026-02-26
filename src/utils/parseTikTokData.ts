import type { Like } from "../types/Like";

interface TikTokData {
  "Likes and Favorites"?: {
    "Like List"?: {
      ItemFavoriteList?: Array<{ date: string; link: string }>;
    };
  };
}

export function extractLikes(data: TikTokData): Like[] {
  const rawLikes =
    data["Likes and Favorites"]?.["Like List"]?.["ItemFavoriteList"];

  if (!rawLikes) return [];

  return rawLikes.map((item: { date: string; link: string }) => ({
    date: new Date(item.date),
    link: item.link,
  }));
}