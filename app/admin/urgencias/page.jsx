import React from "react";
import TabelaSolicitacoes from "../../components/admin/tabelaSolicitacoes";
import GraficoSolicitacoesBairro from "../../components/admin/graficoSolicitacoesBairro";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function AdminPage() {
    
  return (
    <div>
        <div className="flex justify-between text-center gap-2">
          <TabelaSolicitacoes />
          <GraficoSolicitacoesBairro />
        </div>
        <div className="flex justify-self-end w-1/4 mt-12 p-2">
          <button className="w-full bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-600 hover:text-gray-100">
            <div className="flex justify-between items-center">
              <span>ENVIAR PEDIDOS EM URGÊNCIA</span>
              <ChevronRightIcon className="h-7 w-7 text-white mr-1" />
            </div>
          </button>
        </div>
    </div>
  );
}
