"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function SearchPage() {
    const [query, setQuery] = useState(""); // Estado para la búsqueda
    const [results, setResults] = useState([]); // Resultados de la búsqueda
    const [loading, setLoading] = useState(false); // Estado de carga
    const router = useRouter();
    const searchParams = useSearchParams();

    // Obtener el valor del parámetro 'query' de la URL
    useEffect(() => {
        const queryFromUrl = searchParams.get("query");
        if (queryFromUrl) {
            setQuery(queryFromUrl);
        }
    }, [searchParams]);

    // Realizar la búsqueda cuando el valor de 'query' cambia
    useEffect(() => {
        if (query) {
            setLoading(true);
            fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&language=es-MX`, {
                headers: {
                    accept: "application/json",
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjEzMDU1N2Y0N2VlZTEwYWUyMTI5Y2UwOTk2NTU2YyIsIm5iZiI6MTcyNDk3NTIyMy40MzQzODEsInN1YiI6IjY2ZDEwNzUzMTMyMzFhNjU4MjAxOWFjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ILyxow2tgTqjEpdJDjvrmvlGyXQmFX-fP8f00Mo_dY'
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setResults(data.results || []);
                })
                .catch(() => {
                    setResults([]);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [query]);

    // Manejar la búsqueda al presionar el botón
    const handleSearch = () => {
        if (query.trim()) {
            router.push(`/search?query=${query}`);
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
            {loading && <div className="text-white">Cargando...</div>}
            {results.length === 0 && !loading && query && (
                <p className="text-gray-400">No se encontraron resultados.</p>
            )}
            {results.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {results.map((item) => (
                        <div key={item.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}`}
                                alt={item.title || item.name}
                                className="w-full h-64 object-cover"
                            />
                            <div className="p-4 text-center">
                                <h2 className="text-white text-lg font-bold">
                                    {item.title || item.name}
                                </h2>
                                <p className="text-gray-400">
                                    {item.media_type === "movie" ? "Película" : "Serie/Actor"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
