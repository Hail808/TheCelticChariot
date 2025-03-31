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
    return (
        <div className="container">
            <h1 className="title">Admin Sales</h1>
            <hr className="title-line" />

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