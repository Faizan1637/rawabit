export const emailConfig = {
  // Admin email to receive inquiries
  adminEmail: process.env.ADMIN_EMAIL || 'admin@al-nikaah.com',
  
  // Email service configuration (you can use nodemailer, sendgrid, etc.)
  service: process.env.EMAIL_SERVICE || 'gmail',
  
  // From email
  fromEmail: process.env.FROM_EMAIL || 'noreply@al-nikaah.com',
  fromName: 'Al-Nikaah Support',
} as const;