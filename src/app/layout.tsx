import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Dancing_Script, Pacifico, Caveat, Great_Vibes } from "next/font/google";
import { cn } from "@/lib/utils"; 
import "./globals.css";

// Police par défaut de l'application
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Définition de nos polices manuscrites pour la signature
const dancingScript = Dancing_Script({ subsets: ['latin'], weight: '400', variable: '--font-dancing-script', display: 'swap' });
const pacifico = Pacifico({ subsets: ['latin'], weight: '400', variable: '--font-pacifico', display: 'swap' });
const caveat = Caveat({ subsets: ['latin'], weight: '400', variable: '--font-caveat', display: 'swap' });
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400', variable: '--font-great-vibes', display: 'swap' });

export const metadata: Metadata = {
  title: "Générateur d'Attestation d'Hébergement",
  description: "Créez et signez votre attestation d'hébergement en ligne facilement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          geistSans.variable,
          geistMono.variable,
          dancingScript.variable,
          pacifico.variable,
          caveat.variable,
          greatVibes.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}