import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { FiX, FiMusic, FiPlay } from "react-icons/fi";

interface Card {
  description: string;
  title: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: () => React.ReactNode;
  color: string;
}

export function NeubrutalistMusicCards() {
  const [active, setActive] = useState<Card | null>(null);
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
    <div className="bg-green-400 min-h-screen p-8">
     <h2 className="text-6xl pb-12 font-extrabold text-left text-black uppercase">Trending MUSIC</h2>
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
              key={`button-${active.title}-${id}`}
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
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className={`w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col ${active.color} border-8 border-black shadow-[8px_8px_0_0_#000] sm:rounded-3xl overflow-hidden`}
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={500}
                  height={300}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 object-cover object-top"
                />
              </motion.div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-3xl mb-2"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-xl"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-6 py-3 text-xl font-bold bg-black text-white border-4 border-black shadow-[4px_4px_0_0_#000] hover:translate-y-1 hover:shadow-[2px_2px_0_0_#000] transition-all"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-lg h-48 overflow-auto pr-4"
                >
                  {active.content()}
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ul className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card) => (
          <motion.li
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className={`${card.color} border-8 border-black shadow-[8px_8px_0_0_#000] rounded-xl cursor-pointer hover:translate-y-1 hover:shadow-[4px_4px_0_0_#000] transition-all`}
          >
            <motion.div layoutId={`image-${card.title}-${id}`}>
              <Image
                width={400}
                height={300}
                src={card.src}
                alt={card.title}
                className="h-60 w-full object-cover object-top"
              />
            </motion.div>
            <div className="p-4">
              <motion.h3
                layoutId={`title-${card.title}-${id}`}
                className="font-bold text-2xl mb-2"
              >
                {card.title}
              </motion.h3>
              <motion.p
                layoutId={`description-${card.description}-${id}`}
                className="text-lg mb-4"
              >
                {card.description}
              </motion.p>
              <div className="flex justify-between items-center">
                <FiMusic size={24} />
                <button className="bg-black text-white p-2 rounded-full">
                  <FiPlay size={24} />
                </button>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

const cards: Card[] = [
  {
    description: "Lana Del Rey",
    title: "Summertime Sadness",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Listen Now",
    ctaLink: "#",
    content: () => (
      <p>
        "Summertime Sadness" is a hauntingly beautiful track that captures the essence of Lana Del Rey's signature style. Released in 2012, it blends melancholic lyrics with a dreamy, atmospheric sound, creating a nostalgic summer anthem. The song's emotional depth and Del Rey's sultry vocals have made it an enduring favorite among fans and critics alike.
      </p>
    ),
    color: "bg-yellow-300",
  },
  {
    description: "Marshmello",
    title: "Alone",
    src: "https://charts-static.billboard.com/img/2016/10/marshmello-fo3-artistchart-8il-344x344.jpg",
    ctaText: "Play Album",
    ctaLink: "#",
    content: () => (
      <p>
        "Mitran Di Chhatri" is a powerful Punjabi track that showcases Babbu Maan's unique vocal style and lyrical prowess. Released as part of his album "Talaash: In Search of Soul," this song blends traditional Punjabi musical elements with contemporary arrangements. Maan's emotive delivery and the song's compelling narrative have made it a favorite among Punjabi music enthusiasts worldwide.
      </p>
    ),
    color: "bg-blue-300",
  },
  {
    description: "Metallica",
    title: "For Whom The Bell Tolls",
    src: "https://assets.aceternity.com/demos/metallica.jpeg",
    ctaText: "Rock Out",
    ctaLink: "#",
    content: () => (
      <p>
        "For Whom the Bell Tolls" is a thrash metal classic from Metallica's second studio album, "Ride the Lightning" (1984). Inspired by Ernest Hemingway's novel of the same name, the song features powerful guitar riffs, thunderous drums, and James Hetfield's intense vocals. Its epic composition and anti-war themes have cemented its place as one of Metallica's most beloved tracks.
      </p>
    ),
    color: "bg-red-300",
  },
  {
    description: "Twenty One Pilots",
    title: "Stressed Out",
    src: "https://charts-static.billboard.com/img/2015/04/twenty-one-pilots-uug-artistchart-vgm-344x344.jpg",
    ctaText: "Explore More",
    ctaLink: "#",
    content: () => (
      <p>
        "Stressed Out" is the title track from Twenty One Pilot's studio album, released in 2006. This song catapulted Reshammiya to stardom, showcasing his unique nasal twang and catchy compositions. The track's fusion of Western and Indian musical elements, coupled with its romantic lyrics, made it a chart-topping hit and a defining moment in modern Bollywood music.
      </p>
    ),
    color: "bg-purple-300",
  },
];

export default NeubrutalistMusicCards;