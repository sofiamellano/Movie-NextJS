import CarrucelMovies from "./CarrucelMovies/page";
import CarrucelMoviesPopular from "./CarrucelPopular/page";
import CarrucelMovieTopRated from "./CarrucelToprated/page";

export default function Home() {
  
  return (
    <div>
      <section>
        <CarrucelMovies />
      </section>
        <CarrucelMoviesPopular />
        <CarrucelMovieTopRated />
    </div>
  )
}


