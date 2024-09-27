import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Common/Footer";
import { Header } from "@/components/Common/Header";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup, CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css"; // Required for CopilotKit components

// Custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Page metadata
export const metadata: Metadata = {
  title: "Musix by Rishi",
  description: "Made with hard work",
};

// Root layout with CopilotKit
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publicApiKey = process.env.NEXT_PUBLIC_COPILOT_KEY; // Ensure the environment variable is set

  return (
    <CopilotKit publicApiKey={publicApiKey}>
      <html lang="en">
        <body>
          {children}
          {/* Chatbot popup with custom neobrutalistic styles */}
          <CopilotPopup
            className="copilot-popup"
            labels={{
              title: "Musix Assistant",
              initial: "Hello! How can I assist you with your music?",
            }}
          />
          <Footer />
        </body>
      </html>
    </CopilotKit>
  );
}
