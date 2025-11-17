import React from 'react';
import '../../styles/order.css';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

interface Props {
  id: string;
}

const OrderPage = async ({ id }: Props) => {
  // Fetch order with all related data using the reference
  const order = await prisma.orders.findUnique({
    where: { reference: id },
    include: {
      order_item: {
        include: {
          product: true,
        },
      },
      invoice: {
        include: {
          payment: true,
        },
      },
      shipping: {
        include: {
          address: true,
        },
      },
      address: true, // Billing/shipping address
      guest: true,
    },
  });

  // If order not found, show 404
  if (!order) {
    notFound();
  }

  // Calculate totals
  const subtotal = order.order_item.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const shippingCost = order.shipping_cost || 0;
  const tax = order.tax || 0;
  const total = Number(order.total_price) || 0;

  // Format shipping status
  const formatShippingStatus = (status: string) => {
    return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <>
      <div className="header">
        <h1>Orders</h1>
        <a href="/user_dashboard">Return to Account Page</a>
        <hr className="header-line" />
      </div>

      <div className="orderNumber">
        <h1>Order {order.reference}</h1>
        <p className="order-date">
          Placed on {new Date(order.order_date).toLocaleDateString()}
        </p>
      </div>

      <div className="orderInfo">
        <table className="order-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.order_item.map((item) => (
              <tr key={item.order_item_id}>
                <td>
                  <div className="productCell">
                    {item.product?.prod_image_url && (
                      <img
                        src={item.product.prod_image_url}
                        alt={item.product?.product_name || 'Product'}
                      />
                    )}
                    <a href={`/product_page?id=${item.product?.product_id}`} className="productName">
                      {item.product?.product_name || 'Unknown Product'}
                    </a>
                  </div>
                </td>
                <td>${Number(item.product.price).toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>${(Number(item.price)).toFixed(2)} USD</td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr className="table-divider" />

        <div className="total-section">
          <p>Subtotal: ${subtotal.toFixed(2)} USD</p>
          <p>Shipping: ${shippingCost.toFixed(2)} USD</p>
          <p>Tax: ${tax.toFixed(2)} USD</p>
          <div className="total-wrapper">
            <hr className="total-line" />
            <h1 className="total">Total: ${total.toFixed(2)} USD</h1>
          </div>
        </div>
      </div>

      <div className="payment-section">
        <div className="billing-section">
          <h1>Billing Information</h1>
          <p>
            Payment Status:{' '}
            <span className={`status-${order.invoice?.payment_status}`}>
              {order.invoice?.payment_status || 'Pending'}
            </span>
          </p>
          {order.address && (
            <div className="adress">
              <p>{order.address.street_line1}</p>
              {order.address.street_line2 && <p>{order.address.street_line2}</p>}
              <p>
                {order.address.city}, {order.address.state} {order.address.postal_code}
              </p>
              <p>{order.address.country}</p>
            </div>
          )}
        </div>

        <div className="shipping-section">
          <h1>Shipping Information</h1>
          <p>
            Shipping Status:{' '}
            <span className={`status-${order.shipping?.shipping_status}`}>
              {formatShippingStatus(order.shipping?.shipping_status || 'not_yet_shipped')}
            </span>
          </p>
          
          {order.shipping?.tracking_num && (
            <p>
              Tracking number:{' '}
              <a
                href={`https://tools.usps.com/go/TrackConfirmAction?tRef=fullpage&tLc=2&text28777=&tLabels=${order.shipping.tracking_num}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {order.shipping.tracking_num}
              </a>
            </p>
          )}

          {order.shipping?.carrier && (
            <p>Carrier: {order.shipping.carrier}</p>
          )}

          {order.shipping?.address && (
            <div className="adress">
              <p>{order.shipping.address.street_line1}</p>
              {order.shipping.address.street_line2 && <p>{order.shipping.address.street_line2}</p>}
              <p>
                {order.shipping.address.city}, {order.shipping.address.state}{' '}
                {order.shipping.address.postal_code}
              </p>
              <p>{order.shipping.address.country}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderPage;