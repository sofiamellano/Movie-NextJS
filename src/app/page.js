import Movie from "./movie/page";

export default async function Home() {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZjEzMDU1N2Y0N2VlZTEwYWUyMTI5Y2UwOTk2NTU2YyIsIm5iZiI6MTcyNDk3NTIyMy40MzQzODEsInN1YiI6IjY2ZDEwNzUzMTMyMzFhNjU4MjAxOWFjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4ILyxow2tgTqjEpdJDjvrmvlGyXQmFX-fP8f00Mo_dY'
    }
  };
  
  const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=es-MX&page=1', options)
  const {results} = await response.json();

  return (
    <ul>
      {
        results.map((movie) => (
          <li key={Movie.id}>{movie.title}</li>  //jugar con el map
        ))
      }
    </ul>
  );
}

