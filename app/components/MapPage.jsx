/* eslint-disable no-console */
"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Form } from "@heroui/form";
import { Select, SelectItem } from "@heroui/select";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import HorizontalSteps from "./horizontal-steps";

const customIcon = L.divIcon({
  html: `
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><g fill="red"><circle cx="12" cy="8.143" r="2.5" fill-opacity="0"><animate fill="freeze" attributeName="fill-opacity" begin="0.72s" dur="0.18s" values="0;1"/></circle><path d="M12 18c0 0 0 0 0 0c0 0 0 0 0 0l0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0l0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0Z"><animate fill="freeze" attributeName="d" begin="0.9s" dur="0.24s" values="M12 18c0 0 0 0 0 0l0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0c0 0 0 0 0 0l0 0c0 0 0 0 0 0c0 0 0 0 0 0Z;M12 21C15.3 21 18 19.9 18 18.5C18 17.8 17.3 17.2 16.2 16.7L16.8 15.8C18.8 16.6 20 17.7 20 19C20 21.2 16.4 23 12 23C7.6 23 4 21.2 4 19C4 17.7 5.2 16.6 7.1 15.8L7.7 16.7C6.7 17.2 6 17.8 6 18.5C6 19.9 8.7 21 12 21z"/></path></g><path fill="red" stroke="red" stroke-dasharray="40" stroke-dashoffset="40" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18c0 0 -5.14 -6 -5.14 -9.86c0 -2.84 2.3 -5.14 5.14 -5.14c2.84 0 5.14 2.3 5.14 5.14c0 3.86 -5.14 9.86 -5.14 9.86Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="40;0"/></path></svg>
  `,
  className: "",
  iconSize: [50, 50],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});


export const problemas = [
  { key: "pavimentacao", label: "Pavimentação" },
  { key: "seguranca", label: "Segurança" },
  { key: "limpeza", label: "Limpeza" },
  { key: "saude", label: "Saúde" },
  { key: "iluminacao", label: "Iluminação Pública" },
  { key: "saneamento", label: "Saneamento Básico" },
  { key: "transporte", label: "Transporte Público" },
  { key: "educacao", label: "Educação" },
  { key: "lazer", label: "Áreas de Lazer" },
  { key: "meio_ambiente", label: "Meio Ambiente" },
  { key: "acessibilidade", label: "Acessibilidade" },
  { key: "descarte_lixo", label: "Descarte de Lixo" },
  { key: "drenagem", label: "Drenagem Urbana" },
];

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
      const map = L.map("map-container", {
        zoomControl: false, // Desativa os controles de zoom
        scrollWheelZoom: false, // Desativa o zoom com a roda do mouse
        doubleClickZoom: false, // Desativa o zoom ao clicar duas vezes
        dragging: false, // Desativa o arrastar do mapa
        tap: false, // Desativa o zoom ao tocar no mapa (em dispositivos móveis)
      }).setView(defaultPosition, 13);

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

      // Desativa o foco automático no mapa
      map.scrollWheelZoom.disable();
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
    const step1btn = document.getElementById("step1btn");

    step1btn.style.display = "none";
    if (localizacao === "") {
      setLocalizacao(userPosition);
    }
    mapHide();
  };

  const resetaPosicao = () => {
    setUserPosition(null);
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
    <div className="overflow-y-hidden relative h-screen">
      <header className="w-full flex flex-col items-center justify-center h-auto z-10">
        <h1 className="font-bold my-4">RELATAR</h1>
        <HorizontalSteps
          currentStep={step}
          steps={[
            { title: "Localização" },
            { title: "Descrição" },
            { title: "Prévia" },
          ]}
        />
        {userPosition && (
          <div className="text-center max-w-[90vw] py-4">
            <p>Você está agora no local do problema encontrado?</p>
            <div className="flex w-full gap-10">
              <Button
                className="w-full"
                color="danger"
                variant="flat"
                onPress={resetaPosicao}
              >
                NÃO
              </Button>
              <Button className="w-full" color="primary">
                SIM
              </Button>
            </div>
            {/* <div
            className="flex mt-4 justify-between px-10 pb-5 w-full"
            id="step1btn"
          >
            <Button color="secondary" variant="solid" onPress={mapHide}>
              Inserir manualmente
            </Button>
            <Button color="primary" onPress={nextStep}>
              Confirmar
            </Button>
          </div> */}
          </div>
        )}
      </header>
      {step === 0 && (
        <>
          <div className="h-[80vh]" id="step1">
            <div
              id="map-container"
              style={{ width: "100%", zIndex: "1", height: "100%" }}
            />
          </div>
          <div className="w-full flex justify-center mt-8 items-center flex-col text-center">
            <h3 className="w-[90vw] mb-4">
              Informe o endereço do problema que você deseja relatar
            </h3>
            <Form
              className="w-full flex flex-col items-center justify-center gap-5"
              //validationErrors={errors}
              //onSubmit={onSubmit}
            >
              <Input
                isRequired
                className="max-w-[90%]"
                labelPlacement="outside"
                name="rua"
                placeholder="Digite o nome da rua"
              />
              <Input
                isRequired
                className="max-w-[90%]"
                labelPlacement="outside"
                name="numero"
                placeholder="Digite o número"
              />
              <Input
                className="max-w-[90%]"
                labelPlacement="outside"
                name="complemento"
                placeholder="Apartamento, bloco, etc."
              />
              <Input
                isRequired
                className="max-w-[90%]"
                labelPlacement="outside"
                name="bairro"
                placeholder="Digite o bairro"
              />
              <Input
                className="max-w-[90%]"
                labelPlacement="outside"
                name="cep"
                placeholder="CEP (Deixe vazio se não souber)"
              />
              <Button
                className="w-full max-w-[90vw] mt-4"
                color="primary"
                onPress={nextStep}
              >
                Próximo
              </Button>
            </Form>
          </div>
        </>
      )}
      {step === 1 && (
        <div className="w-full flex justify-center mt-8 items-center flex-col text-center">
          <h3 className="w-[90vw] mb-4">
            Selecione a categoria que mais representa o problema encontrado
          </h3>
          <Form
            className="w-full flex flex-col items-center justify-center gap-5"
            //validationErrors={errors}
            //onSubmit={onSubmit}
          >
            <Select className="max-w-xs" label="Selecione uma categoria">
              {problemas.map((problema) => (
                <SelectItem key={problema.key}>{problema.label}</SelectItem>
              ))}
            </Select>
            <Input
                isRequired
                className="max-w-[90%]"
                labelPlacement="outside"
                name="rua"
                placeholder="Digite qual o problema"
              />
              <Textarea className="max-w-[90%]" minRows={4} placeholder="Insira uma descrição sobre o problema" />;
            <Button
              className="w-full max-w-[90vw] mt-4"
              color="primary"
              onPress={nextStep}
            >
              Próximo
            </Button>
          </Form>
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
