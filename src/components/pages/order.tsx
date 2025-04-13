import React from 'react'
import { AppBar, Toolbar, Typography, Container, Card, CardContent, Button, Box, Rating, TextField } from "@mui/material";
import '../../styles/order.css';

interface Props {
  id: string
}

  const productInfo = 
  [ {
        id: 1233,
        name: "Whimsigoth Sun Auburn Beaded Necklace in Bronze",
        image: "product.jpg",
        price: 17.00,
        quantity: 1,
        img : '/productimages/necklace2.png'
    },
    {
        id: 123,
        name: "Whimsigoth Sun Auburn Beaded Necklace in Bronze",
        image: "product.jpg",
        price: 17.00,
        quantity: 3,
        img : '/productimages/necklace2.png'
    },
    {
        id: 1234,
        name: "Whimsigoth Sun Auburn Beaded Necklace in Bronze",
        image: "product.jpg",
        price: 117.00,
        quantity: 1,
        img : '/productimages/necklace2.png'
    },
    
  ]

  const shipping = {
    type: "Standard",
    cost: 5,
    country: "USA",
    tax: 3.23,
    tracking: 12345678901234,
    status: "Shipped"
  }

  const billingInfo = 

  {
    status : "Paid",
    name: "John Doe",
    adress: "1234 EX st",
    city: "Sacramento, CA, 95758",
    country: "United States"
  }

  const shippingInfo = 

  {
    status : "Paid",
    name: "John Doe",
    adress: "1234 EX st",
    city: "Sacramento, CA, 95758",
    country: "United States"

  }


const OrderPage: React.FC<Props> = ({ id }) => {
    let subtotal = 0.0

    productInfo.map((product) => (
        subtotal += (product.price * product.quantity)
    ));
    let total  = subtotal
    total += shipping.cost;
    total += shipping.tax;

  return (
    <>
    <div className='header'>
        <h1>Orders</h1>
        <a href='/user_dashboard'>Return to Account Page</a>
        <hr className="header-line" />
    </div>
    <div className = 'orderNumber'>
        <h1>Order #{id}</h1>
    </div>

    <div className='orderInfo'>
    <table className="order-table">
        <thead>
            <tr>
                <th>Proudct</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
        {productInfo.map((product) => (
            <tr key={product.id}>
                <td>
                <div className="productCell">
                <img src={product.img} alt={product.name} />
                <a href='/product_page' className='productName'>{product.name}</a>
                    </div>
                </td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td>${(product.price*product.quantity).toFixed(2)} USD</td>
            </tr>
        ))}
        </tbody>
        </table>
        <hr className="table-divider" />
        <div className='total-section'>
            <p>Subtotal: ${subtotal.toFixed(2) } USD</p>
            <p>Shipping ({shipping.type}): ${shipping.cost.toFixed(2)} USD</p>
            <p>Tax ({shipping.country}): ${shipping.tax.toFixed(2)} USD</p> 
           <div className="total-wrapper">
                <hr className="total-line" />
                <h1 className="total">Total: ${total.toFixed(2)} USD</h1>
            </div>
            
        </div>
    
    </div>
    
    <div className='payment-section'>
        <div className='billing-section'>
            <h1>Billing Information</h1>
            <p>Payment Status: {billingInfo.status}</p>
            <div className='adress'>
                <p>{billingInfo.adress}</p>
                <p>{billingInfo.city}</p>
                <p>{billingInfo.country}</p>
            </div>

        </div>
        <div className='shipping-section'>
            <h1>Shipping Information</h1>
            <p>Shipping Status: {shipping.status}</p>
            <p>Tracking number: <a href = {`https://tools.usps.com/go/TrackConfirmAction?tRef=fullpage&tLc=2&text28777=&tLabels=${shipping.tracking}`}>{shipping.tracking}</a></p>
            <div className='adress'>
                <p>{billingInfo.adress}</p>
                <p>{billingInfo.city}</p>
                <p>{billingInfo.country}</p>
            </div>
            
        </div>
    </div>
    </>
   
  )
}

export default OrderPage
