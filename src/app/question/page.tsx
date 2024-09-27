"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiMusic, FiHeart } from "react-icons/fi";
import { useRouter } from 'next/navigation';
const genres = [
  { name: "Pop", color: "bg-pink-300" },
  { name: "Rock", color: "bg-red-300" },
  { name: "Hip-Hop", color: "bg-purple-300" },
  { name: "Electronic", color: "bg-blue-300" },
  { name: "Country", color: "bg-yellow-300" },
  { name: "R&B", color: "bg-green-300" },
  { name: "Jazz", color: "bg-indigo-300" },
  { name: "Classical", color: "bg-gray-300" },
  { name: "Romance", color: "bg-red-400" },
  { name: "English", color: "bg-teal-300" },
  { name: "Hindi", color: "bg-orange-300" },
  { name: "Bengali", color: "bg-lime-300" },
];

const artists = [
  {
    name: "Taylor Swift",
    genre: "Pop",
    src: "https://charts-static.billboard.com/img/2006/12/taylor-swift-9sy-artistchart-ko8-344x344.jpg",
  },
  {
    name: "Imagine Dragons",
    genre: "Rock",
    src: "https://www.billboard.com/wp-content/uploads/media/06-Imagine-Dragons-2017-cr-Eliot-Lee-Hazel-1548.jpg?w=1024",
  },
  {
    name: "Drake",
    genre: "Hip-Hop",
    src: "https://charts-static.billboard.com/img/2009/04/drake-p3d-344x344.jpg",
  },
  {
    name: "Calvin Harris",
    genre: "Electronic",
    src: "https://www.billboard.com/wp-content/uploads/media/calvin-harris-blue-2017-billboard-1548.jpg?w=1024",
  },
  {
    name: "Shania Twain",
    genre: "Country",
    src: "https://celebmafia.com/wp-content/uploads/2018/05/shania-twain-performs-on-nbc-s-today-show-concert-series-in-nyc-8.jpg",
  },
  {
    name: "Adele",
    genre: "R&B",
    src: "https://www.billboard.com/wp-content/uploads/2021/11/03-adele-press-2021-cr-simon-emmett-billboard-1548.jpg?w=1024",
  },
  {
    name: "Ludwig van Beethoven",
    genre: "Classical",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Beethoven.jpg",
  },
  {
    name: "A.R. Rahman",
    genre: "Hindi",
    src: "https://thepersonage.com/wp-content/uploads/2020/07/A-R-Rahman-Images.jpg",
  },
  {
    name: "Arijit Singh",
    genre: "Hindi",
    src: "https://th.bing.com/th/id/OIP.MCTw58Mb_IfovrknvdlCaQHaHa?w=900&h=900&rs=1&pid=ImgDetMain",
  },
  {
    name: "Shreya Ghoshal",
    genre: "Hindi",
    src: "https://rollingstoneindia.com/wp-content/uploads/2020/08/Shreya-Ghoshal-960x852.jpg",
  },
  {
    name: "Anupam Roy",
    genre: "Bengali",
    src: "https://assets.telegraphindia.com/telegraph/2021/Sep/1631127453_anupam-roy.jpg",
  },
  {
    name: "Rupam Islam",
    genre: "Bengali",
    src: "https://im.whatshot.in/img/2018/Jun/rupam-islam-cropped1-1528884433.jpg?wm=1&w=1200&h=630&cc=1",
  },
  {
    name: "Kishore Kumar",
    genre: "Hindi",
    src: "https://images.assettype.com/freepressjournal%2Fimport%2F2018%2F08%2FKishore-Kumar-picture.jpg?w=1200&auto=format%2Ccompress&ogImage=true",
  },
  {
    name: "Coldplay",
    genre: "Pop",
    src: "https://whatson.ae/wp-content/uploads/2022/02/coldplay-fb.jpg",
  }
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

  const handleFinish = () => {
    if (selectedGenres.length > 0 && selectedArtists.length > 0) {
      setShowPopup(true);
    }
  };

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 3000);
      return () => clearTimeout(timer); // Clear timeout on unmount
    }
  }, [showPopup, router]);

  return (
    <div className="min-h-screen bg-orange-200 p-8 relative">
      <h1 className="text-6xl font-extrabold text-black mb-12">Welcome to Musix</h1>
      
      {/* Genre Section */}
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

      {/* Artist Section */}
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

      {/* Finish Setup Button */}
      {selectedGenres.length > 0 && selectedArtists.length > 0 && (
        <motion.button
          onClick={handleFinish}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-400 text-white text-2xl font-bold py-4 px-8 border-4 border-white shadow-[4px_4px_0_0_#fff] rounded-xl"
          whileHover={{ y: -5 }}
          whileTap={{ y: 0 }}
        >
          Finish Setup
        </motion.button>
      )}

      {/* Popup Animation */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            key="popup"
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
