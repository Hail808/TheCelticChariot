import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
dotenv.config();

export async function sendContactEmail({
  first_name,
  last_name,
  email_address,
  message_type,
  message_body,
}) {
  // Configure mail transport (using Gmail or another SMTP provider)
  const transporter = nodemailer.createTransport({
    service: "gmail", // or "hotmail", "outlook", etc.
    auth: {
      user: process.env.CONTACT_EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Choose the right recipient based on message type
  const ownerEmail =
    message_type === "commission"
      ? process.env.OWNER_EMAIL_COMMISSIONS || process.env.OWNER_EMAIL
      : process.env.OWNER_EMAIL_CONTACT || process.env.OWNER_EMAIL;

  const subjectPrefix =
    message_type === "commission"
      ? "New Commission Request"
      : "New Contact Inquiry";

  // Main email to the site owner
  const ownerMailOptions = {
    from: `"The Celtic Chariot" <${process.env.CONTACT_EMAIL}>`,
    to: ownerEmail,
    cc: process.env.OWNER_CC_EMAIL || undefined, // optional CC
    subject: `${subjectPrefix} from ${first_name} ${last_name}`,
    html: `
      <h2>${subjectPrefix}</h2>
      <p><strong>Name:</strong> ${first_name} ${last_name}</p>
      <p><strong>Email:</strong> ${email_address}</p>
      <p><strong>Message:</strong></p>
      <blockquote>${message_body}</blockquote>
    `,
  };

  // Send email to site owner
  await transporter.sendMail(ownerMailOptions);

  // Optional: Auto-reply confirmation to the customer
  const autoReplySubject =
    message_type === "commission"
      ? "We received your commission request!"
      : "Thanks for reaching out!";

  const autoReplyHtml =
    message_type === "commission"
      ? `
        <p>Hi ${first_name},</p>
        <p>Thank you for your commission request! We’ve received your message and will review it soon.</p>
        <p>Here’s a copy of what you sent:</p>
        <blockquote>${message_body}</blockquote>
        <p>We’ll get back to you at this email address once we’ve looked it over.</p>
        <p>– The Celtic Chariot</p>
      `
      : `
        <p>Hi ${first_name},</p>
        <p>Thank you for contacting us! We’ve received your message and will get back to you shortly.</p>
        <p>Your message:</p>
        <blockquote>${message_body}</blockquote>
        <p>Have a great day!</p>
        <p>– The Celtic Chariot</p>
      `;

  const autoReplyMail = {
    from: `"The Celtic Chariot" <${process.env.CONTACT_EMAIL}>`,
    to: email_address,
    subject: autoReplySubject,
    html: autoReplyHtml,
  };

  await transporter.sendMail(autoReplyMail);
}


export async function sendOrderEmail({
  customerEmail,
  customerName,
  orderReference,
  orderTotal,
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.CONTACT_EMAIL,
      pass: process.env.EMAIL_PASS, 
    },
  });

  const ownerEmail = process.env.OWNER_EMAIL;

  const order = await prisma.orders.findUnique({
    where: { reference: orderReference },
    include: {
      order_item: {
        include: {
          product: { include: { images: true } },
        },
      },
      invoice: true,
      shipping: { include: { address: true } },
      address: true,
      guest: true,
    },
  });

  const itemsHtml = order.order_item.map((item) => {
    const imageUrl = item.product?.prod_image_url || item.product?.images?.[0]?.image_url || null;

    return `
      <tr>
        <td style="padding:10px; vertical-align:middle;">
          <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
            <tr>
              <td style="width:80px; height:80px; vertical-align:middle;">
                ${imageUrl ? `<img src="${imageUrl}" alt="${item.product?.product_name || 'Product'}" width="80" height="80" style="display:block; object-fit:cover; border-radius:8px;"/>` : ''}
              </td>
              <td style="padding-left:10px; font-family: Arial, sans-serif; font-size:16px; color:#3F4D30; vertical-align:middle;">
                ${item.product?.product_name || 'Product'}
              </td>
            </tr>
          </table>
        </td>

        <td style="padding:10px; text-align:center; font-family: Arial, sans-serif;">${item.quantity}</td>
        <td style="padding:10px; text-align:center; font-family: Arial, sans-serif;">$${Number(item.price).toFixed(2)}</td>
        <td style="padding:10px; text-align:center; font-family: Arial, sans-serif;">$${(Number(item.price) * item.quantity).toFixed(2)}</td>
      </tr>
    `;
  }).join('');

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background: #F5F8F2; padding: 30px; border-radius: 15px; max-width: 600px; margin:auto;">
      <h2 style="color: #3F4D30; text-align:center; font-size:28px; margin-bottom:20px; line-height:1.3;">
        Order Confirmation: 
        <a href="https://thecelticchariot.com/user_dashboard/order/${orderReference}" 
            style="color: #3F4D30; text-decoration: none; font-weight: bold;">
            ${orderReference}
        </a>
      </h2>
      <p style="font-size:16px; color:#3F4D30;">Hi ${customerName},</p>
      <p style="font-size:16px; color:#3F4D30;">Thank you for your order! Here’s a summary:</p>

      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; max-width:600px; margin:auto;">
        <thead>
          <tr style="background-color:#98A78F; color:white;">
            <th style="padding:10px; text-align:left; width:40%;">Product</th>
            <th style="padding:10px; text-align:center; width:20%;">Quantity</th>
            <th style="padding:10px; text-align:center; width:20%;">Price</th>
            <th style="padding:10px; text-align:center; width:20%;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
          <tr style="background-color:#DFD8BF;">
            <td colspan="3" style="padding:10px; font-weight:bold; text-align:right;">Total</td>
            <td style="padding:10px; font-weight:bold; text-align:center;">$${orderTotal.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <p style="margin-top:20px; font-size:16px; color:#3F4D30;">
        We will process your order shortly.
      </p>
      <p style="font-size:16px; color:#3F4D30;">
        You can view your full order details 
        <a href="https://thecelticchariot.com/user_dashboard/order/${orderReference}" style="color:#5B6D50; text-decoration:none; font-weight:600;">here</a>.
      </p>
    </div>
  `;

  // Send email to customer
  await transporter.sendMail({
    from: `"The Celtic Chariot" <${process.env.CONTACT_EMAIL}>`,
    to: customerEmail,
    subject: `Your Order Confirmation - ${orderReference}`,
    html: htmlContent,
  });

  // Send email to owner
  await transporter.sendMail({
    from: `"The Celtic Chariot" <${process.env.CONTACT_EMAIL}>`,
    to: ownerEmail,
    subject: `New Order Received - ${orderReference}`,
    html: htmlContent,
  });
}
