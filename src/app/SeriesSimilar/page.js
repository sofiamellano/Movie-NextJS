"use client";
import { useEffect, useState } from 'react';

export default function SeriesSimilar({seriesId}) {
    const [seriesSimilar, setSeriesSimilar] = useState([]);

    useEffect(() => {
        const fetchSeriesSimilar = async () => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjEzMDU1N2Y0N2VlZTEwYWUyMTI5Y2UwOTk2NTU2YyIsIm5iZiI6MTcyNDk3NTIyMy40MzQzODEsInN1YiI6IjY2ZDEwNzUzMTMyMzFhNjU4MjAxOWFjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ILyxow2tgTqjEpdJDjvrmvlGyXQmFX-fP8f00Mo_dY',
                },
            };

            const response = await fetch(`https://api.themoviedb.org/3/tv/${seriesId}/similar?language=es-MX&page=1`, options);
            const { results } = await response.json();
            setSeriesSimilar(results || []);
        };

        fetchSeriesSimilar();
    }, [seriesId]);

    return (
        <div className="w-full max-w-5xl px-4 mt-8">
            <h2 className="text-white text-xl font-semibold">Series Similares</h2>
            {seriesId ? (  
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {seriesSimilar.length > 0 ? (
                        seriesSimilar.map((series) => (
                            <div key={series.id} className="bg-gray-800 rounded-lg shadow-lg p-4">
                                <h3 className="text-white text-lg font-semibold">{series.name}</h3>
                                <p className="text-gray-400">{series.overview.slice(0, 200)}...</p>
                                <a href={`https://www.themoviedb.org/tv/${series.id}`} target="_blank" className="text-blue-400 underline">
                                    Leer más
                                </a>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No hay series similares disponibles.</p>
                    )}
                </div>
            ) : ( 
                <p className="text-gray-400">Si quiere ver recomendaciones, seleccione una serie y se le mostrarán recomendaciones según la que usted seleccionó.</p>
            )}
        </div>
    );
}