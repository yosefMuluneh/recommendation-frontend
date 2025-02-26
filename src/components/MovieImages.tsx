"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

export default function MovieImages() {
  const [moviePosters, setMoviePosters] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const posters = data.results.slice(0, 5).map((movie: any) =>
          `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        );
        setMoviePosters(posters);
      } catch (error) {
        console.error("Failed to fetch movie posters:", error);
        setMoviePosters([
          "https://via.placeholder.com/300x450?text=Movie+1",
          "https://via.placeholder.com/300x450?text=Movie+2",
          "https://via.placeholder.com/300x450?text=Movie+3",
          "https://via.placeholder.com/300x450?text=Movie+4",
        ]);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (moviePosters.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % moviePosters.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [moviePosters]);

  if (moviePosters.length === 0) return <div>Loading posters...</div>;

  return (
    <div className="hidden md:block relative w-full h-full py-32">
      {moviePosters.map((src, index) => (
        <motion.img
          key={index}
          src={src}
          alt={`Movie Poster ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentImage ? 1 : 0 }}
          transition={{ duration: 1 }}
        />
      ))}
    </div>
  );
}