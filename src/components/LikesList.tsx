import type { Like } from "../types/Like";

interface Props {
  likes: Like[];
}

export default function LikesList({ likes }: Props) {
  return (
    <div className="space-y-6">
      {likes.map((like, index) => {
        const videoId = like.link.split("/video/")[1]?.split("/")[0];

        return (
          <div key={index} className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg p-4 space-y-3">
            <header className="bg-black text-white p-4 text-center text-lg font-bold tracking-wide">
            TokHistory
            </header>
            <p className="text-xs text-gray-400">
              {like.date.toLocaleString()}
            </p>

            <div className="max-w-md mx-auto p-4 space-y-6">
              <iframe
                src={`https://www.tiktok.com/embed/${videoId}`}
                className="w-full max-w-[325px]"
                height="550"
                allowFullScreen
              />
            </div>

          </div>
        );
      })}
    </div>
  );
}