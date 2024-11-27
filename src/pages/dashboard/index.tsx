/* eslint-disable @typescript-eslint/no-explicit-any */ 

import React from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Layout from "@/components/layout";
import RevenueChart from "@/components/dashboard/RevenueChart"

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels, ArcElement);


type DashboardProps = {
  reportData: any;
  error: string | null;
};

const Dashboard: React.FC<DashboardProps> = ({ reportData, error }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "POST" });
      if (response.ok) {
        router.push("/login");
      } else {
        alert("Failed to logout. Please try again.");
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("An error occurred during logout.");
    }
  };

  if (error) {
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  }

  const barChartData = {
    labels: ["Products Launched", "Ongoing Product", "Product Sold"], // These are hidden
    datasets: [
      {
        label: "Products",
        data: [
          reportData?.sales_report?.product_launched || 233,
          reportData?.sales_report?.ongoing_product || 23,
          reportData?.sales_report?.product_sold || 482,
        ],
        backgroundColor: "#ccff00", // Bright lime green
        borderWidth: 0, // No border
        barThickness: 25, // Bar thickness to match original style
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Adjust chart to match container size
    indexAxis: "y", // Horizontal bars
    plugins: {
      legend: { display: false }, // Hide legend
      tooltip: { enabled: false }, // Disable tooltips
      datalabels: {
        anchor: "end", // Attach labels near the start of bars
        align: "right", // Position labels on top of the bars
        offset: 0, // Move labels further above the bars
        color: "#91544f", // Red labels
        font: {
          size: 14, // Adjust size to match original
          weight: "normal",
        },
        formatter: (value, context) => {
          // Custom formatter for the labels
          const labels = ["Launched", "Ongoing", "Sold"];
          return `${labels[context.dataIndex]} (${value})`;
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true, // Show vertical grid lines
          color: "#ddd", // Light gray color for grid lines
        },
        ticks: {
          beginAtZero: true, // Start X-axis at zero
          font: { size: 12 }, // Font size for ticks
          color: "#666", // Light gray ticks
        },
      },
      y: {
        grid: { display: false }, // Hide horizontal gridlines
        ticks: { display: false }, // Hide Y-axis labels
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 30, // Add padding to prevent text cut-off
        top: 10,
        bottom: 10,
      },
    },
  };



  const parsePercentage = (percentageString: any) => {
    return parseFloat(percentageString.replace("%", "")); // Remove "%" and convert to float
  };

  // Extract and parse data from the reportData
  const viewCount = parsePercentage(reportData.total_view_perfomance.view_count);
  const percentage = parsePercentage(reportData.total_view_perfomance.percentage);
  const sales = parsePercentage(reportData.total_view_perfomance.sales);

  const performanceChartData = {
    labels: ["View Count", "Percentage", "Sales"],
    datasets: [
      {
        data: [viewCount, percentage, sales], // View count, percentage, sales
        backgroundColor: ["#ccff00", "#062606", "#ff9900"], // Colors
        hoverBackgroundColor: ["#bbff00", "#055506", "#e68a00"], // Hover effects
      },
    ],
  };

  // Options for the chart
  const performanceChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%", // Creates the donut shape
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${tooltipItem.raw}%`, // Tooltip display
        },
      },
      // Custom plugin to render text in the middle
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

  // Custom Plugin to Display Text in the Center
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw(chart: any, args: any, options: any) {
      const { width } = chart;
      const { height } = chart;
      const ctx = chart.ctx;

      // Calculate the center position
      const centerX = width / 2;
      const centerY = height / 2;

      // Draw the main text (Total Count)
      ctx.save();
      ctx.font = `${options.fontSize}px Arial`;
      ctx.fillStyle = options.fontColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(options.text, centerX, centerY - 10); // Position above the subtext
      ctx.restore();

      // Draw the subtext (e.g., Total Count)
      ctx.save();
      ctx.font = `${options.subtextFontSize}px Arial`;
      ctx.fillStyle = options.subtextColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(options.subtext, centerX, centerY + 15); // Position below the main text
      ctx.restore();
    },
  };

  // Register the plugin
  ChartJS.register(centerTextPlugin);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-between items-center p-6">
          <h1 className="text-2xl font-bold">Sales Admin</h1>
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
        <div className="grid w-full grid-cols-1" style={{ gridTemplateColumns: '2fr 1fr' }}>

          <div className="">
            <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-6 p-6">

              <div className="bg-green-900 text-white p-6 rounded-lg w-30">
                <div className="flex items-center mb-4">
                  <div className="h-2 w-2 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium">Update</span>
                </div>
                <div className="mb-2 text-gray-400 text-xs">Feb 12th 2024</div>
                <div className="text-lg font-semibold leading-snug">
                  Sales revenue increased{" "}
                  <span className="text-green-400">40%</span> in 1 week
                </div>
                <a
                  href="#"
                  className="mt-4 block text-gray-400 text-sm underline hover:text-white"
                >
                  See Statistics
                </a>
              </div>

              <div className="flex flex-col justify-between bg-white border border-gray-200 rounded-lg p-4 w-30 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">Net Income</span>
                  <div className="text-gray-400 text-lg font-semibold cursor-pointer">...</div>
                </div>
                <div className="text-3xl font-bold text-black flex items-baseline mb-4">
                  <span className="text-3xl mr-1"></span>{reportData?.net_income?.amount || 0} {reportData?.net_income?.currency || ""}
                </div>
                <div className="flex items-center gap-1 text-sm text-green-500">
                  <svg width="12pt" height="12pt" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                    <path d="m132 1068v-1068h-132v1200h1200v-132z" fill="#47d754" />
                    <path d="m852.37 283.31 91.898 70.582-191.73 230.98-215.12-170.7-307.74 358.97 77.062 66.07 244.04-284.78 216.27 171.68 257.56-309.61 91.391 71.074v-270.78z" fill="#47d754" />
                  </svg>

                  +{reportData?.net_income?.percentage_change || 0} <p className="text-gray-500 ml-1">from last month</p>
                </div>
              </div>

              <div className="flex flex-col justify-between bg-white border border-gray-200 rounded-lg p-4 w-30 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">Total Return</span>
                  <div className="text-gray-400 text-lg font-semibold cursor-pointer">...</div>
                </div>
                <div className="text-3xl font-bold text-black flex items-baseline mb-4">
                  <span className="text-3xl mr-1"></span>{reportData?.total_return?.amount || 0} {reportData?.total_return?.currency || ""}
                </div>
                <div className="flex items-center text-sm gap-1 text-red-500">
                  <svg width="12pt" height="12pt" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
                    <path d="m132 1068v-1068h-132v1200h1200v-132z" fill="red" />
                    <path d="m852.37 800.31 91.898 -70.582-191.73 -230.98-215.12 170.7-307.74 -358.97 77.062 -66.07 244.04 284.78 216.27 -171.68 257.56 309.61 91.391 -71.074v270.78z" fill="red" />
                  </svg>


                  {reportData?.total_return?.percentage_change || 0} <p className="text-gray-500 ml-1">from last month</p>
                </div>
              </div>
            </div>
            <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Report</CardTitle>
                  <CardDescription>Overview of sales metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <Bar data={barChartData} options={barChartOptions} />
                  </div>
                </CardContent>
              </Card>
              <RevenueChart data={reportData.revenue} />
              {/* <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>Revenue vs. Expenses over the last 6 weeks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                   
                    <Bar data={revenueChartData} options={revenueChartOptions} />
                  </div>
                </CardContent>
              </Card> */}
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <div className="chart-container" style={{ width: "auto", height: "200px" }}>
              <h3 className="text-center text-lg font-bold text-black">Total View Performance</h3>
              <Doughnut data={performanceChartData} options={performanceChartOptions} />
            </div>
            <Card className="col-span-1 lg:col-span-3 bg-green-50">
              <CardContent className="flex flex-col items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">Level up your sales management</p>
                  <p className="text-gray-600">Upgrade to unlock advanced features.</p>
                </div>
                <Button color="success" className="mt-4 lg:mt-0">
                  Upgrade to Siohioma+
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Server-side API call
export const getServerSideProps = async (context: any) => {
  const { req } = context;
  const token = req.cookies?.token;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const response = await axios.get("https://rb-playground.onrender.com/internal/api/v1/report/summary/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return {
      props: {
        reportData: response.data.data,
        error: null,
      },
    };
  } catch (error: any) {
    return {
      props: {
        reportData: null,
        error: error.response?.data?.message || "Failed to fetch report data",
      },
    };
  }
};

export default Dashboard;
