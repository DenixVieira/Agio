"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import type { ChartConfig } from "../../ui/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart"

export const description = "A bar chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ValoresPorQuantidade({ chartData }: { chartData: any[] }) {

  // 🔥 Ordenar por quantidade (mais usados primeiro) e pegar só os Top 10
  const top10 = [...chartData]
    .sort((a, b) => b.quantidade - a.quantidade)
    .slice(0, 10)
    .map((item) => ({
      ...item,
      valorFormatado: Number(item.valor).toFixed(2),
    }));

  return (
    <div className="w-1/3 ">
      <Card>
        <CardHeader>
          <CardTitle>Top 10 valores mais usados</CardTitle>
          <CardDescription>Ranking de valores x quantidade vendido por postos.</CardDescription>
        </CardHeader>

        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="w-full h-[300px] aspect-auto"
          >
            <BarChart accessibilityLayer data={top10}>
              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="valorFormatado"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => `R$ ${value}`}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              <Bar
                dataKey="quantidade"
                fill="var(--color-desktop)"
                radius={8}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>

        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Exibindo apenas os valores mais usados <TrendingUp className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}