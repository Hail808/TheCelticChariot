'use client';
import React from "react";
import { useRouter } from 'next/navigation';
import { AppBar, Toolbar, Typography, Container, List, ListItem, Card, CardContent, Button, Box, TextField, Rating } from "@mui/material";

const ReviewsContent = () => {
  const router = useRouter();

  const reviews = [
    { id: 1, name: "Kristielc830", review: "Beautiful necklace...can't wait to wear it...loved the packaging!", rating: 5 },
    { id: 2, name: "Lexi Marie", review: "Really pretty I love it so much!", rating: 5 },
    { id: 3, name: "K8bradbury10101", review: "I love the design of this necklace and its neutral color palette makes it work very nicely with the majority of my closet.", rating: 5 },
  ];

  const recommendedProducts = [
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
          <Button color="inherit" onClick={() => router.push("/")}>Home</Button>
          <Button color="inherit" onClick={() => router.push("/cart")}>Cart</Button>
          <Button color="inherit" onClick={() => router.push("/reviews")}>Reviews</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ backgroundColor: "#f8f5e4", padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Customer Reviews
        </Typography>
        <List>
          {reviews.map((review) => (
            <ListItem key={review.id} divider>
              <Card sx={{ width: "100%", padding: "10px" }}>
                <CardContent>
                  <Typography variant="h6">{review.name}</Typography>
                  <Rating value={review.rating} readOnly />
                  <Typography variant="body1">"{review.review}"</Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
        
        {/* Leave a Review Section */}
        <Typography variant="h5" sx={{ marginTop: "20px" }}>Leave a Review:</Typography>
        <TextField
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          placeholder="Write your review here..."
          sx={{ marginBottom: "20px" }}
        />
        <Button variant="contained" sx={{ backgroundColor: "#6b7855" }}>Submit Review</Button>

        {/* Related Products Section */}
        <Typography variant="h5" sx={{ marginTop: "40px" }}>Related Products</Typography>
        <Box sx={{ display: "flex", gap: "15px", marginTop: "10px" }}>
          {recommendedProducts.map((item) => (
            <Card key={item.id} sx={{ maxWidth: 200 }}>
              <CardContent>
                <Typography variant="body1">{item.name}</Typography>
                <Typography variant="h6">{item.price}</Typography>
                <Button variant="contained" sx={{ backgroundColor: "#6b7855" }}>View Product</Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
      <Box sx={{ backgroundColor: "#6b7855", padding: "10px", textAlign: "center" }}>
        <Typography variant="body1" color="white">Thank you for your feedback!</Typography>
      </Box>
    </>
  );
};

const Reviews = () => <ReviewsContent />;

export default Reviews;
