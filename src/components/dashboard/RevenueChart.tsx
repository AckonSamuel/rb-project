"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */

import { BarChart, Bar, Tooltip, ResponsiveContainer } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { FC } from "react";

interface RevenueData {
    data: any;
}

const RevenueChart: FC<RevenueData> = ({ data }) => {
    // Prepare data for the Revenue Breakdown chart
    const revenueBreakdown = data.break_down || [];
    const chartData = revenueBreakdown.map((item: any) => ({
        week: `Week ${item.week}`,
        revenue: parseFloat(item.revenue),
        expense: parseFloat(item.expense),
    }));

    const chartConfig = {
        revenue: {
            label: "Revenue",
            color: "var(--color-revenue)",
        },
        expense: {
            label: "Expense",
            color: "var(--color-expense)",
        },
    } satisfies ChartConfig;

    return (
        <div>
            <div className="bg-white p-4 w-full max-w-sm">
                {/* Header */}
                <div className="flex justify-between items-center mb-4 border-b border-gray-500">
                    <h2 className="text-lg font-normal text-gray-800">Revenue</h2>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-green-800 rounded-sm"></div>
                            <span className="text-xs text-gray-600">Income</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-lime-400 rounded-sm"></div>
                            <span className="text-xs text-gray-600">Expenses</span>
                        </div>
                    </div>
                </div>
                {/* Revenue Display */}
                <div className="flex gap-2 mb-2">
                    <span className="flex text-xl font-bold gap-1 text-gray-900">
                        <p className="text-xs">{data.currency}</p>{data.amount}
                    </span>
                    <div className="flex items-center pt-1 gap-1 text-sm text-green-500">
                        <svg width="8pt" height="8pt" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                            <path d="m132 1068v-1068h-132v1200h1200v-132z" fill="#47d754" />
                            <path d="m852.37 283.31 91.898 70.582-191.73 230.98-215.12-170.7-307.74 358.97 77.062 66.07 244.04-284.78 216.27 171.68 257.56-309.61 91.391 71.074v-270.78z" fill="#47d754" />
                        </svg>

                        <p className="text-xs"> +{data.percentage_change || 0}</p> <p className="text-gray-500 ml-1 text-xs">from last month</p>
                    </div>
                </div>
            </div>
            <ChartContainer config={chartConfig} className="h-50 w-60">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barCategoryGap="20%" barGap={2}>
                        <Tooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                        <Bar dataKey="revenue" fill="#062606" radius={4} />
                        <Bar dataKey="expense" fill="#47d754" radius={4} />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer></div>
    );
};

export default RevenueChart;
