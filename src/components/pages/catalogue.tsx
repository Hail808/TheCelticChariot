"use client";

import { useRouter } from 'next/navigation';
import '../../styles/catalogue.css';
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

    if (loading && products.length === 0) {
        return (
            <div className="catalogue-container">
                <div className="move-left">
                    <h1>Loading products...</h1>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="catalogue-container">
                <div className="move-left">
                    <h1>Error: {error}</h1>
                    <button onClick={loadProducts}>Retry</button>
                </div>
            </div>
        );
    }

    return (
        <div className="catalogue-container">
            {/* Catalogue Page Label */}
            <div className="move-left">
                <h1>Catalogue Page</h1>
            </div>

            {/* Search Container Area */}
            <div className="search-and-sort-container">
                <div className="search-bar-container">
                    <p className="default-text">Searching for:</p>
                    <form onSubmit={handleSearch} className="search-bar">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for products..."
                            className="search-input"
                        />
                        <button type="submit" className="search-button">Search</button>
                    </form>
                </div>

                <div className="sort-dropdown-container">
                    <p className="default-text">Sort By:</p>
                    <select id="sort" onChange={(e) => handleSort(e.target.value as "asc" | "desc")} value={sortOrder}>
                        <option value="desc">Price: High to Low</option>
                        <option value="asc">Price: Low to High</option>
                    </select>
                </div>
            </div>

            {/* Categories + Catalogue Array Container */}
            <div className="sorting-and-categories-container">
                {/* Categories Section */}
                <div className="categories-container">
                    <p className="hover-text" onClick={() => handleCategoryFilter(null)}>All Products</p>
                    <p className="hover-text" onClick={() => handleCategoryFilter(1)}>Jewelry</p>
                    <p className="hover-text" onClick={() => handleCategoryFilter(2)}>Home Decor</p>
                </div>

                {/* Catalogue Array Section */}
                <div className="catalogue-array-formatting">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div className="catalogue-text-formatting" key={item.product_id}>
                                <button onClick={() => handleProduct(item.product_id)} className="catalogue-box">
                                    {item.prod_image_url ? (
                                        <img
                                            src={item.prod_image_url}
                                            alt={item.product_name}
                                            width={200}
                                            height={200}
                                        />
                                    ) : (
                                        <div style={{
                                            width: 200,
                                            height: 200,
                                            backgroundColor: "#eee",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}>
                                            <span>No Image</span>
                                        </div>
                                    )}
                                </button>
                                <p className="catalogue-label">{item.product_name}</p>
                                <p>{formatPrice(item.price)}</p>
                                {item.inventory < 5 && (
                                    <p style={{ color: 'red', fontSize: '0.9em' }}>
                                        Only {item.inventory} left!
                                    </p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="no-results">No results found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Catalogue;