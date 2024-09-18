import React from "react";
import { twMerge } from "tailwind-merge";
import { MotionConfig, motion } from "framer-motion";
import { FiMusic, FiHeadphones, FiRadio, FiUsers } from "react-icons/fi";

export const MusicFeatures = () => {
  return (
    <section className="bg-yellow-200 px-8 py-24">
        <h2 className="text-6xl pb-12 font-extrabold text-left text-black uppercase">
            Features</h2>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2">
        <Card
          title="Discover"
          subtitle="Explore new artists and genres with our personalized recommendations."
          icon={<FiMusic />}
          className="bg-pink-300"
        />
        <Card
          title="Playlists"
          subtitle="Create and share custom playlists with friends and followers."
          icon={<FiHeadphones />}
          className="bg-blue-300 sm:-translate-y-8"
        />
        <Card
          title="Live Radio"
          subtitle="Tune in to live radio stations from around the world."
          icon={<FiRadio />}
          className="bg-green-300"
        />
        <Card
          title="Social"
          subtitle="Connect with other music lovers and share your favorite tracks."
          icon={<FiUsers />}
          className="bg-purple-300 sm:-translate-y-8"
        />
      </div>
    </section>
  );
};

const Card = ({
  title,
  subtitle,
  icon,
  className,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  className?: string;
}) => {
  return (
    <MotionConfig
      transition={{
        type: "spring",
        bounce: 0.5,
      }}
    >
      <motion.div
        whileHover="hovered"
        className={twMerge(
          "group w-full border-4 border-black bg-white shadow-[8px_8px_0_0_#000]",
          className
        )}
      >
        <motion.div
          className="relative flex h-80 flex-col justify-between overflow-hidden p-6"
        >
          <div className="flex items-center text-3xl font-bold uppercase">
            <span className="mr-4 text-4xl">{icon}</span>
            {title}
          </div>
          <div>
          <p className="mb-6 text-lg text-shadow">{subtitle}</p>
            <button className="border-4 border-black bg-yellow-300 px-6 py-2 text-xl font-bold text-black transition-all duration-300 ease-in-out hover:bg-yellow-400 hover:shadow-[4px_4px_0_0_#000]">
              EXPLORE
            </button>
          </div>

          <motion.svg
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
            style={{
              top: "0",
              right: "0",
              x: "50%",
              y: "-50%",
              scale: 0.6,
            }}
            width="200"
            height="200"
            className="pointer-events-none absolute z-10"
          >
            <path
              id="circlePath"
              d="M100,100 m-75,0 a75,75 0 1,0 150,0 a75,75 0 1,0 -150,0"
              fill="none"
            />
            <text>
              <textPath
                href="#circlePath"
                fill="black"
                className="text-xl font-black uppercase"
              >
                MUSIC VIBES • MUSIC VIBES • MUSIC VIBES •
              </textPath>
            </text>
          </motion.svg>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
};

export default MusicFeatures;