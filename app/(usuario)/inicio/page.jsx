import React from "react";
import { Avatar } from "@heroui/avatar";
import { Input } from "@heroui/input";

import Chamado from "./components/Chamado";

export default function Inicio() {
  return (
    <div className="flex container mt-10 flex-col w-full h-full">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h3>Olá</h3>
          <h2 className="font-bold">Ghedyvan Vinícius</h2>
        </div>
        <div>
          <Avatar
            size="md"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </div>
      </div>
      <div className="w-full mt-10 mb-6">
        <Input
          className="w-full"
          label="Pesquisar problema"
          size="sm"
          type="text"
        />
      </div>
      <div className="mt-6  grid md:grid-cols-2 gap-10">
        <Chamado
          description="Avenida Anibal Torres"
          href="#"
          id="1"
          imageSrc="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/places/1.jpeg"
          name="Buraco gigantesco na rua"
          price={49.99}
          votos={43}
        />
        <Chamado
          description="Avenida do Futuro"
          href="#"
          id="1"
          imageSrc="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/places/3.jpeg"
          name="Vazamento de água na fonte"
          price={49.99}
          votos={98}
        />
        <Chamado
          description="Avenida Cloves Torres"
          href="#"
          id="1"
          imageSrc="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/places/4.jpeg"
          name="Coqueiro nasceu torto para esquerda"
          price={49.99}
          votos={12}
        />
        <Chamado
          description="Avenida Paris Saint Germain"
          href="#"
          id="1"
          imageSrc="https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/places/2.jpeg"
          name="Torre inconveniente"
          price={49.99}
          votos={3}
        />
      </div>
    </div>
  );
}
