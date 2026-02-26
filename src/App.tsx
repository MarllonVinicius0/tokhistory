import { useState } from "react";
import UploadArea from "./components/UploadArea";
import LikesList from "./components/LikesList";
import type { Like } from "./types/Like";
import { useEffect } from "react";

function App() {
  const [likes, setLikes] = useState<Like[]>([]);
  const [ascending, setAscending] = useState(true);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

 const filteredLikes = selectedYear
  ? likes.filter(like => like.date.getFullYear() === selectedYear)
  : likes;

const sortedLikes = [...filteredLikes].sort((a, b) =>
  ascending
    ? a.date.getTime() - b.date.getTime()
    : b.date.getTime() - a.date.getTime()
);

const totalPages = Math.ceil(sortedLikes.length / itemsPerPage);

const paginatedLikes = sortedLikes.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);


  const availableYears = [
  ...new Set(likes.map(like => like.date.getFullYear()))
].sort();

useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, [currentPage]);

  return (
  <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">

    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 p-4 text-center">
  <h1 className="text-xl font-bold tracking-wide">
    TokHistory
  </h1>
  <p className="text-xs text-gray-400">
    Visualize seus likes do TikTok com organização
  </p>
    </header>

    <div className="p-4 space-y-4">

      <UploadArea onDataLoaded={setLikes} />

      {likes.length > 0 && (
        <>
          <div className="bg-gray-900 border border-gray-800 p-4 rounded-2xl shadow-lg space-y-4">

            <p className="text-sm text-gray-600">
              Total de Likes: {likes.length}
            </p>

            <button
            onClick={() => setAscending(!ascending)}
            className="w-full bg-white text-black font-semibold py-2 rounded-xl transition hover:scale-[1.02]"
          >
            {ascending ? "Mais antigo → Mais recente" : "Mais recente → Mais antigo"}
          </button>

            <select
              onChange={(e) =>
                setSelectedYear(e.target.value ? Number(e.target.value) : null)
              }
              className="w-full bg-black border border-gray-700 text-white p-2 rounded-xl"
            >
              <option value="">Todos os anos</option>
              {availableYears.map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

          </div>

          <LikesList likes={paginatedLikes} />
          <div className="flex justify-between items-center mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Anterior
            </button>

            <span className="text-sm">
              Página {currentPage} de {totalPages}
            </span>

            <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="bg-white text-black px-4 py-2 rounded-xl font-semibold disabled:opacity-30"
          >
            Próxima →
          </button>
          </div>
        </>
      )}
    </div>
  </div>
);
}

export default App;