'use client';
import React from "react";
import { useState } from "react";
import dynamic from 'next/dynamic';
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import TabelaSolicitacoes from "../../components/admin/tabelaSolicitacoes";
import GraficoSolicitacoesBairro from "../../components/admin/graficoSolicitacoesBairro";

const ResumoBairro = dynamic(() => import('../../components/admin/porcentagemCasosUrgencias'), { ssr: false });

export default function AdminPage() {
  const [bairroSelecionado, setBairroSelecionado] = useState('PAJUÇARA');

  return (
    <div>
        <div className="flex justify-between text-center gap-1">
          <TabelaSolicitacoes />
          <GraficoSolicitacoesBairro 
            onSelectBairro={setBairroSelecionado}
          />
        </div>
        <div className="flex items-center gap-2 justify-self-end mt-12 w-2/5">
          <div >
            <button className="w-full bg-purple-700 text-white font-semibold border rounded-lg hover:bg-purple-600 hover:text-gray-100">
              <div className="flex justify-between items-center">
                <span>ENVIAR PEDIDOS EM URGÊNCIA</span>
                <ChevronRightIcon className="h-7 w-7 text-white mr-1" />
              </div>
            </button>
          </div>
          <div className="items-end w-full">
            <ResumoBairro bairro={bairroSelecionado} />
          </div>
        </div>
    </div>
  );
}
