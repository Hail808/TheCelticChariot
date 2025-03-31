import React from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container, Card, CardContent, Button, Box, Rating, TextField } from "@mui/material";

const ProductPageContent = () => {
  const navigate = useNavigate();

  const product = {
    name: "Whimsigoth Sun Auburn Beaded Necklace in Bronze",
    price: "$17.00",
    description: "A handcrafted necklace with crystal elements, perfect for any occasion.",
    materials: "Crystals, Gemstones",
    length: "18 inches",
    style: "Whimsigoth | Natural | Bohemian",
    rating: 4.8,
    reviewsCount: 36,
    image: "product.jpg"
  };

  const reviews = [
    { id: 1, name: "Emily Clark", review: "Absolutely beautiful necklace, exceeded expectations!", rating: 5 },
    { id: 2, name: "John Doe", review: "Great quality and looks stunning.", rating: 4 },
    { id: 3, name: "Sarah Williams", review: "Fast shipping and lovely design.", rating: 5 },
  ];

  const relatedProducts = [
    { id: 1, name: "Whimsigoth Dragonfly Auburn Necklace", price: "$19.99", image: "item2.jpg" },
    { id: 2, name: "Whimsigoth Moon Burgundy Beaded Necklace", price: "$16.50", image: "item3.jpg" },
    { id: 3, name: "Whimsigoth Fall Maple Leaves Necklace", price: "$19.99", image: "item4.jpg" },
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#6b7855" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            The Celtic Chariot
          </Typography>
          <Button color="inherit" onClick={() => navigate("/account")}>Account</Button>
          <Button color="inherit" onClick={() => navigate("/login")}>Sign In</Button>
          <Button color="inherit" onClick={() => navigate("/cart")}>Cart</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ backgroundColor: "#f8f5e4", padding: "20px" }}>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <img src={product.image} alt={product.name} width="300" />
          <Box>
            <Typography variant="h4">{product.name}</Typography>
            <Typography variant="h5">{product.price}</Typography>
            <Typography>{product.description}</Typography>
            <Typography>Materials: {product.materials}</Typography>
            <Typography>Length: {product.length}</Typography>
            <Typography>Style: {product.style}</Typography>
            <Rating value={product.rating} readOnly /> ({product.reviewsCount} reviews)
            <Button variant="contained" sx={{ backgroundColor: "#6b7855", marginTop: '10px' }}>Add to Cart</Button>
          </Box>
        </Box>

        {/* Reviews Section */}
        <Typography variant="h5" sx={{ marginTop: '40px' }}>Reviews</Typography>
        {reviews.map((review) => (
          <Card key={review.id} sx={{ marginTop: '10px' }}>
            <CardContent>
              <Typography variant="h6">{review.name}</Typography>
              <Rating value={review.rating} readOnly />
              <Typography>{review.review}</Typography>
            </CardContent>
          </Card>
        ))}

        {/* Leave a Review Section */}
        <Typography variant="h6" sx={{ marginTop: '20px' }}>Leave a Review</Typography>
        <TextField multiline rows={4} fullWidth placeholder="Write your review..." />
        <Button variant="contained" sx={{ backgroundColor: "#6b7855", marginTop: '10px' }}>Submit Review</Button>

        {/* Related Products Section */}
        <Typography variant="h5" sx={{ marginTop: '40px' }}>Related Products</Typography>
        <Box sx={{ display: 'flex', gap: '15px' }}>
          {relatedProducts.map((item) => (
            <Card key={item.id} sx={{ maxWidth: 200 }}>
              <CardContent>
                <Typography>{item.name}</Typography>
                <Typography>{item.price}</Typography>
                <Button variant="contained" sx={{ backgroundColor: "#6b7855" }}>View Product</Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </>
  );
};

const ProductPage = () => (
  <Router>
    <ProductPageContent />
  </Router>
);

export default ProductPage;
