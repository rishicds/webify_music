import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/components/Common/Footer";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css"; 

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
const neobrutalistStyles = {
  "--copilot-kit-primary-color": "#FFD700",
  "--copilot-kit-secondary-color": "#000000",
  "--copilot-kit-background-color": "#FFFFFF",
  "--copilot-kit-border-radius": "0px",
  "--copilot-kit-font-family": "'Geist Sans', sans-serif",
} as React.CSSProperties;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publicApiKey = process.env.NEXT_PUBLIC_COPILOT_KEY;

  return (
    <CopilotKit publicApiKey={publicApiKey}>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          {children}
          <CopilotPopup
            labels={{
              title: "Musix Assistant",
              initial: "Hello! How can I assist you with your music?",
            }}
            className="neobrutalist-copilot z-100"
          />
          <Footer />
        </body>
      </html>
    </CopilotKit>
  );
}