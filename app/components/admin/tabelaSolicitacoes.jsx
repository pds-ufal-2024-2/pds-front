"use client"
import React, { useState, useEffect } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { ExclamationTriangleIcon, XCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Table, TableBody, TableCell, TableHeader, TableColumn, TableRow } from "@heroui/react";
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
  const [filtroTipo, setFiltroTipo] = useState('TODOS');
  const [filtroOrgao, setFiltroOrgao] = useState('TODOS');
  const [filtroBairro, setFiltroBairro] = useState('TODOS');
  const [modoEdicao, setModoEdicao] = useState(false);
  const [urgencias, setUrgencias] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [orgaos, setOrgaos] = useState([]);
  const [bairros, setBairros] = useState([]);

  const atualizarTabela = async () => {
    try {
      const res = await api.get('incidents');
      setSolicitacoes(res.data);
    } catch (err) {
      console.error('Erro ao atualizar tabela:', err);
    }
  };

  // const atualizarLocal = (solicitacaoAtualizada) => {
  //   setSolicitacoes((prev) =>
  //     prev.map((s) => (s.id === solicitacaoAtualizada.id ? solicitacaoAtualizada : s))
  //   );
  // };

  useEffect(() => {
  async function fetchSolicitacoes() {
    try {
      const res = await api.get("incidents");
      setSolicitacoes(res.data);

      const listaUrgencias = [...new Set(res.data.map(item => item.status).filter(Boolean))];
      setUrgencias(listaUrgencias);

      const listaTipos = [...new Set(res.data.map(item => item.category).filter(Boolean))];
      setTipos(listaTipos);

      const listaOrgaos = [...new Set(res.data.map(item => item.entity).filter(Boolean))];
      setOrgaos(listaOrgaos);

      const listaBairros = [...new Set(res.data.map(item => item.bairro).filter(Boolean))];
      setBairros(listaBairros);

      console.log("Tipos: ", listaTipos);
    } catch (err) {
      console.error("Erro ao buscar solicitações:", err);
      setSolicitacoes([]);
    } finally {
      setCarregando(false);
    }
  }

  fetchSolicitacoes();
}, []);

  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    });
  };


  return (
    <div className="flex justify-between">
      <div className="flex flex-col container w-full gap-4">
        <div className="flex flex-col text-sm">
          <div className="flex flex-col w-full">
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
                className="border rounded px-2 py-1 text-sm mr-4"
              >
                <option value="TODAS">Todas</option>
                {urgencias.map((urg, index) => (
                  <option key={index} value={urg}>{urg}</option>
                ))}
              </select>
              <label className="font-semibold text-sm mr-2">Filtrar por tipo:</label>
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="border rounded px-2 py-1 text-sm mr-4"
              >
                <option value="TODOS">Todos</option>
                {tipos.map((tipo, index) => (
                  <option key={index} value={tipo}>{tipo}</option>
                ))}
              </select>
              <label className="font-semibold text-sm mr-2">Filtrar por órgão:</label>
              <select
                value={filtroOrgao}
                onChange={(e) => setFiltroOrgao(e.target.value)}
                className="border rounded px-2 py-1 text-sm mr-4"
              >
                <option value="TODOS">Todos</option>
                {orgaos.map((orgao, index) => (
                  <option key={index} value={orgao}>{orgao}</option>
                ))}
              </select>
              <label className="font-semibold text-sm mr-2">Filtrar por bairro:</label>
              <select
                value={filtroBairro}
                onChange={(e) => setFiltroBairro(e.target.value)}
                className="border rounded px-2 py-1 text-sm mr-4"
              >
                <option value="TODOS">Todos</option>
                {bairros.map((bairro, index) => (
                  <option key={index} value={bairro}>{bairro}</option>
                ))}
              </select>
              <Table className="table-auto mt-4 text-center">
                <TableHeader className="bg-purple-200">
                  <TableColumn className="px-4 py-2 text-center">Problema</TableColumn>
                  <TableColumn className="px-4 py-2 text-center">Tipo</TableColumn>
                  <TableColumn className="px-4 py-2 text-center">Data da solicitação</TableColumn>
                  <TableColumn className="px-4 py-2 text-center">Órgão</TableColumn>
                  <TableColumn className="px-4 py-2 text-center">Levantamento</TableColumn>
                  <TableColumn className="px-4 py-2 text-center">Urgência</TableColumn>
                  <TableColumn className="px-4 py-2 text-center">Editar</TableColumn>
                  <TableColumn className="px-4 py-2 text-center">Gerar relatório</TableColumn>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200 text-center">
                  {solicitacoes
                    .filter(s => 
                      (filtroUrgencia === 'TODAS' || s.status === filtroUrgencia) &&
                      (filtroTipo === 'TODOS' || s.category === filtroTipo) &&
                      (filtroOrgao === 'TODOS' || s.entity === filtroOrgao) &&
                      (filtroBairro === 'TODOS' || s.bairro === filtroBairro)
                    )
                    .map((s) => (
                      <TableRow key={s.id} onClick={() => setSelecionado(s)} className="cursor-pointer hover:bg-gray-100">
                        <TableCell className="px-4 py-2 text-center">{s.incident}</TableCell>
                        <TableCell className="px-4 py-2 text-center">{s.category}</TableCell>
                        <TableCell className="px-4 py-2 text-center">{formatarData(s.created_at)}</TableCell>
                        <TableCell className="px-4 py-2 text-center">{s.entity}</TableCell>
                        <TableCell className="px-4 py-2 text-center">{s.counter}</TableCell>
                        <TableCell className="px-4 py-2 font-semibold text-center">
                          <span className={
                            s.status === "ALTA" ? "text-red-600" :
                            s.status === "MÉDIA" ? "text-yellow-500" :
                            "text-green-600"
                          }>
                            {s.status}
                          </span>
                        </TableCell>
                        <TableCell className="px-4 py-2">
                          <div className="flex gap-2 justify-center">
                            <PencilSquareIcon 
                              className="h-5 w-5 text-black hover:text-purple-700 cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelecionado(s);
                                setModoEdicao(true);
                              }}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-2 text-center">
                          <div className="flex gap-2 justify-center">
                            <ArrowTopRightOnSquareIcon className="h-5 w-5 text-black hover:text-purple-700 cursor-pointer" />
                          </div>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
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