"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

import '../../styles/admin_sales.css';

/* test table data*/
const data = [
    {
        id: 1,
        month: "January",
        year: "2022",
        totalViews: "15",
        sales: "$100.00",
        revenue: "$50.00"
    },
    {
        id: 2,
        month: "February",
        year: "2022",
        totalViews: "30",
        sales: "$300.00",
        revenue: "$250.00"
    },
    {
        id: 3,
        month: "March",
        year: "2022",
        totalViews: "10",
        sales: "$80.00",
        revenue: "$70.00"
    },
  ];

const AdminSales: React.FC = () => {
    const viewsToday = 20; // Placeholder for views today, replace with actual data
    const salesToday = 5; // Placeholder for sales today, replace with actual data
    const unfulfilledOrders = 2; // Placeholder for unfulfilled orders, replace with actual data

    const router = useRouter();
    
        const handleHome = () => {
            router.push('/admin');
        }
        const handleEngagement = () => {
            router.push('/admin/engagement');
        }
        const handleCatalogue = () => {
            router.push('/admin/catalogue');
        }
        const handleOrders = () => {
            router.push('/admin/orders');
        }

    return (
        <div className="container">
            <h1 className="title">Admin Sales</h1>
            <hr className="title-line" />

            <div className="button-format">
                <button onClick={handleHome} className="home-button">Home</button>
                <button onClick={handleEngagement} className="engagement-button">Engagement</button>
                <button onClick={handleOrders} className="orders-button">Orders</button>
                <button onClick={handleCatalogue} className="catalogue-button">Catalogue</button>
            </div>

            {/* Tracked Elements */}
            <div className="card-formatting">
                <div className="card">
                    <div className="card-text">
                        <h2 className="card-title">Views Today: {viewsToday}</h2>
                    </div>
                </div>

                <div className="card">
                    <div className="card-text">
                        <h2 className="card-title">Sales Today: {salesToday}</h2> 
                    </div>
                </div>

                <div className="card">
                    <div className="card-text">
                        <h2 className="card-title">Unfulfilled Orders: {unfulfilledOrders}</h2> 
                    </div>
                </div>
            </div>

            <table className="content-table"> 
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Year</th>
                        <th>Total Views</th>
                        <th>Sales</th>
                        <th>Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.month}</td>
                            <td>{item.year}</td>
                            <td>{item.totalViews}</td>
                            <td>{item.sales}</td>
                            <td>{item.revenue}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default AdminSales;