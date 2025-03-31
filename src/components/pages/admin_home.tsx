import React from 'react';
import { useRouter } from 'next/navigation';

import '../../styles/admin_home.css';

const AdminHome: React.FC = () => {
    const router = useRouter();

    const handleEngagement = () => {
        router.push('/admin_engagement');
    }
    const handleSales = () => {
        router.push('/admin_sales');
    }
    const handleCatalogue = () => {
        router.push('/admin_catalogue');
    }
    const handleOrders = () => {
        router.push('/admin_orders');
    }

    return (
        <div className="container">
            <h1 className="title">Admin Homepage</h1>
            <hr className="title-line" />

            <div className="button-format">
                <button onClick={handleEngagement} className="engagement-button">Engagement</button>
                <button onClick={handleSales} className="sales-button">Sales</button>
                <button onClick={handleCatalogue} className="catalogue-button">Catalogue</button>
                <button onClick={handleOrders} className="orders-button">Orders</button>
            </div>

            {/* Tracked Elements */}
            <div className="card-formatting">
                <div className="card">
                    <div className="card-text">
                        <h2 className="card-title">Total Views: </h2>
                    </div>
                </div>

                <div className="card">
                    <div className="card-text">
                        <h2 className="card-title">Orders: </h2>
                    </div>
                </div>

                <div className="card">
                    <div className="card-text">
                        <h2 className="card-title">Revenue: </h2> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;