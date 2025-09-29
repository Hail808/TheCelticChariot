import '../../styles/user_dashboard.css';
const UserDashboard = () => {
    //Temp Data, will get from database  

    //May want to get rid of paid status, seems redundant?
    const orders = 
     [
        {
            id: 1234,
            date: "1/2/1234",
            paymentStatus: "Paid",
            shipmentStatus: "Shipped",
            total :"$30"
        },
        {
            id: 4567,
            date: "1/2/1234",
            paymentStatus: "Paid",
            shipmentStatus: "Shipped",
            total :"$30"
        },
        {
            id: 1230,
            date: "1/2/1234",
            paymentStatus: "Paid",
            shipmentStatus: "Shipped",
            total :"$30"
        },
        {
            id: 4543,
            date: "1/2/1234",
            paymentStatus: "Paid",
            shipmentStatus: "Shipped",
            total :"$20"
        }
      ];

    //format: Name, Address, "City, State Zip", Country
    const accInfo = 

       {
           userName: "JDOE",
           name: "John Doe",
           adress: "1234 EX st",
           city: "Sacramento, CA, 95758",
           country: "United States"

       }

    return (
        <div className="user-dashboard-container">

            <h1>Hello, {accInfo.userName}</h1>
            
            
            
            <div className="order-section">
                <hr className="title-line" />
                <a href='/user_dashboard/settings'>Settings</a>
                <h1 className='order-header'>Orders</h1>
                <table className="order-table">
                    <thead>
                    <tr>
                        <th>Order Number</th>
                        <th>Date</th>
                        <th>Payment Status</th>
                        <th>Fulfillment Satus</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                        {/* May need to change the keys later on, for now I just have them as their value */}
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td><a href={`/user_dashboard/order/${order.id}`}>#{order.id}</a></td>
                                <td>{order.date}</td>
                                <td>{order.paymentStatus}</td>
                                <td>{order.shipmentStatus}</td>
                                <td>{order.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="account-details">
                    <h1>Account Details</h1>
                    <hr className="title-line" />
                   
                    <dl className="list-info">
                        <dt>Username</dt>
                        <dd>{accInfo.userName}</dd>
                        <dt>Name</dt>
                        <dd>{accInfo.name}</dd>
                        <dt>Address</dt>
                        <dd>{accInfo.adress}</dd>
                        <dd>{accInfo.city}</dd>
                        <dd>{accInfo.country}</dd>
                    </dl>
                </div>
            </div>
          
        </div>
    );    
};

export default UserDashboard;