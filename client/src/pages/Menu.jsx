import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Category from "../components/Category";
import api from "../api/axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const carouselImages = [
  "/images/Img1.png",
  "/images/Img2.png",
  "/images/Img3.png",
];

export default function Menu() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/api/foodData");

      const data = res.data;
      if (!Array.isArray(data) || data.length < 2)
        throw new Error("Unexpected data format");

      setFoodItems(data[0] || []);
      setFoodCat(data[1] || []);
    } catch (err) {
      console.error("Failed to load:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to fetch data",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCategorySelect = (CategoryName) => {
    setSelectedCategory(CategoryName);
  };

  return (
    <div className="w-full bg-gray-50">

      <div className="relative h-[380px] w-full sm:h-[450px] md:h-[520px]">
        <Swiper
          className="z-0 h-full w-full"
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {carouselImages.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img} className="h-full w-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Category foodCatdata={foodCat} onCategorySelect={handleCategorySelect} />

      {/* Search */}
      <div className="my-6 flex w-full justify-center">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for food..."
          className="h-14 w-[85%] rounded-full bg-white px-6 text-lg text-gray-800 placeholder-gray-500 shadow-md outline-none"
        />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4">
        {loading && (
          <div className="my-5 flex flex-col items-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-300 border-t-purple-600"></div>
            <small className="mt-3 text-gray-600">
              Fetching fresh items...
            </small>
          </div>
        )}

        {!loading && error && (
          <div className="flex items-center justify-between rounded-md bg-red-500 p-4 text-white">
            <span>{error}</span>
            <button
              onClick={loadData}
              className="rounded-md border border-white px-3 py-1 text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {selectedCategory && (
              <div className="mt-6">
                <div className="mb-2 text-2xl font-semibold text-gray-800">
                  {selectedCategory}
                </div>
                <hr className="mb-4 border-gray-300" />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {foodItems
                    .filter(
                      (item) =>
                        item.CategoryName.toLowerCase() ===
                          selectedCategory.toLowerCase() &&
                        item.name.toLowerCase().includes(search.toLowerCase()),
                    )
                    .map((filteredItem) => (
                      <Card
                        key={filteredItem._id}
                        foodItems={filteredItem}
                        options={filteredItem.options}
                      />
                    ))}
                </div>
              </div>
            )}

            {!selectedCategory &&
              foodCat.map((data) => {
                const filteredItems = foodItems.filter(
                  (item) =>
                    item.CategoryName.toLowerCase() ===
                      data.CategoryName.toLowerCase() &&
                    item.name.toLowerCase().includes(search.toLowerCase()),
                );

                if (filteredItems.length === 0) return null;

                return (
                  <div key={data._id} className="mt-8">
                    <div className="mb-2 text-2xl font-semibold text-gray-800">
                      {data.CategoryName}
                    </div>
                    <hr className="mb-4 border-gray-300" />

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {filteredItems.map((item) => (
                        <Card
                          key={item._id}
                          foodItems={item}
                          options={item.options}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
          </>
        )}
      </div>

    </div>
  );
}
