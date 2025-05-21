"use client"
import React, { useState, useEffect } from "react";
import { DocumentMagnifyingGlassIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon, XCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import api from '@/services/api';
import { usePathname } from "next/navigation";
import ModalEditarSolicitacao from '../../components/admin/modalEditarSolicitacao';

export default function TabelaSolicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [selecionado, setSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const pathname = usePathname();
  const [filtroUrgencia, setFiltroUrgencia] = useState('TODAS');
  const [modoEdicao, setModoEdicao] = useState(false);

  const atualizarTabela = async () => {
    try {
      const res = await api.get('incidents');
      setSolicitacoes(res.data);
    } catch (err) {
      console.error('Erro ao atualizar tabela:', err);
    }
  };
  useEffect(() => {
  async function fetchSolicitacoes() {
    try {
      const res = await api.get("incidents");
      setSolicitacoes(res.data);
      console.log("Solicitações:", res.data);
    } catch (err) {
      console.error("Erro ao buscar solicitações:", err);
      setSolicitacoes([]);
    } finally {
      setCarregando(false);
    }
  }

  fetchSolicitacoes();
}, []);

  return (
    <div className="flex justify-between">
      <div className="flex flex-col container w-full gap-4">
        <div className="flex flex-col text-sm">
          <div className="flex flex-col w-3/5">
            {carregando ? (
              <p className="text-gray-500">Carregando solicitações...</p>
            ) : solicitacoes.length === 0 ? (
              <p className="text-red-500">Não há ocorrências urgentes no momento</p>
            ) : (
            <div>
              <label className="font-semibold text-sm mr-2">Filtrar por urgência:</label>
              <select
                value={filtroUrgencia}
                onChange={(e) => setFiltroUrgencia(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="TODAS">Todas</option>
                <option value="ALTA">Alta</option>
                <option value="MÉDIA">Média</option>
                <option value="BAIXA">Baixa</option>
              </select>
              <table className="table-auto border-collapse border border-purple-200 mt-4">
                <thead className="bg-purple-200">
                  <tr>
                    <th className="border border-gray-200 px-4 py-2">Problema</th>
                    <th className="border border-gray-200 px-4 py-2">Tipo</th>
                    <th className="border border-gray-200 px-4 py-2">Data da solicitação</th>
                    <th className="border border-gray-200 px-4 py-2">Órgão</th>
                    <th className="border border-gray-200 px-4 py-2">Levantamento</th>
                    <th className="border border-gray-200 px-4 py-2">Urgência</th>
                    <th className="border border-gray-200 px-4 py-2">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-center">
                  {solicitacoes
                    .filter(s => filtroUrgencia === 'TODAS' || s.status === filtroUrgencia)
                    .map((s) => (
                    <tr key={s.id} onClick={() => setSelecionado(s)} className="cursor-pointer hover:bg-gray-100">
                      <td className="px-4 py-2">{s.incident}</td>
                      <td className="px-4 py-2">{s.category}</td>
                      <td className="px-4 py-2">{s.created_at}</td>
                      <td className="px-4 py-2">{s.entity}</td>
                      <td className="px-4 py-2">{s.counter}</td>
                      {/* <td className="px-4 py-2">{s.urgencia}</td> */}
                      <td className="px-4 py-2 font-semibold">
                        <span className={
                          s.status === "ALTA" ? "text-red-600" :
                          s.status === "MÉDIA" ? "text-yellow-500" :
                          "text-green-600"
                        }>
                          {s.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          <PencilSquareIcon 
                            className="h-5 w-5 text-black hover:text-purple-700 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelecionado(s);
                              setModoEdicao(true);
                            }}
                          />
                          <ArrowTopRightOnSquareIcon className="h-5 w-5 text-black hover:text-purple-700 cursor-pointer" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}
          </div>
        </div>

      {/* modal */}
      {selecionado && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          {pathname === "/admin/urgencias" ? (
            <div className="modal-urgencias w-3/5 max-h-[90vh] overflow-y-auto bg-white border border-purple-300 rounded-xl p-4 flex">
              {/* LADO ESQUERDO: imagem e categoria */}
              <div className="flex flex-col w-1/2 gap-2">
                <div className="w-full relative h-[300px]">
                  <Image src={selecionado.image} alt="imagem" fill className="rounded-xl object-cover" />
                </div>
                <div className="bg-purple-700 text-white text-sm rounded-xl w-max px-2 py-1">
                  {selecionado.category}
                </div>
              </div>

              {/* LADO DIREITO */}
              <div className="w-1/2 p-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs text-gray-700">ID: #{selecionado.id}</h3>
                  <button onClick={() => setSelecionado(null)} className="text-purple-700 hover:text-purple-900">
                    <XCircleIcon className="h-8 w-8" />
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-purple-700 font-bold text-2xl">{selecionado.incident}</h3>
                    <h3 className="text-xs font-bold">Incentivo à postagem</h3>
                  </div>

                  <div className="flex justify-between">
                    <div className="w-2/6 h-1/3 border border-yellow-200 bg-yellow-50 rounded-lg text-center p-2 font-semibold">
                      {selecionado.description}
                    </div>
                    <div className="flex gap-2 h-1/4 items-center bg-gray-200 border border-gray-400 rounded-lg px-2 py-1">
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                      <div className="flex flex-col items-center border-l border-gray-400 pl-2">
                        <h3 className="text-sm font-semibold">{selecionado.counter}</h3>
                        <h3 className="text-xs">reportes</h3>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-purple-700 text-white rounded-lg p-2">
                    <span>{selecionado.entity}</span>
                    <button className="text-sm hover:text-gray-200">Encaminhar</button>
                  </div>

                  <div className="bg-gray-200 rounded-lg p-2">
                    <h2 className="text-purple-700 text-sm font-semibold">SOBRE</h2>
                    <p className="text-sm text-gray-600">{selecionado.description}</p>
                  </div>

                </div>
              </div>
            </div>
          ) : pathname === "/admin/processos" ? (
            <div className="modal-urgencias w-3/5 max-h-[90vh] overflow-y-auto bg-white border border-purple-300 rounded-xl p-4 shadow-lg flex">
                <h1>teste</h1>
            </div>
        ) : null}
        </div>
      )}
    </div>

    {modoEdicao && (
      <ModalEditarSolicitacao
        selecionado={selecionado}
        setSelecionado={setSelecionado}
        onClose={() => setModoEdicao(false)}
        atualizarTabela={atualizarTabela}
      />
    )}
  </div>
  )
}