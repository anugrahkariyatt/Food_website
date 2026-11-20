// client/src/utils/adminData.js

export const INITIAL_ORDERS = [
  { id: "#ORD-001", customer: "Arjun Menon", items: ["Butter Chicken", "Garlic Naan x2"], total: 620, time: "10:32 AM", status: "Pending", address: "12, MG Road, Kozhikode", note: "Less spicy please" },
  { id: "#ORD-002", customer: "Priya Nair", items: ["Margherita Pizza", "Coke"], total: 480, time: "10:45 AM", status: "Preparing", address: "45, Beach Road, Kozhikode", note: "" },
  { id: "#ORD-003", customer: "Rahul Das", items: ["Chicken Biryani", "Raita"], total: 390, time: "11:02 AM", status: "Out for Delivery", address: "7, Palayam, Kozhikode", note: "Call on arrival" },
  { id: "#ORD-004", customer: "Sneha Pillai", items: ["Caesar Salad", "Lemonade"], total: 290, time: "11:15 AM", status: "Delivered", address: "33, Mavoor Road, Kozhikode", note: "" },
  { id: "#ORD-005", customer: "Vikram Singh", items: ["Pepperoni Pizza", "Tiramisu"], total: 750, time: "11:30 AM", status: "Pending", address: "88, Westhill, Kozhikode", note: "Extra cheese" },
  { id: "#ORD-006", customer: "Anjali Rajan", items: ["Dal Makhani", "Rice", "Lassi"], total: 340, time: "11:48 AM", status: "Preparing", address: "21, Calicut University Road", note: "" },
];

export const INITIAL_MENU = [
  { id: 1, name: "Butter Chicken", category: "Main Course", price: 320, available: true, image: "🍛", description: "Creamy tomato-based chicken curry" },
  { id: 2, name: "Margherita Pizza", category: "Pizza", price: 380, available: true, image: "🍕", description: "Classic tomato, mozzarella, basil" },
  { id: 3, name: "Chicken Biryani", category: "Biryani/Rice", price: 350, available: true, image: "🍚", description: "Aromatic basmati with spiced chicken" },
  { id: 4, name: "Caesar Salad", category: "Salads", price: 220, available: false, image: "🥗", description: "Romaine, croutons, parmesan, dressing" },
  { id: 5, name: "Tiramisu", category: "Desserts", price: 280, available: true, image: "🍰", description: "Italian coffee mascarpone dessert" },
];

export const INITIAL_CUSTOMERS = [
  { id: 1, name: "Arjun Menon", email: "arjun@gmail.com", phone: "9876543210", orders: 12, spent: 4820, joined: "Jan 2024" },
  { id: 2, name: "Priya Nair", email: "priya@gmail.com", phone: "9876543211", orders: 8, spent: 3200, joined: "Feb 2024" },
];

export const CATEGORIES = ["Starter", "Main Course", "Pizza", "Salads", "Beverages", "Desserts", "Biryani/Rice", "Soups", "Snacks"];
export const STATUS_FLOW = ["Pending", "Preparing", "Out for Delivery", "Delivered"];

export const STATUS_COLORS = {
  "Pending": { bg: "#fff3cd", text: "#856404", dot: "#f59e0b" },
  "Preparing": { bg: "#cfe2ff", text: "#084298", dot: "#3b82f6" },
  "Out for Delivery": { bg: "#d1ecf1", text: "#0c5460", dot: "#06b6d4" },
  "Delivered": { bg: "#d1e7dd", text: "#0a3622", dot: "#22c55e" },
};

export const WEEKLY_SALES = [12400, 18200, 15600, 22800, 19400, 25100, 21700];
export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const TOP_ITEMS = [
  { name: "Butter Chicken", orders: 142, revenue: 45440 },
  { name: "Chicken Biryani", orders: 118, revenue: 41300 },
];

export const Icons = {
  dashboard: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
  orders: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2 M9 5a2 2 0 002 2h2a2 2 0 002-2 M9 5a2 2 0 012-2h2a2 2 0 012 2",
  menu: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75 M9 7a4 4 0 100 8 4 4 0 000-8z",
  analytics: "M18 20V10 M12 20V4 M6 20v-6",
  plus: "M12 5v14 M5 12h14",
  edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7 M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  trash: "M3 6h18 M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
  x: "M18 6L6 18 M6 6l12 12",
  check: "M20 6L9 17l-5-5",
  arrow: "M5 12h14 M12 5l7 7-7 7",
  logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0",
  chevron: "M6 9l6 6 6-6",
  package: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
};