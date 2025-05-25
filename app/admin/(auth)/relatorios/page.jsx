'use client'
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";

import GraficoDemandasRelatorio from "../../../components/admin/graficoDemandasRelatorios";
import GraficoPendentesRelatorio from "../../../components/admin/graficoPendentesRelatorio";
import TabelaRelatorios from "../../../components/admin/tabelaRelatorios";
import PageTitle from "../../../components/PageTitle";

export default function AdminRelatorios() {

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <PageTitle button={[
        <Button key="baixar" color="primary" endContent={<ArrowDownTrayIcon className="h-5 w-5" />} href="/admin/relatorios/download">
            Baixar Relatório
        </Button>
      ]} title="Relatórios" />
      <div className="flex flex-col gap-4 w-full items-center">
        <TabelaRelatorios />
      </div>
      <div className="flex w-full gap-4 justify-between pb-6">
        <Card className="grow">
          <CardHeader>
            <h2>Gráfico de demandas</h2>
          </CardHeader>
          <CardBody>
            <GraficoDemandasRelatorio />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <h2>Defesa Civil</h2>
          </CardHeader>
          <CardBody>
            <GraficoPendentesRelatorio />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
