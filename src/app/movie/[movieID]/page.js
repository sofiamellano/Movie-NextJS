"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from "next/navigation";

export default function movieDetalles() {
    const { movieID } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [actors, setActors] = useState([]);

    useEffect(() => {
        if (movieID) {
            const fetchMovieDetails = async () => {
                const options = {
                    method: 'GET',
                    headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjEzMDU1N2Y0N2VlZTEwYWUyMTI5Y2UwOTk2NTU2YyIsIm5iZiI6MTcyNDk3NTIyMy40MzQzODEsInN1YiI6IjY2ZDEwNzUzMTMyMzFhNjU4MjAxOWFjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ILyxow2tgTqjEpdJDjvrmvlGyXQmFX-fP8f00Mo_dY', 
                },
            };

            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?language=es-MX`, options);
            const data = await response.json();
            setMovieDetails(data);
        };

        const fetchActors = async () => {
            const options = {
                method: 'GET',
                headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjEzMDU1N2Y0N2VlZTEwYWUyMTI5Y2UwOTk2NTU2YyIsIm5iZiI6MTcyNDk3NTIyMy40MzQzODEsInN1YiI6IjY2ZDEwNzUzMTMyMzFhNjU4MjAxOWFjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ILyxow2tgTqjEpdJDjvrmvlGyXQmFX-fP8f00Mo_dY', 
            },
        };
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/credits`, options);
        const data = await response.json();
        setActors(data.cast);
    };

    fetchMovieDetails();
    fetchActors();
    }
}, [movieID]);

    if (!movieDetails) {
        return <div className="text-white">Cargando datos...</div>;
    }

    
    return (
        <div className="bg-gray-900 min-h-screen flex flex-col items-center py-8">
            <h1 className="text-white text-3xl font-bold mb-8">{movieDetails.title}</h1>
            <div className="w-full max-w-5xl px-4">
                <img
                    className="w-full h-100 object-cover"
                    src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
                    alt={movieDetails.title}
                />
                <div className="p-4 bg-gray-800 rounded-lg shadow-lg mt-4">
            <h2 className="text-white text-2xl font-semibold mb-4">Detalles de la Película</h2>
            <p className="text-gray-400 mb-2">
                <strong className="text-white">Sinopsis: </strong>{movieDetails.overview}
            </p>
            <p className="text-gray-400 mb-2">
                <strong className="text-white">Género: </strong>
                {movieDetails.genres && movieDetails.genres.map((genre) => genre.name).join(', ')}
            </p>
                </div>
                <div className="p-4">
                    <h2 className="text-white text-xl font-semibold">Actores</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {actors.map((actor) => (
                            <div key={actor.cast_id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden p-2">
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

