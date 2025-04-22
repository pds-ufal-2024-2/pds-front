"use client";
import Image from "next/image";
import React from "react";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";

export default function Login() {
  const [action, setAction] = React.useState(null);

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="relative w-full h-[40%] overflow-hidden">
        <Image
          fill
          priority
          alt="Imagem de exemplo"
          className="object-cover"
          src="/loginImage.png"
        />
      </div>
      <div className="flex flex-col gap-4 p-4 w-full mt-6">
        <h1 className="text-[24px] font-extrabold font-inter">Bem vindo!</h1>
        <Form
          className="w-full flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            let data = Object.fromEntries(new FormData(e.currentTarget));

            // eslint-disable-next-line no-console
            console.log(JSON.stringify(data));

            setAction(`submit ${JSON.stringify(data)}`);
          }}
        >
          <Input
            isRequired
            errorMessage="Por favor insira um email válido"
            name="email"
            placeholder="Insira seu email"
            size="lg"
            type="email"
            variant="bordered"
          />
          <Input
            isRequired
            errorMessage="Por favor preencha sua senha"
            name="password"
            placeholder="Insira sua senha"
            size="lg"
            type="password"
            variant="bordered"
          />
          <Link className="text-sm py-2" href="/login/recuperarSenha">
            Esqueceu sua senha?
          </Link>
          <div className="flex w-full">
            <Button className="w-full" color="primary" type="submit">
              Entrar
            </Button>
          </div>
          <div className="w-full items-center text-center">
            <p className="text-sm mt-4">
              Não é cadastrado? <Link href="/cadastro">Cadastrar-se</Link>{" "}
            </p>
          </div>
          {action && (
            <div className="text-small text-default-500">
              Action: <code>{action}</code>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}
