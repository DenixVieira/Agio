"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart"

export const description = "A bar chart"


const chartConfig = {
  media: {
    label: "Preço Médio",
    color: "var(--chart-1)",
  },
};

export function ValoresPorBairro({
  chartData,
}: {
  chartData: BairroResumo[];
}) {


  console.log(chartData)
  // ---- 🔥 FILTRAR OS 10 BAIRROS COM MAIS estabelecimentos ----
  const top10 = [...chartData]
    .sort((a, b) => b.estabelecimentos - a.estabelecimentos)
    .slice(0, 10);

  return (
    <div className="w-full md:w-1/3">
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Valores vendidos nos bairros</CardTitle>
          <CardDescription>
            Preço médio dos valores máximo do produto em determinados bairros
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="w-full h-[350px] aspect-auto"
          >
            <BarChart data={top10} layout="vertical">
              <CartesianGrid vertical={false} />

              {/* 🧭 Eixo Y mostra o nome do bairro */}
              <YAxis dataKey="bairro" type="category" width={90} />

              {/* 📏 Eixo X baseado na quantidade de estabelecimentos */}
              <XAxis
                type="number"
                tickFormatter={(value) => `${value} estabelecimentos`}
              />

              {/* Tooltip customizado */}
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value, _, data) => (
                      <>
                        <p><strong>Bairro:</strong> {data.payload.bairro}</p>
                        <p><strong>Média:</strong> R$ {data.payload.media.toFixed(2)}</p>
                        <p><strong>estabelecimentos:</strong> {data.payload.estabelecimentos}</p>
                      </>
                    )}
                  />
                }
              />

              {/* 📌 BARRA COM TEXTO DA MÉDIA DENTRO */}
              <Bar
                dataKey="estabelecimentos"
                fill="var(--color-media)"
                radius={6}
                label={({ x, y, width, payload }) => {
                  if (!payload?.payload) return null;

                  return (
                    <text
                      x={x + width - 10}
                      y={y + 15}
                      fill="#fff"
                      fontSize={12}
                      textAnchor="end"
                      fontWeight="bold"
                    >
                      R$ {payload.payload.media.toFixed(2)}
                    </text>
                  );
                }}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>

        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Exibindo os bairros mais relevantes <TrendingUp className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}