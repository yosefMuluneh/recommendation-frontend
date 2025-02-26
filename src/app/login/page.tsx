"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import LoginForm from "@/components/LoginForm";
import MovieImages from "@/components/MovieImages";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (user) return null;

  return (
    <div className="flex h-screen w-full">
      {/* Mobile: Form only, centered */}
      <div className="flex items-center justify-center w-full h-full md:w-1/2 p-4">
        <LoginForm />
      </div>
      {/* Desktop: Movie images on the right */}
      <div className="hidden md:flex md:w-1/2 bg-gray-200 dark:bg-gray-800 items-center justify-center p-4">
        <MovieImages />
      </div>
    </div>
  );
}