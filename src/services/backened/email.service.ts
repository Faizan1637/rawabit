import nodemailer from 'nodemailer';
import { emailConfig } from '@/config/email';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: emailConfig.secure,
    auth: emailConfig.auth,
  });
};

interface SendEmailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmail = async (params: SendEmailParams): Promise<boolean> => {
  try {
    const transporter = createTransporter();

    await transporter.sendMail({
      from: `${emailConfig.fromName} <${emailConfig.fromEmail}>`,
      to: params.to,
      subject: params.subject,
      text: params.text,
      html: params.html || params.text,
    });

    console.log('✅ Email sent successfully to:', params.to);
    return true;
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    return false;
  }
};

export const sendInquiryNotificationToAdmin = async (inquiry: {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
}): Promise<boolean> => {
  const subject = `🔔 New Inquiry from ${inquiry.fullName}`;
  
  const text = `
New inquiry received from Rawabit website:

Name: ${inquiry.fullName}
Email: ${inquiry.email}
Phone: ${inquiry.phoneNumber}

Message:
${inquiry.message}

---
Please respond to this inquiry at your earliest convenience.
  `.trim();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%); padding: 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                    🔔 New Inquiry Received
                  </h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 30px;">
                  <p style="margin: 0 0 20px 0; color: #334155; font-size: 16px; line-height: 1.6;">
                    A new inquiry has been submitted through the Rawabit website:
                  </p>
                  
                  <!-- Info Box -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; border-radius: 8px; padding: 20px; margin: 20px 0;">
                    <tr>
                      <td style="padding: 10px 0;">
                        <strong style="color: #475569;">Name:</strong>
                        <span style="color: #1e293b; margin-left: 10px;">${inquiry.fullName}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0;">
                        <strong style="color: #475569;">Email:</strong>
                        <a href="mailto:${inquiry.email}" style="color: #ea580c; text-decoration: none; margin-left: 10px;">${inquiry.email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 0;">
                        <strong style="color: #475569;">Phone:</strong>
                        <a href="tel:${inquiry.phoneNumber}" style="color: #ea580c; text-decoration: none; margin-left: 10px;">${inquiry.phoneNumber}</a>
                      </td>
                    </tr>
                  </table>
                  
                  <!-- Message Box -->
                  <div style="background-color: #fff7ed; border-left: 4px solid #ea580c; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <strong style="color: #9a3412; font-size: 16px; display: block; margin-bottom: 10px;">Message:</strong>
                    <p style="color: #78350f; line-height: 1.6; white-space: pre-wrap; margin: 0;">${inquiry.message}</p>
                  </div>
                  
                  <p style="margin: 20px 0 0 0; color: #64748b; font-size: 14px; line-height: 1.6;">
                    Please respond to this inquiry at your earliest convenience.
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; color: #64748b; font-size: 12px;">
                    © ${new Date().getFullYear()} Rawabit. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  return await sendEmail({
    to: emailConfig.adminEmail,
    subject,
    text,
    html,
  });
};

export const sendAutoReplyToUser = async (inquiry: {
  fullName: string;
  email: string;
}): Promise<boolean> => {
  const subject = '✅ Thank you for contacting Rawabit';
  
  const text = `
Dear ${inquiry.fullName},

Thank you for contacting Rawabit. We have received your message and will get back to you shortly.

Our support team typically responds within 24-48 hours.

Best regards,
Rawabit Support Team

---
This is an automated message. Please do not reply to this email.
  `.trim();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%); padding: 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                    ✅ Thank You for Contacting Us!
                  </h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 30px;">
                  <p style="margin: 0 0 20px 0; color: #334155; font-size: 16px; line-height: 1.6;">
                    Dear <strong>${inquiry.fullName}</strong>,
                  </p>
                  
                  <p style="margin: 0 0 20px 0; color: #334155; font-size: 16px; line-height: 1.6;">
                    Thank you for contacting Rawabit. We have received your message and will get back to you shortly.
                  </p>
                  
                  <!-- Info Box -->
                  <div style="background-color: #f0fdf4; border: 2px solid #22c55e; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                    <p style="margin: 0; color: #15803d; font-size: 16px;">
                      ⏱️ Our support team typically responds within <strong>24-48 hours</strong>
                    </p>
                  </div>
                  
                  <p style="margin: 20px 0 0 0; color: #334155; font-size: 16px; line-height: 1.6;">
                    Best regards,<br>
                    <strong style="color: #ea580c;">Rawabit Support Team</strong>
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0 0 10px 0; color: #64748b; font-size: 12px;">
                    This is an automated message. Please do not reply to this email.
                  </p>
                  <p style="margin: 0; color: #64748b; font-size: 12px;">
                    © ${new Date().getFullYear()} Rawabit. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  return await sendEmail({
    to: inquiry.email,
    subject,
    text,
    html,
  });
};

// src/services/backened/email.service.ts

// ... existing imports/functions

export const sendResetOTPEmail = async (params: { email: string; otp: string }): Promise<boolean> => {
  const subject = '🔒 Reset Your Rawabit Password';

  const text = `
Dear User,

We received a request to reset your password. Use the following OTP to complete the process:

OTP: ${params.otp}

This OTP is valid for 10 minutes. If you didn't request this, please ignore this email.

Best regards,
Rawabit Support Team
  `.trim();

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #ea580c 0%, #dc2626 100%); padding: 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                    🔒 Password Reset OTP
                  </h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 30px;">
                  <p style="margin: 0 0 20px 0; color: #334155; font-size: 16px; line-height: 1.6;">
                    Dear User,
                  </p>
                  
                  <p style="margin: 0 0 20px 0; color: #334155; font-size: 16px; line-height: 1.6;">
                    We received a request to reset your password. Use the following OTP to complete the process:
                  </p>
                  
                  <!-- OTP Box -->
                  <div style="background-color: #f1f5f9; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                    <p style="margin: 0; color: #ea580c; font-size: 32px; font-weight: bold; letter-spacing: 4px;">
                      ${params.otp}
                    </p>
                  </div>
                  
                  <p style="margin: 0 0 20px 0; color: #334155; font-size: 16px; line-height: 1.6;">
                    This OTP is valid for 10 minutes. If you didn't request this, please ignore this email.
                  </p>
                  
                  <p style="margin: 20px 0 0 0; color: #334155; font-size: 16px; line-height: 1.6;">
                    Best regards,<br>
                    <strong style="color: #ea580c;">Rawabit Support Team</strong>
                  </p>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                  <p style="margin: 0; color: #64748b; font-size: 12px;">
                    © ${new Date().getFullYear()} Rawabit. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  return await sendEmail({
    to: params.email,
    subject,
    text,
    html,
  });
};