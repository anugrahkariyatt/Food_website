import { useState } from "react";
import { Icon, StatCard } from '../../../components/admin/AdminShared';
import { Icons } from '../../../utils/adminData';

const inputStyle = { width: "100%", padding: "10px 14px", border: "2px solid #e8daf5", borderRadius: 10, fontSize: 14, color: "#2d1a4a", background: "#faf7ff", outline: "none", boxSizing: "border-box", fontFamily: "inherit" };

export default function ManageUsers({ customers }) {
  const [search, setSearch] = useState("");
  const filtered = customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.includes(search));

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 900, color: "#2d1a4a", marginBottom: 20 }}>Customer Management</h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14, marginBottom: 24 }}>
        <StatCard label="Total Customers" value={customers.length} icon="users" color="#7b2fbe" index={0} />
        <StatCard label="Loyal (10+ orders)" value={customers.filter(c => c.orders >= 10).length} icon="star" color="#f59e0b" index={1} />
        <StatCard label="Total Revenue" value={`₹${customers.reduce((s, c) => s + c.spent, 0).toLocaleString()}`} icon="analytics" color="#22c55e" index={2} />
      </div>

      <div style={{ position: "relative", marginBottom: 16, maxWidth: 360 }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9b8cac" }}><Icon d={Icons.search} size={16} /></span>
        <input placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...inputStyle, paddingLeft: 36, background: "#fff" }} />
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0e8fa", overflow: "hidden", boxShadow: "0 2px 12px rgba(123,47,190,0.06)" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#faf7ff" }}>
                {["Customer", "Email", "Phone", "Orders", "Total Spent", "Joined", "Tag"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "#9b8cac", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} style={{ borderBottom: "1px solid #f5f0fb" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#faf7ff"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "13px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#7b2fbe,#9b59b6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 13, flexShrink: 0 }}>
                        {c.name.charAt(0)}
                      </div>
                      <span style={{ fontWeight: 700, color: "#2d1a4a" }}>{c.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "13px 16px", color: "#7c6b8e" }}>{c.email}</td>
                  <td style={{ padding: "13px 16px", color: "#7c6b8e" }}>{c.phone}</td>
                  <td style={{ padding: "13px 16px", fontWeight: 700, color: "#2d1a4a" }}>{c.orders}</td>
                  <td style={{ padding: "13px 16px", fontWeight: 700, color: "#7b2fbe" }}>₹{c.spent.toLocaleString()}</td>
                  <td style={{ padding: "13px 16px", color: "#9b8cac" }}>{c.joined}</td>
                  <td style={{ padding: "13px 16px" }}>
                    {c.orders >= 20 ? <span style={{ background: "#fef3c7", color: "#92400e", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>🏆 VIP</span>
                    : c.orders >= 10 ? <span style={{ background: "#ede9fe", color: "#5b21b6", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>⭐ Loyal</span>
                    : <span style={{ background: "#f0fdf4", color: "#15803d", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>🆕 New</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}