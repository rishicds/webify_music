// app/page.tsx
"use client";


import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase"; // Make sure this import points correctly to your firebase config
import { VelocityHero } from "@/components/Landing/Hero";
import MusicFeatures from "@/components/Landing/Features";
import NeubrutalistMusicCards from "@/components/Landing/MusicCards";
import NeubrutalistFavouriteArtists from "@/components/Landing/FavouriteArtists";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/Common/Account";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Redirect to home after login if you are not already there
        router.push("/");
      } else {
        // Optionally redirect to login if not logged in
        router.push("/login");
      }
    });
    return () => unsubscribe(); // Cleanup subscription
  }, [router]);

  // If the user is not logged in, we can return null or a loading state
  if (user === null) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <VelocityHero />
      <MusicPlayer />
      <MusicFeatures />
      <NeubrutalistMusicCards />
      <NeubrutalistFavouriteArtists />
      
      <LogoutButton user={user} /> {/* Include the LogoutButton here */}
    </div>
  );
}
