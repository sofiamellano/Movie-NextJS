"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function CastSeriesDetails() {
    const { castserieID } = useParams();
    const [actorSeriesDetails, setActorSeriesDetails] = useState(null);
    const [seriesActor, setSeriesActor] = useState([]);

    useEffect(() => {
        if (castserieID) {
            // Fetch detalles del actor
            const fetchActorSeriesDetails = async () => {
                const options = {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjEzMDU1N2Y0N2VlZTEwYWUyMTI5Y2UwOTk2NTU2YyIsIm5iZiI6MTcyNDk3NTIyMy40MzQzODEsInN1YiI6IjY2ZDEwNzUzMTMyMzFhNjU4MjAxOWFjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ILyxow2tgTqjEpdJDjvrmvlGyXQmFX-fP8f00Mo_dY",
                    },
                };

                const response = await fetch(
                    `https://api.themoviedb.org/3/person/${castserieID}?language=es-MX`,
                    options
                );
                const data = await response.json();
                setActorSeriesDetails(data);
            };

            // Fetch series relacionadas con el actor
            const fetchSeriesActor = async () => {
                const options = {
                    method: "GET",
                    headers: {
                        accept: "application/json",
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjEzMDU1N2Y0N2VlZTEwYWUyMTI5Y2UwOTk2NTU2YyIsIm5iZiI6MTcyNDk3NTIyMy40MzQzODEsInN1YiI6IjY2ZDEwNzUzMTMyMzFhNjU4MjAxOWFjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ILyxow2tgTqjEpdJDjvrmvlGyXQmFX-fP8f00Mo_dY",
                    },
                };

                const response = await fetch(
                    `https://api.themoviedb.org/3/person/${castserieID}/tv_credits?language=es-MX`,
                    options
                );
                const data = await response.json();
                setSeriesActor(data.cast);
            };

            fetchActorSeriesDetails();
            fetchSeriesActor();
        }
    }, [castserieID]);

    if (!actorSeriesDetails) {
        return <div className="text-white">Cargando datos...</div>;
    }

    return (
        <div className="bg-gray-900 min-h-screen flex flex-col items-center py-8">
            <h1 className="text-white text-3xl font-bold mb-8">{actorSeriesDetails.name}</h1>
            <div className="w-full max-w-5xl px-4">
                <img
                    className="w-full h-100 object-cover rounded-lg"
                    src={
                        actorSeriesDetails.profile_path
                            ? `https://image.tmdb.org/t/p/original${actorSeriesDetails.profile_path}`
                            : "/fallback-image.jpg"
                    }
                    alt={actorSeriesDetails.name}
                />
                <div className="p-4 bg-gray-800 rounded-lg shadow-lg mt-4">
                    <h2 className="text-white text-2xl font-semibold mb-4">Biografía</h2>
                    <p className="text-gray-400 mb-2">
                        {actorSeriesDetails.biography || "Información no disponible"}
                    </p>
                    <p className="text-gray-400 mb-2">
                        <strong className="text-white">Fecha de Nacimiento: </strong>
                        {actorSeriesDetails.birthday || "No especificada"}
                    </p>
                    <p className="text-gray-400 mb-2">
                        <strong className="text-white">Lugar de Nacimiento: </strong>
                        {actorSeriesDetails.place_of_birth || "No especificado"}
                    </p>
                </div>
                <div className="p-4">
                    <h2 className="text-white text-xl font-semibold">Series</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {seriesActor.map((serie) => (
                            <div
                                key={serie.id}
                                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden p-2"
                            >
                                <img
                                    className="w-full h-48 object-cover"
                                    src={
                                        serie.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
                                            : "/fallback-image.jpg"
                                    }
                                    alt={serie.name}
                                />
                                <div className="p-2 text-center">
                                    <h3 className="text-white text-lg font-semibold">
                                        {serie.name}
                                    </h3>
                                    <p className="text-gray-400">{serie.character || ""}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
