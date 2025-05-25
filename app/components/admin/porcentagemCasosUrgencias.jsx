'use client';

import { useEffect, useMemo, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import api from '@/services/api';

const COLORS = ['#9333ea', '#1e40af', '#ef4444'];

export default function ResumoBairro({ bairro }) {
  const [info, setInfo] = useState(null);
  const [incidentes, setIncidentes] = useState([]);
  const [urgencias, setUrgencias] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
  async function fetchData() {
    try {
      const res = await api.get("incidents");
      setIncidentes(res.data);

      // Filtrando apenas incidentes do bairro atual
      const incidentesBairro = res.data.filter(i => i.bairro === bairro);
      const total = incidentesBairro.length;

      // Pegando urgências únicas (só para gerar outros selects, se quiser)
      const listaUrgencias = [...new Set(res.data.map(item => item.status).filter(Boolean))];
      setUrgencias(listaUrgencias);

      // Fazendo os cálculos corretamente
      const pendentesBaixas = incidentesBairro.filter(i => i.status === 'BAIXA').length;
      const pendentesUrgentes = incidentesBairro.filter(i => i.status === 'ALTA').length;
      const pendentesMedias = incidentesBairro.filter(i => i.status === 'MÉDIA').length;

      setTotal(total);

      if (total > 0) {
        setInfo({
          total,
          pendentesBaixas: pendentesBaixas / total,
          pendentesComuns: pendentesMedias / total,
          pendentesUrgentes: pendentesUrgentes / total,
        });
      } else {
        setInfo(null);
      }
    } catch (err) {
      console.error('Erro ao buscar incidents:', err);
      setInfo(null);
    }
  }

  if (bairro) {
    fetchData();
  }
}, [bairro]);


  // const info = useMemo(() => {
  //   const incidentes = incidents.filter(i => i.bairro === bairro);
  //   const total = incidentes.length;
  //   if (total === 0) return null;

  //   const pendentesBaixas = incidentes.filter(i => i.status === 'BAIXA').length;
  //   const pendentesUrgentes = incidentes.filter(i => i.status === 'ALTA').length;
  //   const pendentesMedias = incidentes.filter(i => i.status === 'MÉDIA').length;

  //   const pendentesComuns = pendentesMedias;

  //   return {
  //     total,
  //     pendentesBaixas: pendentesBaixas / total,
  //     pendentesComuns: pendentesComuns / total,
  //     pendentesUrgentes: pendentesUrgentes / total,
  //   };
  // }, [incidents, bairro]);

  if (!info) return <div className="text-sm text-gray-500">Sem dados para o bairro {bairro}</div>;

  const pieData = [
    { name: 'Pend. Baixas', value: info.pendentesBaixas },
    { name: 'Pend. Médias', value: info.pendentesComuns },
    { name: 'Pend. Urgentes', value: info.pendentesUrgentes },
  ];

  return (
    <div className="p-4 w-[240px] flex flex-col items-center">
      {/* <h3 className="text-center font-semibold text-sm mb-2">{bairro}</h3> */}
      <PieChart width={180} height={130}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          innerRadius={35}
          outerRadius={50}
          dataKey="value"
        >
          {pieData.map((_, i) => (
            <Cell key={`cell-${i}`} fill={COLORS[i]} />
          ))}
        </Pie>
      </PieChart>
      <div className="text-center font-bold text-sm">{info.total} CASOS</div>
      <div className="mt-3 space-y-1 text-xs">
        <div className="bg-purple-600 text-white p-1 rounded text-center">
          {Math.round(info.pendentesBaixas * 100)}% Pendentes <span className="text-purple-300">Baixas</span>
        </div>
        <div className="bg-white border border-blue-700 text-blue-900 rounded p-1 text-center">
          {Math.round(info.pendentesComuns * 100)}% Pendentes <span className="text-yellow-500">Médias</span>
        </div>
        <div className="bg-white border border-red-500 text-red-600 rounded p-1 text-center">
          {Math.round(info.pendentesUrgentes * 100)}% Pendentes <span className="text-red-500">Urgentes</span>
        </div>
      </div>
    </div>
  );
}
