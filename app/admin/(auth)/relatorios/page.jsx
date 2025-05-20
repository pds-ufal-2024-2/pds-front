import React from "react";
import TabelaRelatorios from "../../../components/admin/tabelaRelatorios";
import GraficoDemandasRelatorio from "../../../components/admin/graficoDemandasRelatorios";
import GraficoPendentesRelatorio from "../../../components/admin/graficoPendentesRelatorio";

export default function AdminRelatorios() {
    
  return (
    <div className="flex flex-col gap-4 w-full h-full p-4">
        <div className="flex flex-col gap-4 w-full items-center">
            <TabelaRelatorios/>
        </div>
        <div className="flex w-full gap-4 justify-between">
          <div className="w-1/2">
            <GraficoDemandasRelatorio />
          </div>
          <div className="w-1/2">
            <GraficoPendentesRelatorio />
          </div>
        </div>
        <div className="w-1/2 flex items-center mt-6">
          <button>
            <a href="/admin/relatorios/download" className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
              Baixar Relatório
            </a>
          </button>
        </div>
    </div>
  );
}
