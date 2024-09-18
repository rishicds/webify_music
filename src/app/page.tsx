"use client"
import { VelocityHero } from "@/components/Hero";
import MusicFeatures from "@/components/Features";
import NeubrutalistMusicCards from "@/components/MusicCards";
import NeubrutalistFavouriteArtists from "@/components/FavouriteArtists";
import MusicPlayer from "@/components/MusicPlayer";


export default function Home() {
  return (
   <><VelocityHero/>
   <MusicFeatures/>
   <NeubrutalistMusicCards/>
   <NeubrutalistFavouriteArtists/>
   <MusicPlayer/>
   </>
  );
}
