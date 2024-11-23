"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SearchPage() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();
    const searchParams = useSearchParams();

    // Obtener el valor de 'query' de los parámetros de búsqueda en la URL
    useEffect(() => {
        const queryFromUrl = searchParams.get("query");
        if (queryFromUrl) {
            setQuery(queryFromUrl);
        }
    }, [searchParams]);

    useEffect(() => {
        if (query) {
            const fetchResults = async () => {
                setLoading(true);  // Empieza el loading
                setError(null);  // Resetea cualquier error anterior

                try {
                    const options = {
                        method: "GET",
                        headers: {
                            accept: "application/json",
                            Authorization:
                                'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjEzMDU1N2Y0N2VlZTEwYWUyMTI5Y2UwOTk2NTU2YyIsIm5iZiI6MTcyNDk3NTIyMy40MzQzODEsInN1YiI6IjY2ZDEwNzUzMTMyMzFhNjU4MjAxOWFjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ILyxow2tgTqjEpdJDjvrmvlGyXQmFX-fP8f00Mo_dY',
                        },
                    };

                    const response = await fetch(
                        `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&language=es-MX`,
                        options
                    );

                    if (!response.ok) {
                        throw new Error('Error al obtener los resultados de búsqueda.');
                    }

                    const data = await response.json();
                    setResults(data.results || []);
                } catch (error) {
                    setError(error.message);  // Establece el error
                } finally {
                    setLoading(false);  // Termina el loading
                }
            };

            fetchResults();
        }
    }, [query]);

    // Función para manejar la búsqueda cuando el usuario hace clic en el botón de búsqueda
    const handleSearch = () => {
        if (query.trim()) {
            router.push(`/search?query=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen py-8 px-4">
            <div className="flex flex-col items-center">
                <h1 className="text-white text-3xl font-bold mb-4">Búsqueda</h1>

                {/* Barra de búsqueda */}
                <div className="w-full max-w-md px-4 mb-8">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Busca películas, series o actores..."
                        className="w-full px-4 py-2 text-gray-900 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSearch}
                        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600"
                    >
                        Buscar
                    </button>
                </div>
            </div>

            {/* Resultados de búsqueda */}
            {query && (
                <>
                    {loading && <div className="text-white">Cargando...</div>}
                    {error && <div className="text-white">Hubo un problema: {error}</div>}
                    {results.length === 0 && !loading && (
                        <p className="text-gray-400">No se encontraron resultados.</p>
                    )}
                    {results.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {results.map((item) => (
                                <div key={item.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                                    <img
                                        src={
                                            item.poster_path || item.profile_path
                                                ? `https://image.tmdb.org/t/p/w500${
                                                    item.poster_path || item.profile_path
                                                }`
                                                : "/fallback-image.jpg"
                                        }
                                        alt={item.title || item.name}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="p-4 text-center">
                                        <h2 className="text-white text-lg font-bold">
                                            {item.title || item.name}
                                        </h2>
                                        <p className="text-gray-400">
                                            {item.media_type === "movie"
                                                ? "Película"
                                                : item.media_type === "tv"
                                                ? "Serie"
                                                : "Actor/Actriz"}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
