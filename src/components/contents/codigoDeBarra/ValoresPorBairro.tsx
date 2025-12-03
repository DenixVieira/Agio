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

export function ValoresPorBairro() {
  return (
    <div className="w-1/3">

      <Card>
        <CardHeader>
          <CardTitle>Valores por bairro</CardTitle>
          <CardDescription>Gráfico de barras: Valores por bairro</CardDescription>
        </CardHeader>

        <CardContent>
          {/*  
          ATENÇÃO:
          - w-[800px] controla a largura
          - h-[300px] garante que o ResponsiveContainer tenha altura
          - aspect-auto remove o aspect-video padrão
        */}
          <ChartContainer
            config={chartConfig}
            className="w-full h-[300px] aspect-auto"
          >
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              {/*  
              fill usa a variável criada automaticamente pelo ChartStyle:
              --color-desktop
            */}
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>

        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
