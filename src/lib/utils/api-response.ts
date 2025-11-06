import { NextResponse } from 'next/server';
import { ApiResponse } from '@/types/api';
import { HTTP_STATUS } from '@/constants/responseConstant/status-codes';

export const createSuccessResponse = <T>(
  data: T,
  message?: string,
  status: number = HTTP_STATUS.OK
) => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    message,
  };
  return NextResponse.json(response, { status });
};

export const createErrorResponse = (
  error: string,
  status: number = HTTP_STATUS.INTERNAL_ERROR
) => {
  const response: ApiResponse = {
    success: false,
    error,
  };
  return NextResponse.json(response, { status });
};

export const createCreatedResponse = <T>(data: T, message?: string) => {
  return createSuccessResponse(data, message, HTTP_STATUS.CREATED);
};