"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";
import { Button } from "@heroui/button";

export default function NotFound() {
return (
    <div className="flex container flex-col items-center justify-center min-h-screen">
        <div className="max-w-[660px] flex flex-col items-center justify-center">
        <div className="w-full">
            <DotLottieReact
                autoplay
                loop
                src="https://lottie.host/f0440e6e-674d-4078-a9cc-0892044d73ba/onOFsP14px.lottie"
            />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-center">
            Você enviou com sucesso a solicitação!
        </h1>
        <p className="mb-4 text-center">
            Recebemos as informações e vamos trabalhar para resolver o problema. Você pode fechar esta página ou fazer outra solicitação.
        </p>
        <Button as={Link} color="primary" href="/" className="w-full max-w-[450px]">
            Fazer outra solicitação
        </Button>
        </div>
    </div>
);
}
