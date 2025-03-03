"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    }
  }, [user, loading, router]);

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  return null;
}