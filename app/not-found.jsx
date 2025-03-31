"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { Button } from "@heroui/button";

export default function NotFound() {
  return (
    <div className="flex container flex-col items-center justify-center min-h-screen">
      <div className="w-full">
        <DotLottieReact
          autoplay
          loop
          src="https://lottie.host/c72c24f7-1b3a-489a-80b3-c47bc890316f/6iehp2rvCZ.lottie"
        />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-center">
        Oops, essa página não foi encontrada
      </h1>
      <p className="mb-4 text-center">
        Parece que essa página não existe, verifique se o endereço está correto
      </p>
      <Button as={Link} color="primary" href="/" className="w-full">
        Voltar ao início
      </Button>
    </div>
  );
}
