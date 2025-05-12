'use client';

import { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';

const data = [
  { bairro: 'CRUZ DAS ALMAS', casos: 12 },
  { bairro: 'MANGABEIRAS', casos: 17 },
  { bairro: 'CIDADE UNIVERSITÁRIA', casos: 23 },
  { bairro: 'PAJUÇARA', casos: 20 },
  { bairro: 'SANTA LUCIA', casos: 19 },
  { bairro: 'CANAÃ', casos: 6 },
  { bairro: 'FAROL', casos: 3 },
];

export default function GraficoCasos({ onSelectBairro }) {
  const [bairroSelecionado, setBairroSelecionado] = useState('PAJUÇARA');

  const handleClick = (entry) => {
    setBairroSelecionado(entry.bairro);
    onSelectBairro(entry.bairro);
  };

  return (
    <div className="w-full h-[350px] p-4">
      <h2 className="text-center font-bold text-lg mb-4">Casos diários por bairro</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="bairro"
            interval={0}
            angle={-90}
            textAnchor="end"
            tick={{ fontSize: 10 }}
            height={120}
          />
          <YAxis hide />
          <Tooltip
            cursor={{ fill: 'rgba(0,0,0,0.05)' }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-black text-white px-2 py-1 rounded text-xs">
                    {payload[0].value}
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="casos">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                cursor="pointer"
                fill={
                  entry.bairro === bairroSelecionado ? '#000000' : '#9333ea'
                }
                onClick={() => handleClick(entry)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
