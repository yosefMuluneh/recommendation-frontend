"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import MovieCard from "@/components/MovieCard";
import MovieDetails from "@/components/MovieDetails";

interface Movie {
  id: number;
  title: string;
  genres: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      fetchMovies();
    }
  }, [user, loading, router]);

  const fetchMovies = async () => {
    const userId = user?.uid;
    const [recsRes, popRes, topRes] = await Promise.all([
      fetch(`http://localhost:5000/api/movies/recommendations?user_id=${userId}`),
      fetch("http://localhost:5000/api/movies/popular"),
      fetch("http://localhost:5000/api/movies/top-rated"),
    ]);
    const recsData = await recsRes.json();
    setRecommendations(recsData.recommendations || recsData);
    setPopular(await popRes.json());
    setTopRated(await topRes.json());
    console.log("recomm, popular, top movies====",recsData, popular, topRated)
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="p-4 md:p-8 space-y-8">
      <h1 className="text-2xl md:text-3xl mb-4">Welcome, {user?.email}</h1>

      <section>
        <h2 className="text-xl mb-2">Recommended for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recommendations.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl mb-2">Popular Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {popular.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl mb-2">Top-Rated Movies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {topRated.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={() => setSelectedMovie(movie)} />
          ))}
        </div>
      </section>

      <Button onClick={handleLogout} variant="outline">Logout</Button>

      {selectedMovie && (
        <MovieDetails movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}