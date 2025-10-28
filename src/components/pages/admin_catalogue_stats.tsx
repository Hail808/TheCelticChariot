"use client"

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import StatisticsSection from "./statistics_section";

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

interface ProductFormData {
  product_name: string;
  description: string;
  price: string;
  inventory: string;
  prod_image_url: string;
  fk_category_id: string;
}

const AdminCatalogue: React.FC = () => {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Products");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // New state for statistics view
  const [showStatistics, setShowStatistics] = useState(false);

  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Item | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    product_name: '',
    description: '',
    price: '',
    inventory: '',
    prod_image_url: '',
    fk_category_id: '',
  });

  // Fetch items from database on component mount
  useEffect(() => {
    fetchItems();
  }, []);

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
      
      handleSort("desc", data);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to load catalogue items');
    } finally {
      setLoading(false);
    }
  };

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
      return order === "asc" ? Number(a.price) - Number(b.price) : Number(b.price) - Number(a.price);
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
    const filtered = category === "All Products" ? items : items;
    handleSort(sortOrder, filtered);
  };

  const navigateToProduct = (itemId: number) => {
    router.push(`/product_page?id=${itemId}`);
  };

  const handleBackToAdmin = () => {
    router.push('/admin');
  };

  // Add Product
  const handleAddProduct = () => {
    setFormData({
      product_name: '',
      description: '',
      price: '',
      inventory: '',
      prod_image_url: '',
      fk_category_id: '',
    });
    setShowAddModal(true);
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      setShowAddModal(false);
      fetchItems(); // Refresh the list
      alert('Product created successfully!');
    } catch (err) {
      console.error('Error creating product:', err);
      alert('Failed to create product');
    }
  };

  // Edit Product
  const handleEditProduct = (item: Item) => {
    setEditingProduct(item);
    setFormData({
      product_name: item.product_name,
      description: item.description || '',
      price: item.price.toString(),
      inventory: item.inventory.toString(),
      prod_image_url: item.prod_image_url || '',
      fk_category_id: item.fk_category_id?.toString() || '',
    });
    setShowEditModal(true);
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingProduct) return;

    try {
      const response = await fetch(`/api/items/${editingProduct.product_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      setShowEditModal(false);
      setEditingProduct(null);
      fetchItems(); // Refresh the list
      alert('Product updated successfully!');
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Failed to update product');
    }
  };

  // Delete Product
  const handleDeleteProduct = async (itemId: number) => {
    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      fetchItems(); // Refresh the list
      alert('Product deleted successfully!');
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product');
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading catalogue...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header with Navigation */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handleBackToAdmin}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition font-semibold"
          >
            ← Back to Admin
          </button>
          
          {/* Toggle Statistics/Catalogue View */}
          <div className="flex gap-4">
            <button
              onClick={() => setShowStatistics(false)}
              className={`px-6 py-2 rounded font-semibold transition ${
                !showStatistics 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Catalogue
            </button>
            <button
              onClick={() => setShowStatistics(true)}
              className={`px-6 py-2 rounded font-semibold transition ${
                showStatistics 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              📊 Statistics
            </button>
          </div>

          <button
            onClick={handleAddProduct}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-semibold"
          >
            + Add New Product
          </button>
        </div>

        {/* Conditional Rendering: Statistics or Catalogue */}
        {showStatistics ? (
          <StatisticsSection />
        ) : (
          <>
            {/* Title */}
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
              Admin Product Catalogue
            </h1>

            {/* Search Bar */}
            <div className="mb-8">
              <form onSubmit={handleSearch} className="flex gap-4 max-w-2xl mx-auto">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Filter and Sort Controls */}
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => handleCategoryFilter("All Products")}
                  className={`px-4 py-2 rounded ${
                    selectedCategory === "All Products"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } transition`}
                >
                  All Products
                </button>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleSort("asc")}
                  className={`px-4 py-2 rounded ${
                    sortOrder === "asc"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } transition`}
                >
                  Price: Low to High
                </button>
                <button
                  onClick={() => handleSort("desc")}
                  className={`px-4 py-2 rounded ${
                    sortOrder === "desc"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  } transition`}
                >
                  Price: High to Low
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div
                    key={item.product_id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() => navigateToProduct(item.product_id)}
                    >
                      <img
                        src={item.prod_image_url || "/placeholder.jpg"}
                        alt={item.product_name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {item.product_name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {item.description || "No description available"}
                        </p>
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-2xl font-bold text-blue-600">
                            {formatPrice(item.price)}
                          </p>
                          <p className={`text-sm font-semibold ${
                            item.inventory > 10 ? 'text-green-600' : 
                            item.inventory > 0 ? 'text-orange-600' : 'text-red-600'
                          }`}>
                            Stock: {item.inventory}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 pt-0 flex gap-2">
                      <button
                        onClick={() => handleEditProduct(item)}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(item.product_id)}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  No results found
                </p>
              )}
            </div>

            {/* Results Count */}
            {filteredItems.length > 0 && (
              <div className="mt-8 text-center text-gray-600">
                Showing {filteredItems.length} of {items.length} products
              </div>
            )}
          </>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleCreateProduct}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Product Name *</label>
                  <input
                    type="text"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Price *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleFormChange}
                      step="0.01"
                      min="0"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Inventory *</label>
                    <input
                      type="number"
                      name="inventory"
                      value={formData.inventory}
                      onChange={handleFormChange}
                      min="0"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Image URL</label>
                  <input
                    type="text"
                    name="prod_image_url"
                    value={formData.prod_image_url}
                    onChange={handleFormChange}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Category ID</label>
                  <input
                    type="number"
                    name="fk_category_id"
                    value={formData.fk_category_id}
                    onChange={handleFormChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-semibold"
                >
                  Create Product
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleUpdateProduct}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Product Name *</label>
                  <input
                    type="text"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleFormChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Price *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleFormChange}
                      step="0.01"
                      min="0"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Inventory *</label>
                    <input
                      type="number"
                      name="inventory"
                      value={formData.inventory}
                      onChange={handleFormChange}
                      min="0"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Image URL</label>
                  <input
                    type="text"
                    name="prod_image_url"
                    value={formData.prod_image_url}
                    onChange={handleFormChange}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Category ID</label>
                  <input
                    type="number"
                    name="fk_category_id"
                    value={formData.fk_category_id}
                    onChange={handleFormChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
                >
                  Update Product
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingProduct(null);
                  }}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCatalogue;
