import { emailConfig } from '@/config/email';

interface SendEmailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export const sendEmail = async (params: SendEmailParams): Promise<boolean> => {
  try {
    // For now, just log the email details
    // Later, you can integrate with nodemailer, SendGrid, etc.
    console.log('📧 Email would be sent:');
    console.log('To:', params.to);
    console.log('Subject:', params.subject);
    console.log('Message:', params.text);
    
    // TODO: Implement actual email sending
    // Example with nodemailer:
    /*
    const transporter = nodemailer.createTransport({
      service: emailConfig.service,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `${emailConfig.fromName} <${emailConfig.fromEmail}>`,
      to: params.to,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });
    */
    
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

export const sendInquiryNotificationToAdmin = async (inquiry: {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
}): Promise<boolean> => {
  const subject = `New Inquiry from ${inquiry.fullName}`;
  
  const text = `
New inquiry received from Al-Nikaah website:

Name: ${inquiry.fullName}
Email: ${inquiry.email}
Phone: ${inquiry.phoneNumber}

Message:
${inquiry.message}

---
Please respond to this inquiry at your earliest convenience.
  `.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #ea580c;">New Inquiry Received</h2>
      <p>A new inquiry has been submitted through the Al-Nikaah website:</p>
      
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Name:</strong> ${inquiry.fullName}</p>
        <p><strong>Email:</strong> <a href="mailto:${inquiry.email}">${inquiry.email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${inquiry.phoneNumber}">${inquiry.phoneNumber}</a></p>
      </div>
      
      <div style="background: #fff7ed; padding: 20px; border-radius: 8px; border-left: 4px solid #ea580c;">
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${inquiry.message}</p>
      </div>
      
      <p style="margin-top: 20px; color: #64748b; font-size: 14px;">
        Please respond to this inquiry at your earliest convenience.
      </p>
    </div>
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
  const subject = 'Thank you for contacting Al-Nikaah';
  
  const text = `
Dear ${inquiry.fullName},

Thank you for contacting Al-Nikaah. We have received your message and will get back to you shortly.

Our support team typically responds within 24-48 hours.

Best regards,
Al-Nikaah Support Team

---
This is an automated message. Please do not reply to this email.
  `.trim();

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #ea580c;">Thank You for Contacting Us!</h2>
      <p>Dear ${inquiry.fullName},</p>
      
      <p>Thank you for contacting Al-Nikaah. We have received your message and will get back to you shortly.</p>
      
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0;">⏱️ Our support team typically responds within <strong>24-48 hours</strong>.</p>
      </div>
      
      <p>Best regards,<br>
      <strong>Al-Nikaah Support Team</strong></p>
      
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
      
      <p style="color: #64748b; font-size: 12px;">
        This is an automated message. Please do not reply to this email.
      </p>
    </div>
  `;

  return await sendEmail({
    to: inquiry.email,
    subject,
    text,
    html,
  });
};