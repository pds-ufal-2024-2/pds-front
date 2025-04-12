"use client";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Define um ícone personalizado
const customIcon = L.divIcon({
  html: `
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><g fill="red"><circle cx="12" cy="8.143" r="2.5" fill-opacity="0"><animate fill="freeze" attributeName="fill-opacity" begin="0.72s" dur="0.18s" values="0;1"/></circle><path d="M12 18c0 0 0 0 0 0c0 0 0 0 0 0l0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0l0 0c0 0 0 0 0 0c0 0 0 0 0 0Z"><animate fill="freeze" attributeName="d" begin="0.9s" dur="0.24s" values="M12 18c0 0 0 0 0 0l0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0l0 0c0 0 0 0 0 0c0 0 0 0 0 0Z;M12 21C15.3 21 18 19.9 18 18.5C18 17.8 17.3 17.2 16.2 16.7L16.8 15.8C18.8 16.6 20 17.7 20 19C20 21.2 16.4 23 12 23C7.6 23 4 21.2 4 19C4 17.7 5.2 16.6 7.1 15.8L7.7 16.7C6.7 17.2 6 17.8 6 18.5C6 19.9 8.7 21 12 21z"/></path></g><path fill="red" stroke="red" stroke-dasharray="40" stroke-dashoffset="40" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18c0 0 -5.14 -6 -5.14 -9.86c0 -2.84 2.3 -5.14 5.14 -5.14c2.84 0 5.14 2.3 5.14 5.14c0 3.86 -5.14 9.86 -5.14 9.86Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="40;0"/></path></svg>
  `,
  className: "", // Remove classes padrão do Leaflet
  iconSize: [50, 50], // Tamanho do ícone
  iconAnchor: [16, 32], // Ponto de ancoragem do ícone (centro inferior)
  popupAnchor: [0, -32], // Ponto de ancoragem do popup em relação ao ícone
});

export default function MapPage() {
  const mapRef = useRef(null);
  const [userPosition, setUserPosition] = useState(null); // Estado para armazenar a localização do usuário
  const defaultPosition = userPosition || [-9.6658, -35.735]; // Valor padrão para Maceió

  // Array de marcadores com coordenadas e descrições
  const markers = [
    { position: [-9.6658, -35.735], popupText: "Maceió - Você está aqui!" },
    { position: [-9.7095, -35.896], popupText: "Marechal Deodoro" },
    { position: [-9.8383, -35.8761], popupText: "Barra de São Miguel" },
  ];

  useEffect(() => {
    // Obtém a localização atual do usuário
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]); // Atualiza o estado com a localização do usuário
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
        }
      );
    } else {
      console.error("Geolocalização não é suportada pelo navegador.");
    }
  }, []);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map("map-container").setView(defaultPosition, 11); // Zoom ajustado para incluir todas as localidades

      L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
      }).addTo(map);

      // Adiciona os marcadores estáticos dinamicamente com ícones personalizados
      markers.forEach(({ position, popupText }) => {
        const marker = L.marker(position, { icon: customIcon }).addTo(map);
        marker.bindPopup(popupText);
      });

      // Adiciona o marcador da localização atual do usuário com ícone personalizado
      if (userPosition) {
        const userMarker = L.marker(userPosition, { icon: customIcon }).addTo(map);
        userMarker.bindPopup("Você está aqui!").openPopup();
        map.setView(userPosition, 13); // Centraliza o mapa na localização do usuário
      }

      mapRef.current = map;
    } else if (userPosition) {
      // Adiciona o marcador da localização do usuário se o mapa já estiver inicializado
      const userMarker = L.marker(userPosition, { icon: customIcon }).addTo(mapRef.current);
      userMarker.bindPopup("Você está aqui!").openPopup();
      mapRef.current.setView(userPosition, 13); // Centraliza o mapa na localização do usuário
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [markers, userPosition]); // Adiciona `userPosition` como dependência para atualizar o marcador do usuário

  return (
    <div>
      <header className="w-full flex items-center justify-center h-[139px]">
        <h1 className="font-bold">RELATAR</h1>
        
      </header>
      <div id="map-container" style={{ height: "100vh", width: "100%" }} />
    </div>
  );
}