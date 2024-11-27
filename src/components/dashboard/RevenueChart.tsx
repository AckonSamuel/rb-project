"use client"

import { FC } from "react";
import { Bar } from "react-chartjs-2";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

interface RevenueData {
    data: any;
}
const RevenueChart: FC<RevenueData> = ({ data }) => {
    // Prepare data for the Revenue Breakdown chart 
    const revenueBreakdown = data.break_down || [];
    const weeks = revenueBreakdown.map((item: any) => `Week ${item.week}`);
    const revenueData = revenueBreakdown.map((item: any) => parseFloat(item.revenue));
    const expenseData = revenueBreakdown.map((item: any) => parseFloat(item.expense));
    const revenueChartData = {
        labels: weeks, datasets: [{
            label: "Income", data: revenueData, backgroundColor: "#062606", // Bright lime green 
            borderColor: "#062606", borderWidth: 2, barThickness: 15,
        }, {
            label: "Expense", data: expenseData, backgroundColor: "#47d754", // Red for expenses 
            borderColor: "#47d754", borderWidth: 2, barThickness: 15,
        },],
    }; const revenueChartOptions = {
        responsive: true, maintainAspectRatio: false, plugins: {
            legend: {
                display: false, // Hide the legend completely 
            }, tooltip: { enabled: true }, datalabels: { anchor: "end", align: "right", offset: 2000, color: "#fff", font: { size: 12, weight: "normal" }, },
        }, scales: {
            x: { ticks: { display: false }, grid: { display: false }, categoryPercentage: 0.8 }, y: {
                ticks: { display: false }, // Hide Y-axis labels 
                grid: { display: false },
            }, barPercentage: 0.5,
        },
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Revenue vs. Expenses over the last 6 weeks</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-64">
                    <Bar data={revenueChartData} options={revenueChartOptions} />
                </div>
            </CardContent>
        </Card>
    )
}

export default RevenueChart;
