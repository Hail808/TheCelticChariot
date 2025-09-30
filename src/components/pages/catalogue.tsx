"use client";import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React, { useState, useEffect } from "react";
import { getProducts, Product } from '@/lib/api';

const Catalogue: React.FC = () => {
  const router = useRouter();

  // State for API products
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredItems, setFilteredItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for filters
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedCategory2, setSelectedCategory2] = useState<string>("All Products");

    
  // Fetch products from API on mount
  useEffect(() => {
      loadProducts();
  }, []);

  const loadProducts = async () => {
        try {
            setLoading(true);
            const response = await getProducts({ limit: 100 });
            setProducts(response.data);
            setFilteredItems(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load products');
            console.error(err);
        } finally {
            setLoading(false);
        }
   };
    
  // Search handler
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const filtered = products.filter(item =>
            item.product_name.toLowerCase().includes(query.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
        );
        setFilteredItems(filtered);
        handleSort(sortOrder, filtered);
    };

  // Sort by price
    const handleSort = (order: "asc" | "desc", data = filteredItems) => {
        setSortOrder(order);
        const sorted = [...data].sort((a, b) => {
            const priceA = Number(a.price);
            const priceB = Number(b.price);
            if (priceA === priceB) {
                return a.product_name.localeCompare(b.product_name);
            }
            return order === "asc" ? priceA - priceB : priceB - priceA;
        });
        setFilteredItems(sorted);
    };

  // Format price
    const formatPrice = (price: string | number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(Number(price));
    };

  // Filter by category
    const handleCategoryFilter = async (categoryId: number | null) => {
        setSelectedCategory(categoryId);
        try {
            setLoading(true);
            if (categoryId === null) {
                // All products
                const response = await getProducts({ limit: 100 });
                setFilteredItems(response.data);
            } else {
                // Specific category
                const response = await getProducts({ category_id: categoryId, limit: 100 });
                setFilteredItems(response.data);
            }
        } catch (err) {
            setError('Failed to filter products');
        } finally {
            setLoading(false);
        }
    };

  // Navigate to product page
    const handleProduct = (productId: number) => {
        router.push(`/product/${productId}`);
    };

  // Apply default sort on load
    useEffect(() => {
        if (filteredItems.length > 0) {
            handleSort("desc");
        }
    }, [products]);



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
                key={item.product_id}
                className="flex flex-col items-center text-center"
              >
                <button
                  onClick={() => handleProduct(item.product_id)}
                    className="relative w-full max-w-[260px] aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:scale-105 transition-transform"
                >
                  {item.prod_image_url ? (
                    <Image
                      src={item.prod_image_url}
                      alt={item.product_name}
                      fill
                      className="object-cover"
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
