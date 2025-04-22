"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

export default function Sucesso() {
  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <div className="flex flex-col justify-center items-center">
        <div className="w-[350px] h-[175px]">
          <DotLottieReact
            autoplay
            src="https://lottie.host/377ba2cb-2404-4d30-9da6-81cd87dc914d/ugYqd3wd99.lottie"
          />
        </div>
        <h1 className="text-xl font-bold font-inter">
          Cadastro realizado com sucesso!
        </h1>
        <Button as={Link} className="mt-4 w-full" color="primary" href="/login">
          Acessar sistema
        </Button>
      </div>
    </div>
  );
}
