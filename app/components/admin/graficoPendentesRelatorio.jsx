'use client'

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts'

export default function GraficoPendentesRelatorio() {
  const totalCasos = 34
  const resolvidosNoPrazo = 34
  const pendentes = 23
  const urgentes = 15

  const donutData = [
    { name: 'No Prazo', value: resolvidosNoPrazo },
    { name: 'Fora do Prazo', value: 100 - resolvidosNoPrazo },
  ]

  const COLORS = ['#9333ea', '#f43f5e']

  return (
    <div className="w-4/6 h-auto rounded-xl p-4 flex flex-col items-center gap-2">
      <div className="text-center text-black font-semibold">DEF. CIVIL</div>
      <div className="w-32 h-32 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={donutData}
              innerRadius={40}
              outerRadius={60}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {donutData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="font-bold text-lg">{totalCasos}</p>
          <p className="text-xs">casos</p>
        </div>
      </div>

      <div className="bg-purple-600 text-white text-sm px-3 py-2 rounded-md w-full text-center">
        {resolvidosNoPrazo}% dos {34} casos resolvidos, a empresa conseguiu cumprir dentro do prazo.
      </div>

      <div className="flex items-center justify-start w-full gap-2 text-sm px-3 py-1 border rounded-md bg-white">
        <div className="w-5 font-bold text-purple-600">{pendentes}</div>
        <span>
          São Pendentes <span className="text-yellow-500 font-semibold">médias</span> ou <span className="text-green-600 font-semibold">baixas</span> prioridade
        </span>
      </div>

      <div className="flex items-center justify-start w-full gap-2 text-sm px-3 py-1 border rounded-md bg-white">
        <div className="w-5 font-bold text-red-600">{urgentes}</div>
        <span>
          Dos pendentes são <span className="text-red-600 font-semibold">urgentes</span>
        </span>
      </div>
    </div>
  )
}
