'use client';

import { useState } from "react";
import dynamic from 'next/dynamic';
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import TabelaSolicitacoes from "../../../components/admin/tabelaSolicitacoes";
import GraficoSolicitacoesBairro from "../../../components/admin/graficoSolicitacoesBairro";

const ResumoBairro = dynamic(() => import('../../../components/admin/porcentagemCasosUrgencias'), { ssr: false });

export default function AdminPage() {
  const [bairroSelecionado, setBairroSelecionado] = useState('');

  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-purple-700 mb-4">Solicitações urgentes</h1>
        <TabelaSolicitacoes />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Gráfico de barras */}
        <div className="flex-1 bg-white rounded-xl shadow-md p-6">
          <GraficoSolicitacoesBairro onSelectBairro={setBairroSelecionado} />
        </div>

        {/* Resumo bairro */}
        <div className="w-full lg:w-[280px] bg-white rounded-xl shadow-md p-4 flex items-center justify-center">
          <ResumoBairro bairro={bairroSelecionado} />
        </div>
      </div>
      <div className="flex justify-end">
        <button className="flex items-center gap-2 bg-purple-700 text-white font-semibold px-5 py-3 rounded-lg hover:bg-purple-800 transition-all">
          ENVIAR PEDIDOS EM URGÊNCIA
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
