"use client"
import { useState } from 'react';

const MovieForm = () => {
  const [formData, setFormData] = useState({
    movie_title: '',
    release_year: '',
    actor_list: '',
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/movies/route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('Movie added!');
      setFormData({ movie_title: '', release_year: '', actor_list: '' });
      window.location.reload();
    } else {
      alert('Error adding movie');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-50">
      <label htmlFor="movieTitle" className="text-black">Movie Title</label>
      <input className="border-1 border-black text-black" type="text" name="movieTitle" placeholder="Movie Title" value={formData.movie_title} onChange={(e) => setFormData({ ...formData, movie_title: e.target.value })}/>
      
      <label htmlFor="releaseYear" className="text-black">Release Year</label>
      <input className="border-1 border-black text-black"  type="number" name="releaseYear" placeholder="Release Year" value={formData.release_year} onChange={(e) => setFormData({ ...formData, release_year: e.target.value })}/>
      
      <label htmlFor="actors" className="text-black">Actors</label>
      <input className="border-1 border-black text-black" type="text" name="actors" placeholder="Actors" value={formData.actor_list} onChange={(e) => setFormData({ ...formData, actor_list: e.target.value })}/>
      
      <button className="border-1 border-black bg-blue-300" type="submit">Add Movie</button>
    </form>
  );
};

export default MovieForm;
