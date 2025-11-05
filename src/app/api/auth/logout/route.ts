import { clearAuthCookie } from '@/lib/auth/cookies';
import { createSuccessResponse } from '@/lib/utils/api-response';
import { SUCCESS_MESSAGES } from '@/constants/responseConstant/message';

export async function POST() {
  const response = createSuccessResponse(null, SUCCESS_MESSAGES.LOGOUT_SUCCESS);
  return clearAuthCookie(response);
}