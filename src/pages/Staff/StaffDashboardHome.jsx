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
import { TrendingUp, ShoppingBag, ShoppingCart, CreditCard } from "lucide-react";

// Register chart.js components for bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const productsData = [80, 90, 100, 110, 120, 130];
const ordersData = [60, 70, 75, 80, 85, 90];
const paymentsData = [40, 50, 60, 65, 70, 75];

const chartData = {
  labels,
  datasets: [
    {
      label: "Products",
      data: productsData,
      backgroundColor: "#18181b", // Zinc-950
      borderRadius: 4,
      barPercentage: 0.6,
      categoryPercentage: 0.7,
    },
    {
      label: "Orders",
      data: ordersData,
      backgroundColor: "#71717a", // Zinc-500
      borderRadius: 4,
      barPercentage: 0.6,
      categoryPercentage: 0.7,
    },
    {
      label: "Payments",
      data: paymentsData,
      backgroundColor: "#e4e4e7", // Zinc-200
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
        font: { size: 10, family: "inherit" },
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
        font: { size: 10 },
      },
    },
    y: {
      grid: {
        color: "#f4f4f5",
        borderDash: [4, 4],
      },
      ticks: {
        color: "#71717a",
        font: { size: 10 },
      },
      border: { display: false },
    },
  },
};

const StatCard = ({ label, value, icon: Icon, trend }) => (
  <div className="bg-white p-4 md:p-6 rounded-xl border border-zinc-200 shadow-sm flex flex-col gap-3 md:gap-4">
    <div className="flex items-center justify-between">
      <div className="p-1.5 md:p-2 bg-zinc-50 rounded-lg">
        <Icon className="w-4 h-4 md:w-5 md:h-5 text-zinc-900" />
      </div>
      {trend && <span className="text-[10px] md:text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{trend}</span>}
    </div>
    <div>
      <h3 className="text-xs md:text-sm font-medium text-zinc-500 mb-0.5 md:mb-1">{label}</h3>
      <p className="text-xl md:text-2xl font-bold text-zinc-900 tracking-tight">{value}</p>
    </div>
  </div>
);

const StaffDashboardHome = () => {
  const stats = {
    products: productsData[productsData.length - 1],
    orders: ordersData[ordersData.length - 1],
    payments: paymentsData[paymentsData.length - 1],
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900">Staff Overview</h1>
        <p className="text-zinc-500 text-sm md:text-base">Welcome back, here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatCard label="Total Products" value={stats.products} icon={ShoppingBag} trend="+12.5%" />
        <StatCard label="Total Orders" value={stats.orders} icon={ShoppingCart} trend="+8.2%" />
        <StatCard label="Total Payments" value={stats.payments} icon={CreditCard} trend="+5.3%" />
      </div>

      <div className="bg-white p-4 md:p-6 rounded-xl border border-zinc-200 shadow-sm">
        <h3 className="text-base md:text-lg font-semibold text-zinc-900 mb-4 md:mb-6">Performance Analytics</h3>
        <div className="h-[250px] md:h-[350px] w-full">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default StaffDashboardHome;
