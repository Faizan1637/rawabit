import { NextRequest } from 'next/server';
import { createNewInquiry } from '@/services/backened/inquiry.service';
import { createCreatedResponse } from '@/lib/utils/api-response';
import { handleError } from '@/lib/utils/error-handler';
import {
  validateInquiryFields,
  validateFullName,
  validateInquiryPhone,
  validateMessage,
} from '@/lib/validators/inquiry';
import { validateEmail } from '@/lib/validators/auth';
import { verifyToken } from '@/lib/auth/jwt';
import { authConfig } from '@/config/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phoneNumber, message } = body;

    // Validate required fields
    validateInquiryFields(body, ['fullName', 'email', 'phoneNumber', 'message']);

    // Validate each field
    validateFullName(fullName);
    validateEmail(email);
    validateInquiryPhone(phoneNumber);
    validateMessage(message);

    // Check if user is logged in (optional)
    let userId: string | undefined;
    const token = req.cookies.get(authConfig.cookieName)?.value;
    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        userId = decoded.userId;
      }
    }

    // Create inquiry
    const { inquiry } = await createNewInquiry({
      fullName,
      email,
      phoneNumber,
      message,
      userId,
    });

    return createCreatedResponse(
      { inquiry },
      'Your message has been sent successfully! We will get back to you shortly.'
    );
  } catch (error) {
    return handleError(error);
  }
}

// GET all inquiries (admin only - optional for future)
// export async function GET(req: NextRequest) {
//   try {
//     // You can add admin authentication here
//     // For now, just return error
//     return createSuccessResponse(
//       null,
//       'This endpoint requires admin access'
//     );
//   } catch (error) {
//     return handleError(error);
//   }
// }