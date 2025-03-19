import "@/styles/globals.css";
import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "600", "700"], // Escolha os pesos que deseja
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable}`}
      lang="pt-br"
    >
      <head />
      <body
        className={clsx("min-h-screen bg-background font-sans antialiased")}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
