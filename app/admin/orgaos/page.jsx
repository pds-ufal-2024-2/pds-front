import React from "react";
import TabelaSolicitacoes from "../../components/admin/tabelaSolicitacoes";
import GraficoSolicitacoesBairro from "../../components/admin/graficoSolicitacoesBairro";

export default function AdminOrgaos() {
    
  return (
    <div className="flex justify-between text-center gap-2">
        <TabelaSolicitacoes />
        <GraficoSolicitacoesBairro />
        <h3>Página orgaos</h3>
    </div>
  );
}
