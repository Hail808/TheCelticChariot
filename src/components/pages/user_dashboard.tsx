import '../../styles/user_dashboard.css';
const UserDashboard = () => {
    //Temp Data, will get from database  

    //format : Order Number, Date, Paid/Unpaid, Shipped/Packaging, Cost
    //May want to get rid of paid status, seems redundant?
    const orders = [
        ["1234", "1/2/24", "Paid", "Shipped", "$20"],
        ["3456", "1/3/24", "Paid", "Packaging", "$30"],
        ["7890", "5/3/24", "Unpaid", "Packaging", "$150"],
    ];

    //format: Name, Address, "City, State Zip", Country
    const accInfo = ["JDoe", "John Doe", "1234 Ex St", "Sacramento, CA 95857", "United States" ]
    return (
        <div className="user-dashboard-container">


            <h1>Hello, {accInfo[0]}</h1>
            <div className="order-section">
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
                        {orders.map((order, orderIndex) => (
                            <tr key={orderIndex}>
                                {order.map((entry) => (
                                    <td key={entry}>{entry}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="account-details">
                    <h1>Account Details</h1>
                    <dl className="list-info">
                        <dt>Username</dt>
                        <dd>{accInfo[0]}</dd>
                        <dt>Name</dt>
                        <dd>{accInfo[1]}</dd>
                        <dt>Address</dt>
                        <dd>{accInfo[2]}</dd>
                        <dd>{accInfo[3]}</dd>
                        <dd>{accInfo[4]}</dd>
                    </dl>
                </div>
            </div>
          
        </div>
    );    
};

export default UserDashboard;