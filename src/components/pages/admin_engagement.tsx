"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

import '../../styles/admin_engagement.css';



/* test table data*/
const data = [
    {
        id: 1,
        username: "Rana Hasnain",
        email: "rhasnain@gmail.com",
        orderHistory: "Necklace 1",
        cartInformation: "Necklace 2"
    },
    {
        id: 2,
        username: "Usman Khan",
        email: "usman@comcast.net",
        orderHistory: "-",
        cartInformation: "Bracelet 3"
    },
    {
        id: 3,
        username: "Shafiq Ahmed",
        email: "1978ahmed@xfinity.net",
        orderHistory: "-",
        cartInformation: "-"
    },
    {
        id: 4,
        username: "Subhan Butt",
        email: "butt@gmail.com",
        orderHistory: "Charm 2",
        cartInformation: "-"
    }
  ];

const AdminEngagement: React.FC = () => {
    const router = useRouter();
    
        const handleHome = () => {
            router.push('/admin');
        }
        const handleSales = () => {
            router.push('/admin/sales');
        }
        const handleCatalogue = () => {
            router.push('/admin/catalogue');
        }
        const handleOrders = () => {
            router.push('/admin/orders');
        }

    return (
        <div className="container">
            <h1 className="title">Admin Engagement</h1>
            <hr className="title-line" />

            <div className="button-format">
                <button onClick={handleHome} className="home-button">Home</button>
                <button onClick={handleSales} className="sales-button">Sales</button>
                <button onClick={handleCatalogue} className="catalogue-button">Catalogue</button>
                <button onClick={handleOrders} className="orders-button">Orders</button>
            </div>

            <table className="content-table"> 
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Order History</th>
                        <th>Cart Information</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.orderHistory}</td>
                            <td>{item.cartInformation}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default AdminEngagement;