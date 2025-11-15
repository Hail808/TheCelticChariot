"use client"

import { useRouter } from "next/navigation";
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

interface ProductFormData {
  product_name: string;
  description: string;
  price: string;
  inventory: string;
  prod_image_url: string;
  fk_category_id: string;
}

interface Category {
  id: number;
  name: string;
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
  const [categories, setCategories] = useState<Category[]>([]);

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

  // Image upload states
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  // Fetch items and categories on component mount
  useEffect(() => {
    fetchItems();
    fetchCategories();
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

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
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

 // Handle multiple image selection
  const handleMultipleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Check if adding these files would exceed the limit
    const totalFiles = selectedImages.length + files.length;
    if (totalFiles > 5) {
      alert(`Maximum 5 images allowed. You can add ${5 - selectedImages.length} more image(s).`);
      return;
    }
    
    // Validate each file
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is not an image`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large (max 5MB)`);
        return false;
      }
      return true;
    });
    
    // Add to existing images instead of replacing
    setSelectedImages(prev => [...prev, ...validFiles]);
    
    // Create preview URLs and add to existing previews
    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
    
    // Clear the input so the same file can be selected again if needed
    e.target.value = '';
  };





  // Upload multiple images
  const handleUploadMultipleImages = async (): Promise<string[]> => {
    if (selectedImages.length === 0) return [];
    
    setUploadingImages(true);
    
    try {
      const uploadPromises = selectedImages.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('/api/upload-product-image', {
          method: 'POST',
          body: formData,
        });
        
        if (!response.ok) throw new Error('Upload failed');
        
        const { url } = await response.json();
        return url;
      });
      
      const uploadedUrls = await Promise.all(uploadPromises);
      return uploadedUrls;
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Some images failed to upload');
      return [];
    } finally {
      setUploadingImages(false);
    }
  };

  // Remove image from selection
  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
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
    setSelectedImages([]);
    setImagePreviews([]);
    setShowAddModal(true);
  };

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Upload all images first
      const uploadedImageUrls = await handleUploadMultipleImages();
      
      // Use first image as primary image
      const primaryImageUrl = uploadedImageUrls[0] || formData.prod_image_url;
      
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          prod_image_url: primaryImageUrl,
          additionalImages: uploadedImageUrls.slice(1), // Rest of the images
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      setShowAddModal(false);
      setSelectedImages([]);
      setImagePreviews([]);
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
    setSelectedImages([]);
    setImagePreviews([]);
    setShowEditModal(true);
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingProduct) return;

    try {
      // Upload new images if any
      const uploadedImageUrls = await handleUploadMultipleImages();
      
      // Use first new image as primary if available, otherwise keep existing
      const primaryImageUrl = uploadedImageUrls[0] || formData.prod_image_url;

      const response = await fetch(`/api/items/${editingProduct.product_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          prod_image_url: primaryImageUrl,
          additionalImages: uploadedImageUrls.slice(1),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      setShowEditModal(false);
      setEditingProduct(null);
      setSelectedImages([]);
      setImagePreviews([]);
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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="p-6 max-w-[1280px] mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Admin Catalogue</h1>
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg text-gray-600">Loading catalogue...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-[1280px] mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Admin Catalogue</h1>
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1280px] mx-auto">
      {/* Page Header with Back Button */}
      <div className="relative mb-6">
        <h1 className="text-4xl font-bold text-center">Admin Catalogue</h1>
        <button 
          onClick={handleBackToAdmin}
          className="absolute right-0 top-0 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Back to Admin Home
        </button>
      </div>

      {/* Search, Sort & Add Product */}
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

        <div className="flex items-center gap-4">
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

          {/* Add Product Button */}
          <button
            onClick={handleAddProduct}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-semibold"
          >
            + Add Product
          </button>
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
                  onClick={() => navigateToProduct(item.product_id)}
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
                <p className="mt-2 font-medium w-full text-left line-clamp-2">{item.product_name}</p>

                <p className="text-indigo-600 font-bold w-full text-left">
                  {formatPrice(item.price)}
                </p>

                {/* Stock Info */}
                <p className="text-sm text-gray-600 w-full text-left">
                  Stock: {item.inventory}
                </p>

                {/* Admin Action Buttons */}
                <div className="flex gap-2 w-full mt-2">
                  <button
                    onClick={() => handleEditProduct(item)}
                    className="flex-1 px-3 py-1 bg-[#5B6D50] text-white hover:bg-[#4a5a40] transition font-semibold text-sm rounded shadow-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(item.product_id)}
                    className="flex-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition"
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
      </div>

      {/* Results Count */}
      {filteredItems.length > 0 && (
        <div className="mt-8 text-center text-gray-600">
          Showing {filteredItems.length} of {items.length} products
        </div>
      )}

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

                {/* Multiple Image Upload Section */}
                <div>
                  <label className="block text-sm font-semibold mb-1">Product Images (Max 5)</label>
                  
                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="mb-3 grid grid-cols-5 gap-2">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                          {index === 0 && (
                            <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                              Primary
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* File Upload */}
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleMultipleImageSelect}
                      disabled={uploadingImages}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {uploadingImages && (
                      <p className="text-sm text-blue-600">Uploading images...</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Select up to 5 images. First image will be the primary product image.
                    </p>
                  </div>
                  
                  {/* Manual URL Input (Optional - for primary image) */}
                  <div className="mt-2">
                    <label className="block text-xs text-gray-600 mb-1">Or enter primary image URL manually:</label>
                    <input
                      type="text"
                      name="prod_image_url"
                      value={formData.prod_image_url}
                      onChange={handleFormChange}
                      placeholder="https://..."
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1">Category</label>
                  <select
                    name="fk_category_id"
                    value={formData.fk_category_id}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Select Category --</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  disabled={uploadingImages}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploadingImages ? 'Uploading...' : 'Create Product'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedImages([]);
                    setImagePreviews([]);
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

                {/* Current Image Display */}
                {formData.prod_image_url && !imagePreviews.length && (
                  <div>
                    <label className="block text-sm font-semibold mb-1">Current Image</label>
                    <img
                      src={formData.prod_image_url}
                      alt="Current product"
                      className="w-32 h-32 object-cover rounded border mb-2"
                    />
                  </div>
                )}

                {/* Multiple Image Upload Section */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    {imagePreviews.length ? 'New Images (Max 5)' : 'Add New Images (Max 5)'}
                  </label>
                  
                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <div className="mb-3 grid grid-cols-5 gap-2">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            ×
                          </button>
                          {index === 0 && (
                            <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-1 rounded">
                              Primary
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* File Upload */}
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleMultipleImageSelect}
                      disabled={uploadingImages}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {uploadingImages && (
                      <p className="text-sm text-blue-600">Uploading images...</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Upload new images to replace existing ones. First image will be the primary.
                    </p>
                  </div>
                  
                  {/* Manual URL Input */}
                  <div className="mt-2">
                    <label className="block text-xs text-gray-600 mb-1">Or enter image URL manually:</label>
                  <input
                    type="text"
                    name="prod_image_url"
                    value={formData.prod_image_url}
                    onChange={handleFormChange}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
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

      
    </div>
  );
};

export default AdminCatalogue;
