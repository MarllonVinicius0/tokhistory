import { extractLikes } from "../utils/parseTikTokData";
import type { Like } from "../types/Like";
import { useState } from "react";

interface Props {
  onDataLoaded: (likes: Like[]) => void;
}

export default function UploadArea({ onDataLoaded }: Props) {
  const [error, setError] = useState<string | null>(null);

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        const likes = extractLikes(json);

        if (likes.length === 0) {
          setError(
            "Arquivo válido, mas nenhum vídeo curtido foi encontrado. Verifique se é o JSON completo do TikTok."
          );
          return;
        }

        onDataLoaded(likes);
      } catch {
        setError("Arquivo inválido. Envie um JSON exportado do TikTok.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg space-y-6">
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">
          Como exportar seus dados do TikTok
        </h2>
        <ol className="list-decimal list-inside text-sm text-gray-400 space-y-1">
          <li>Abra o TikTok e vá até seu Perfil.</li>
          <li>Toque nas três linhas (☰) no canto superior.</li>
          <li>Entre em <strong>Configurações e privacidade</strong>.</li>
          <li>Vá em <strong>Conta</strong>.</li>
          <li>Toque em <strong>Baixar seus dados</strong>.</li>
          <li>Escolha o formato <strong>JSON</strong>.</li>
          <li>Marque a caixa <strong>Curtidas e Favoritos</strong>.</li>
          <li>Solicite e aguarde a liberação do arquivo.</li>
          <li>Baixe o arquivo ZIP e extraia o JSON.</li>
          <li>Envie o arquivo JSON aqui abaixo 👇</li>
        </ol>
      </div>
      <div className="border-t border-gray-800 pt-4">
        <label className="block text-sm mb-2">Enviar arquivo JSON</label>
        <input
          type="file"
          accept=".json"
          onChange={handleFile}
          className="w-full bg-black border border-gray-700 p-2 rounded-xl text-sm"
        />
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-300 p-3 rounded-xl text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
