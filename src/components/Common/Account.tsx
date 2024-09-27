// src/components/LogoutButton.tsx
"use client";

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const LogoutButton = ({ user }: { user: any }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!user) return null; // Don't render if user is not logged in

  return (
    <button
      onClick={handleLogout}
      className="fixed top-10 right-4 z-20 bg-red-400 text-black font-bold text- px-4 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
    >
      LOGOUT
    </button>
  );
};

export default LogoutButton;