"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/button";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import HorizontalSteps from "./horizontal-steps";

// Define um ícone personalizado
const customIcon = L.divIcon({
  html: `
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><g fill="red"><circle cx="12" cy="8.143" r="2.5" fill-opacity="0"><animate fill="freeze" attributeName="fill-opacity" begin="0.72s" dur="0.18s" values="0;1"/></circle><path d="M12 18c0 0 0 0 0 0c0 0 0 0 0 0l0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0l0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0Z"><animate fill="freeze" attributeName="d" begin="0.9s" dur="0.24s" values="M12 18c0 0 0 0 0 0l0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0l0 0c0 0 0 0 0 0c0 0 0 0 0 0Z;M12 21C15.3 21 18 19.9 18 18.5C18 17.8 17.3 17.2 16.2 16.7L16.8 15.8C18.8 16.6 20 17.7 20 19C20 21.2 16.4 23 12 23C7.6 23 4 21.2 4 19C4 17.7 5.2 16.6 7.1 15.8L7.7 16.7C6.7 17.2 6 17.8 6 18.5C6 19.9 8.7 21 12 21z"/></path></g><path fill="red" stroke="red" stroke-dasharray="40" stroke-dashoffset="40" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18c0 0 -5.14 -6 -5.14 -9.86c0 -2.84 2.3 -5.14 5.14 -5.14c2.84 0 5.14 2.3 5.14 5.14c0 3.86 -5.14 9.86 -5.14 9.86Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="40;0"/></path></svg>
  `,
  className: "",
  iconSize: [50, 50],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function MapPage() {
  const mapRef = useRef(null);
  const [step, setStep] = useState(0);
  const [userPosition, setUserPosition] = useState(null);
  const defaultPosition = [-9.6658, -35.735]; // Valor padrão para Maceió
  const [localizacao, setLocalizacao] = useState("");

  const markers = [
    { position: [-9.6658, -35.735], popupText: "Maceió - Você está aqui!" },
    { position: [-9.7095, -35.896], popupText: "Marechal Deodoro" },
    { position: [-9.8383, -35.8761], popupText: "Barra de São Miguel" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log("Localização obtida:", latitude, longitude);
            setUserPosition([latitude, longitude]); // Atualiza o estado com a localização do usuário
          },
          (error) => {
            console.error("Erro ao obter localização:", error);
            setUserPosition(defaultPosition); // Define uma localização padrão em caso de erro
          }
        );
      } else {
        console.error("Geolocalização não é suportada pelo navegador.");
        setUserPosition(defaultPosition); // Localização padrão
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && !mapRef.current) {
      const map = L.map("map-container").setView(defaultPosition, 13);

      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
        }
      ).addTo(map);

      markers.forEach(({ position, popupText }) => {
        const marker = L.marker(position, { icon: customIcon }).addTo(map);
        marker.bindPopup(popupText);
      });

      mapRef.current = map;
    }
  }, [markers]);

  useEffect(() => {
    if (userPosition && mapRef.current) {
      const userMarker = L.marker(userPosition, { icon: customIcon }).addTo(
        mapRef.current
      );
      userMarker.bindPopup("Você está aqui!").openPopup();
      mapRef.current.setView(userPosition, 22); // Centraliza o mapa na localização do usuário
    }
  }, [userPosition]);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
    if (localizacao === "") {
      setLocalizacao(userPosition);
    }
    mapHide();
  };

  const mapHide = () => {
    if (typeof window !== "undefined") {
      const mapContainer = document.getElementById("step1");
      if (mapContainer) {
        mapContainer.style.display = "none";
      }
    }
  };

  return (
    <div className="overflow-y-hidden relative">
      <header className="w-full flex flex-col items-center justify-center h-[20vh] min-h-[138px]">
        <h1 className="font-bold my-4">RELATAR</h1>
        <HorizontalSteps
          currentStep={step}
          steps={[
            { title: "Localização" },
            { title: "Categoria" },
            { title: "Descrição" },
            { title: "Prévia" },
          ]}
        />
      </header>
      <div className="h-[80vh]" id="step1">
        <div
          id="map-container"
          style={{ width: "100%", zIndex: "1", height: "100vh" }}
        />
        <div
          className="flex justify-between absolute bottom-10 px-10 z-10 w-full"
          style={{
            paddingBottom: "calc(env(safe-area-inset-bottom) + 10px)", // Adiciona espaçamento seguro
          }}
        >
          <Button color="secondary" variant="solid" onPress={mapHide}>
            Inserir manualmente
          </Button>
          <Button color="primary" onPress={nextStep}>
            Confirmar
          </Button>
        </div>
      </div>
      {step === 1 && (
        <div className="w-full h-full flex items-center mt-10 justify-center">
          <h2>Selecione a categoria</h2>
        </div>
      )}
      {step === 2 && (
        <div className="w-full h-full flex items-center mt-10 justify-center">
          <h2>Descreva o problema</h2>
        </div>
      )}
      {step === 3 && (
        <div className="w-full h-full flex items-center mt-10 justify-center">
          <h2>Prévia do relato</h2>
        </div>
      )}
    </div>
  );
}
