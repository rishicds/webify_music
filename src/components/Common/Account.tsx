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
      className="fixed top-4 left-4 z-50 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-200"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
