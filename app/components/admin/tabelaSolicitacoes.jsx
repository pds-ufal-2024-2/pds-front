"use client"
import React from "react";
import {useState} from "react";
import { DocumentMagnifyingGlassIcon, ArrowTopRightOnSquareIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { usePathname } from "next/navigation";


export default function TabelaSolicitacoes() {
  const [selecionado, setSelecionado] = useState(null);
  const pathname = usePathname();

  const solicitacoes = [
      {
          id: '001',
          problema: 'Bueiro Aberto',
          tipo: 'Estrutural',
          data: '20/04/2025',
          orgao: 'SEMINFRA',
          levantamento: '40',
          urgencia: 'ALTA',
          acoes: 'Acompanhar',
          imagem: '/bueiro.jpg',
          situacao: 'PENDENTE'
      },
      {
          id: '002',
          problema: 'Prédio em risco de desabamento',
          tipo: 'Estrutural',
          data: '20/04/2025',
          orgao: 'SEMINFRA',
          levantamento: '40',
          urgencia: 'ALTA',
          acoes: 'Acompanhar',
          imagem: '/bueiro.jpg',
          situacao: 'PENDENTE'
      },
      {
          id: '003',
          problema: 'Prédio em risco de desabamento',
          tipo: 'Estrutural',
          data: '20/04/2025',
          orgao: 'SEMINFRA',
          levantamento: '40',
          urgencia: 'ALTA',
          acoes: 'Acompanhar',
          imagem: '/bueiro.jpg',
          situacao: 'CONCLUÍDO'
      },
      {
          id: '004',
          problema: 'Prédio em risco de desabamento',
          tipo: 'Estrutural',
          data: '20/04/2025',
          orgao: 'SEMINFRA',
          levantamento: '40',
          urgencia: 'ALTA',
          acoes: 'Acompanhar',
          imagem: '/bueiro.jpg',
          situacao: 'EM ANDAMENTO'
      },
  ];
  
  return (
  <div className="w-full flex justify-between">
    {/* tabela de solicitacoes */}
    {/* <div className="flex container flex-col w-3/4 bg-black"> */}
    <div className="flex flex-col container w-full gap-4">
      <div className="flex flex-col text-sm">
        {/* <div className="flex flex-col"> */}
        <div className="flex flex-col w-3/5">
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
                <td className="px-4 py-2">{s.urgencia}</td>
                <td className="px-4 py-2">
                    {s.acoes === 'Acompanhar' ? (
                      <div className="flex gap-2">
                        <DocumentMagnifyingGlassIcon className="h-5 w-5 text-black hover:text-purple-700 cursor-pointer" />
                        <ArrowTopRightOnSquareIcon className="h-5 w-5 text-black hover:text-purple-700 cursor-pointer" />
                      </div>
                    ) : (
                      <button className="text-purple-600 hover:underline">Acompanhar</button>
                    )}
                  </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* modal */}
      {selecionado && (
        pathname === "/admin/urgencias" ? (
          <div className="modal-urgencias">
            <div className="flex mt-4 bg-purple-50 border border-purple-300 rounded-xl">
              {/* DIV IMAGEM LADO ESQUERDO */}
              <div className="w-1/2 relative">
                <Image src={selecionado.imagem} alt="imagem" fill="true" sizes="33vh" className="rounded-xl"/>
              </div>
              {/* DIV LADO DIREITO */}
              <div className="w-1/2 p-2">
                {/* DIV ID + BOTÃO DE FECHAR */}
                <div className="flex justify-between items-center">
                  <h3 className="text-xs text-gray-700 ml-2">ID: #{selecionado.id}</h3>
                  <button
                    onClick={() => setSelecionado(null)}
                    className="text-purple-700 rounded hover:bg-purple mr-2"
                  >
                    <XCircleIcon className="h-8 w-8"/>
                  </button>
                </div>
                {/* PROBLEMA + SITUACAO + REPORTES */}
                <div className="h-auto flex flex-col justify-between items-center">
                  {/* PROBLEMA + INCENTIVO A POSTAGEM */}
                  <div className="flex items-center w-full justify-around">
                    <h3 className="text-purple-700 font-bold text-2xl">{selecionado.problema}</h3>
                    <h3 className="text-xs font-bold mr-1">Incentivo à postagem</h3>
                  </div>
                  {/* CARD SITUACAO + CARD REPORTES*/}
                  <div className="flex items-center w-full justify-around mt-3">
                    {/* CARD SITUACAO */}
                    <div className="w-2/6 border-1 rounded-lg border-yellow-200 bg-yellow-50">
                      <span className="font-semibold">{selecionado.situacao}</span>
                    </div>
                    {/* CARD REPORTES */}
                    <div className="flex gap-2 items-center bg-gray-200 border-1 border-gray-400 rounded-lg px-2 py-1">
                      <ExclamationTriangleIcon className="h-5 w-5" color="red"/>
                      {/* NUMERO DE REPORTES */}
                      <div className="flex flex-col items-center border-l-1 border-gray-400">
                        <h3 className="text-sm font-semibold">21</h3>
                        <h3 className="text-xs ml-2">reportes</h3>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ORGAO DA OCORRENCIA */}
                <div className="flex items-center text-center justify-between w-full mt-7 bg-purple-700 text-white rounded-lg">
                  {/* NOME DO ORGAO */}
                  <div className="ml-2 w-1/2 border-r-1 border-white">
                    <h1 className="text-sm">{selecionado.orgao}</h1>
                  </div>
                  {/* BOTAO DE ENCAMINHAMENTO */}
                  <div className="mr-2 w-1/2">
                    <button className="text-sm hover:text-gray-200">Encaminhar</button>
                  </div>
                </div>
                {/* DETALHES DA OCORRENCIA */}
                <div className="w-full mt-4 bg-gray-200 rounded-lg p-2 gap-2 flex flex-col">
                  <h2 className="text-purple-700 text-start text-sm">SOBRE</h2>
                  <span className="text-gray-600 text-sm text-start">Aqui na travessa muita gente tem caído ou tombado devido o bueiro, trazendo risco para quem está passando e para si mesmo.</span>
                </div>
                {/* TAGS */}
                <div className="bg-purple-700 rounded-xl mt-4 text-white text-sm w-1/4">
                  <span className="py-1 px-2 text-center">{selecionado.tipo}</span>
                </div>
              </div>
            </div>
          </div>
        ) : pathname === "/admin/processos" ? (
          <div className="modal-processos w-2/5 max-h-[50vh] overflow-y-auto">
            {/* processos */}
            <div className="w-full flex flex-col bg-white border-purple-700 rounded-xl shadow-lg">
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
                <Image src={selecionado.imagem} alt="imagem" width={250} height={250} className="rounded-xl"/>
              </div>
              {/* lado inferior */}
              <div className="flex flex-col gap-2 mt-2">
                {/* tipos e nome da ocorrencia */}
                <div className="flex flex-col w-full mt-2 w-3/5">
                  <span className="text-center text-white text-sm bg-purple-700 rounded-xl w-1/2">{selecionado.tipo}</span>
                  <span className="text-purple-700 font-bold text-lg">{selecionado.problema}</span>
                </div>
                {/* situacao e duraçao do atraso */}
                <div className="flex justify-between items-center mt-1">
                  {/* card situacao */}
                  <div className="w-1/2 border-1 rounded-lg border-yellow-200 bg-yellow-50 text-center">
                    <span className="text-xs font-semibold">{selecionado.situacao}</span>
                  </div>
                  {/* card duraçao do atraso */}
                  <div className="w-1/2 ml-2 border-1 rounded-lg border-gray-200 bg-gray-200 text-center">
                    <span className="font-semibold text-xs">2 meses em</span>
                    <h3 className="text-xs text-red-600">ATRASO</h3>
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
        ) : null
        )}
    </div>
  </div>
  )
}
  