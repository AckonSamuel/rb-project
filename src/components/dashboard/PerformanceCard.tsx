"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Chart as ChartJS, ArcElement, Tooltip, ChartOptions } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { FC } from "react";
import { Doughnut } from "react-chartjs-2";
import { Button } from "../ui/button";

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

interface PerfomanceData {
    data: any;
}

const PerfomanceChart: FC<PerfomanceData> = ({ data }) => {
    const parsePercentage = (percentageString: any) => {
        return parseFloat(percentageString.replace("%", ""));
    };

    const viewCount = parsePercentage(data.view_count);
    const percentage = parsePercentage(data.percentage);
    const sales = parsePercentage(data.sales);

    const performanceChartData = {
        labels: ["View Count", "Percentage", "Sales"],
        datasets: [
            {
                data: [viewCount, percentage, sales],
                backgroundColor: ["#ccff00", "#062606", "#ff9900"],
                hoverBackgroundColor: ["#bbff00", "#055506", "#e68a00"],
            },
        ],
    };

    const performanceChartOptions: ChartOptions<"doughnut"> = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem: any) =>
                        `${tooltipItem.label}: ${tooltipItem.raw}%`,
                },
            },
            datalabels: {
                color: "#000", // Font color
                font: {
                    weight: "bold",
                    size: 14,
                },
                formatter: (value: number) => {
                    const percentage = `${value}%`;
                    return `${percentage}`; // Display percentage
                },
                anchor: "end",
                backgroundColor: "white",
                borderRadius: 100,
                padding: 8,

            },
            centerText: {
                text: "565K", // Total Count value
                subtext: "Total Count", // Description text
                fontSize: 20, // Font size for the main text
                subtextFontSize: 12, // Font size for subtext
                fontColor: "#000", // Font color
                subtextColor: "#666", // Subtext color
            },
        },
    };

    const centerTextPlugin = {
        id: "centerText",
        beforeDraw(chart: any, args: any, options: any) {
            const { width } = chart;
            const { height } = chart;
            const ctx = chart.ctx;

            const centerX = width / 2;
            const centerY = height / 2;

            ctx.save();
            ctx.font = `${options.fontSize}px Arial`;
            ctx.fillStyle = options.fontColor;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(options.text, centerX, centerY - 10);
            ctx.restore();

            ctx.save();
            ctx.font = `${options.subtextFontSize}px Arial`;
            ctx.fillStyle = options.subtextColor;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(options.subtext, centerX, centerY + 15);
            ctx.restore();
        },
    };

    ChartJS.register(centerTextPlugin);

    return (
        <div className="flex flex-col gap-4 chart-container border border-gray-800 rounded-lg px-4" style={{ width: "250px", height: "380px" }}>
            <div className="border-b border-gray-500 py-2">
                <h3 className="text-center text-md font-bold text-gray-900">Total View Performance</h3>
            </div>
            <div className=""><Doughnut data={performanceChartData} options={performanceChartOptions} /></div>
            <p className="text-xs text-gray-700 text-center">Here are some tips on how to improve your score</p>
            <Button variant="outline" className="border-gray-800 text-gray-800">Guide views</Button>
            <div className="flex items-center border-t border-gray-500 gap-2 pt-4">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-inch-worm rounded-sm"></div>
                    <span className="text-xs text-gray-600">View Count</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-emerald rounded-sm"></div>
                    <span className="text-xs text-gray-600">Percentage</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-copper-rust rounded-sm"></div>
                    <span className="text-xs text-gray-600">Sales</span>
                </div>
            </div>
        </div>
    );
};

export default PerfomanceChart;
