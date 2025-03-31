import MovieList from "@/components/movieList";
import AddMovie from "@/components/addMovie";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <div className="bg-white">
        <MovieList />
        <AddMovie />
      </div>
    </div>
  );
}
