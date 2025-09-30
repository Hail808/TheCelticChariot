// prisma/seed.ts
import { PrismaClient } from '../src/generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Clear existing data (in correct order due to foreign keys)
  await prisma.order_item.deleteMany();
  await prisma.reviews.deleteMany();
  await prisma.shipping.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.orders.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.guest.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();

  // Create addresses
  const shippingAddress = await prisma.address.create({
    data: {
      street_line1: '123 Main St',
      street_line2: 'Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      postal_code: '94102',
      country: 'USA',
    },
  });

  const billingAddress = await prisma.address.create({
    data: {
      street_line1: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      postal_code: '90001',
      country: 'USA',
    },
  });

  // Create customer
  const customer = await prisma.customer.create({
    data: {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123', // Plain text for now - update schema to allow 60+ chars for bcrypt
      phone_num: '555-0123',
      fk_ship_address_id: shippingAddress.address_id,
      fk_bill_address_id: billingAddress.address_id,
    },
  });

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Jewelry',
        description: 'Handcrafted jewelry items',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Home Decor',
        description: 'Beautiful home decoration items',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Accessories',
        description: 'Fashion accessories and more',
      },
    }),
  ]);

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        product_name: 'Handmade Silver Necklace',
        description: 'Beautiful handcrafted silver necklace with gemstone',
        price: 89.99,
        inventory: 15,
        prod_image_url: 'https://example.com/images/necklace.jpg',
        fk_category_id: categories[0].category_id,
      },
    }),
    prisma.product.create({
      data: {
        product_name: 'Bohemian Earrings',
        description: 'Elegant bohemian style earrings',
        price: 34.99,
        inventory: 30,
        prod_image_url: 'https://example.com/images/earrings.jpg',
        fk_category_id: categories[0].category_id,
      },
    }),
    prisma.product.create({
      data: {
        product_name: 'Macrame Wall Hanging',
        description: 'Large handmade macrame wall art',
        price: 129.99,
        inventory: 8,
        prod_image_url: 'https://example.com/images/macrame.jpg',
        fk_category_id: categories[1].category_id,
      },
    }),
    prisma.product.create({
      data: {
        product_name: 'Ceramic Planter Set',
        description: 'Set of 3 handmade ceramic planters',
        price: 64.99,
        inventory: 20,
        prod_image_url: 'https://example.com/images/planters.jpg',
        fk_category_id: categories[1].category_id,
      },
    }),
    prisma.product.create({
      data: {
        product_name: 'Leather Crossbody Bag',
        description: 'Genuine leather crossbody bag',
        price: 149.99,
        inventory: 12,
        prod_image_url: 'https://example.com/images/bag.jpg',
        fk_category_id: categories[2].category_id,
      },
    }),
  ]);

  // Create an order
  const order = await prisma.orders.create({
    data: {
      order_date: new Date(),
      total_price: 124.98,
      order_status: 'Processing',
      fk_ship_address_id: shippingAddress.address_id,
      fk_bill_address_id: billingAddress.address_id,
      fk_customer_id: customer.customer_id,
    },
  });

  // Create order items
  await prisma.order_item.createMany({
    data: [
      {
        fk_order_id: order.order_id,
        fk_product_id: products[0].product_id,
        quantity: 1,
        price: 89.99,
      },
      {
        fk_order_id: order.order_id,
        fk_product_id: products[1].product_id,
        quantity: 1,
        price: 34.99,
      },
    ],
  });

  // Create invoice
  const invoice = await prisma.invoice.create({
    data: {
      fk_order_id: order.order_id,
      invoice_number: 'INV-001',
      invoice_date: new Date(),
      total_price: 124.98,
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      payment_status: 'paid',
    },
  });

  // Create payment
  await prisma.payment.create({
    data: {
      fk_invoice_id: invoice.invoice_id,
      payment_method: 'Credit Card',
      payment_date: new Date(),
      amount_paid: 124.98,
    },
  });

  // Create shipping record
  await prisma.shipping.create({
    data: {
      fk_order_id: order.order_id,
      fk_shipping_address_id: shippingAddress.address_id,
      tracking_num: 'TRK123456789',
      carrier: 'USPS',
      shipping_status: 'shipped',
    },
  });

  console.log('Seed completed successfully!');
  console.log({
    customers: 1,
    addresses: 2,
    categories: categories.length,
    products: products.length,
    orders: 1,
  });
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });