"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

interface SalesData {
    data: any;
}

const SalesReport: FC<SalesData> = ({ data }) => {
    const barChartData = [

        { label: "Launched", value: data.product_launched || 233, combined: `Product Launched ${data.product_launched || 233}` },
        { label: "Ongoing", value: data.ongoing_product || 23, combined: `Product Ongoing ${data.ongoing_product || 23}` },
        { label: "Sold", value: data.product_sold || 482, combined: `Product Sold ${data.product_sold || 482}` },
    ];

    const barChartConfig = {
        sold: { label: "Sold", color: "#9BF22B" },
        launched: { label: "Launched", color: "#9BF22B" },
        ongoing: { label: "Ongoing", color: "#9BF22B" },
    } satisfies ChartConfig;

    return (
        <div>
            <div className="flex justify-between items-center mb-2 px-4 -mt-6">
                <span className="text-lg font-medium text-gray-700">Sales Report</span>
                <div className="text-gray-700 text-lg font-semibold cursor-pointer">...</div>
            </div>
            <ChartContainer config={barChartConfig} className="w-60 h-56 bg-[#F8F8F8]">
                <ResponsiveContainer>
                    <BarChart
                        data={barChartData}
                        layout="vertical"
                        margin={{ top: 20, right: 40, bottom: 20, left: 30 }}
                    >
                        <CartesianGrid horizontal={false} />
                        <XAxis type="number" tickMargin={10} />
                        <YAxis
                            type="category"
                            dataKey="label"
                            tick={{ fontSize: 12 }}
                            axisLine={false}
                            tickLine={false}
                            hide
                        />
                        <Tooltip cursor={false} />
                        <Bar dataKey="value" fill="#9BF22B" radius={4} barSize={20}>
                            <LabelList
                                dataKey="combined"
                                position="right"
                                offset={4}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </div>
    );
};

export default SalesReport;
