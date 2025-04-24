import React from "react";
import TabelaSolicitacoes from "../../components/admin/tabelaSolicitacoes";
import GraficoSolicitacoesBairro from "../../components/admin/graficoSolicitacoesBairro";
import GraficoDemandasComAtraso from "../../components/admin/graficoDemandas";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function AdminProcessos() {
    
  return (
    <div className="w-full">
      <TabelaSolicitacoes />
      <div className="flex relative">
        <div className="w-3/4 h-[350px] p-4">
          <GraficoDemandasComAtraso />
        </div>
        <div className="w-1/4 h-[100px] absolute bottom-0 right-0 bg-purple-100 flex flex-col items-center justify-between rounded-xl">
          <h3 className="text-lg font-bold text-center">ENCAMINHE COM UM CLIQUE!</h3>
          <button className="bg-purple-700 text-white text-sm w-full rounded-xl hover:bg-purple-600 hover:text-gray-100 font-semibold">
            <div className="flex justify-between items-center p-2">
              ENVIAR PEDIDOS EM ATRASO
              <ChevronRightIcon className="h-5 w-5 text-white mr-1"/>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
