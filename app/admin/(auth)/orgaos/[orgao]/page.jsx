"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/services/api";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const COLORS = ["#ef4444", "#facc15", "#10b981"];

export default function OrgaoPage() {
  const { orgao } = useParams();
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function fetchDados() {
      try {
        const res = await api.get("/incidents");
        const filtrados = res.data.filter(item => item.entity === orgao);
        setDados(filtrados);
      } catch (err) {
        console.error("Erro ao buscar dados do órgão:", err);
        setDados([]);
      } finally {
        setCarregando(false);
      }
    }

    fetchDados();
  }, [orgao]);

  const gerarPDF = () => {
    const elemento = document.getElementById('relatorio-orgao');

    html2canvas(elemento, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pageWidth - 20;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let position = 10;

      pdf.addImage(imgData, 'PNG', 10, position, pdfWidth, pdfHeight);
      pdf.save(`relatorio_${orgao}.pdf`);
    });
  };

  const total = dados.length;
  const urgentes = dados.filter(i => i.status === "ALTA").length;
  const medias = dados.filter(i => i.status === "MÉDIA").length;
  const baixas = dados.filter(i => i.status === "BAIXA").length;

  const bairros = [...new Set(dados.map(d => d.bairro))];

  const graficoBairro = bairros.map(b => ({
    bairro: b,
    casos: dados.filter(d => d.bairro === b).length,
  }));

  const graficoStatus = [
    { name: "Alta", value: urgentes },
    { name: "Média", value: medias },
    { name: "Baixa", value: baixas },
  ];

  if (carregando) return <div className="p-6">Carregando dados...</div>;

  return (
    <div className="p-6 space-y-8" id="relatorio-orgao">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-purple-700">Órgão: {orgao}</h1>
        <div className="flex items-center gap-2" onClick={() => window.history.back()}>
          <button>
            <span className="text-2xl text-purple-700 font-bold">Voltar</span>
          </button>
            <ArrowUturnLeftIcon className="h-6 w-6 text-purple-700" />
        </div>
      </div>

      {/* Indicadores */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-purple-100 rounded-xl p-4 text-center">
          <p className="text-lg font-bold">{total}</p>
          <p className="text-sm text-gray-600">Total de Ocorrências</p>
        </div>
        <div className="bg-red-100 rounded-xl p-4 text-center">
          <p className="text-lg font-bold">{urgentes}</p>
          <p className="text-sm text-gray-600">Urgentes</p>
        </div>
        <div className="bg-green-100 rounded-xl p-4 text-center">
          <p className="text-lg font-bold">{baixas}</p>
          <p className="text-sm text-gray-600">Baixa Urgência</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Gráfico por Bairro */}
        <div className="bg-white rounded-xl p-4 border">
          <h3 className="text-md font-semibold mb-2">Ocorrências por Bairro</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={graficoBairro}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="bairro" angle={-30} textAnchor="end" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="casos" fill="#9333ea" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Status */}
        <div className="bg-white rounded-xl p-4 border">
          <h3 className="text-md font-semibold mb-2">Distribuição de Urgência</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={graficoStatus}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {graficoStatus.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-xl p-4 border">
        <h3 className="text-md font-semibold mb-4">Solicitações</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-purple-200">
              <tr>
                <th className="p-2">Problema</th>
                <th className="p-2">Categoria</th>
                <th className="p-2">Status</th>
                <th className="p-2">Data</th>
                <th className="p-2">Bairro</th>
              </tr>
            </thead>
            <tbody>
              {dados.map(d => (
                <tr key={d.id} className="text-center hover:bg-gray-50">
                  <td className="p-2">{d.incident}</td>
                  <td className="p-2">{d.category}</td>
                  <td className="p-2">{d.status}</td>
                  <td className="p-2">
                    {new Date(d.created_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="p-2">{d.bairro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={gerarPDF}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          Exportar Relatório PDF
        </button>
      </div>
    </div>
  );
}
