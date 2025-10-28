"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState, useEffect } from "react";

// Define the Item type to match your database structure
interface Item {
  product_id: number;
  product_name: string;
  description: string | null;
  price: number;
  inventory: number;
  prod_image_url: string | null;
  fk_category_id: number | null;
}

const Catalogue: React.FC = () => {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Products");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch items from database on component mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/items');
        
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        
        const data = await response.json();
        setItems(data);
        setFilteredItems(data);
        setError(null);
        
        // Apply default sort after fetching
        handleSort("desc", data);
      } catch (err) {
        console.error('Error fetching items:', err);
        setError('Failed to load catalogue items');
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredResults = items.filter((item) =>
      item.product_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filteredResults);
  };

  const handleSort = (order: "asc" | "desc", data = filteredItems) => {
    setSortOrder(order);
    const sorted = [...data].sort((a, b) => {
      if (a.price === b.price) {
        return a.product_name.localeCompare(b.product_name);
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
    // For now, just filter all products - you can enhance this later with category relationships
    const filtered = category === "All Products" ? items : items;
    handleSort(sortOrder, filtered);
  };

  const handleProduct = (itemId: number) => {
    router.push(`/product_page?id=${itemId}`);
  };

  if (loading) {
    return (
      <div className="p-6 max-w-[1280px] mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Catalogue Page</h1>
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg text-gray-600">Loading catalogue...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-[1280px] mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Catalogue Page</h1>
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </div>
    );
  }

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
                    ? "bg-[#4a5a40] shadow-lg ring-2 ring-[#5B6D50]"
                    : "bg-[#5B6D50] hover:bg-[#4a5a40]"}
                `}
              >
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
                key={item.product_id}
                className="flex flex-col items-center text-center"
              >
                <button
                  onClick={() => handleProduct(item.product_id)}
                  className="relative w-full max-w-[260px] aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-transform"
                >
                  {item.prod_image_url ? (
                    <img
                      src={item.prod_image_url}
                      alt={item.product_name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <span>No Image</span>
                    </div>
                  )}
                </button>
                <p className="mt-2 font-medium w-full text-left">{item.product_name}</p>

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