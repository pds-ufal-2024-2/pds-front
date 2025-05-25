"use client"
import { Table, TableBody, TableCell, TableHeader, TableColumn, TableRow } from "@heroui/react";

export default function TabelaRelatorios() {

    const relatorios = [
    {
        id: 120,
        tipo: "Urgências",
        pedidos: 103,
        dataSolicitacao: "12/02/2025",
        responsavel: "Usuário X",
        concluidos: "90%",
        urgencia: "ALTA",
        detalhes: 'acompanhar'
    },
    {
        id: 121,
        tipo: "Urgências",
        pedidos: 233,
        dataSolicitacao: "12/02/2025",
        responsavel: "Usuário X",
        concluidos: "40%",
        urgencia: "MÉDIA",
        detalhes: 'acompanhar'
    },
    {
        id: 122,
        tipo: "Atrasos",
        pedidos: 23,
        dataSolicitacao: "11/02/2025",
        responsavel: "Usuário Y",
        concluidos: "70%",
        urgencia: "MÉDIA",
        detalhes: 'acompanhar'
    },
    {
        id: 123,
        tipo: "Urgências",
        pedidos: 103,
        dataSolicitacao: "12/02/2025",
        responsavel: "Usuário X",
        concluidos: "100%",
        urgencia: "ALTA",
        detalhes: 'acompanhar'
    },
    {
        id: 124,
        tipo: "Urgências",
        pedidos: 103,
        dataSolicitacao: "12/02/2025",
        responsavel: "Usuário X",
        concluidos: "86%",
        urgencia: "BAIXA",
        detalhes: 'acompanhar'
    },
    {
        id: 125,
        tipo: "Atrasos",
        pedidos: 103,
        dataSolicitacao: "12/02/2025",
        responsavel: "Usuário X",
        concluidos: "90%",
        urgencia: "BAIXA",
        detalhes: 'acompanhar'
    },
    {
        id: 126,
        tipo: "Atrasos",
        pedidos: 103,
        dataSolicitacao: "12/02/2025",
        responsavel: "Usuário X",
        concluidos: "90%",
        urgencia: "ALTA",
        detalhes: 'acompanhar'
    }
    ];
      
  
  return (
  <div className="w-full flex justify-between">
    {/* tabela de relatorios */}
    {/* <div className="flex container w-full flex-row gap-4">
      <div className="flex text-sm">
        <div className="flex flex-col w-3/5">
          <table className="table-auto border-collapse border border-purple-200">
            <thead className="bg-purple-200">
              <tr>
                <th className="border border-gray-200 px-4 py-2">ID</th>
                <th className="border border-gray-200 px-4 py-2">Tipo de Rel.</th>
                <th className="border border-gray-200 px-4 py-2">Nº de pedidos</th>
                <th className="border border-gray-200 px-4 py-2">Data de solicitação</th>
                <th className="border border-gray-200 px-4 py-2">Responsável</th>
                <th className="border border-gray-200 px-4 py-2">Concluídos</th>
                <th className="border border-gray-200 px-4 py-2">Urgência</th>
                <th className="border border-gray-200 px-4 py-2">Detalhes e exportação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-center">
            {relatorios.map((r) => (
              <tr key={r.id} className="cursor-pointer hover:bg-gray-100">
                <td className="px-4 py-2">{r.id}</td>
                <td className="px-4 py-2">{r.tipo}</td>
                <td className="px-4 py-2">{r.pedidos}</td>
                <td className="px-4 py-2">{r.dataSolicitacao}</td>
                <td className="px-4 py-2">{r.responsavel}</td>
                <td className="px-4 py-2">{r.concluidos}</td>
                <td className="px-4 py-2">{r.urgencia}</td>
                <td className="px-4 py-2">
                  <div className="flex gap-2 justify-center">
                    <DocumentMagnifyingGlassIcon className="h-5 w-5 text-black hover:text-purple-700 cursor-pointer" />
                    <ArrowTopRightOnSquareIcon className="h-5 w-5 text-black hover:text-purple-700 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div> */}
    <Table aria-label="Relatórios cadastrados" className="w-full" selectionMode="none">
      <TableHeader>
        <TableColumn>ID</TableColumn>
        <TableColumn>Tipo de Rel.</TableColumn>
        <TableColumn>Nº de pedidos</TableColumn>
        <TableColumn>Data de solicitação</TableColumn>
        <TableColumn>Responsável</TableColumn>
        <TableColumn>Concluídos</TableColumn>
        <TableColumn>Urgência</TableColumn>
      </TableHeader>
      <TableBody>
        {relatorios.map((r) => (
          <TableRow key={r.id} className="cursor-pointer hover:bg-gray-100">
            <TableCell>{r.id}</TableCell>
            <TableCell>{r.tipo}</TableCell>
            <TableCell>{r.pedidos}</TableCell>
            <TableCell>{r.dataSolicitacao}</TableCell>
            <TableCell>{r.responsavel}</TableCell>
            <TableCell>{r.concluidos}</TableCell>
            <TableCell>{r.urgencia}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
  )
}
  