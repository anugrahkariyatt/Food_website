import { Icon } from './AdminShared';
import { Icons } from '../../utils/adminData';

export const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "orders", label: "Orders", icon: "orders" },
  { id: "menu", label: "Menu", icon: "menu" },
  { id: "users", label: "Customers", icon: "users" },
  { id: "analytics", label: "Analytics", icon: "analytics" },
];

export default function Sidebar({ active, setActive, collapsed, setCollapsed, orderCount }) {
  return (
    <div style={{
      width: collapsed ? 64 : 220,
      background: "linear-gradient(180deg, #2d1a4a 0%, #1a0e2e 100%)",
      height: "100vh",
      position: "fixed",
      left: 0, top: 0,
      display: "flex", flexDirection: "column",
      transition: "width .25s ease",
      zIndex: 9999, /* High z-index so it stays above everything */
      overflow: "hidden",
      boxShadow: "4px 0 20px rgba(0,0,0,0.2)",
    }}>
      {/* Logo */}
      <div style={{ padding: collapsed ? "20px 12px" : "20px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10, minHeight: 72 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#7b2fbe,#9b59b6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>🍽️</div>
        {!collapsed && (
          <div>
            <p style={{ color: "#fff", fontWeight: 900, fontSize: 14, lineHeight: 1.1 }}>SOULFUL</p>
            <p style={{ color: "#9b8cac", fontWeight: 400, fontSize: 10, letterSpacing: 2 }}>ADMIN</p>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} style={{ marginLeft: "auto", background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 6, padding: 5, cursor: "pointer", color: "#9b8cac", display: "flex", alignItems: "center", flexShrink: 0 }}>
          <Icon d={collapsed ? Icons.arrow : "M19 12H5 M12 5l-7 7 7 7"} size={14} />
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
        {NAV.map(item => (
          <button key={item.id} onClick={() => setActive(item.id)}
            style={{
              width: "100%", padding: collapsed ? "12px" : "11px 20px",
              display: "flex", alignItems: "center", gap: 12,
              background: active === item.id ? "rgba(123,47,190,0.35)" : "transparent",
              border: "none", cursor: "pointer",
              borderLeft: `3px solid ${active === item.id ? "#9b59b6" : "transparent"}`,
              transition: "all .15s", position: "relative",
            }}>
            <span style={{ color: active === item.id ? "#c084fc" : "#9b8cac", flexShrink: 0 }}>
              <Icon d={Icons[item.icon]} size={18} />
            </span>
            {!collapsed && <span style={{ color: active === item.id ? "#fff" : "#9b8cac", fontWeight: active === item.id ? 700 : 500, fontSize: 14 }}>{item.label}</span>}
            {item.id === "orders" && orderCount > 0 && (
              <span style={{ marginLeft: "auto", background: "#ef4444", color: "#fff", borderRadius: 10, padding: "1px 7px", fontSize: 10, fontWeight: 800 }}>{orderCount}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ padding: collapsed ? "12px" : "12px 20px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <button style={{ width: "100%", padding: collapsed ? "10px" : "10px 0", display: "flex", alignItems: "center", gap: 12, background: "transparent", border: "none", cursor: "pointer" }}>
          <span style={{ color: "#9b8cac", flexShrink: 0 }}><Icon d={Icons.logout} size={18} /></span>
          {!collapsed && <span style={{ color: "#9b8cac", fontWeight: 500, fontSize: 14 }}>Logout</span>}
        </button>
      </div>
    </div>
  );
}