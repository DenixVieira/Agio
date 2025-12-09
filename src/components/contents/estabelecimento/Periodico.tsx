"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { ChartConfig } from "../../ui/chart"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A simple area chart"

const chartConfig = {
  quantidade: {
    label: "Quantidade",
    color: "var(--chart-1)",
  },
  totalVendido: {
    label: "Receita",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function Periodico({ chartData }: { chartData: any[] }) {

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gráfico Períodico de Receita</CardTitle>
        <CardDescription>
          Receita adquirida nos últimos 6 dias!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}
          className="w-full h-[300px] aspect-auto">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="dia"
              tickLine={true}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 5)}
            />
            <ChartTooltip
              cursor={false}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;

                const data = payload[0].payload;

                return (
                  <div className="rounded-md border bg-background p-2 text-sm shadow-md">
                    <p className="font-medium">{data.dia}</p>
                    <p>📦 quantidade: <b>{data.quantidade}</b></p>
                    <p>💰 Receita: <b>R$ {data.totalVendido.toFixed(2)}</b></p>
                  </div>
                );
              }}
            />
            <Area
              dataKey="totalVendido"
              type="natural"
              fill="var(--color-totalVendido)"
              fillOpacity={0.4}
              stroke="var(--color-totalVendido)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
