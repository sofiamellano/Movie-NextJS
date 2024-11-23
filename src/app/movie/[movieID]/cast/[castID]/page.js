"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function CastDetails() {
    const { castID } = useParams();
    const [actorDetails, setActorDetails] = useState(null);
    const [moviesActor, setMoviesActor] = useState([]);

    useEffect(() => {
        if (castID) {
      // Fetch detalles del actor
        const fetchActorDetails = async () => {
            const options = {
                method: "GET",
                headers: {
                accept: "application/json",
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjEzMDU1N2Y0N2VlZTEwYWUyMTI5Y2UwOTk2NTU2YyIsIm5iZiI6MTcyNDk3NTIyMy40MzQzODEsInN1YiI6IjY2ZDEwNzUzMTMyMzFhNjU4MjAxOWFjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ILyxow2tgTqjEpdJDjvrmvlGyXQmFX-fP8f00Mo_dY', 
            },
        };

        const response = await fetch(
            `https://api.themoviedb.org/3/person/${castID}?language=es-MX`,
            options
        );
        const data = await response.json();
        setActorDetails(data);
        };

      // Fetch películas relacionadas con el actor
        const fetchMoviesActor = async () => {
        const options = {
            method: "GET",
            headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjEzMDU1N2Y0N2VlZTEwYWUyMTI5Y2UwOTk2NTU2YyIsIm5iZiI6MTcyNDk3NTIyMy40MzQzODEsInN1YiI6IjY2ZDEwNzUzMTMyMzFhNjU4MjAxOWFjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ILyxow2tgTqjEpdJDjvrmvlGyXQmFX-fP8f00Mo_dY",
            },
        };

        const response = await fetch(
            `https://api.themoviedb.org/3/person/${castID}/movie_credits`,
            options
        );
        const data = await response.json();
        setMoviesActor(data.cast);
        };

        fetchActorDetails();
        fetchMoviesActor();
    }
    }, [castID]);

    if (!actorDetails) {
        return <div className="text-white">Cargando datos...</div>;
    }

    return (
        <div className="bg-gray-900 min-h-screen flex flex-col items-center py-8">
            <h1 className="text-white text-3xl font-bold mb-8">{actorDetails.name}</h1>
                <div className="w-full max-w-5xl px-4">
            <img
            className="w-full h-100 object-cover rounded-lg"
            src={
            actorDetails.profile_path
                ? `https://image.tmdb.org/t/p/original${actorDetails.profile_path}`
                : "/fallback-image.jpg"
            }
            alt={actorDetails.name}
        />
        <div className="p-4 bg-gray-800 rounded-lg shadow-lg mt-4">
            <h2 className="text-white text-2xl font-semibold mb-4">Biografía</h2>
            <p className="text-gray-400 mb-2">
            {actorDetails.biography || "Información no disponible"}
            </p>
            <p className="text-gray-400 mb-2">
            <strong className="text-white">Fecha de Nacimiento: </strong>
            {actorDetails.birthday || "No especificada"}
            </p>
            <p className="text-gray-400 mb-2">
            <strong className="text-white">Lugar de Nacimiento: </strong>
            {actorDetails.place_of_birth || "No especificado"}
            </p>
        </div>
        <div className="p-4">
            <h2 className="text-white text-xl font-semibold">Películas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {moviesActor.map((movie) => (
                <div
                key={movie.id}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden p-2"
                >
                <img
                    className="w-full h-48 object-cover"
                    src={
                    movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "/fallback-image.jpg"
                    }
                    alt={movie.title}
                />
                <div className="p-2 text-center">
                    <h3 className="text-white text-lg font-semibold">
                    {movie.title}
                    </h3>
                    <p className="text-gray-400">{movie.character || ""}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    </div>
    );
}
