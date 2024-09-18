import {
    motion,
    useScroll,
    useVelocity,
    useTransform,
    useSpring,
  } from "framer-motion";
  import React, { useRef } from "react";
  import { FiArrowDown } from "react-icons/fi";
  
  export const VelocityHero = () => {
    const targetRef = useRef(null);
  
    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start start", "end start"],
    });
  
    const scrollVelocity = useVelocity(scrollYProgress);
  
    const skewXRaw = useTransform(scrollVelocity, [-1, 1], ["45deg", "-45deg"]);
    const skewX = useSpring(skewXRaw, { mass: 3, stiffness: 400, damping: 50 });
  
    const xRaw = useTransform(scrollYProgress, [0, 1], [0, -3000]);
    const x = useSpring(xRaw, { mass: 3, stiffness: 400, damping: 50 });
  
    return (
      <section
        ref={targetRef}
        className="h-[500vh] bg-neutral-50 text-neutral-950"
      >
        <div className="sticky top-0 flex h-screen flex-col justify-between overflow-hidden">
          <Nav />
          <CenterCopy />
          <motion.p
            style={{ skewX, x }}
            className="origin-bottom-left whitespace-nowrap text-7xl font-black uppercase leading-[0.85] md:text-9xl md:leading-[0.85]"
          >
            Nothing in this world can take the place of rhythm. Talent will
            not; nothing is more common than unrecognized musicians with talent. Genius
            will not; unrewarded genius is almost a proverb. Education will not;
            the world is full of educated but unheard artists. Rhythm and harmony
            alone are omnipotent. The slogan 'Play On!' has inspired and always
            will inspire the hearts of the human race.
          </motion.p>
          <ScrollArrow />
        </div>
      </section>
    );
  };
  
  const Nav = () => {
    return (
      <div className="relative mb-1 flex w-full justify-between p-6">
        <p className="hidden text-xs text-neutral-400 md:block">
          40° 42' 46" N, 74° 0' 21" W
          <br />
        </p>
        <Logo />
        <Links />
      </div>
    );
  };
  
  const Logo = () => {
    return (
        <div className="flex items-center">
          <img src="logo.png" alt="Logo" />
          <h1 className="text-7xl text-red-500  font-bold  ml-4">MUSIX</h1>
        </div>
      );
  };
  
  const Links = () => {
    return (
      <nav className="flex gap-3 text-sm">
        <a href="#">Music</a>
        <a href="#">Artists</a>
        <a href="#">Signup</a>
      </nav>
    );
  };
  
  const CenterCopy = () => {
    return (
      <div className="flex items-center justify-center px-4">
        <img
          src="hero.png"
          alt="girlhero"
          className="mr-2 h-full w-28 bg-neutral-200 object-cover"
        />
        <h1 className="text-3xl font-bold text-neutral-400 sm:text-5xl md:text-7xl">
          Life is short. <br />
          Don't waste it. <br />
          It's time to{" "}
          <span className="inline-block -skew-x-[18deg] font-black text-red-500">
            DANCE.
          </span>
        </h1>
      </div>
    );
  };
  
  const ScrollArrow = () => {
    return (
      <>
        <div className="absolute left-4 top-1/2 hidden -translate-y-1/2 text-xs lg:block">
          <span
            style={{
              writingMode: "vertical-lr",
            }}
          >
            SCROLL
          </span>
          <FiArrowDown className="mx-auto" />
        </div>
        <div className="absolute right-4 top-1/2 hidden -translate-y-1/2 text-xs lg:block">
          <span
            style={{
              writingMode: "vertical-lr",
            }}
          >
            SCROLL
          </span>
          <FiArrowDown className="mx-auto" />
        </div>
      </>
    );
  };