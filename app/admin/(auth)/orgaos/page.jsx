'use client'
import React, { useState } from "react";
import TabelaOrgaos from "../../../components/admin/tabelaOrgaos";
import ModalNovoOrgao from "../../../components/admin/cadastroOrgao";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

export default function AdminOrgaos() {
  const [mostrarInfo, setMostrarInfo] = useState(false);
  const [abrirModal, setAbrirModal] = useState(false);
    
  return (
    <div>
      <div className="flex flex-col gap-4 w-1/3 items-center">
        <TabelaOrgaos />
        <div className="mt-10 w-11/12 ml-2 p-2 bg-purple-700 rounded-xl text-center hover:bg-purple-600">
          <button>
            <span className="text-sm text-white font-semibold hover:text-gray-100">ENVIAR PEDIDOS EM URGÊNCIA</span>
          </button>
        </div>
        <div onClick={() => setAbrirModal(true)} className="mt-10 w-11/12 ml-2 p-2 bg-purple-700 rounded-xl text-center hover:bg-purple-600 cursor-pointer">
          <span className="text-sm text-white font-semibold hover:text-gray-100">ADICIONAR NOVO ÓRGÃO</span>
        </div>
      {abrirModal && <ModalNovoOrgao onClose={() => setAbrirModal(false)} />}
      </div>
      <div className="relative mt-10 ml-4 p-1">
        <button onClick={() => setMostrarInfo(prev => !prev)} className="hover:scale-105 transition-all">
          <InformationCircleIcon className="h-8 w-8 text-purple-700 hover:text-purple-500" />
        </button>

        {mostrarInfo && (
          <div className="absolute left-10 top-0 z-10 w-64 p-4 bg-white border border-purple-300 rounded-xl shadow-lg text-sm text-gray-700">
            Acesse <strong>Processos e Demandas</strong> para agilizar seu dia e ficar por dentro de pedidos com atraso.
          </div>
        )}
      </div>
    </div>
  );
}
