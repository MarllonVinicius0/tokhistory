import type { Like } from "../types/Like";

interface Props {
  like: Like | null;
  onClose: () => void;
}

export default function VideoModal({ like, onClose }: Props) {
  if (!like) return null;

  const videoId = like.link.split("/video/")[1]?.split("/")[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500"
        >
          X
        </button>
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[325px] aspect-[9/16]">
            <iframe
              src={`https://www.tiktok.com/embed/${videoId}`}
              className="w-full h-full rounded-xl"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}
