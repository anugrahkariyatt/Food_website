import { StatCard } from '../../../components/admin/AdminShared';
import { TOP_ITEMS } from '../../../utils/adminData';

export default function Analytics() {
  const monthly = [145000, 162000, 138000, 178000, 195000, 211000, 203000, 225000, 189000, 240000, 228000, 255000];
  const monthLabels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const max = Math.max(...monthly);

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 900, color: "#2d1a4a", marginBottom: 20 }}>Reports & Analytics</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 24 }}>
        <StatCard label="This Month" value="₹2,55,000" sub="+12% vs last month" icon="analytics" color="#7b2fbe" index={0} />
        <StatCard label="Avg Order Value" value="₹425" sub="Per transaction" icon="orders" color="#3b82f6" index={1} />
        <StatCard label="Orders This Month" value="600" sub="Fulfilled" icon="package" color="#22c55e" index={2} />
        <StatCard label="Repeat Customers" value="68%" sub="Return rate" icon="users" color="#f59e0b" index={3} />
      </div>

      {/* Monthly Chart */}
      <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f0e8fa", boxShadow: "0 2px 12px rgba(123,47,190,0.06)", marginBottom: 20 }}>
        <p style={{ fontWeight: 800, fontSize: 16, color: "#2d1a4a", marginBottom: 4 }}>Monthly Revenue (2024)</p>
        <p style={{ fontSize: 12, color: "#9b8cac", marginBottom: 20 }}>Full year overview</p>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 140 }}>
          {monthly.map((v, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: "100%", height: `${(v / max) * 100}%`, background: i === 11 ? "linear-gradient(180deg,#7b2fbe,#9b59b6)" : "linear-gradient(180deg,#e8daf5,#d4b8f0)", borderRadius: "6px 6px 0 0", minHeight: 8 }} />
              <span style={{ fontSize: 9, color: "#9b8cac", fontWeight: 600 }}>{monthLabels[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Category breakdown */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f0e8fa", boxShadow: "0 2px 12px rgba(123,47,190,0.06)" }}>
          <p style={{ fontWeight: 800, fontSize: 16, color: "#2d1a4a", marginBottom: 16 }}>Orders by Category</p>
          {[
            { cat: "Main Course", pct: 38, color: "#7b2fbe" },
            { cat: "Pizza", pct: 25, color: "#9b59b6" },
            { cat: "Biryani/Rice", pct: 18, color: "#c084fc" },
            { cat: "Starter", pct: 11, color: "#ddd6fe" },
            { cat: "Others", pct: 8, color: "#ede9fe" },
          ].map(({ cat, pct, color }) => (
            <div key={cat} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13 }}>
                <span style={{ color: "#3d2060", fontWeight: 600 }}>{cat}</span>
                <span style={{ color: "#7b2fbe", fontWeight: 800 }}>{pct}%</span>
              </div>
              <div style={{ height: 8, background: "#f0e8fa", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 4, transition: "width 1s ease" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Top items */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #f0e8fa", boxShadow: "0 2px 12px rgba(123,47,190,0.06)" }}>
          <p style={{ fontWeight: 800, fontSize: 16, color: "#2d1a4a", marginBottom: 16 }}>Top 5 Revenue Items</p>
          {TOP_ITEMS.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: i === 0 ? "linear-gradient(135deg,#7b2fbe,#9b59b6)" : "#f5f0fb", display: "flex", alignItems: "center", justifyContent: "center", color: i === 0 ? "#fff" : "#7b2fbe", fontWeight: 900, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#2d1a4a", marginBottom: 2 }}>{item.name}</p>
                <div style={{ height: 5, background: "#f0e8fa", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: `${(item.revenue / TOP_ITEMS[0].revenue) * 100}%`, height: "100%", background: "linear-gradient(90deg,#7b2fbe,#9b59b6)" }} />
                </div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 800, color: "#7b2fbe", whiteSpace: "nowrap" }}>₹{item.revenue.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}