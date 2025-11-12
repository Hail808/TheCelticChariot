import nodemailer from "nodemailer";
import dotenv from "dotenv";

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
    from: `"Website Contact" <${process.env.CONTACT_EMAIL}>`,
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
        <p>– The Team</p>
      `
      : `
        <p>Hi ${first_name},</p>
        <p>Thank you for contacting us! We’ve received your message and will get back to you shortly.</p>
        <p>Your message:</p>
        <blockquote>${message_body}</blockquote>
        <p>Have a great day!</p>
        <p>– The Team</p>
      `;

  const autoReplyMail = {
    from: `"The Team" <${process.env.CONTACT_EMAIL}>`,
    to: email_address,
    subject: autoReplySubject,
    html: autoReplyHtml,
  };

  await transporter.sendMail(autoReplyMail);
}
