'use client'
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { Button, Tooltip } from '@heroui/react';
import { useState } from "react";

import ModalNovoOrgao from "../../../components/admin/cadastroOrgao";
import TabelaOrgaos from "../../../components/admin/tabelaOrgaos";
import PageTitle from "../../../components/PageTitle";

export default function AdminOrgaos() {
  const [mostrarInfo, setMostrarInfo] = useState(false);
  const [abrirModal, setAbrirModal] = useState(false);

  return (
    <div className="space-y-6">
      <PageTitle buttons={[
        <Button
          key="novo-orgao"
          color="primary"
          onPress={() => setAbrirModal(true)}
        >
          ADICIONAR NOVO ÓRGÃO
        </Button>,
        <Tooltip key="tooltip" showArrow content={<div className="w-64 p-2 text-sm text-gray-700 text-justify">
          <p>Acesse <strong>Processos e Demandas</strong> para agilizar seu dia e ficar por dentro de pedidos com atraso.</p>
        </div>} placement="right">
          <Button
            isIconOnly
            color="primary"
            variant="flat"
            onPress={() => setMostrarInfo(prev => !prev)}
          >
            <InformationCircleIcon className="h-6 w-6" />

          </Button>
        </Tooltip>,]} title="Órgãos cadastrados" />
      <TabelaOrgaos />

      {abrirModal && <ModalNovoOrgao onClose={() => setAbrirModal(false)} />}

    </div>
  );
}
