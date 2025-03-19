/* eslint-disable no-console */
"use client";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { DatePicker } from "@heroui/date-picker";
import { Input } from "@heroui/input";
import React from "react";
import { Link } from "@heroui/link";

export default function Cadastro() {
  const [isSelected, setIsSelected] = React.useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    let data = Object.fromEntries(new FormData(e.currentTarget));

    // eslint-disable-next-line no-console
    console.log(JSON.stringify(data));

    if (data.password != data.repeatPassword) {
      console.log("As senhas não coincidem");

      return;
    }

    if (!isSelected) {
      console.log("Você precisa aceitar os termos e condições");

      return;
    }

    setAction(`submit ${JSON.stringify(data)}`);
  };

  return (
    <div className="container mt-10">
      <div className="flex flex-col">
        <h1 className="text-xl font-bold font-inter">Cadastre-se</h1>
        <h4 className="text-sm text-[#71727A]">
          Para tornar sua cidade melhor
        </h4>
      </div>
      <Form className="gap-4 mt-8" onSubmit={onSubmit}>
        <Input
          isRequired
          errorMessage="Por favor insira seu nome"
          name="nome"
          placeholder="Nome"
          size="lg"
          type="text"
          variant="bordered"
        />
        <Input
          isRequired
          errorMessage="Por favor insira seu CPF"
          name="cpf"
          placeholder="CPF"
          size="lg"
          type="number"
          variant="bordered"
        />
        <DatePicker
          className="w-full"
          label="Nascimento"
          name="nascimento"
          variant="bordered"
        />
        <Input
          isRequired
          errorMessage="Por favor insira seu email"
          name="email"
          placeholder="Email"
          size="lg"
          type="email"
          variant="bordered"
        />

        <Input
          isRequired
          errorMessage="Por favor insira uma senha"
          name="password"
          placeholder="Insira uma senha"
          size="lg"
          type="password"
          variant="bordered"
        />
        <Input
          isRequired
          errorMessage="Por favor repita sua senha"
          name="repeatPassword"
          placeholder="Repita sua senha"
          size="lg"
          type="password"
          variant="bordered"
        />
        <Checkbox
          className="!text-sm"
          isSelected={isSelected}
          onValueChange={setIsSelected}
        >
          Eu declaro que li e concordo com os{" "}
          <Link href="/termos">Termos e Condições</Link> e com a{" "}
          <Link href="privacidade">Política de Privacidade</Link>{" "}
        </Checkbox>
        <Button className="w-full" color="primary" size="lg" type="submit">
          Continuar
        </Button>
      </Form>
    </div>
  );
}
