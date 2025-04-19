/* eslint-disable no-console */
"use client";

import React, { useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Form,
} from "@heroui/react";

import RowSteps from "./row-steps";

export default function MultiStepForm() {
  const [userPosition, setUserPosition] = useState(null);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    problemDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
          <>
            <h2>Etapa 1: Endereço</h2>
            <div className="gap-4">
              <Input
                isRequired
                label="Rua"
                name="street"
                value={formData.street}
                onChange={handleChange}
              />
              <Input
                isRequired
                label="Cidade"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              <Input
                isRequired
                label="Estado"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
              <Input
                isRequired
                label="CEP"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
            <div>
              <Button color="primary" onPress={nextStep}>
                Próximo
              </Button>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div>
              <h2>Etapa 2: Descrição do Problema</h2>
            </div>
            <div>
              <Textarea
                isRequired
                label="Descreva o problema"
                minRows={5}
                name="problemDescription"
                value={formData.problemDescription}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-between">
              <Button variant="light" onPress={prevStep}>
                Voltar
              </Button>
              <Button color="primary" onPress={nextStep}>
                Próximo
              </Button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div>
              <h2>Etapa 3: Prévia do Relato</h2>
            </div>
            <div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Endereço:</h3>
                  <p>{formData.street}</p>
                  <p>
                    {formData.city}, {formData.state} - {formData.zipCode}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Descrição do Problema:</h3>
                  <p>{formData.problemDescription}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="light" onPress={prevStep}>
                Voltar
              </Button>
              <Button color="primary" type="submit">
                Enviar
              </Button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full">
      <header className="w-full flex flex-col items-center justify-center h-auto z-10">
        <h1 className="font-bold my-4">RELATAR</h1>
        <RowSteps
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
          </div>
        )}
      </header>
      <Form onSubmit={handleSubmit}>{renderStep()}</Form>
    </div>
  );
}
