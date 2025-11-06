import { getAllPackages } from '@/services/backened/package.service';
import { createSuccessResponse } from '@/lib/utils/api-response';
import { handleError } from '@/lib/utils/error-handler';

export async function GET() {
  try {
    const packages = await getAllPackages();
    return createSuccessResponse({ packages });
  } catch (error) {
    return handleError(error);
  }
}