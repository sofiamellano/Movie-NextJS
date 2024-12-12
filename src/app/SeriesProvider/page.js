"use client";
import { useEffect, useState } from 'react';

export default function SeriesProvider({ seriesId }) {

    console.log(seriesId);

    const [seriesProvider, setSeriesProvider] = useState([]);

    useEffect(() => {

        if (!seriesId) return;

        const fetchSeriesProvider = async () => {

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjEzMDU1N2Y0N2VlZTEwYWUyMTI5Y2UwOTk2NTU2YyIsIm5iZiI6MTcyNDk3NTIyMy40MzQzODEsInN1YiI6IjY2ZDEwNzUzMTMyMzFhNjU4MjAxOWFjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ILyxow2tgTqjEpdJDjvrmvlGyXQmFX-fP8f00Mo_dY',
                },
            };

            const response = await fetch(`https://api.themoviedb.org/3/tv/${seriesId}/watch/providers`, options);

            const { results } = await response.json();

            console.log(results);
            const AllProviders = [];

            for (const region in results) {

                if (results[region]) {

                    const categories = ["ads", "buy", "free", "flatrate"];

                    categories.forEach((category) => {
                        if (results[region][category]) {

                            AllProviders.push(...results[region][category]);
                        }
                    });
                }
            }

            setSeriesProvider(AllProviders);
        };

        fetchSeriesProvider();

    }, [seriesId]);

    return (
        <div className="bg-gray-900 min-h-screen flex flex-col items-center py-8">
            <h2 className="text-white text-3xl font-bold mb-8">Proveedores</h2>

            <div className="w-full max-w-5xl px-4">
                {seriesProvider.length > 0 ? (

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {seriesProvider.map((provider) => (

                            <div
                                key={provider.provider_id}
                                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition duration-300 ease-in-out h-64"
                            >
                                {provider.logo_path ? (

                                    <img
                                        className="w-full h-[210px] object-contain bg-white"
                                        src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
                                        alt={provider.provider_name}
                                    />
                                ) : (

                                    <div className="w-full h-40 flex items-center justify-center bg-white text-gray-500">
                                        No logo available
                                    </div>
                                )}
                                <div className="p-4">
                                    <h3 className="text-white text-xl font-semibold text-center">
                                        {provider.provider_name || 'Unknown Provider'}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-gray-400 text-center text-xl">
                        No se encontraron proveedores para esta serie.
                    </div>
                )}
            </div>
        </div>
    );
}
