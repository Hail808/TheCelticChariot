import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from "react";
import Image from 'next/image';

import '../../styles/admin_catalogue.css';

const AdminCatalogue: React.FC = () => {
    const router = useRouter(); 
    
        //List of every item in the catalogue
        //Similar items can be given similar ids 
        const items = [
            {id: 1, name: "Whimsigoth Sun Auburn Bearded Necklace in Bronze", tags: "Fairycore | Whimsicle | Naturalist", category: "Necklace", price: 17.00, image: "/cataloguethumbnails/Necklace-Images/Whisigoth-Sun-Auburn-Beaded-Necklace-in-Bronze.png"}, 
            {id: 2, name: "Whimsigoth Dragonfly Auburn Beaded Necklace in Bronze", tags: "Fairycore | Whimsicle | Naturalist", category: "Necklace", price: 17.00, image: "/cataloguethumbnails/Necklace-Images/Whimsigoth-Dragonfly-Auburn-Beaded-Necklace-in-Bronze.png"},
            {id: 3, name: "Whimsigoth Dragonfly Auburn & Deep Green Beaded Necklace in Bronze", tags: "Fairycore | Whimsicle | Naturalist", category: "Necklace", price: 17.55, image: "/cataloguethumbnails/Necklace-Images/Whimsigoth-Dragonfly-Auburn-&-Deep-Green-Beaded-Necklace-in-Bronze.png"}, 
            {id: 4, name: "Whimsigoth Moon Burgundy Beaded Necklace in Bronze", tags: "Fairycore | Whimsicle | Naturalist", category: "Necklace", price: 15.50, image: "/cataloguethumbnails/Necklace-Images/Whimsigoth-Moon-Burgundy-Beaded-Necklace-in-Bronze.png"}, 
            
            {id: 5, name: "Whimsigoth Bohemian Flower Fall Earring in Bronze", tags: "Fairycore | Whimsicle", category: "Earrings", price: 8.75, image: "/cataloguethumbnails/Earrings-Images/Whimsigoth-Bohemian-Flower-Fall-Earrings-in-Bronze.png"},
            {id: 6, name: "Whimaitee Bronze Auburn Flower Cord Necklace", tags: "Cottagecore | Whimsigoth | Bohemian", category: "Necklace", price: 10.50, image: "/cataloguethumbnails/Necklace-Images/Whimistwee-Bronze-Auburn-Flower-Cord-Necklace.png"}, 
            {id: 7, name: "Bronze Heart Pendant Necklace in Burgundy", tags: "Gothic | Whimsigoth | Artsy | Alternative", category: "Necklace", price: 15.50, image: "/cataloguethumbnails/Necklace-Images/Bronze-Heart-Pendant-Beaded-Necklace-in-Burgundy.png"}, 
            {id: 8, name: "Gothic Floral Trumpet Flower Dangling Earrings in Bronze", tags: "Grunge | Whimsigoth", category: "Earrings", price: 12.50, image: "/cataloguethumbnails/Earrings-Images/Gothic-Floral-Trumpet-Flower-Dangling-Earrings-in-Bronze.png"}, 
            
            {id: 9, name: "Fairy Bronze Mushroom Earrings", tags: "Fairycore | Whimsigoth | Goblincore", category: "Earrings", price: 10.00, image: "/cataloguethumbnails/Earrings-Images/Fairy-Bronze-Mushroom-Earrings.png"}, 
            {id: 10, name: "Fairy Iridescent Aura Beaded Earrings with Star Charms", tags: "Fairycore | Whimsigoth | Goblincore", category: "Earrings", price: 8.50, image: "/cataloguethumbnails/Earrings-Images/Fairy-Iridescent-Aura-Beading-with-Star-Charms.png"}, 
            {id: 11, name: "Whimsitwee Red Floral Tulip Earrings in Bronze/Silver/Gold", tags: "Fairycore | Whimsigoth", category: "Earrings", price: 9.50, image: "/cataloguethumbnails/Earrings-Images/Whimsitwee-Red-Floral-Tulip-Earrings-in-Bronze-Gold-Silver.png"}, 
            {id: 12, name: "Bronze Goddess Moon Trinity Pendant Dangling Earrings", tags: "", category: "Earrings", price: 10.00, image: "/cataloguethumbnails/Earrings-Images/Bronze-Goddess-Moon-Trinity-Pentacle-Dangling-Earrings.png"},
    
            {id: 13, name: "Whimsigoth Black Trumpet Flower Chandelier", tags: "Goth | Whimsical | Fairycore | Grunge", category: "Earrings", price: 14.75, image: "/cataloguethumbnails/Earrings-Images/Whimsigoth-Black-Trumpet-Flower-Chandlier-Earrings.png"}, 
            {id: 14, name: "Bohemian Beads, 50 Piece Set, Daisy Design Beads for Jewelry Making/Beaded Necklace Bracelet Beads DIY", tags: "", category: "DIY Bead Sets", price: 3.75, image: "/cataloguethumbnails/DIY-Beads-Sets-Images/Bohemian-Daisy-Design-Beads-50-Pieces-Set.png"}, 
            {id: 15, name: "Celestial Star Rounds Beads, 50 Piece Set, Star Design in Neutral Tones, Beads for Jewelry Making/Beaded Necklace Bracelet Beads DIY", tags: "", category: "DIY Bead Sets", price: 3.75, image: "/cataloguethumbnails/DIY-Beads-Sets-Images/Celestial-Star-Design-Round-Beads-in-Neutral-Tones-50-Pieces-Set.png"}, 
            {id: 16, name: "Boho Mixed Beads, 50 Piece Set, 3 Styles of Beads in Neutral Tones for Jewelry Making/Beaded Necklace Bracelet Beads DIY", tags: "", category: "DIY Bead Sets", price: 3.75, image: "/cataloguethumbnails/DIY-Beads-Sets-Images/Boho-Mixed-Beads-3-Styles-of-Beads-in-Neutral-Tones-50-Piece-Set.png"}
        ];
        
        //Searchbar Query and Filtered Items Functions
        const [query, setQuery] = useState("");
        const [filteredItems, setFilteredItems] = useState(items);
        const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
        const [itemImages, setItemImages] = useState<{ [key: number]: string }>({});
    
    
        //Searchbar Filter
        const handleSearch = (e: React.FormEvent) => {
            e.preventDefault();
            const filteredResults = items.filter(item =>
              item.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredItems(filteredResults);
        };
    
        //Sort Filter by Price
        const handleSort = (order: "asc" | "desc", data = filteredItems) => {
            setSortOrder(order); // update state
            const sorted = [...data].sort((a, b) => {
              if (a.price === b.price) {
                return a.name.localeCompare(b.name);
              }
              return order === "asc" ? a.price - b.price : b.price - a.price;
            });
            setFilteredItems(sorted);
        };
          
    
        //Format Price Function
        const formatPrice = (price: number) => {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(price);
        };
    
        //Category Function
        const handleCategoryFilter = (category: string) => {
            let filtered;
            if (category === "All Products") {
              filtered = items;
            } else {
              filtered = items.filter(item =>
                item.category.toLowerCase() === category.toLowerCase()
              );
            }
            handleSort(sortOrder, filtered);
          };
          
    
        //Link to Product Page
        const handleProduct = () => {
            router.push('/product_page')
        }

        const handleImageUpload = (itemId: number, event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files && event.target.files[0]) {
                const file = event.target.files[0];
                const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the uploaded image
                setItemImages((prevImages) => ({
                    ...prevImages,
                    [itemId]: imageUrl, // Update the image for the specific item
                }));
            }
        };
    
        //Default Sort Order
        useEffect(() => {
            handleSort("desc");
        }, []);
    
        return (
        //Catalogue Container
        <div className = "catalogue-container">
    
            {/* Catalogue Page Label */}
            <div className = "move-left">
                <h1>Catalogue Page</h1>
            </div>
    
            {/* Search Container Area */}
            <div className = "search-and-sort-container">
    
                <div className = "search-bar-container">
                    {/* Search Label */}
                    <p className="default-text">Searching for:</p>
    
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
    
                <div className = "sort-dropdown-container">
                    {/* <label htmlFor="sort">Sort by Price: </label> */}
                    <p className="default-text">Sort By:</p>
                    <select id="sort" onChange={(e) => handleSort(e.target.value as "asc" | "desc")}>
                        <option value="desc">Price: High to Low</option>
                        <option value="asc">Price: Low to High</option>
                    </select>
                </div> 
    
            </div>
    
    
            {/* Categories + Catalogue Array Container */}
            <div className="sorting-and-categories-container">
                
                {/* Categories Section */}
                <div className="categories-container">
                    <p className="hover-text" onClick={() => handleCategoryFilter("All Products")}>All Products</p>
                    <p className="hover-text" onClick={() => handleCategoryFilter("Necklace")}>Necklaces</p>
                    <p className="hover-text" onClick={() => handleCategoryFilter("Earrings")}>Earrings</p>
                    <p className="hover-text" onClick={() => handleCategoryFilter("DIY Bead Sets")}>DIY Beads</p>
                </div>
    
                {/* Catalogue Array Section */}
                <div className="catalogue-array-formatting"> 
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div className="catalogue-text-formatting" key={item.id}>
                                <button className="catalogue-box">
                                    <Image
                                        src={itemImages[item.id] || item.image} // Use uploaded image or default image
                                        alt={item.name}
                                        width={200}
                                        height={200}
                                        priority={true}
                                        className="item-image"
                                        onClick={() => document.getElementById(`file-input-${item.id}`)?.click()} // Trigger file input on click
                                    />
    
                                </button>
                                <p className="catalogue-label">{item.name}</p>
                                <p>{formatPrice(item.price)}</p>

                                {/* Hidden file input for image upload */}
                                <input
                                    type="file"
                                    id={`file-input-${item.id}`}
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(item.id, e)}
                                />
                            </div> 
                        ))) 
                        : ( <p className="no-results">No results found</p> )
                    }
                </div>
    
            </div>
    
    
        </div>
    
        );
};

export default AdminCatalogue;
