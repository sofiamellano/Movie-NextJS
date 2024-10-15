import CarrucelMoviesUpcoming from "./CarrucelMoviesUpcoming/page";
import CarrucelMoviesPopular from "./CarrucelMoviePopular/page";
import CarrucelSeriesPopular from "./CarrucelSeriesPopular/page";

export default function Home() {
  
  return (
    <div>
      <section>
        <CarrucelMoviesUpcoming />
      </section>
        <CarrucelMoviesPopular />
        <CarrucelSeriesPopular />
    </div>
  )
}


