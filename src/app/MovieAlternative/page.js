"use client";
import { useEffect, useState } from 'react';

export default function MovieAlternative({ movieId }) {
    const [alternativeTitles, setAlternativeTitles] = useState([]);

    useEffect(() => {
        const fetchAlternativeTitles = async () => {
            if (!movieId) return;

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjEzMDU1N2Y0N2VlZTEwYWUyMTI5Y2UwOTk2NTU2YyIsIm5iZiI6MTcyNDk3NTIyMy40MzQzODEsInN1YiI6IjY2ZDEwNzUzMTMyMzFhNjU4MjAxOWFjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ILyxow2tgTqjEpdJDjvrmvlGyXQmFX-fP8f00Mo_dY' ,
                },
            };

            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/alternative_titles`, options);
            const { titles } = await response.json();
            setAlternativeTitles(titles || []);
        };

        fetchAlternativeTitles();
    }, [movieId]);

    return (
        <div className="w-full max-w-5xl px-4 mt-8">
            <h2 className="text-white text-xl font-semibold">Títulos Alternativos</h2>
            {movieId ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {alternativeTitles.length > 0 ? (
                        alternativeTitles.map((title) => (
                            <div key={title.iso_3166_1} className="bg-gray-800 rounded-lg shadow-lg p-4">
                                <h3 className="text-white text-lg font-semibold">{title.title}</h3>
                                <p className="text-gray-400">{title.type}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No hay títulos alternativos disponibles.</p>
                    )}
                </div>
            ) : (
                <p className="text-gray-400">Seleccione una película para ver títulos alternativos.</p>
            )}
        </div>
    );
}
