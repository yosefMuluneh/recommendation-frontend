"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../hooks/useAuth';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard'); // Redirect to dashboard if logged in
      } else {
        router.push('/login'); // Redirect to login if not logged in
      }
    }
  }, [user, loading, router]);

  if (loading) return <div>Loading...</div>;
  return null; // This page won’t render content
}