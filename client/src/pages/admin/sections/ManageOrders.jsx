import { useState } from "react";
import { Icon, StatusBadge } from "../../../components/admin/AdminShared";
import { Icons, STATUS_FLOW, STATUS_COLORS } from "../../../utils/adminData";
import { OrderModal } from "../../../components/admin/AdminModals";

const inputStyle = { width: "100%", padding: "10px 14px", border: "2px solid #e8daf5", borderRadius: 10, fontSize: 14, color: "#2d1a4a", background: "#faf7ff", outline: "none", boxSizing: "border-box", fontFamily: "inherit" };

export default function ManageOrders({ orders, setOrders }) {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = orders.filter(o =>
    (filter === "All" || o.status === filter) &&
    (o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.includes(search))
  );

  const handleStatusChange = (id, newStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    setSelected(prev => prev ? { ...prev, status: newStatus } : null);
  };

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 900, color: "#2d1a4a", marginBottom: 20 }}>Order Management</h2>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9b8cac" }}><Icon d={Icons.search} size={16} /></span>
          <input placeholder="Search orders or customers..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ ...inputStyle, paddingLeft: 36, background: "#fff" }} />
        </div>
        {["All", ...STATUS_FLOW].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            style={{ padding: "8px 16px", borderRadius: 10, border: "2px solid", borderColor: filter === s ? "#7b2fbe" : "#e8daf5", background: filter === s ? "#7b2fbe" : "#fff", color: filter === s ? "#fff" : "#7c6b8e", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
            {s}
          </button>
        ))}
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0e8fa", overflow: "hidden", boxShadow: "0 2px 12px rgba(123,47,190,0.06)" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#faf7ff" }}>
                {["Order ID", "Customer", "Items", "Total", "Time", "Status", "Action"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "#9b8cac", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id} style={{ borderBottom: "1px solid #f5f0fb", transition: "background .15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#faf7ff"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <td style={{ padding: "13px 16px", fontWeight: 800, color: "#7b2fbe" }}>{o.id}</td>
                  <td style={{ padding: "13px 16px", fontWeight: 600, color: "#2d1a4a" }}>{o.customer}</td>
                  <td style={{ padding: "13px 16px", color: "#7c6b8e", maxWidth: 160 }}>
                    <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{o.items.join(", ")}</span>
                  </td>
                  <td style={{ padding: "13px 16px", fontWeight: 700, color: "#2d1a4a" }}>₹{o.total}</td>
                  <td style={{ padding: "13px 16px", color: "#9b8cac", whiteSpace: "nowrap" }}>{o.time}</td>
                  <td style={{ padding: "13px 16px" }}>
                    <select value={o.status} onChange={e => handleStatusChange(o.id, e.target.value)}
                      style={{ border: "none", background: "transparent", fontWeight: 700, fontSize: 12, cursor: "pointer", color: STATUS_COLORS[o.status]?.text, fontFamily: "inherit" }}>
                      {STATUS_FLOW.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <button onClick={() => setSelected(o)}
                      style={{ background: "#f5f0fb", border: "none", borderRadius: 8, padding: "6px 12px", color: "#7b2fbe", fontWeight: 700, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                      <Icon d={Icons.eye} size={13} /> View
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} style={{ padding: 40, textAlign: "center", color: "#9b8cac" }}>No orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selected && <OrderModal order={selected} onClose={() => setSelected(null)} onStatusChange={handleStatusChange} />}
    </div>
  );
}