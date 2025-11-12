export const emailConfig = {
  // Admin email to receive inquiries
  adminEmail: process.env.ADMIN_EMAIL || 'admin@rawabit.com',
  
  // From email configuration
  fromEmail: process.env.FROM_EMAIL || 'noreply@rawabit.com',
  fromName: process.env.FROM_NAME || 'Rawabit Support',
  
  // SMTP Configuration
  service: process.env.EMAIL_SERVICE || 'gmail',
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  
  // Authentication
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASSWORD!,
  },
} as const;