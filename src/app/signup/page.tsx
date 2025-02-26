"use client";

import SignupForm from "@/components/SignupForm";
import MovieImages from "@/components/MovieImages";

export default function SignupPage() {
  return (
    <div className="flex h-screen w-full">
      {/* Mobile: Form only, centered */}
      <div className="flex items-center justify-center w-full h-full md:w-1/2 p-4">
        <SignupForm />
      </div>
      {/* Desktop: Movie images on the right */}
      <div className="hidden md:flex md:w-1/2 bg-gray-200 dark:bg-gray-800 items-center justify-center p-4">
        <MovieImages />
      </div>
    </div>
  );
}