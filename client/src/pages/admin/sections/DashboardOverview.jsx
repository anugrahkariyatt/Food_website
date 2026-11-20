import { Icon, StatCard, StatusBadge, BarChart } from '../../../components/admin/AdminShared';
import { Icons, WEEKLY_SALES, DAYS, TOP_ITEMS } from '../../../utils/adminData';

export default function DashboardOverview({ orders, menu, onAddItem, onViewOrders }) {
  const totalSales = orders.filter(o => o.status === "Delivered").reduce((s, o) => s + o.total, 0);
  const pending = orders.filter(o => o.status === "Pending").length;
  const available = menu.filter(m => m.available).length;

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: "#2d1a4a", marginBottom: 4 }}>Good morning, Owner! 👋</h2>
        <p style={{ color: "#9b8cac", fontSize: 14 }}>Here's what's happening at Soulful Meals today.</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 28 }}>
        <StatCard label="Today's Revenue" value={`₹${totalSales.toLocaleString()}`} sub="From delivered orders" icon="analytics" color="#7b2fbe" index={0} />
        <StatCard label="Total Orders" value={orders.length} sub="All time today" icon="orders" color="#3b82f6" index={1} />
        <StatCard label="Pending Orders" value={pending} sub="Need attention" icon="package" color="#f59e0b" index={2} />
        <StatCard label="Menu Items Live" value={available} sub={`of ${menu.length} total`} icon="star" color="#22c55e" index={3} />
      </div>

      {/* Quick Actions */}
      <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
        <button onClick={onAddItem} style={{ background: "linear-gradient(135deg,#7b2fbe,#9b59b6)", color: "#fff", border: "none", borderRadius: 12, padding: "11px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <Icon d={Icons.plus} size={16} /> Add New Item
        </button>
        <button onClick={onViewOrders} style={{ background: "#f5f0fb", color: "#7b2fbe", border: "2px solid #e8daf5", borderRadius: 12, padding: "11px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <Icon d={Icons.orders} size={16} /> View Today's Orders
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Sales Chart */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f0e8fa", boxShadow: "0 2px 12px rgba(123,47,190,0.06)" }}>
          <p style={{ fontWeight: 800, fontSize: 16, color: "#2d1a4a", marginBottom: 4 }}>Weekly Sales</p>
          <p style={{ fontSize: 12, color: "#9b8cac", marginBottom: 16 }}>Revenue this week</p>
          <BarChart data={WEEKLY_SALES} labels={DAYS} />
        </div>

        {/* Top Selling */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f0e8fa", boxShadow: "0 2px 12px rgba(123,47,190,0.06)" }}>
          <p style={{ fontWeight: 800, fontSize: 16, color: "#2d1a4a", marginBottom: 16 }}>Top Selling Items 🔥</p>
          {TOP_ITEMS.map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: i < 4 ? "1px solid #f5f0fb" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 20, height: 20, borderRadius: 6, background: i === 0 ? "#7b2fbe" : "#e8daf5", color: i === 0 ? "#fff" : "#7b2fbe", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#3d2060" }}>{item.name}</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#7b2fbe" }}>₹{item.revenue.toLocaleString()}</p>
                <p style={{ fontSize: 10, color: "#9b8cac" }}>{item.orders} orders</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f0e8fa", boxShadow: "0 2px 12px rgba(123,47,190,0.06)" }}>
        <p style={{ fontWeight: 800, fontSize: 16, color: "#2d1a4a", marginBottom: 16 }}>Recent Orders</p>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#faf7ff" }}>
                {["Order ID", "Customer", "Total", "Status", "Time"].map(h => (
                  <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, color: "#9b8cac", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map(o => (
                <tr key={o.id} style={{ borderBottom: "1px solid #f5f0fb" }}>
                  <td style={{ padding: "12px 14px", fontWeight: 700, color: "#7b2fbe" }}>{o.id}</td>
                  <td style={{ padding: "12px 14px", color: "#3d2060" }}>{o.customer}</td>
                  <td style={{ padding: "12px 14px", fontWeight: 700, color: "#2d1a4a" }}>₹{o.total}</td>
                  <td style={{ padding: "12px 14px" }}><StatusBadge status={o.status} /></td>
                  <td style={{ padding: "12px 14px", color: "#9b8cac" }}>{o.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}