import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const chartLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const usersData = [900, 1000, 1100, 1200, 1245, 1300];
const ordersData = [400, 420, 470, 500, 532, 550];
const revenueData = [8000, 9000, 10000, 11000, 12340, 13000];

const chartData = {
  labels: chartLabels,
  datasets: [
    {
      label: "Revenue",
      data: revenueData,
      backgroundColor: "#18181b", // Zinc-950
      borderRadius: 4,
      barPercentage: 0.6,
      categoryPercentage: 0.7,
    },
    {
      label: "Orders",
      data: ordersData,
      backgroundColor: "#a1a1aa", // Zinc-400
      borderRadius: 4,
      barPercentage: 0.6,
      categoryPercentage: 0.7,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "top",
      align: "end",
      labels: {
        color: "#52525b",
        usePointStyle: true,
        pointStyle: "circle",
        font: { size: 12, family: "inherit" },
      },
    },
    title: { display: false },
    tooltip: {
      backgroundColor: "#18181b",
      titleColor: "#fff",
      bodyColor: "#fff",
      padding: 12,
      cornerRadius: 8,
      displayColors: false,
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: {
        color: "#71717a",
        font: { size: 12 },
      },
    },
    y: {
      grid: {
        color: "#f4f4f5",
        borderDash: [4, 4],
      },
      ticks: {
        color: "#71717a",
        font: { size: 12 },
      },
      border: { display: false },
    },
  },
};

const StatCard = ({ label, value, trend }) => (
  <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex flex-col items-start gap-2">
    <h3 className="text-sm font-medium text-zinc-500">{label}</h3>
    <div className="flex items-end gap-3 w-full justify-between">
      <p className="text-3xl font-bold text-zinc-900 tracking-tight">{value}</p>
      {trend && (
         <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{trend}</span>
      )}
    </div>
  </div>
);

const DashboardHome = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Dashboard</h2>
        <p className="text-zinc-500">Overview of your store's performance.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Revenue" value="$12,340" trend="+12.5%" />
        <StatCard label="Total Orders" value="532" trend="+4.3%" />
        <StatCard label="Active Users" value="1,245" trend="+8.1%" />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 h-96">
        <h3 className="text-lg font-semibold text-zinc-900 mb-6">Revenue & Orders</h3>
        <div className="h-full pb-6">
           <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
