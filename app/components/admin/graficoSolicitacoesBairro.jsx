'use client';
import { CardBody } from '@heroui/react';
import { useState, useEffect } from 'react';
import { LineChart, Line, Dot, CartesianGrid } from 'recharts';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import api from '@/services/api';

export default function GraficoCasos({ onSelectBairro }) {
  const [bairroSelecionado, setBairroSelecionado] = useState('');
  const [data, setData] = useState([]);

  const handleClick = (entry) => {
    setBairroSelecionado(entry.bairro);
    onSelectBairro(entry.bairro);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("incidents");
        const incidentes = res.data;

        // Agrupar por bairro
        const agrupado = incidentes.reduce((acc, incidente) => {
          const bairro = incidente.bairro || 'SEM BAIRRO';
          acc[bairro] = (acc[bairro] || 0) + 1;
          return acc;
        }, {});

        // Converter para array do gráfico
        const formatado = Object.entries(agrupado).map(([bairro, casos]) => ({
          bairro,
          casos,
        }));

        setData(formatado);
        if (formatado.length > 0) {
          setBairroSelecionado(formatado[0].bairro);
          onSelectBairro(formatado[0].bairro);
        }
      } catch (err) {
        console.error('Erro ao buscar incidentes:', err);
      }
    }

    fetchData();
  }, [onSelectBairro]);

  return (
    // <CardBody>
    //   <ResponsiveContainer height="100%" width="100%">
    //     <BarChart data={data}>
    //       <XAxis
    //         angle={-360}
    //         dataKey="bairro"
    //         height={120}
    //         interval={0}
    //         textAnchor="middle"
    //         tick={{ fontSize: 10 }}
    //       />
    //       <YAxis hide />
    //       <Tooltip
    //         content={({ active, payload }) => {
    //           if (active && payload && payload.length) {
    //             return (
    //               <div className="bg-black text-white px-2 py-1 rounded text-xs">
    //                 {payload[0].value}
    //               </div>
    //             );
    //           }
    //           return null;
    //         }}
    //         cursor={{ fill: 'rgba(0,0,0,0.05)' }}
    //       />
    //       <Bar dataKey="casos">
    //         {data.map((entry, index) => (
    //           <Cell
    //             key={`cell-${index}`}
    //             cursor="pointer"
    //             fill={entry.bairro === bairroSelecionado ? '#000000' : '#9333ea'}
    //             onClick={() => handleClick(entry)}
    //           />
    //         ))}
    //       </Bar>
    //     </BarChart>
    //   </ResponsiveContainer>
    // </CardBody>
    <CardBody>
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="bairro"
        angle={-30}
        interval={0}
        textAnchor="end"
        tick={{ fontSize: 10 }}
        height={60}
      />
      <YAxis />
      <Tooltip
        content={({ active, payload }) => {
          if (active && payload && payload.length) {
            return (
              <div className="bg-black text-white px-2 py-1 rounded text-xs">
                {payload[0].payload.bairro}: {payload[0].value} urgências
              </div>
            );
          }
          return null;
        }}
        cursor={{ stroke: '#9333ea', strokeWidth: 1, strokeDasharray: '5 5' }}
      />
      <Line
        type="monotone"
        dataKey="casos"
        stroke="#9333ea"
        strokeWidth={2}
        activeDot={{ r: 6, fill: '#000' }}
        dot={{ r: 4, fill: '#9333ea' }}
      />
    </LineChart>
  </ResponsiveContainer>
</CardBody> 
  );
}
