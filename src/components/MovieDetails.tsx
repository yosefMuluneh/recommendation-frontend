import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image'

interface Movie {
  id: number;
  title: string;
  genres: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieDetails({ movie, onClose }: MovieDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{movie.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <Image
                src={movie.poster_path || "https://via.placeholder.com/300x450"}
                alt={movie.title}
                width={45}
                height={40}
                className="w-full h-64 object-cover rounded"
            />
          
          <p><strong>Genres:</strong> {movie.genres}</p>
          <p><strong>Rating:</strong> {movie.vote_average}/10</p>
          <p><strong>Release Year:</strong> {movie.release_date.split("-")[0]}</p>
          <p><strong>Description:</strong> {movie.overview}</p>
          <Button onClick={onClose} variant="outline">Close</Button>
        </CardContent>
      </Card>
    </div>
  );
}