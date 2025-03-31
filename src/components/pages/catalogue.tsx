"use client";  // Mark as client component

import {useRouter} from 'next/navigation';
import { useState } from 'react';
import React from "react";
import '../../styles/catalogue.css';

const Catalogue: React.FC = () => {
    const router = useRouter(); 

    //List of every item in the catalogue
    //Similar items can be given similar ids 
    const items = [
        {id: 1, name: "Item 1"}, {id: 2, name: "Item 2"}, {id: 3, name: "Item 3"}, {id: 4, name: "Item 4"}, 
        {id: 5, name: "Item 5"}, {id: 6, name: "Item 6"}, {id: 7, name: "Item 7"}, {id: 8, name: "Item 8"}, 
        {id: 9, name: "Item 9"}, {id: 10, name: "Item 10"}, {id: 11, name: "Item 11"}, {id: 12, name: "Item 12"},
        {id: 13, name: "Item 13"}, {id: 14, name: "Item 14"}, {id: 15, name: "Item 15"}, {id: 16, name: "Item 16"}
    ];

    const handleProduct = () => {
        router.push('/product_page')
    }
    
    //Searchbar Query and Filtered Items Functions
    const [query, setQuery] = useState("");
    const [filteredItems, setFilteredItems] = useState(items);

    //Searchbar Filter Function
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const filteredResults = items.filter(item =>
          item.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredItems(filteredResults);
    };

    return (
    //Catalogue Container
    <div className = "catalogue-container">

        {/* Catalogue Page Label */}
        <h1>Catalogue Page</h1>


        {/* Search Container Area */}
        <div className = "search-container">

            {/* Moves Search Left */}
            <div className="search-location-left">
                {/* Search Label */}
                Searching for:

                {/* Search Bar and Button*/}
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

        </div>

        {/* Categories + Catalogue Array Container */}
        <div className="sorting-and-categories-container">
            
            {/* Categories Section */}
            <div className="categories-container">
                <p className="hover-text">All Products</p>
                <p className="hover-text">Necklaces</p>
                <p className="hover-text">Earrings</p>
                <p className="hover-text">DIY Beads</p>
            </div>

            {/* Catalogue Array Section */}
            <div className="catalogue-array-formatting"> 
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div className="catalogue-text-formatting" key={item.id}>
                            <button onClick={handleProduct} className="catalogue-box">
                                {item.name}
                            </button>
                            {item.name}
                        </div> 
                    ))) 
                    : ( <p className="no-results">No results found</p> )
                }
            </div>

        </div>

    </div>

    );
};

export default Catalogue;