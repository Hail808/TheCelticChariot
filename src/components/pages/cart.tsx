'use client';
import React from "react";
import { useRouter } from 'next/navigation';
import { AppBar, Toolbar, Typography, Container, List, ListItem, Button, Card, CardMedia, CardContent, Radio, RadioGroup, FormControlLabel, Box } from "@mui/material";

const Cart = () => {
  const router = useRouter();
  
  const cartItems = [
    { id: 1, name: "Whimsical Sun Auburn Beaded Necklace in Bronze", price: "$17.00", image: "item1.jpg" },
  ];

  const recommendedItems = [
    { id: 2, name: "Whimsical Dragonfly Auburn Necklace in Bronze", price: "$19.99", image: "item2.jpg" },
    { id: 3, name: "Whimsical Moon Burgundy Beaded Necklace in Brass", price: "$16.50", image: "item3.jpg" },
    { id: 4, name: "Whimsical Fall Maple Leaves Mountain Beaded Necklace in", price: "$19.99", image: "item4.jpg" },
  ];

  return (
    <>
      <Container sx={{ backgroundColor: "#f8f5e4", padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Cart
        </Typography>
        <List>
          {cartItems.map((item) => (
            <ListItem key={item.id} divider>
              <Card sx={{ display: "flex", alignItems: "center", padding: "10px", width: "100%" }}>
                <CardMedia component="img" image={item.image} alt={item.name} sx={{ width: 100, height: 100, marginRight: "15px" }} />
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body1">{item.price}</Typography>
                  <Button variant="contained" sx={{ backgroundColor: "#6b7855", marginRight: "10px" }}>Item Count</Button>
                  <Button variant="contained" color="error">Remove</Button>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
        <Box sx={{ marginTop: "20px" }}>
          <Typography variant="h6">How You'll Pay</Typography>
          <RadioGroup>
            <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
            <FormControlLabel value="visa" control={<Radio />} label="VISA" />
            <FormControlLabel value="mastercard" control={<Radio />} label="MasterCard" />
          </RadioGroup>
          <Typography variant="body1">Item Total: $17.00</Typography>
          <Typography variant="body1">Shipping: $5.00</Typography>
          <Typography variant="h6">Total: $22.00</Typography>
          <Button variant="contained" sx={{ backgroundColor: "#6b7855", marginTop: "10px" }}>Checkout</Button>
        </Box>
        <Typography variant="h5" sx={{ marginTop: "40px" }}>Recommended Items</Typography>
        <Box sx={{ display: "flex", gap: "15px", marginTop: "10px" }}>
          {recommendedItems.map((item) => (
            <Card key={item.id} sx={{ maxWidth: 200 }}>
              <CardMedia component="img" image={item.image} alt={item.name} sx={{ height: 140 }} />
              <CardContent>
                <Typography variant="body1">{item.name}</Typography>
                <Typography variant="h6">{item.price}</Typography>
                <Button variant="contained" sx={{ backgroundColor: "#6b7855" }}>Add to Cart</Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
      <Box sx={{ backgroundColor: "#6b7855", padding: "10px", textAlign: "center" }}>
        <Typography variant="body1" color="white">Accepted Payment Methods</Typography>
        <img src="visa_mastercard.png" alt="Payment Methods" style={{ width: "100px" }} />
      </Box>
    </>
  );
};

export default Cart;
