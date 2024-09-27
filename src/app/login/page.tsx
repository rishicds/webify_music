"use client";

import { useState } from "react";
import { auth, provider, signInWithPopup } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { VelocityHero } from "@/components/Landing/Hero";
import MusicFeatures from "@/components/Landing/Features";
import { motion } from "framer-motion";

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/question"); // Redirect to question page after successful login
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-yellow-300">
      {/* Background Hero component */}
      <div className="absolute inset-0 z-0 blur-md">
        <VelocityHero />
      </div>

      {/* Foreground content (Login form) */}
      <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-8 rounded-none shadow-[8px_8px_0_0_#000] border-4 border-black max-w-md w-full backdrop-blur-md bg-opacity-80"
        >
          <h1 className="text-5xl font-extrabold mb-6 text-red-600 uppercase">Musix</h1>
          <p className="text-xl font-bold text-black mb-8">AI-powered music player. Sign in to start your musical journey!</p>
          
          {/* Error Message */}
          {error && <p className="text-red-500 font-bold mb-4 p-2 border-2 border-red-500">{error}</p>}

          {/* Sign in Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="mb-4 w-full bg-blue-500 text-white p-4 text-xl font-extrabold rounded-none hover:bg-blue-600 transition duration-200 border-4 border-black shadow-[4px_4px_0_0_#000]"
          >
            Sign in with Google
          </motion.button>

          {/* Voting Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-green-500 text-white font-extrabold p-4 text-xl rounded-none hover:bg-green-700 transition duration-200 border-4 border-black shadow-[4px_4px_0_0_#000]"
          >
            Vote for me on Quira
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
