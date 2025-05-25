"use client"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHeader, TableColumn, TableRow } from "@heroui/react";
import { useEffect, useState } from "react";
import api from '@/services/api';

export default function TabelaOrgaos() {
  const router = useRouter();
  const [carregando, setCarregando] = useState(true);
  const [orgaos, setOrgaos] = useState([]);

  useEffect(() => {
    async function fetchOrgaos() {
      try {
        const res = await api.get("incidents");
        setOrgaos(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Erro ao buscar órgãos:", err);
        setOrgaos([]);
      } finally {
        setCarregando(false);
      }
    }

    fetchOrgaos();
  }, []);

  return (
    <div className="w-full flex justify-between">
      <Table aria-label="Órgãos cadastrados" className="w-full" selectionMode="none">
        <TableHeader>
          <TableColumn className="text-center">Órgão</TableColumn>
          <TableColumn className="text-center">Cadastrado em</TableColumn>
          <TableColumn />
        </TableHeader>
        <TableBody>
          {carregando ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-gray-500">
                Carregando órgãos...
              </TableCell>
            </TableRow>
          ) : orgaos.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-red-500">
                Não foi possível buscar órgãos, tente novamente mais tarde.
              </TableCell>
            </TableRow>
          ) : (
            orgaos.map((o) => (
              <TableRow key={o.id} className="cursor-pointer hover:bg-gray-50 text-gray-500">
                <TableCell className="text-gray-500 text-center">{o.entity}</TableCell>
                 <TableCell className="text-gray-500 text-center">
                    {new Date(o.created_at).toLocaleDateString('pt-BR')}
                  </TableCell>
                <TableCell>
                  <button
                    onClick={() => router.push(`/admin/orgaos/${encodeURIComponent(o.entity)}`)}
                    className="flex items-center gap-2 text-purple-600 hover:underline"
                  >
                    Acompanhar
                    <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
