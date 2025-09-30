"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { items } from "./catalogue_items";

const Catalogue: React.FC = () => {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Products");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredResults = items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filteredResults);
  };

  const handleSort = (order: "asc" | "desc", data = filteredItems) => {
    setSortOrder(order);
    const sorted = [...data].sort((a, b) => {
      if (a.price === b.price) {
        return a.name.localeCompare(b.name);
      }
      return order === "asc" ? a.price - b.price : b.price - a.price;
    });
    setFilteredItems(sorted);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    const filtered =
      category === "All Products"
        ? items
        : items.filter(
            (item) => item.category.toLowerCase() === category.toLowerCase()
          );
    handleSort(sortOrder, filtered);
  };

  const handleProduct = () => {
    router.push("/product_page");
  };

  useEffect(() => {
    handleSort("desc");
  }, []);



  return (
    <div className="p-6 max-w-[1280px] mx-auto">
      {/* Page Header */}
      <h1 className="text-4xl font-bold mb-6 text-center">Catalogue Page</h1>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex gap-2 w-full md:w-auto"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            className="border border-gray-300 rounded px-3 py-2 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#5B6D50] text-white rounded hover:bg-[#4a5a40] transition"
          >
            Search
          </button>
        </form>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="font-medium">Sort By:</span>
          <select
            onChange={(e) =>
              handleSort(e.target.value as "asc" | "desc")
            }
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="desc">Price: High to Low</option>
            <option value="asc">Price: Low to High</option>
          </select>
        </div>
      </div>

      {/* Main Content: Sidebar + Catalogue */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Sidebar: Categories */}
        <div className="lg:w-1/5 flex flex-col gap-4 mb-4 lg:mb-0 text-white">
          {["All Products", "Necklace", "Earrings", "DIY Bead Sets", "Keychains", "Beaded Belt"].map(
            (category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
className={`px-4 py-2 rounded transition
  ${selectedCategory === category 
    ? "bg-[#4a5a40] shadow-lg ring-2 ring-[#5B6D50]"  // active (darker shade)
    : "bg-[#5B6D50] hover:bg-[#4a5a40]"}  // normal
`}          >
                {category}
              </button>
            )
          )}
        </div>

        {/* Right Content: Catalogue Grid */}
        <div className="lg:w-4/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center"
              >
                <button
                  onClick={handleProduct}
                    className="relative w-full max-w-[260px] aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-transform"
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <span>No Image</span>
                    </div>
                  )}
                </button>
                <p className="mt-2 font-medium w-full text-left">{item.name}</p>

                <p className="text-indigo-600 font-bold w-full text-left">
                  {formatPrice(item.price)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No results found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalogue;
