import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});
  const { accessToken } = useAuth();

  const fetchMyOrder = async () => {
    try {
      const res = await api.get("/api/MyOrderData");
      // console.log("Fetch", res.data);
      setOrderData(res.data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    fetchMyOrder();
  }, [accessToken]);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">

      <div className="mx-auto my-10 w-full max-w-6xl flex-grow px-4">
        {orderData.orderData && orderData.orderData.order_data ? (
          orderData.orderData.order_data
            .slice(0)
            .reverse()
            .map((itemGroup, index) => (
              <div key={index} className="mb-10">
                {/* Order Date */}
                {itemGroup[0]?.Order_date && (
                  <div className="mb-6 text-center">
                    <h5 className="inline-block border-b-2 border-[#5e3f9c] pb-1 text-xl font-bold text-gray-700">
                      {itemGroup[0].Order_date}
                    </h5>
                  </div>
                )}

                {/* Items Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {itemGroup.map(
                    (item, idx) =>
                      !item.Order_date && (
                        <div key={idx} className="flex justify-center">
                          <div className="w-full overflow-hidden rounded-lg border border-[#e8e1f6] bg-white shadow-md transition-transform duration-200 hover:-translate-y-1">
                            <img
                              src={item.img}
                              alt={item.name}
                              className="h-[120px] w-full object-cover"
                            />

                            <div className="p-4">
                              <h5 className="mb-3 truncate text-lg font-bold text-[#4a2c82]">
                                {item.name}
                              </h5>

                              <div className="flex items-center justify-between text-sm text-gray-700">
                                <span className="rounded bg-[#f7f2ff] px-2 py-1 text-[#5e3f9c]">
                                  Qty: {item.qty}
                                </span>

                                <span className="rounded bg-[#f7f2ff] px-2 py-1 text-[#5e3f9c] uppercase">
                                  {item.size}
                                </span>

                                <span className="text-lg font-semibold text-gray-800">
                                  ₹{item.price}/-
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ),
                  )}
                </div>
              </div>
            ))
        ) : (
          <div className="mt-20 text-center text-2xl text-gray-500">
            <h3>You have not ordered yet.</h3>
          </div>
        )}
      </div>

    </div>
  );
}
