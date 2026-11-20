// client/src/pages/admin/AdminDashboard.jsx
import { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
// Import Initial Data
import { INITIAL_ORDERS, INITIAL_MENU, INITIAL_CUSTOMERS } from "../../utils/adminData";

// Import Sections
import DashboardOverview from "./sections/DashboardOverview";
import ManageOrders from "./sections/ManageOrders"; // Create this
import ManageMenu from "./sections/ManageMenu";     // Create this
import ManageUsers from "./sections/ManageUsers";   // Create this
import Analytics from "./sections/Analytics";       // Create this

export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [menu, setMenu] = useState(INITIAL_MENU);
  const [customers] = useState(INITIAL_CUSTOMERS);

  const sideW = collapsed ? 64 : 220;
  const pendingCount = orders.filter(o => o.status === "Pending").length;

  const handleAddItemShortcut = () => setActive("menu");
  const handleViewOrdersShortcut = () => setActive("orders");

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f5f0fb", minHeight: "100vh" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .stat-card { animation: fadeUp .4s ease both; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:none; } }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: #f5f0fb; }
        ::-webkit-scrollbar-thumb { background: #d4b8f0; border-radius: 10px; }
        select:focus, input:focus { border-color: #7b2fbe !important; box-shadow: 0 0 0 3px rgba(123,47,190,0.12); }
        @media (max-width: 640px) { .main-content { margin-left: 64px !important; } }
      `}</style>

      <Sidebar active={active} setActive={setActive} collapsed={collapsed} setCollapsed={setCollapsed} orderCount={pendingCount} />

      <div className="main-content" style={{ marginLeft: sideW, transition: "margin-left .25s ease", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Topbar section={active} />
        <main style={{ flex: 1, padding: "28px", maxWidth: 1200 }}>
          {active === "dashboard" && <DashboardOverview orders={orders} menu={menu} onAddItem={handleAddItemShortcut} onViewOrders={handleViewOrdersShortcut} />}
          {active === "orders" && <ManageOrders orders={orders} setOrders={setOrders} />}
          {active === "menu" && <ManageMenu menu={menu} setMenu={setMenu} />}
          {active === "users" && <ManageUsers customers={customers} />}
          {active === "analytics" && <Analytics />}
        </main>
      </div>
    </div>
  );
}