"use client"
import React, { useState, useEffect } from "react";
import { DocumentMagnifyingGlassIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import axios from "axios";
import { usePathname } from "next/navigation";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

export default function TabelaSolicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [selecionado, setSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
  async function fetchSolicitacoes() {
    try {
      const res = await axios.get("/api/incidents", {
        withCredentials: true, // redundante, mas reforça o envio dos cookies
      });
      setSolicitacoes(res.data);
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
              <table className="table-auto border-collapse border border-purple-200">
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
                  {solicitacoes.map((s) => (
                    <tr key={s.id} onClick={() => setSelecionado(s)} className="cursor-pointer hover:bg-gray-100">
                      <td className="px-4 py-2">{s.problema}</td>
                      <td className="px-4 py-2">{s.tipo}</td>
                      <td className="px-4 py-2">{s.data}</td>
                      <td className="px-4 py-2">{s.orgao}</td>
                      <td className="px-4 py-2">{s.levantamento}</td>
                      {/* <td className="px-4 py-2">{s.urgencia}</td> */}
                      <td className="px-4 py-2 font-semibold">
                        <span className={
                          s.urgencia === "ALTA" ? "text-red-600" :
                          s.urgencia === "MÉDIA" ? "text-yellow-500" :
                          "text-green-600"
                        }>
                          {s.urgencia}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          <DocumentMagnifyingGlassIcon className="h-5 w-5 text-black hover:text-purple-700 cursor-pointer" />
                          <ArrowTopRightOnSquareIcon className="h-5 w-5 text-black hover:text-purple-700 cursor-pointer" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      {/* modal */}
      {selecionado && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          {pathname === "/admin/urgencias" ? (
            <div className="modal-urgencias w-3/5 max-h-[90vh] overflow-y-auto bg-white border border-purple-300 rounded-xl p-4 flex">
              {/* LADO ESQUERDO: imagem */}
              <div className="w-1/2 relative h-[300px]">
                <Image src={selecionado.imagem} alt="imagem" fill className="rounded-xl object-cover" />
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
                    <h3 className="text-purple-700 font-bold text-2xl">{selecionado.problema}</h3>
                    <h3 className="text-xs font-bold">Incentivo à postagem</h3>
                  </div>

                  <div className="flex justify-between">
                    <div className="w-2/6 border border-yellow-200 bg-yellow-50 rounded-lg text-center p-2 font-semibold">
                      {selecionado.situacao}
                    </div>
                    <div className="flex gap-2 items-center bg-gray-200 border border-gray-400 rounded-lg px-2 py-1">
                      <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                      <div className="flex flex-col items-center border-l border-gray-400 pl-2">
                        <h3 className="text-sm font-semibold">21</h3>
                        <h3 className="text-xs">reportes</h3>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-purple-700 text-white rounded-lg p-2">
                    <span>{selecionado.orgao}</span>
                    <button className="text-sm hover:text-gray-200">Encaminhar</button>
                  </div>

                  <div className="bg-gray-200 rounded-lg p-2">
                    <h2 className="text-purple-700 text-sm font-semibold">SOBRE</h2>
                    <p className="text-sm text-gray-600">Aqui na travessa muita gente tem caído ou tombado devido o bueiro, trazendo risco para quem está passando e para si mesmo.</p>
                  </div>

                  <div className="bg-purple-700 text-white text-sm rounded-xl w-max px-2 py-1">
                    {selecionado.tipo}
                  </div>
                </div>
              </div>
            </div>
          ) : pathname === "/admin/processos" ? (
            <div className="modal-urgencias w-3/5 max-h-[90vh] overflow-y-auto bg-white border border-purple-300 rounded-xl p-4 shadow-lg flex">
            {/* processos */}
            <div className="w-full flex flex-col border-purple-700 rounded-xl">
              {/* id e botao de fechar */}
              <div className="flex justify-between items-center">
                <h3 className="text-xs text-gray-700 ml-2">ID: #{selecionado.id}</h3>
                <button
                  onClick={() => setSelecionado(null)}
                  className="text-purple-700 rounded hover:bg-purple mr-2"
                >
                  <XCircleIcon className="h-8 w-8"/>
                </button>
              </div>
              {/* imagem lado superior */}
              <div className="w-full">
                <Image src={selecionado.imagem} alt="imagem" width={300} height={300} className="rounded-xl"/>
              </div>
              {/* lado inferior */}
              <div className="flex flex-col gap-2 mt-2">
                {/* tipos e nome da ocorrencia */}
                <div className="flex flex-col mt-2 w-2/4">
                  <span className="text-center text-white text-md bg-purple-700 rounded-xl w-1/2">{selecionado.tipo}</span>
                  <span className="text-purple-700 font-bold text-xl">{selecionado.problema}</span>
                </div>
                {/* situacao e duraçao do atraso */}
                <div className="flex gap-2 items-center mt-1">
                  {/* card situacao */}
                  <div className="w-1/4 border-1 rounded-lg border-yellow-200 bg-yellow-50 text-center">
                    <span className="text-md font-semibold">{selecionado.situacao}</span>
                  </div>
                  {/* card duraçao do atraso */}
                  <div className="w-1/4 ml-2 border-1 rounded-lg border-gray-200 bg-gray-200 text-center">
                    <span className="font-semibold text-md">2 meses em</span>
                    <span className="text-md text-red-600 font-semibold"> ATRASO</span>
                    {/* <h3 className="text-xs text-red-600">ATRASO</h3> */}
                  </div>
                </div>
                {/* notas do servidor */}
                <div className="flex flex-col text-start gap-2 mt-4 bg-gray-200 rounded-lg p-2">
                  <h3 className="text-purple-700 text-sm font-semibold">NOTAS DO SERVIDOR</h3>
                  <span className="text-xs text-gray-500">Devido o cano quebrado, não foi possível tratar o asfalto</span>
                </div>
                {/* encaminhamento do problema */}
                <div className="gap-2 mt-4 bg-gray-200 rounded-lg p-2">
                  <span className="text-xs text-gray-500">O problema foi encaminhado para BRK pelo órgão {selecionado.orgao}</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        </div>
      )}
    </div>
  </div>
  )
}
  