/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import BarLoader from 'react-spinners/BarLoader'
import Layout from "@/components/layout";
import RevenueChart from "@/components/dashboard/RevenueChart";
import SalesReport from "@/components/dashboard/SalesReport";
import NetIncomeCard from "@/components/dashboard/summary-cards/NetIncome";
import TotalReturnCard from "@/components/dashboard/summary-cards/TotalReturns";
import UpdateCard from "@/components/dashboard/summary-cards/UpdateCard";
import DashboardDatePicker from "@/components/DashboardDatePicker";
import PerformanceCard from "@/components/dashboard/PerformanceCard";
import UpgradeCard from "@/components/dashboard/UpgradeCard";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels, ArcElement);

type DashboardProps = {
  token: string | null;
};

const Dashboard: React.FC<DashboardProps> = ({ token }) => {
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportData = async () => {
      if (!token) {
        setError("No authentication token");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("/api/report-summary", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setReportData(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch report data");
        setLoading(false);
      }
    };

    fetchReportData();
  }, [token]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <BarLoader color="#212121" loading={true} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="grid w-full grid-cols-1" style={{ gridTemplateColumns: '4fr 1fr' }}>
          <div className="">
            <div className="flex justify-between items-start p-6">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-gray-800 -mt-4">Dashboard</h1>
                <p className="text-gray-500 text-xs">An any way to manage sales with care and precision</p>
              </div>
              <DashboardDatePicker className="text-gray-500 -mt-4"/>
            </div>
            <div className="grid w-full grid-cols-1 -mt-4 md:grid-cols-3 gap-2 p-6">
              <UpdateCard data={reportData.update}/>
              <NetIncomeCard data={reportData.net_income} />
              <TotalReturnCard data={reportData.total_return} />
            </div>
            <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <Card className="pt-8 bg-[#F8F8F8]">
                <SalesReport data={reportData.sales_report} />
              </Card>
              <Card className="bg-[#F5F2F3]">
                <RevenueChart data={reportData.revenue} />
              </Card>
            </div>
          </div>
          <div className="flex flex-col mt-8 gap-10">
            <PerformanceCard data={reportData.total_view_perfomance} />
            <UpgradeCard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  const { req } = context;
  const token = req.cookies?.token;

  console.log(token);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token,
    },
  };
};

export default Dashboard;