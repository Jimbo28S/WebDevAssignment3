'use client'
import { useEffect, useState } from 'react';

const deleteMovie = async (id) => {
  const response = await fetch('/api/movies/route', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });

  if (response.ok) {
    alert('Movie deleted!');
    window.location.reload();
  } else {
    alert('Error deleting movie');
  }
};

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('/api/movies/route')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data); 
        setMovies(data);
      })
      .catch((error) => console.error('Error fetching movies:', error));
  }, []);
 
  return (
    <div className="flex flex-col bg-white w-full h-fit">
        <h2 className="text-black flex justify-center bg-green-600 mb-4">Movies</h2>
        <div className="flex justify-center">
            <ul>
                {movies.map((movie) => (
                    <li key={movie._id} className="mb-7 bg-blue-300 border-3 text-black w-60">
                        <p>Title: {movie.movie_title}</p>
                        <p>Release Year: {movie.release_year}</p>
                        <p>Actors: {movie.actor_list && (
                                movie.actor_list.map((actor, index) => (
                                    <span key={actor}>
                                        <br />
                                        {actor}
                                        {index < movie.actor_list.length - 1 && ', '}
                                    </span>
                                ))
                            )}
                        </p>
                        <button onClick={() => deleteMovie(movie.id)} className="bg-red-500 border-2 w-5 h-5 ml-50">X</button>
                    </li>
                ))}
            </ul>
        </div>
    </div> 
  )
}

export default MovieList;