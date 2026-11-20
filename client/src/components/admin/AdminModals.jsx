import { useState } from "react";
import { Icon, StatusBadge } from "./AdminShared";
import { Icons, STATUS_FLOW, CATEGORIES } from "../../utils/adminData";

// ─── STYLES FOR FORMS ────────────────────────────────────────────────────────
const labelStyle = { display: "block", fontSize: 12, fontWeight: 700, color: "#5a2d8a", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 };
const inputStyle = { width: "100%", padding: "10px 14px", border: "2px solid #e8daf5", borderRadius: 10, fontSize: 14, color: "#2d1a4a", background: "#faf7ff", outline: "none", boxSizing: "border-box", fontFamily: "inherit" };

// ─── ORDER DETAIL MODAL ───────────────────────────────────────────────────────
export function OrderModal({ order, onClose, onStatusChange }) {
  const nextStatus = STATUS_FLOW[STATUS_FLOW.indexOf(order.status) + 1];
  
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(30,10,60,0.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 32, width: "100%", maxWidth: 480, boxShadow: "0 24px 60px rgba(0,0,0,0.2)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <p style={{ fontWeight: 800, fontSize: 18, color: "#2d1a4a" }}>{order.id}</p>
            <p style={{ color: "#9b8cac", fontSize: 13 }}>{order.time}</p>
          </div>
          <button onClick={onClose} style={{ background: "#f5f0fb", border: "none", borderRadius: 10, padding: 8, cursor: "pointer", color: "#7b2fbe" }}>
            <Icon d={Icons.x} size={18} />
          </button>
        </div>
        <div style={{ background: "#faf7ff", borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <p style={{ fontWeight: 700, color: "#2d1a4a", marginBottom: 4 }}>{order.customer}</p>
          <p style={{ color: "#7c6b8e", fontSize: 13 }}>📍 {order.address}</p>
          {order.note && <p style={{ color: "#9b59b6", fontSize: 13, marginTop: 6, fontStyle: "italic" }}>💬 "{order.note}"</p>}
        </div>
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontWeight: 700, fontSize: 13, color: "#9b8cac", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Items Ordered</p>
          {order.items.map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #f0e8fa", fontSize: 14, color: "#3d2060" }}>
              <span>• {item}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontWeight: 800, fontSize: 15, color: "#2d1a4a" }}>
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1 }}><StatusBadge status={order.status} /></div>
          {nextStatus && (
            <button onClick={() => onStatusChange(order.id, nextStatus)} style={{ background: "linear-gradient(135deg,#7b2fbe,#9b59b6)", color: "#fff", border: "none", borderRadius: 10, padding: "9px 16px", fontWeight: 700, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              Mark as {nextStatus} <Icon d={Icons.arrow} size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ADD/EDIT MENU MODAL ──────────────────────────────────────────────────────
export function MenuModal({ item, onClose, onSave }) {
  const [form, setForm] = useState(item || { name: "", category: "Starter", price: "", description: "", image: "🍽️", available: true });
  const emojis = ["🍛","🍕","🍚","🥗","🍰","☕","🥟","🍜","🥘","🍲","🥩","🍤","🍦","🥤","🍱"];
  
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(30,10,60,0.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 32, width: "100%", maxWidth: 500, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.2)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <p style={{ fontWeight: 800, fontSize: 18, color: "#2d1a4a" }}>{item?.id ? "Edit Item" : "Add New Item"}</p>
          <button onClick={onClose} style={{ background: "#f5f0fb", border: "none", borderRadius: 10, padding: 8, cursor: "pointer", color: "#7b2fbe" }}>
            <Icon d={Icons.x} size={18} />
          </button>
        </div>

        {/* Emoji picker */}
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Item Emoji / Icon</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, background: "#faf7ff", borderRadius: 12, padding: 10 }}>
            {emojis.map(e => (
              <button key={e} type="button" onClick={() => setForm(f => ({ ...f, image: e }))}
                style={{ fontSize: 22, background: form.image === e ? "#7b2fbe22" : "transparent", border: form.image === e ? "2px solid #7b2fbe" : "2px solid transparent", borderRadius: 8, width: 36, height: 36, cursor: "pointer" }}>
                {e}
              </button>
            ))}
          </div>
        </div>

        {[
          { label: "Item Name", key: "name", type: "text", placeholder: "e.g. Butter Chicken" },
          { label: "Price (₹)", key: "price", type: "number", placeholder: "e.g. 320" },
          { label: "Description", key: "description", type: "text", placeholder: "Short description..." },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key} style={{ marginBottom: 14 }}>
            <label style={labelStyle}>{label}</label>
            <input type={type} placeholder={placeholder} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} style={inputStyle} />
          </div>
        ))}

        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>Category</label>
          <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={inputStyle}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <label style={{ ...labelStyle, margin: 0 }}>Available</label>
          <div onClick={() => setForm(f => ({ ...f, available: !f.available }))}
            style={{ width: 44, height: 24, borderRadius: 12, background: form.available ? "#7b2fbe" : "#d1c4e9", cursor: "pointer", position: "relative", transition: "background .2s" }}>
            <div style={{ position: "absolute", top: 3, left: form.available ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left .2s", boxShadow: "0 1px 4px rgba(0,0,0,0.2)" }} />
          </div>
          <span style={{ fontSize: 13, color: form.available ? "#7b2fbe" : "#9b8cac", fontWeight: 600 }}>{form.available ? "In Stock" : "Out of Stock"}</span>
        </div>

        <button onClick={() => onSave(form)} style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg,#7b2fbe,#9b59b6)", color: "#fff", border: "none", borderRadius: 12, fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
          {item?.id ? "Save Changes" : "Add to Menu"}
        </button>
      </div>
    </div>
  );
}