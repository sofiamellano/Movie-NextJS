"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from 'react';

export default function CarrucelMoviePopular() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
    };

    const [moviesPopular, setMoviesPopular] = useState([]);

    useEffect(() => {
        const fetchMoviesPopular = async () => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjEzMDU1N2Y0N2VlZTEwYWUyMTI5Y2UwOTk2NTU2YyIsIm5iZiI6MTcyNDk3NTIyMy40MzQzODEsInN1YiI6IjY2ZDEwNzUzMTMyMzFhNjU4MjAxOWFjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ILyxow2tgTqjEpdJDjvrmvlGyXQmFX-fP8f00Mo_dY',
                },
            };

            const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=es-MX&page=1', options);
            const { results } = await response.json();
            setMoviesPopular(results);
        };

        fetchMoviesPopular();
    }, []);

    return (
        <div className="bg-gray-900 min-h-screen flex flex-col items-center py-8">
            <h2 className="text-white text-3xl font-bold mb-8">Películas Populares</h2>
            <div className="w-full max-w-5xl px-4">
                <Slider {...settings}>
                    {moviesPopular.map((movie) => (
                        <div key={movie.id} className="px-2">
                            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition duration-300 ease-in-out">
                                <img
                                    className="w-full h-80 object-cover"
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <div className="p-4">
                                    <h3 className="text-white text-xl font-semibold">{movie.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

