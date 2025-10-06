import '../../styles/user_dashboard.css';
import { PrismaClient } from '@/generated/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';


const prisma = new PrismaClient();

const UserDashboard = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error('Not authenticated');
    }

    const user = await prisma.user.findUnique({
    where: { id: session.user.id },
        include: {
            guest: {
                include: {
                    address: true,
                    orders: {
                        include: {
                            order_item: true,
                            invoice: true,
                            shipping: true,
                        },
                    },
                },
            },
        },
    });

    if (!user) {
    throw new Error('User not found');
    }

    const accInfo = {
        userName: user.name,
        name: user.name,
        address: user.guest?.address?.street_line1 ?? '',
        city: user.guest?.address
        ? [user.guest.address.city, user.guest.address.state, user.guest.address.postal_code]
            .filter(Boolean)
            .join(', ')
        : '',
        country: user.guest?.address?.country ?? '',
    };

    const orders = user.guest?.orders.map((order) => ({
    id: order.order_id,
    date: new Date(order.order_date).toLocaleDateString(),
    paymentStatus: order.invoice?.payment_status ?? 'Pending',
    shipmentStatus: order.shipping?.shipping_status ?? 'Not Shipped',
    total: `$${(order.total_price ?? 0).toFixed(2)}`,
})) ?? [];

    return (
<div className="user-dashboard-container">
      <h1>Hello, {accInfo.userName}</h1>

      <div className="order-section">
        <hr className="title-line" />
        <a href='/user_dashboard/settings'>Settings</a>
        <h1 className='order-header'>Orders</h1>
        
         {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="order-table">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Date</th>
                <th>Payment Status</th>
                <th>Fulfillment Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <a href={`/user_dashboard/order/${order.id}`}>
                      #{order.id}
                    </a>
                  </td>
                  <td>{order.date}</td>
                  <td>{order.paymentStatus}</td>
                  <td>{order.shipmentStatus}</td>
                  <td>{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="account-details">
          <h1>Account Details</h1>
          <hr className="title-line" />
          <dl className="list-info">
  <div className="info-row">
    <dt>Username</dt>
    <dd>{accInfo.userName}</dd>
  </div>
  <div className="info-row">
    <dt>Name</dt>
    <dd>{accInfo.name}</dd>
  </div>
  <div className="info-row">
    <dt>Address</dt>
    <dd>
      <div>{accInfo.address}</div>
      {accInfo.city && <div>{accInfo.city}</div>}
      {accInfo.country && <div>{accInfo.country}</div>}
    </dd>
  </div>
</dl>

        </div>
      </div>
    </div>
  )
}

export default UserDashboard;