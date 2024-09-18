import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { FiX, FiMusic, FiHeart } from "react-icons/fi";

interface Artist {
  name: string;
  genre: string;
  src: string;
  color: string;
  bio: string;
}

export function NeubrutalistFavouriteArtists() {
  const [active, setActive] = useState<Artist | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="bg-orange-300 min-h-screen p-8">
      <h2 className="text-6xl pb-12 font-extrabold text-left text-black uppercase">Your Favourite Artists</h2>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-green-400 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 items-center justify-center bg-red-500 rounded-full h-12 w-12 border-4 border-black shadow-[4px_4px_0_0_#000]"
              onClick={() => setActive(null)}
            >
              <FiX size={24} />
            </motion.button>
            <motion.div
              layoutId={`artist-${active.name}-${id}`}
              ref={ref}
              className={`w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col ${active.color} border-8 border-black shadow-[8px_8px_0_0_#000] sm:rounded-3xl overflow-hidden`}
            >
              <motion.div layoutId={`image-${active.name}-${id}`}>
                <Image
                  priority
                  width={500}
                  height={500}
                  src={active.src}
                  alt={active.name}
                  className="w-full h-80 object-cover object-top"
                />
              </motion.div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <motion.h3
                      layoutId={`name-${active.name}-${id}`}
                      className="font-bold text-3xl mb-2"
                    >
                      {active.name}
                    </motion.h3>
                    <motion.p
                      layoutId={`genre-${active.genre}-${id}`}
                      className="text-xl"
                    >
                      {active.genre}
                    </motion.p>
                  </div>

                  <motion.button
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-6 py-3 text-xl font-bold bg-black text-white border-4 border-black shadow-[4px_4px_0_0_#000] hover:translate-y-1 hover:shadow-[2px_2px_0_0_#000] transition-all"
                  >
                    Follow
                  </motion.button>
                </div>
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-lg h-48 overflow-auto pr-4"
                >
                  <p>{active.bio}</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ul className="max-w-6xl mx-auto w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {artists.map((artist) => (
          <motion.li
            layoutId={`artist-${artist.name}-${id}`}
            key={artist.name}
            onClick={() => setActive(artist)}
            className={`${artist.color} border-8 border-black shadow-[8px_8px_0_0_#000] rounded-3xl cursor-pointer hover:translate-y-1 hover:shadow-[4px_4px_0_0_#000] transition-all overflow-hidden`}
          >
            <motion.div layoutId={`image-${artist.name}-${id}`} className="relative">
              <Image
                width={400}
                height={400}
                src={artist.src}
                alt={artist.name}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                <motion.h3
                  layoutId={`name-${artist.name}-${id}`}
                  className="font-bold text-2xl text-white mb-1"
                >
                  {artist.name}
                </motion.h3>
                <motion.p
                  layoutId={`genre-${artist.genre}-${id}`}
                  className="text-lg text-white"
                >
                  {artist.genre}
                </motion.p>
              </div>
            </motion.div>
            <div className="p-4 flex justify-between items-center">
              <FiMusic size={24} />
              <button className="bg-black text-white p-2 rounded-full">
                <FiHeart size={24} />
              </button>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

const artists: Artist[] = [
    {
      name: "Sabrina",
      genre: "Pop / R&B",
      src: "https://charts-static.billboard.com/img/2014/08/sabrina-carpenter-3b3-artistchart-6e0-344x344.jpg",
      color: "bg-yellow-300",
      bio: "Sabrina Carpenter is an American singer and actress. She gained recognition with her role on Disney Channel's 'Girl Meets World' and later transitioned into music, with popular songs in the pop and R&B genres."
    },
    {
      name: "Taylor Swift",
      genre: "Pop / Folk",
      src: "https://charts-static.billboard.com/img/2006/12/taylor-swift-9sy-artistchart-ko8-344x344.jpg",
      color: "bg-blue-300",
      bio: "Taylor Swift is an American singer-songwriter known for her narrative songwriting and versatility. She has won numerous awards and is one of the best-selling music artists of all time."
    },
    {
      name: "Post Malone",
      genre: "Pop / Country",
      src: "https://charts-static.billboard.com/img/2015/10/post-malone-uhe-artistchart-d5b-344x344.jpg",
      color: "bg-red-300",
      bio: "Post Malone is an American rapper, singer, and songwriter. He is known for his blend of hip-hop, pop, and country influences, and has achieved significant commercial success with hits like 'Circles' and 'Rockstar.'"
    },
    {
      name: "Billie Eilish",
      genre: "Hip-Hop / R&B",
      src: "https://charts-static.billboard.com/img/2017/05/billie-eilish-lrt-artist-chart-1ek-344x344.jpg",
      color: "bg-purple-300",
      bio: "Billie Eilish is an American singer-songwriter who gained fame with her debut single 'Ocean Eyes.' Known for her distinctive style and vocal delivery, Eilish has become a major figure in contemporary pop music."
    },
    {
      name: "Linkin Park",
      genre: "Soul / Pop",
      src: "https://charts-static.billboard.com/img/2007/12/linkin-park-ohp-artistchart-ufc-344x344.jpg",
      color: "bg-green-300",
      bio: "Linkin Park is an American rock band known for their nu-metal sound. They achieved international success with albums like 'Hybrid Theory' and 'Meteora,' blending rock, hip-hop, and electronic elements."
    },
    {
      name: "Ed Sheeran",
      genre: "Pop / R&B / Funk",
      src: "https://charts-static.billboard.com/img/2012/11/ed-sheeran-w3r-artist-chart-1li-344x344.jpg",
      color: "bg-pink-300",
      bio: "Ed Sheeran is an English singer-songwriter known for his heartfelt lyrics and acoustic style. His albums, such as 'Divide' and 'Plus,' have made him one of the best-selling music artists worldwide."
    },
    {
      name: "Olivia Rodrigo",
      genre: "Pop / Alternative",
      src: "https://charts-static.billboard.com/img/2020/01/olivia-rodrigo-3wl-artist-chart-9ct-344x344.jpg",
      color: "bg-indigo-300",
      bio: "Olivia Rodrigo is an American singer-songwriter and actress. She gained fame with her debut single 'drivers license' and has since become known for her emotive and relatable music in the pop and alternative genres."
    },
    {
      name: "Michael Jackson",
      genre: "R&B / Pop",
      src: "https://charts-static.billboard.com/img/1971/10/michael-jackson-9to-344x344.jpg",
      color: "bg-orange-300",
      bio: "Michael Jackson, known as the 'King of Pop,' was an American singer, songwriter, and dancer. His contributions to music, dance, and fashion, along with his publicized personal life, made him a global figure in popular culture."
    }
  ];  

export default NeubrutalistFavouriteArtists;