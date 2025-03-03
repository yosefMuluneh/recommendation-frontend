"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Onboarding() {
  const { user } = useAuth();
  const router = useRouter();
  const [genres, setGenres] = useState<string[]>([]);
  const [genreOptions, setGenreOptions] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch("http://localhost:5000/api/movies/genres");
      const data = await res.json();
      setGenreOptions(data);
    };
    fetchGenres();
  }, []);

  const toggleGenre = (genreId: string) => {
    setGenres((prev) =>
      prev.includes(genreId) ? prev.filter((g) => g !== genreId) : [...prev, genreId]
    );
  };

  const savePreferences = async () => {
    if (!user) return;
    await fetch("http://localhost:5000/api/preferences", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.uid, genres }),
    });
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>What movies do you like?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Select your favorite genres:</p>
          <div className="flex flex-wrap gap-2">
            {genreOptions.map((genre) => (
              <Button
                key={genre.id}
                onClick={() => toggleGenre(String(genre.id))}
                variant={genres.includes(String(genre.id)) ? "default" : "outline"}
              >
                {genre.name}
              </Button>
            ))}
          </div>
          <Button onClick={savePreferences} disabled={genres.length === 0} className="w-full">
            Save and Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}