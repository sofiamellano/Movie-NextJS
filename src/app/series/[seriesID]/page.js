"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from "next/navigation";

export default function seriesDetails() {
    const { seriesID } = useParams();
    const router = useRouter();

    const [seriesDetails, setSeriesDetails] = useState(null);
    const [seriesActors, setSeriesactors] = useState([]);

    useEffect(() => {
        if (seriesID) {
            const fetchseriesDetails = async () => {
                const options = {
                    method: 'GET',
                    headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjEzMDU1N2Y0N2VlZTEwYWUyMTI5Y2UwOTk2NTU2YyIsIm5iZiI6MTcyNDk3NTIyMy40MzQzODEsInN1YiI6IjY2ZDEwNzUzMTMyMzFhNjU4MjAxOWFjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ILyxow2tgTqjEpdJDjvrmvlGyXQmFX-fP8f00Mo_dY', 
                },
            };

            const response = await fetch(`https://api.themoviedb.org/3/tv/${seriesID}?language=es-MX`, 
            options);
            const data = await response.json();
            setSeriesDetails(data);
        };

        const fetchseriesActors = async () => {
            const options = {
                method: 'GET',
                headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjEzMDU1N2Y0N2VlZTEwYWUyMTI5Y2UwOTk2NTU2YyIsIm5iZiI6MTcyNDk3NTIyMy40MzQzODEsInN1YiI6IjY2ZDEwNzUzMTMyMzFhNjU4MjAxOWFjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ILyxow2tgTqjEpdJDjvrmvlGyXQmFX-fP8f00Mo_dY', 
            },
        };

        const response = await fetch(`https://api.themoviedb.org/3/tv/${seriesID}/credits`, options);
        const data = await response.json();
        setSeriesactors(data.cast);
    };

    fetchseriesDetails();
    fetchseriesActors();
    }
}, [seriesID]);
    if (!seriesDetails) {
        return <div className="text-white">Cargando datos...</div>; 
    }

    const handleActorSeriesClick = (castserieID) => {
        router.push(`/series/${seriesID}/cast/${castserieID}`);}
    
    
    return (
        <div className="bg-gray-900 min-h-screen flex flex-col items-center py-8">
            <h1 className="text-white text-3xl font-bold mb-8">{seriesDetails.original_name}</h1>
            <div className="w-full max-w-5xl px-4">
                <img
                    className="w-full h-100 object-cover"
                    src={`https://image.tmdb.org/t/p/original/${seriesDetails.backdrop_path}`}
                    alt={seriesDetails.original_name}
                />
                <div className="p-4 bg-gray-800 rounded-lg shadow-lg mt-4">
                    <h2 className="text-white text-2xl font-semibold mb-4">Detalles de la Serie</h2>
                    <p className="text-gray-400 mb-2">
                            <strong className="text-white">Sinopsis: </strong>{seriesDetails.overview}
                    </p>
                    <p className="text-gray-400 mb-2">
                        <strong className="text-white">Géneros: </strong>
                        {seriesDetails.genres && seriesDetails.genres.map((genre) => genre.name).join(', ')}
                    </p>
                </div>
                <div className="p-4">
                    <h2 className="text-white text-xl font-semibold">Actores</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {seriesActors.map((actor) => (
                            <div key={actor.cast_id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden p-2"
                            onClick={() => handleActorSeriesClick(actor.id)}>
                                <img
                                    className="w-full h-48 object-cover"
                                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : '/fallback-image.jpg'}
                                    alt={actor.name}
                                />
                                <div className="p-2 text-center">
                                    <h3 className="text-white text-lg font-semibold">{actor.name}</h3>
                                    <p className="text-gray-400">Como {actor.character}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}