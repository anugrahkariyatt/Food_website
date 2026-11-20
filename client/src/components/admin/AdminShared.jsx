// client/src/components/admin/AdminShared.jsx
import { Icons, STATUS_COLORS } from '../../utils/adminData';

export const Icon = ({ d, size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export function StatCard({ label, value, sub, icon, color, index }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 16, padding: "20px 24px",
      boxShadow: "0 2px 12px rgba(123,47,190,0.08)", border: "1px solid #f0e8fa",
      animationDelay: `${index * 80}ms`,
    }} className="stat-card">
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: "#9b8cac", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{label}</p>
          <p style={{ fontSize: 28, fontWeight: 800, color: "#2d1a4a", lineHeight: 1.1 }}>{value}</p>
          {sub && <p style={{ fontSize: 12, color: "#7c6b8e", marginTop: 6 }}>{sub}</p>}
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: color + "22", display: "flex", alignItems: "center", justifyContent: "center", color: color, flexShrink: 0 }}>
          <Icon d={Icons[icon]} size={22} />
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ status }) {
  const c = STATUS_COLORS[status] || { bg: "#eee", text: "#555", dot: "#888" };
  return (
    <span style={{ background: c.bg, color: c.text, padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 5 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot, display: "inline-block" }} />
      {status}
    </span>
  );
}

export function BarChart({ data, labels }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120, padding: "0 4px" }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ width: "100%", height: `${(v / max) * 100}%`, background: i === 6 ? "linear-gradient(180deg,#7b2fbe,#9b59b6)" : "linear-gradient(180deg,#e8daf5,#d4b8f0)", borderRadius: "6px 6px 0 0", transition: "height .6s ease", minHeight: 6 }} />
          <span style={{ fontSize: 10, color: "#9b8cac", fontWeight: 600 }}>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}