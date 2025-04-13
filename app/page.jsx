"use client";
import dynamic from "next/dynamic";

// Carrega o componente MapPage dinamicamente, desativando o SSR
const MapPage = dynamic(() => import("./components/MapPage"), { ssr: false });

export default function Page() {
  return <MapPage />;
}