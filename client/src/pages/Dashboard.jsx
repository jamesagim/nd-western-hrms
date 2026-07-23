import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/ui/LoadingSpinner";

import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardCharts from "../components/dashboard/DashboardCharts";
import RecentEmployeesTable from "../components/dashboard/RecentEmployeesTable";
import RecentLeavesTable from "../components/dashboard/RecentLeavesTable";

import { getDashboard } from "../services/dashboardService";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboard();

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) {
    return (
      <LoadingSpinner
        text="Loading Dashboard..."
      />
    );
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-8">

          <DashboardStats
            stats={stats}
          />

          <DashboardCharts
            stats={stats}
          />

          <RecentEmployeesTable
            employees={stats.recentEmployees}
          />

          <RecentLeavesTable
            leaves={stats.recentLeaves}
          />

        </main>

      </div>

    </div>
  );
}

export default Dashboard;