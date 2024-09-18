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
    bio: "Beyoncé is an American singer, songwriter, record producer, and actress. Born and raised in Houston, Texas, she performed in various singing and dancing competitions as a child and rose to fame in the late 1990s as lead singer of R&B girl-group Destiny's Child. She is one of the world's best-selling recording artists, having sold over 160 million records worldwide."
  },
  {
    name: "Taylor Swift",
    genre: "Pop / Folk",
    src: "https://charts-static.billboard.com/img/2006/12/taylor-swift-9sy-artistchart-ko8-344x344.jpg",
    color: "bg-blue-300",
    bio: "Ed Sheeran is an English singer-songwriter. He has sold more than 150 million records worldwide, making him one of the world's best-selling music artists. He has 84.5 million RIAA-certified units in the US, and two of his albums are in the list of the best-selling albums in UK chart history."
  },
  {
    name: "Post Malone",
    genre: "Pop / Country",
    src: "https://charts-static.billboard.com/img/2015/10/post-malone-uhe-artistchart-d5b-344x344.jpg",
    color: "bg-red-300",
    bio: "Taylor Swift is an American singer-songwriter. Her narrative songwriting, which often centers around her personal life, has received widespread critical praise and media coverage. Swift has sold over 50 million albums and 150 million singles worldwide."
  },
  {
    name: "Billie Eilish",
    genre: "Hip-Hop / R&B",
    src: "https://charts-static.billboard.com/img/2017/05/billie-eilish-lrt-artist-chart-1ek-344x344.jpg",
    color: "bg-purple-300",
    bio: "Drake is a Canadian rapper, singer, songwriter, actor, and entrepreneur. A prominent figure in popular music, Drake is credited for popularizing the Toronto sound. He first gained recognition as an actor on the teen drama television series Degrassi: The Next Generation; intent on pursuing a career in music, he left the series after releasing his debut mixtape Room for Improvement."
  },
  {
    name: "Linkin Park",
    genre: "Soul / Pop",
    src: "https://charts-static.billboard.com/img/2007/12/linkin-park-ohp-artistchart-ufc-344x344.jpg",
    color: "bg-green-300",
    bio: "Adele is an English singer-songwriter. After graduating from the BRIT School in 2006, Adele signed a record deal with XL Recordings. Her debut album, 19, was released in 2008 and spawned the UK top-five singles 'Chasing Pavements' and 'Make You Feel My Love'. The album has been certified 8× platinum in the UK and triple platinum in the US."
  },
  {
    name: "Ed Sheeran",
    genre: "Pop / R&B / Funk",
    src: "https://charts-static.billboard.com/img/2012/11/ed-sheeran-w3r-artist-chart-1li-344x344.jpg",
    color: "bg-pink-300",
    bio: "Bruno Mars is an American singer, songwriter, record producer, musician, and dancer. He is known for his stage performances, retro showmanship, and for performing in a wide range of musical styles, including pop, R&B, funk, soul, reggae, hip hop, and rock. Mars is accompanied by his band, The Hooligans, who play a variety of instruments, such as electric guitar, bass, piano, keyboards, drums, and horns, and also serve as backup singers and dancers."
  },
  {
    name: "Olivia Rodrigo",
    genre: "Pop / Alternative",
    src: "https://charts-static.billboard.com/img/2020/01/olivia-rodrigo-3wl-artist-chart-9ct-344x344.jpg",
    color: "bg-indigo-300",
    bio: "Billie Eilish is an American singer and songwriter. She first gained attention in 2015 when she uploaded the song 'Ocean Eyes' to SoundCloud, which was subsequently released by the Interscope Records subsidiary Darkroom. The song was written and produced by her brother Finneas O'Connell, with whom she collaborates on music and live shows. Her debut EP, Don't Smile at Me (2017), became a sleeper hit, reaching the top 15 in the US, UK, Canada, and Australia."
  },
  {
    name: "Michael Jackson",
    genre: "R&B / Pop",
    src: "https://charts-static.billboard.com/img/1971/10/michael-jackson-9to-344x344.jpg",
    color: "bg-orange-300",
    bio: "The Weeknd is the stage name of Canadian singer, songwriter, and record producer Abel Makkonen Tesfaye. He is known for his sonic versatility and dark lyricism, his music exploring escapism, romance, and melancholia, and is inspired by personal experiences. He began his recording career in 2010, anonymously uploading several songs to YouTube."
  }
];

export default NeubrutalistFavouriteArtists;