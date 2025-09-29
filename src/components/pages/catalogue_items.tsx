export type CatalogueItem = {
    id: number;
    name: string;
    tags: string;
    category: string;
    price: number;
    image?: string;
};
  
export const items: CatalogueItem[] = [
    {
        id: 1,
        name: "Whimsigoth Sun Auburn Bearded Necklace in Bronze",
        tags: "Fairycore | Whimsicle | Naturalist",
        category: "Necklace",
        price: 17.0,
        image: "/cataloguethumbnails/Necklace-Images/Whisigoth-Sun-Auburn-Beaded-Necklace-in-Bronze.png",
    },
    {
        id: 2,
        name: "Whimsigoth Dragonfly Auburn Beaded Necklace in Bronze",
        tags: "Fairycore | Whimsicle | Naturalist",
        category: "Necklace",
        price: 17.0,
        image: "/cataloguethumbnails/Necklace-Images/Whimsigoth-Dragonfly-Auburn-Beaded-Necklace-in-Bronze.png",
    },
    {
        id: 3,
        name: "Whimsigoth Dragonfly Auburn & Deep Green Beaded Necklace in Bronze",
        tags: "Fairycore | Whimsicle | Naturalist",
        category: "Necklace",
        price: 17.55,
        image: "/cataloguethumbnails/Necklace-Images/Whimsigoth-Dragonfly-Auburn-&-Deep-Green-Beaded-Necklace-in-Bronze.png",
    },
    {
        id: 4,
        name: "Whimsigoth Moon Burgundy Beaded Necklace in Bronze",
        tags: "Fairycore | Whimsicle | Naturalist",
        category: "Necklace",
        price: 15.5,
        image: "/cataloguethumbnails/Necklace-Images/Whimsigoth-Moon-Burgundy-Beaded-Necklace-in-Bronze.png",
    },
    {
        id: 5,
        name: "Whimsigoth Bohemian Flower Fall Earring in Bronze",
        tags: "Fairycore | Whimsicle",
        category: "Earrings",
        price: 8.75,
        image: "/cataloguethumbnails/Earrings-Images/Whimsigoth-Bohemian-Flower-Fall-Earrings-in-Bronze.png",
    },
    {
        id: 6,
        name: "Whimaitee Bronze Auburn Flower Cord Necklace",
        tags: "Cottagecore | Whimsigoth | Bohemian",
        category: "Necklace",
        price: 10.50,
        image: "/cataloguethumbnails/Necklace-Images/Whimistwee-Bronze-Auburn-Flower-Cord-Necklace.png",
    },
    {
        id: 7,
        name: "Bronze Heart Pendant Necklace in Burgundy",
        tags: "Gothic | Whimsigoth | Artsy | Alternative",
        category: "Necklace",
        price: 15.5,
        image:
        "/cataloguethumbnails/Necklace-Images/Bronze-Heart-Pendant-Beaded-Necklace-in-Burgundy.png",
    },
    {
        id: 8,
        name: "Gothic Floral Trumpet Flower Dangling Earrings in Bronze/Silver/Gold",
        tags: "Grunge | Whimsigoth",
        category: "Earrings",
        price: 12.50, 
        image: "/cataloguethumbnails/Earrings-Images/Gothic-Floral-Trumpet-Flower-Dangling-Earrings-in-Bronze.png",
    },
    {
        id: 9, 
        name: "Fairy Bronze Mushroom Earrings",
        tags: "Fairycore | Whimsigoth | Goblincore", 
        category: "Earrings", 
        price: 10.00, 
        image: "/cataloguethumbnails/Earrings-Images/Fairy-Bronze-Mushroom-Earrings.png"
    }, 
    {
        id: 10, 
        name: "Fairy Iridescent Aura Beaded Earrings with Star Charms", 
        tags: "Fairycore | Whimsigoth | Goblincore", 
        category: "Earrings", 
        price: 8.50, 
        image: "/cataloguethumbnails/Earrings-Images/Fairy-Iridescent-Aura-Beading-with-Star-Charms.png"
    }, 
    {
        id: 11, 
        name: "Whimsitwee Red Floral Tulip Earrings in Bronze/Silver/Gold", 
        tags: "Fairycore | Whimsigoth", 
        category: "Earrings", 
        price: 9.50, 
        image: "/cataloguethumbnails/Earrings-Images/Whimsitwee-Red-Floral-Tulip-Earrings-in-Bronze-Gold-Silver.png"
    }, 
    {
        id: 12, 
        name: "Bronze Goddess Moon Trinity Pendant Dangling Earrings", 
        tags: "", 
        category: "Earrings", 
        price: 10.00, 
        image: "/cataloguethumbnails/Earrings-Images/Bronze-Goddess-Moon-Trinity-Pentacle-Dangling-Earrings.png"
    },
    {
        id: 13, 
        name: "Whimsigoth Black Trumpet Flower Chandelier", 
        tags: "Goth | Whimsical | Fairycore | Grunge", 
        category: "Earrings", 
        price: 14.75, 
        image: "/cataloguethumbnails/Earrings-Images/Whimsigoth-Black-Trumpet-Flower-Chandlier-Earrings.png"
    }, 
    {
        id: 14, 
        name: "Bohemian Beads, 50 Piece Set, Daisy Design Beads for Jewelry Making/Beaded Necklace Bracelet Beads DIY", 
        tags: "", 
        category: "DIY Bead Sets", 
        price: 3.75, 
        image: "/cataloguethumbnails/DIY-Beads-Sets-Images/Bohemian-Daisy-Design-Beads-50-Pieces-Set.png"
    }, 
    {
        id: 15, 
        name: "Celestial Star Rounds Beads, 50 Piece Set, Star Design in Neutral Tones, Beads for Jewelry Making/Beaded Necklace Bracelet Beads DIY", 
        tags: "", 
        category: "DIY Bead Sets", 
        price: 3.75, 
        image: "/cataloguethumbnails/DIY-Beads-Sets-Images/Celestial-Star-Design-Round-Beads-in-Neutral-Tones-50-Pieces-Set.png"
    }, 
    {
        id: 16, 
        name: "Boho Mixed Beads, 50 Piece Set, 3 Styles of Beads in Neutral Tones for Jewelry Making/Beaded Necklace Bracelet Beads DIY", 
        tags: "", 
        category: "DIY Bead Sets", 
        price: 3.75, 
        image: "/cataloguethumbnails/DIY-Beads-Sets-Images/Boho-Mixed-Beads-3-Styles-of-Beads-in-Neutral-Tones-50-Piece-Set.png"
    }
    
    ,
    /////Extra Necklaces
    {id: 17, name: "Whimsigoth Auburn Leaf Beaded Necklace in Bronze", tags: "Fairycore | Whimsicle | Naturalist", category: "Necklace", price: 22.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    
    {id: 18, name: "Gothic Grim Reaper Beaded Necklace with Red & Black Beads", tags: "Alternative, Goth, Grunge", category: "Necklace", price: 20.75, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 19, name: "Black Parade Skeleton Charm Necklace - My Chemical Romance", tags: "MCR, My Chemical Romance, Emo, Alternative Jewelry", category: "Necklace", price: 20.75, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    
    {id: 20, name: "Pierce the Veil Misadventures Red & Silver Beaded Necklace", tags: "PTV, Pierce the Veil, Emo, Alternative Jewelry", category: "Necklace", price: 20.00, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 21, name: "Pierce the Veil Selfish Machines Beaded Necklace - Silver & Green", tags: "PTV, Pierce the Veil, Emo, Alternative Jewelry", category: "Necklace", price: 20.00, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 22, name: "Whimsigoth Auburn and Amethyst Bronze Sun Beaded Necklace with Sun & Leaf Accents", tags: "Celestial, Whimsical, Vampy Goth", category: "Necklace", price: 19.95, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    
    {id: 23, name: "Bronze Sun & Moon Beaded Necklace - Celestial Goth Jewelry", tags: "Celestial, Whimsical, Vampy Goth", category: "Necklace", price: 19.95, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 24, name: "Bronze Mushroom Necklace with Green Glass Beads & Leaf Charms", tags: "Celestial, Whimsical, Vampy Goth", category: "Necklace", price: 18.95, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 25, name: "Bronze Sun & Star Green Beaded Necklace - Handmade Celestial Jewelry", tags: "Celestial, Whimsical, Vampy Goth", category: "Necklace", price: 18.95, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    
    {id: 26, name: "Handmade Sun & Moon Beaded Choker Necklace - Bronze, Purple, & Gold", tags: "Fairycore, Whimsigoth, Wicca", category: "Necklace", price: 18.75, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 27, name: "Handmade Sunstone Beaded Choker Necklace with Sun & Moon Charms", tags: "Fairycore, Whimsigoth, Wicca", category: "Necklace", price: 18.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 28, name: "Black Trumpet Flower Moon Beaded Necklace - Gothic Fairycore Jewelry", tags: "Fairycore, Gothic, Naturalist", category: "Necklace", price: 18.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},

    {id: 29, name: "Handmade Beaded Floral Necklace - Pink Lily & White Daisy - Silver & Green", tags: "Fairycore, Naturalist", category: "Necklace", price: 18.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 30, name: "Handmade Gothic Ankh Necklace with Red Glass Beads", tags: "Whimsigoth, Victorian", category: "Necklace", price: 18.00, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    
    {id: 31, name: "Bronze Maple Leaf & Bead Necklace - Fall Cottagecore", tags: "Goblincore, Cottagecore", category: "Necklace", price: 17.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 32, name: "Bronze Hummingbird & Flower Beaded Necklace - Handmade", tags: "Fairycore, Whimsical, Naturalist", category: "Necklace", price: 17.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 33, name: "Bronze Fall Leaf & Mushroom Beaded Necklace - Goblincore & Cottagecore", tags: "Goblincore, Cottagecore", category: "Necklace", price: 17.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},

    {id: 34, name: "Gothic Pentagram Skull Sword Necklace with Beaded Chain", tags: "Gothic Alternative", category: "Necklace", price: 17.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 35, name: "Gothic Heart Locket Necklace - Red & Silver Beaded", tags: "Gothic, Whimsigoth, Alternative Jewerly", category: "Necklace", price: 17.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 36, name: "Handmade Gothic Bat Wing Choker Necklace with Red Garnet Beads", tags: "Whimsigoth, Goth, Grunge", category: "Necklace", price: 17.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},

    {id: 37, name: "Whimsigoth Auburn Daisy Beaded Necklace in Bronze", tags: "Fairycore, Whimsical, Naturalist", category: "Necklace", price: 16.75, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},

    {id: 38, name: "Whimsigoth Auburn Beaded Necklace in Bronze", tags: "Fairycore, Whimsical, Naturalist", category: "Necklace", price: 16.75, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 39, name: "Whimsigoth Deep Green Beaded Necklace in Bronze", tags: "Fairycore, Whimsical, Naturalist", category: "Necklace", price: 16.75, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 40, name: "Handmade Bronze Dragonfly Beaded Necklace - Auburn", tags: "Fairycore, Whimsical, Naturalist", category: "Necklace", price: 16.75, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},

    {id: 41, name: "Amethyst Sun & Moon Crystal Necklace - Stainless Steel", tags: "Pagan, Witchcraft, Fairy", category: "Necklace", price: 16.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 42, name: "Whimsical Champange Beaded Choker with Stars and Moon Pendant in Bronze", tags: "Fairycore, Whimsigoth, Wicca", category: "Necklace", price: 16.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 43, name: "Whimsigoth Rose Auburn Beaded Necklace in Bronze", tags: "Fairycore, Whimsical, Naturalist", category: "Necklace", price: 16.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},

    {id: 44, name: "Bronze Sun & Moon Beaded Necklace with Black Beads", tags: "Whimsigoth, Gothic", category: "Necklace", price: 16.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 45, name: "Handmade Bronze Mushroom Beaded Necklace - Auburn & Gold", tags: "Fairycore, Whimsical, Naturalist", category: "Necklace", price: 16.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 46, name: "Gothic Bat Locket Necklace with Red Beads", tags: "Gothic, Whimsigoth, Alternative Jewerly", category: "Necklace", price: 16.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},

    {id: 47, name: "Gold Sun & Pearl Glass Beaded Necklace", tags: "Fairycore, Whimsigoth, Wicca", category: "Necklace", price: 16.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 48, name: "Gold Sunflower Glass Bead Necklace", tags: "Fairycore, Whimsigoth, Wicca", category: "Necklace", price: 16.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 49, name: "Gold Mushroom & Leaf Beaded Necklace - Fall Cottagecore", tags: "Goblincore, Cottagecore", category: "Necklace", price: 16.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},

    {id: 50, name: "Green Aventurine Tree of Life Necklace - 18k Gold Stainless Steel", tags: "", category: "Necklace", price: 16.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 51, name: "Handmade Garnet Bat Wing Choker Necklace with Brown Glass Beads", tags: "Whimsigoth, Goth, Grunge", category: "Necklace", price: 15.75, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},

    {id: 52, name: "Handmade Green & Bronze Dragonfly Beaded Necklace", tags: "Fairycore, Whimsical, Naturalist", category: "Necklace", price: 15.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 53, name: "Bronze Mushroom & Leaf Beaded Necklace", tags: "Goblincore, Cottagecore", category: "Necklace", price: 15.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},

    {id: 54, name: "Gothic Bat Choker Necklace - Black Beads & Bronze Alloy", tags: "Whimsigoth, Goth, Grunge", category: "Necklace", price: 15.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 55, name: "Bloodstone Heart Crystal Necklace - Stainless Steel", tags: "", category: "Necklace", price: 14.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 56, name: "Clear Quartz Crystal Heart Necklace - Stainless Steel", tags: "", category: "Necklace", price: 14.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},

    {id: 57, name: "Sodalite Heart Crystal Necklace - Stainless Steel Chain", tags: "", category: "Necklace", price: 14.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 58, name: "Amethyst Heart Crystal Necklace - Stainless Steel Chain", tags: "", category: "Necklace", price: 14.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 59, name: "Red Jasper Heart Crystal Necklace - Stainless Steel Chain", tags: "", category: "Necklace", price: 14.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},

    {id: 61, name: "Amethyst Crescent Moon Necklace - Bronze", tags: "Whimsigoth, Witchcraft, Fairy", category: "Necklace", price: 14.00, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 62, name: "Gothic Moonstone Crystal Beaded Necklace - Silver Tiered Choker", tags: "Whimsigoth, Victorian", category: "Necklace", price: 13.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 63, name: "Citrine Heart Crystal Necklace - Silver Tone", tags: "", category: "Necklace", price: 12.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},

    {id: 64, name: "Amethyst Crescent Moon Necklace - Bronze", tags: "Whimsigoth, Witchcraft, Fairy", category: "Necklace", price: 12.00, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 65, name: "Goth Skull Blood Drop Beaded Necklace in Bronze", tags: "Grunge, Whimsigoth, Gothic", category: "Necklace", price: 11.75, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 66, name: "Gothic Ankh Beaded Necklace - Red & Black", tags: "Whimsigoth, Victorian", category: "Necklace", price: 11.00, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},

    {id: 67, name: "Silver Ankh Necklace - Key of Life Egyptian Symbol", tags: "", category: "Necklace", price: 10.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 68, name: "Bronze Arrowhead Necklace | Viking & Celtic Style", tags: "Celtic, Viking ", category: "Necklace", price: 10.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},

    {id: 69, name: "Bronze Ankh Necklace - Large Size, Egyptian Symbol of Life", tags: "", category: "Necklace", price: 10.50, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 70, name: "Purple Agate Evil Eye Necklace with Stars - Silver Tone", tags: "Statement Price, Witchcraft Jewelry, Wicca, Pagan", category: "Necklace", price: 10.00, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 71, name: "Silver Spider Web Cord Necklace - Gothic Jewelry", tags: "Gothic, Alternative", category: "Necklace", price: 10.00, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},

    {id: 72, name: "Gold or Bronze Pentacle Cord Necklace - Pagan, Celtic, Witchcraft", tags: "Pagan, Celtic Pagan, Witchcraft, Norse", category: "Necklace", price: 10.00, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 73, name: "Triple Moon Goddess Necklace with Pentacle Charm - Wiccan Jewelry", tags: "Pagan, Wicca", category: "Necklace", price: 10.00, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},
    {id: 74, name: "Silver Skeleton Hand Cord Necklace - Gothic Jewelry", tags: "Gothic, Alternative", category: "Necklace", price: 10.00, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},

    {id: 75, name: "Raw Amazonite Crescent Moon Necklace - Gold", tags: "Fairly Jewelry, Cottagecore, Goblincore, Whimsigoth", category: "Necklace", price: 7.00, image: "/productimages/ItemThumbnails/NecklaceThumbnail.png"},

    //// Extra Earrings
    {id: 76, name: "Gold Daisy Flower Chandelier Necklace - Fairycore & Cottagecore", tags: "Fairycore, Cottagecore", category: "Earrings", price: 17.50, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},
    {id: 77, name: "Silver Bat & Clear Quartz Chandelier Earrings - Gothic Grunge", tags: "Goth, Whimsical", category: "Earrings", price: 16.75, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},
    {id: 78, name: "Rose Gold Lily of the Valley Dangle Earrings - Whimsical Floral", tags: "Fairycore, Whimsical", category: "Earrings", price: 15.50, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},
   
    {id: 79, name: "Lily of the Valley Dangle Earrings - Gold Plated", tags: "Fairycore, Whimsical", category: "Earrings", price: 15.50, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},
    {id: 80, name: "Pink Lucite Flower Necklace - Gold Plated", tags: "Fairycore, Cottagecore", category: "Earrings", price: 15.50, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},

    {id: 81, name: "Lucite Flower Dangle Earrings - Bronze & Pink", tags: "Fairycore, Whimsical", category: "Earrings", price: 12.50, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},
    {id: 82, name: "Boho Dragonfly & Lily Flower Dangle Earrings", tags: "Fairycore, Whimsical", category: "Earrings", price: 12.50, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},

    {id: 83, name: "White Acrylic Daisy Flower Dangle Earrings - Bronze Gothic Floral", tags: "Grunge, Whimsigoth", category: "Earrings", price: 12.50, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},
    {id: 84, name: "Large Ankh Earrings - Bronze, Gold, or Silver", tags: "", category: "Earrings", price: 12.50, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},
    {id: 85, name: "Pink Tulip Chandelier Necklace - Stainless Steel", tags: "Fairycore, Cottagecore", category: "Earrings", price: 12.50, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},

    {id: 86, name: "Bronze Filigree Pearl Drop Earrings", tags: "", category: "Earrings", price: 12.00, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},
    {id: 87, name: "Amethyst Sun Chandelier Earrings - Bronze", tags: "Fairycore, Whimsical", category: "Earrings", price: 12.00, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},
    {id: 88, name: "Sodalite Sun Chandelier Earrings - Silver", tags: "Fairycore, Whimsical", category: "Earrings", price: 12.00, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},

    {id: 89, name: "Green Bronze Hummingbird & Daisy Floral Earrings", tags: "Naturalist, Gift for Mom", category: "Earrings", price: 12.00, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},
    {id: 91, name: "Pink Lily & Dragonfly Chandelier Earrings - Whimsical Fairycore", tags: "Fairycore, Whimsical", category: "Earrings", price: 24.50, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},
    {id: 92, name: "Pink Tulip Chandelier Necklace - 18k Gold Stainless Steel", tags: "Fairycore, Cottagecore", category: "Earrings", price: 12.00, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},

    {id: 93, name: "Rose Quartz Mandala Chandelier Earrings", tags: "Fairycore, Whimsical", category: "Earrings", price: 11.75, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},
    {id: 94, name: "Fairycore Pearl & Butterfly Star Dangle Earrings", tags: "Fairycore, Whimsigoth, Goblincore", category: "Earrings", price: 10.50, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},
    {id: 95, name: "Handmade Silver Moon & Pentacle Earrings", tags: "Wicca", category: "Earrings", price: 10.00, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},
    
    {id: 96, name: "Triple Moon Tree of Life Earrings - Silver Tone Celtic Pagan Jewelry", tags: "Witchcraft Jewelry, Pagan, Celtic, Celestial, Tree of Life", category: "Earrings", price: 10.00, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},

    {id: 97, name: "Silver Tree of Life Triple Moon Pentacle Earrings", tags: "Witchcraft Jewelry, Pagan, Celtic, Celestial, Tree of Life", category: "Earrings", price: 10.00, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},
    {id: 98, name: "Gold Sun Dangle Earrings", tags: "", category: "Earrings", price: 9.50, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},

    {id: 99, name: "Gold & Bronze Maple Leaf Dangle Earrings - Fall Jewelry", tags: "Fairycore, Whimsical", category: "Earrings", price: 9.50, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},
    {id: 100, name: "Purple Beaded Dragonfly Earrings - Whimsigoth Style", tags: "Whimsigoth, Alternative Fashion", category: "Earrings", price: 9.50, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},

    {id: 101, name: "Silver Triple Moon Pentacle Earrings", tags: "", category: "Earrings", price: 8.00, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},
    {id: 102, name: "Gold Pentacle Dangle Earrings - Wiccan Jewelry", tags: "Wicca Witchcraft Jewelry, Pagan, Celtic, Celestial, Tree of Life", category: "Earrings", price: 8.00, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},

    {id: 103, name: "Silver Angel Earrings with Green Glass Beads", tags: "Fairy, Whimsigoth", category: "Earrings", price: 6.50, image: "/productimages/ItemThumbnails/EarringsThumbnail.png"},

    ///// DIY Bead Sets
    {id: 104, name: "50pc Boho Daisy Beads - White & Black Jewelry Making Supplies", tags: "", category: "DIY Bead Sets", price: 3.75, image: "/productimages/ItemThumbnails/DIYBeadsThumbnail.png"},
    {id: 105, name: "50pc Boho Daisy Wood Beads - Jewelry Making Supplies", tags: "", category: "DIY Bead Sets", price: 3.75, image: "/productimages/ItemThumbnails/DIYBeadsThumbnail.png"}
    

];

