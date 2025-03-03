import { Card, CardContent } from "@/components/ui/card";
import Image from 'next/image'

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <Card className="cursor-pointer" onClick={onClick}>
      <CardContent className="p-2">
        <Image
          src={movie.poster_path || "https://via.placeholder.com/300x450"}
          alt={movie.title}
          width={20}
          height={30}
        />
        
        <p className="text-center mt-2">{movie.title}</p>
      </CardContent>
    </Card>
  );
}