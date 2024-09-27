import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";

// Custom fonts
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Page metadata
export const metadata: Metadata = {
  title: "Musix by Rishi",
  description: "Made with hard work",
};

// Root layout with CopilotKit
export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}