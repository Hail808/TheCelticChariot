import React from 'react';
import { useRouter } from 'next/navigation';

import '../../styles/admin_orders.css';

/* test table data*/
const data = [
    {
        id: 1,
        orderID: "101",
        name: "Rana Hasnain",
        address: "101 ABC Rd",
        total: "$100.00",
        numItems: "5",
        fulfilled: "Yes"
    },
    {
        id: 2,
        orderID: "102",
        name: "Usman Khan",
        address: "102 ABC Rd",
        total: "$300.00",
        numItems: "8",
        fulfilled: "Yes"
    },
    {
        id: 3,
        orderID: "103",
        name: "Shafiq Ahmed",
        address: "103 ABC Rd",
        total: "$80.00",
        numItems: "6",
        fulfilled: "No"
    },
    {
        id: 4,
        orderID: "104",
        name: "Subhan Butt",
        address: "104 ABC Rd",
        total: "$80.00",
        numItems: "3",
        fulfilled: "No"
    }
  ];

const AdminOrders: React.FC = () => {
    return (
        <div className="container">
            <h1 className="title">Admin Orders</h1>
            <hr className="title-line" />

            <table className="content-table"> 
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Total Cost</th>
                        <th>Number of Items</th>
                        <th>Fulfilled?</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.orderID}</td>
                            <td>{item.name}</td>
                            <td>{item.address}</td>
                            <td>{item.total}</td>
                            <td>{item.numItems}</td>
                            <td>{item.fulfilled}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default AdminOrders;