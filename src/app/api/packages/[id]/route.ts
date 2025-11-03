// src/app/api/packages/[id]/route.ts
import { NextRequest } from 'next/server';
import { getPackageById } from '@/services/backened/package.service';
import { createSuccessResponse } from '@/lib/utils/api-response';
import { handleError } from '@/lib/utils/error-handler';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const {id}=params 
    const pkg = await getPackageById(id);
    return createSuccessResponse({ package: pkg });
  } catch (error) {
    return handleError(error);
  }
}