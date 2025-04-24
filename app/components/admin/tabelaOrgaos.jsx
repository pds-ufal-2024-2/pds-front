"use client"
import React from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";


export default function TabelaOrgaos() {

  const orgaos = [
      {
          id: '001',
          cadastro: '20/04/2025',
          orgao: 'SEMINFRA',
          acoes: '',
      },
      {
          id: '002',
          cadastro: '21/04/2025',
          orgao: 'BRK',
          acoes: '',
      },
      {
          id: '003',
          cadastro: '22/03/2025',
          orgao: 'DMTT',
          acoes: '',
      },
      {
          id: '004',
          cadastro: '20/07/2025',
          orgao: 'EQUATORIAL',
          acoes: '',
      },
  ];
  
  return (
  <div className="w-full flex justify-between">
    {/* tabela de orgaos */}
    <div className="flex container w-full flex-row gap-4">
      <div className="flex text-sm">
        <div className="flex flex-col w-3/5">
          <table className="table-auto border-collapse border border-purple-200">
            <thead className="bg-purple-200">
              <tr>
                <th className="border border-gray-200 px-4 py-2">Órgão</th>
                <th className="border border-gray-200 px-4 py-2">Cadastrado em</th>
                <th className="border border-gray-200 px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-center">
            {orgaos.map((o) => (
              <tr key={o.id} className="cursor-pointer hover:bg-gray-100">
                <td className="px-4 py-2">{o.orgao}</td>
                <td className="px-4 py-2">{o.cadastro}</td>
                <td className="px-4 py-2">
                    {o.acoes === '' ? (
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
    </div>
  </div>
  )
}
  