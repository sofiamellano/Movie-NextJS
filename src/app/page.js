"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from 'react';

// Configuración del slider
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
};

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjEzMDU1N2Y0N2VlZTEwYWUyMTI5Y2UwOTk2NTU2YyIsIm5iZiI6MTcyNDk3NTIyMy40MzQzODEsInN1YiI6IjY2ZDEwNzUzMTMyMzFhNjU4MjAxOWFjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ILyxow2tgTqjEpdJDjvrmvlGyXQmFX-fP8f00Mo_dY',
        },
      };

      try {
        const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=es-MX&page=1', options);
        const { results } = await response.json();
        setMovies(results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Películas en Cartelera</h2>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title}/>
            <h3 className=" border-black">{movie.title}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}



// };
