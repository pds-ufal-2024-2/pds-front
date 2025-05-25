import "@/styles/globals.css";
import clsx from "clsx";
import "leaflet/dist/leaflet.css";
import { Poppins } from "next/font/google";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "600", "700"],
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
      className={poppins.className}
      lang="pt-br"
    >
      <head>
        <meta
          content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0, minimum-scale=1.0"
          name="viewport"
        />
      </head>
      <body
        className={clsx("min-h-screen bg-background font-poppins antialiased")}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
