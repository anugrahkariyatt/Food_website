import { useState } from "react";
import { Icon } from "../../../components/admin/AdminShared";
import { Icons, CATEGORIES } from "../../../utils/adminData";
import { MenuModal } from "../../../components/admin/AdminModals";

const inputStyle = { width: "100%", padding: "10px 14px", border: "2px solid #e8daf5", borderRadius: 10, fontSize: 14, color: "#2d1a4a", background: "#faf7ff", outline: "none", boxSizing: "border-box", fontFamily: "inherit" };

export default function ManageMenu({ menu, setMenu }) {
  const [modal, setModal] = useState(null); 
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");

  const filtered = menu.filter(m =>
    (catFilter === "All" || m.category === catFilter) &&
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (form) => {
    if (form.id) {
      setMenu(prev => prev.map(m => m.id === form.id ? { ...form, price: Number(form.price) } : m));
    } else {
      setMenu(prev => [...prev, { ...form, id: Date.now(), price: Number(form.price) }]);
    }
    setModal(null);
  };

  const handleDelete = (id) => setMenu(prev => prev.filter(m => m.id !== id));
  const handleToggle = (id) => setMenu(prev => prev.map(m => m.id === id ? { ...m, available: !m.available } : m));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: "#2d1a4a" }}>Menu Management</h2>
        <button onClick={() => setModal({})} style={{ background: "linear-gradient(135deg,#7b2fbe,#9b59b6)", color: "#fff", border: "none", borderRadius: 12, padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
          <Icon d={Icons.plus} size={16} /> Add Item
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9b8cac" }}><Icon d={Icons.search} size={16} /></span>
          <input placeholder="Search menu..." value={search} onChange={e => setSearch(e.target.value)} style={{ ...inputStyle, paddingLeft: 36, background: "#fff" }} />
        </div>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} style={{ ...inputStyle, width: "auto", background: "#fff" }}>
          <option>All</option>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
        {filtered.map(item => (
          <div key={item.id} style={{ background: "#fff", borderRadius: 16, border: `2px solid ${item.available ? "#f0e8fa" : "#fce4ec"}`, overflow: "hidden", boxShadow: "0 2px 12px rgba(123,47,190,0.06)", transition: "transform .15s", position: "relative" }}>
            {!item.available && (
              <div style={{ position: "absolute", top: 10, right: 10, background: "#ef4444", color: "#fff", fontSize: 9, fontWeight: 800, padding: "3px 8px", borderRadius: 20, textTransform: "uppercase", letterSpacing: 0.5 }}>Out of Stock</div>
            )}
            <div style={{ background: item.available ? "linear-gradient(135deg,#f5f0fb,#ede8f7)" : "#fce4ec", padding: "20px", textAlign: "center", fontSize: 48 }}>
              {item.image}
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <p style={{ fontWeight: 800, fontSize: 15, color: "#2d1a4a", flex: 1 }}>{item.name}</p>
                <p style={{ fontWeight: 800, fontSize: 16, color: "#7b2fbe", marginLeft: 8 }}>₹{item.price}</p>
              </div>
              <p style={{ fontSize: 11, color: "#9b8cac", marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{item.category}</p>
              <p style={{ fontSize: 12, color: "#7c6b8e", marginBottom: 14, lineHeight: 1.4 }}>{item.description}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* Toggle */}
                <div onClick={() => handleToggle(item.id)}
                  style={{ width: 36, height: 20, borderRadius: 10, background: item.available ? "#7b2fbe" : "#d1c4e9", cursor: "pointer", position: "relative", transition: "background .2s", flexShrink: 0 }}>
                  <div style={{ position: "absolute", top: 2, left: item.available ? 18 : 2, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left .2s" }} />
                </div>
                <span style={{ fontSize: 11, color: item.available ? "#7b2fbe" : "#9b8cac", fontWeight: 600, flex: 1 }}>{item.available ? "Available" : "Out of Stock"}</span>
                <button onClick={() => setModal(item)} style={{ background: "#f5f0fb", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", color: "#7b2fbe" }}><Icon d={Icons.edit} size={14} /></button>
                <button onClick={() => handleDelete(item.id)} style={{ background: "#fce4ec", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", color: "#ef4444" }}><Icon d={Icons.trash} size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal !== null && <MenuModal item={modal.id ? modal : null} onClose={() => setModal(null)} onSave={handleSave} />}
    </div>
  );
}