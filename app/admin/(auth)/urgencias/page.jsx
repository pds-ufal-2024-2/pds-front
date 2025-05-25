'use client';

import { ChevronRightIcon } from "@heroicons/react/24/solid";
// import dynamic from 'next/dynamic';
import { ExclamationTriangleIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { useState } from "react";

import GraficoSolicitacoesBairro from "../../../components/admin/graficoSolicitacoesBairro";
import ResumoBairro from "../../../components/admin/porcentagemCasosUrgencias";
import TabelaSolicitacoes from "../../../components/admin/tabelaSolicitacoes";
import PageTitle from "../../../components/PageTitle";

// const ResumoBairro = dynamic(() => import('../../../components/admin/porcentagemCasosUrgencias'), { ssr: false });

export default function AdminPage() {
  const [bairroSelecionado, setBairroSelecionado] = useState('');

  return (
    <div className="space-y-6 bg-gray-50">
      <PageTitle buttons={[
        <Button key="urgencias" className="flex items-center gap-2 font-semibold" color="primary">
          ENVIAR PEDIDOS EM URGÊNCIA
          <ChevronRightIcon className="h-5 w-5" />
        </Button>
      ]}
        title="Processos e demandas" />
      <Card>
        <CardHeader className="flex items-center gap-2 text-purple-700">
          <ExclamationTriangleIcon className="h-6 w-6" />
          <h1 className="text-lg mb-0.5"> Solicitações urgentes</h1>
        </CardHeader>
        <CardBody>
          <TabelaSolicitacoes />
        </CardBody>
      </Card>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Gráfico de barras */}
        <Card className="flex-1 w-full h-[350px]">
          <CardHeader className="flex items-center gap-2 text-purple-700">
            <MapPinIcon className="h-6 w-6" />
            <h1 className="text-lg">Casos por bairro(clique no bairro para visualizar o gráfico ao lado).</h1>
          </CardHeader>
          <GraficoSolicitacoesBairro onSelectBairro={setBairroSelecionado} />
        </Card>

        {/* Resumo bairro */}
        <Card className="w-full lg:w-[280px] flex items-center justify-center">
          <ResumoBairro bairro={bairroSelecionado} />
        </Card>
      </div>
    </div>
  );
}
