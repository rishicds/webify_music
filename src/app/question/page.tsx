"use client"
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMusic, FiHeart, FiX } from "react-icons/fi";
import { CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import { useRouter } from 'next/navigation';

interface Genre {
  name: string;
  color: string;
}

interface Artist {
  name: string;
  genre: string;
  src: string;
}

interface Song {
  title: string;
  artist: string;
  genre: string;
}

const genres: Genre[] = [
  { name: "Pop", color: "bg-pink-300" },
  { name: "Rock", color: "bg-red-300" },
  { name: "Hip-Hop", color: "bg-purple-300" },
  { name: "Electronic", color: "bg-blue-300" },
  { name: "Country", color: "bg-yellow-300" },
  { name: "R&B", color: "bg-green-300" },
];

const artists: Artist[] = [
  {
    name: "Taylor Swift",
    genre: "Pop",
    src: "https://charts-static.billboard.com/img/2006/12/taylor-swift-9sy-artistchart-ko8-344x344.jpg",
  },
  {
    name: "Imagine Dragons",
    genre: "Rock",
    src: "https://charts-static.billboard.com/img/2012/08/imagine-dragons-nxo-344x344.jpg",
  },
  {
    name: "Drake",
    genre: "Hip-Hop",
    src: "https://charts-static.billboard.com/img/2009/04/drake-p3d-344x344.jpg",
  },
  {
    name: "Calvin Harris",
    genre: "Electronic",
    src: "https://charts-static.billboard.com/img/2007/03/calvin-harris-s8s-344x344.jpg",
  },
];

const songs: Song[] = [
  { title: "Shake It Off", artist: "Taylor Swift", genre: "Pop" },
  { title: "Radioactive", artist: "Imagine Dragons", genre: "Rock" },
  { title: "God's Plan", artist: "Drake", genre: "Hip-Hop" },
  { title: "This Is What You Came For", artist: "Calvin Harris", genre: "Electronic" },
];

export default function MusixOnboarding() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const toggleArtist = (artist: string) => {
    setSelectedArtists(prev =>
      prev.includes(artist) ? prev.filter(a => a !== artist) : [...prev, artist]
    );
  };

  const recommendedSongs = songs.filter(song =>
    selectedGenres.includes(song.genre) || selectedArtists.includes(song.artist)
  );

  const handleFinish = () => {
    if (selectedGenres.length > 0 || selectedArtists.length > 0) {
      setShowPopup(true);
    }
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup, router]);

  return (
    <div className="min-h-screen bg-orange-200 p-8 relative">
      <h1 className="text-6xl font-extrabold text-black mb-12">Welcome to Musix</h1>
      
      <section className="mb-12">
        <h2 className="text-4xl font-bold text-black mb-6">Select Your Favorite Genres</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {genres.map((genre) => (
            <motion.button
              key={genre.name}
              onClick={() => toggleGenre(genre.name)}
              className={`${genre.color} border-4 border-black shadow-[4px_4px_0_0_#000] rounded-xl p-4 text-xl font-bold ${
                selectedGenres.includes(genre.name) ? "ring-4 ring-blue-500" : ""
              }`}
              whileHover={{ y: -5 }}
              whileTap={{ y: 0 }}
            >
              {genre.name}
            </motion.button>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-4xl font-bold text-black mb-6">Choose Your Favorite Artists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {artists.map((artist) => (
            <motion.div
              key={artist.name}
              onClick={() => toggleArtist(artist.name)}
              className={`bg-white border-8 border-black shadow-[8px_8px_0_0_#000] rounded-3xl cursor-pointer overflow-hidden ${
                selectedArtists.includes(artist.name) ? "ring-4 ring-blue-500" : ""
              }`}
              whileHover={{ y: -5 }}
              whileTap={{ y: 0 }}
            >
              <div className="relative">
                <Image
                  width={344}
                  height={344}
                  src={artist.src}
                  alt={artist.name}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                  <h3 className="font-bold text-2xl text-white mb-1">{artist.name}</h3>
                  <p className="text-lg text-white">{artist.genre}</p>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center">
                <FiMusic size={24} />
                <button className="bg-black text-white p-2 rounded-full">
                  <FiHeart size={24} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {recommendedSongs.length > 0 && (
        <section className="mb-12">
          <h2 className="text-4xl font-bold text-black mb-6">Recommended Songs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedSongs.map((song) => (
              <motion.div
                key={song.title}
                className="bg-yellow-300 border-4 border-black shadow-[4px_4px_0_0_#000] rounded-xl p-4"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-2xl font-bold mb-2">{song.title}</h3>
                <p className="text-lg">{song.artist}</p>
                <p className="text-md text-gray-700">{song.genre}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

<motion.button
  onClick={handleFinish}
  className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-400 text-white text-2xl font-bold py-4 px-8 border-4 border-white shadow-[4px_4px_0_0_#fff] rounded-xl"
  whileHover={{ y: -5 }}
  whileTap={{ y: 0 }}
>
        Finish Setup
      </motion.button>

      

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <div className="bg-white border-8 text-black border-black shadow-[8px_8px_0_0_#000] rounded-3xl p-8 max-w-md w-full">
              <h2 className="text-3xl font-bold mb-4">🎉 Setup Complete!</h2>
              <p className="text-xl mb-4">We've customized your music experience based on your taste. Enjoy your personalized Musix journey!</p>
              <p className="text-lg">Redirecting to homepage...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}