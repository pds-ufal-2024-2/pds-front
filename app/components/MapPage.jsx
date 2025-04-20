/* eslint-disable no-console */
"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Form,
  Select,
  SelectItem,
  Checkbox,
  Link,
} from "@heroui/react";

import CardPrevia from "./CardPrevia";
import ImageInput from "./ImageInput";
import RowSteps from "./row-steps";
// import Link from "next/link";

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

export default function MultiStepForm() {
  const [userPosition, setUserPosition] = useState(null);
  const [isDeclared, setIsDeclared] = React.useState(false);
  const [queroEmails, setQueroEmails] = React.useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    bairro: "",
    rua: "",
    numeroCasa: "",
    pontoReferencia: "",
    cep: "",
    categoria: "",
    descricao: "",
    imagens: [],
    data: new Date().toISOString().split("T")[0],
    email: "",
  });

  const isStep0Valid = () => {
    const { bairro, rua, numeroCasa, pontoReferencia } = formData;

    return bairro && rua && numeroCasa && pontoReferencia;
  };

  const isStep1Valid = () => {
    const { categoria, descricao, imagens } = formData;

    return categoria && descricao && imagens.length > 0 && imagens[0] !== null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (file, index) => {
    setFormData((prev) => {
      const imagens = [...prev.imagens];

      imagens[index] = URL.createObjectURL(file); // Converte o arquivo em uma URL

      return { ...prev, imagens };
    });
  };

  const addNewImageInput = () => {
    setFormData((prev) => ({
      ...prev,
      imagens: [...prev.imagens, null], // Adiciona um novo espaço para uma imagem
    }));
  };

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do formulário:", formData);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="w-full flex justify-center">
            <div className="max-w-[90%] w-full flex flex-col justify-center">
              <h2 className="text-center mb-4">
                Preencha o formulário com as informações do local onde o
                problema foi encontrado
              </h2>
              <div className="flex flex-col gap-4">
                <Input
                  isRequired
                  label="Bairro"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                />
                <Input
                  isRequired
                  label="Rua"
                  name="rua"
                  value={formData.rua}
                  onChange={handleChange}
                />
                <Input
                  isRequired
                  label="Número da casa mais próxima"
                  name="numeroCasa"
                  type="number"
                  value={formData.numeroCasa}
                  onChange={handleChange}
                />
                <Input
                  isRequired
                  label="Ponto de referência"
                  name="pontoReferencia"
                  value={formData.pontoReferencia}
                  onChange={handleChange}
                />
                <Input
                  label="CEP (Deixar vazio se não souber)"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4">
                <Button
                  className="w-full"
                  color="primary"
                  isDisabled={!isStep0Valid()}
                  onPress={nextStep}
                >
                  Próximo
                </Button>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="w-full flex justify-center">
            <div className="max-w-[90%] w-full flex flex-col justify-center">
              <h2 className="text-center mb-4">
                Categorize e descreva o problema encontrado
              </h2>
              <div className="flex flex-col gap-4">
                <Select
                  className="w-full"
                  label="Selecione uma categoria"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                >
                  {problemas.map((problema) => (
                    <SelectItem key={problema.key} value={problema.key}>
                      {problema.label}
                    </SelectItem>
                  ))}
                </Select>
                <Textarea
                  isRequired
                  label="Descreva o problema"
                  minRows={5}
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                />
                {formData.imagens.map((imagem, index) => (
                  <ImageInput
                    key={index}
                    isRequired={index === 0} // Apenas o primeiro input é obrigatório
                    label={`Imagem ${index + 1}`}
                    name={`imagem-${index}`}
                    onChange={(file) => handleImageUpload(file, index)}
                  />
                ))}
                <Button
                  className="w-full"
                  color="secondary"
                  variant="flat"
                  onPress={addNewImageInput}
                >
                  {formData.imagens.length === 0
                    ? "Adicionar uma imagem"
                    : "Adicionar outra imagem"}
                </Button>
              </div>

              <div className="flex justify-between mt-4">
                <Button color="primary" variant="bordered" onPress={prevStep}>
                  Voltar
                </Button>
                <Button
                  color="primary"
                  isDisabled={!isStep1Valid()}
                  onPress={nextStep}
                >
                  Próximo
                </Button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="w-full flex justify-center">
            <div className="max-w-[500px] w-[90%] flex flex-col justify-center">
              <h2 className="text-center mb-4">Prévia da sua solicitação</h2>
              <div className="flex flex-col items-center gap-4">
          <CardPrevia
            categoria={formData.categoria}
            descricao={formData.descricao}
            imagem={formData.imagens[0]}
          />
          <div className="w-full items-start gap-2 flex flex-col">
            <div className="flex gap-2">
              <Checkbox
                color="primary"
                isSelected={queroEmails}
                rounded="full"
                onChange={() => setQueroEmails(!queroEmails)}
              />
              <p>
                Desejo receber e-mails sobre o andamento da minha
                solicitação
              </p>
            </div>
            {queroEmails && (
              <Input
                className="mb-4"
                label="Insira seu email"
                name="email"
                type="email"
                value={formData.email}
                variant="bordered"
                onChange={handleChange}
              />
            )}
            <div className="flex gap-2">
              <Checkbox
                color="primary"
                isSelected={isDeclared}
                rounded="full"
                onChange={() => setIsDeclared(!isDeclared)}
              />
              <div>
                Declaro que li e concordo com o{" "}
                <Link color="primary" href="/termo">
            Termo de Responsabilidade
                </Link>
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between mt-4">
            <Button color="primary" variant="bordered" onPress={prevStep}>
              Voltar
            </Button>
            <Button
              color="primary"
              isDisabled={!isDeclared}
              type="submit"
            >
              Enviar solicitação
            </Button>
          </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full">
      <header className="w-full flex flex-col items-center justify-center h-auto z-10 mb-8">
        <h1 className="font-bold my-4">RELATAR</h1>
        <RowSteps
          currentStep={step}
          steps={[
            { title: "Localização" },
            { title: "Descrição" },
            { title: "Prévia" },
          ]}
        />
      </header>
      <Form className="my-4" onSubmit={handleSubmit}>
        {renderStep()}
      </Form>
    </div>
  );
}
