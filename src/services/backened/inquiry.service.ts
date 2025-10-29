import { ObjectId } from 'mongodb';
import {
  createInquiry,
  findInquiryById,
  findAllInquiries,
  updateInquiry,
} from '@/repositries/inquiry.repositories';
import { CreateInquiryInput, UpdateInquiryInput, Inquiry, InquiryResponse } from '@/types/inquiry';
import { AppError } from '@/lib/utils/error-handler';
import { ERROR_MESSAGES } from '@/constants/responseConstant/message';
import { HTTP_STATUS } from '@/constants/responseConstant/status-codes';
import { sendInquiryNotificationToAdmin, sendAutoReplyToUser } from './email.service';

export const sanitizeInquiry = (inquiry: Inquiry): InquiryResponse => {
  return {
    id: inquiry._id!.toString(),
    fullName: inquiry.fullName,
    email: inquiry.email,
    phoneNumber: inquiry.phoneNumber,
    message: inquiry.message,
    status: inquiry.status,
    createdAt: inquiry.createdAt.toISOString(),
    respondedAt: inquiry.respondedAt?.toISOString(),
  };
};

export const createNewInquiry = async (
  input: CreateInquiryInput
): Promise<{ inquiry: InquiryResponse; inquiryId: string }> => {
  // Create inquiry
  const inquiryData: Omit<Inquiry, '_id'> = {
    fullName: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    phoneNumber: input.phoneNumber.trim(),
    message: input.message.trim(),
    status: 'pending',
    userId: input.userId ? new ObjectId(input.userId) : undefined,
    createdAt: new Date(),
  };

  const inquiryId = await createInquiry(inquiryData);

  // Send emails (non-blocking)
  sendInquiryNotificationToAdmin({
    fullName: inquiryData.fullName,
    email: inquiryData.email,
    phoneNumber: inquiryData.phoneNumber,
    message: inquiryData.message,
  }).catch(err => console.error('Failed to send admin notification:', err));

  sendAutoReplyToUser({
    fullName: inquiryData.fullName,
    email: inquiryData.email,
  }).catch(err => console.error('Failed to send auto-reply:', err));

  const inquiry = await findInquiryById(inquiryId);
  if (!inquiry) {
    throw new AppError(ERROR_MESSAGES.INTERNAL_ERROR, HTTP_STATUS.INTERNAL_ERROR);
  }

  return {
    inquiry: sanitizeInquiry(inquiry),
    inquiryId,
  };
};

export const getInquiryById = async (id: string): Promise<InquiryResponse> => {
  const inquiry = await findInquiryById(id);
  if (!inquiry) {
    throw new AppError('Inquiry not found', HTTP_STATUS.NOT_FOUND);
  }
  return sanitizeInquiry(inquiry);
};

// REPLACE this function (around line 60-80):
export const updateInquiryStatus = async (
  id: string,
  input: UpdateInquiryInput,
  adminUserId?: string
): Promise<InquiryResponse> => {
  const existingInquiry = await findInquiryById(id);
  if (!existingInquiry) {
    throw new AppError('Inquiry not found', HTTP_STATUS.NOT_FOUND);
  }

  // FIX: Properly type the update data
  const updateData: Partial<Inquiry> = {
    status: input.status,
    adminNotes: input.adminNotes,
  };

  // Handle respondedBy conversion from string to ObjectId
  if (input.respondedBy) {
    updateData.respondedBy = new ObjectId(input.respondedBy);
  }

  if (input.status === 'responded' && !existingInquiry.respondedAt) {
    updateData.respondedAt = new Date();
    if (adminUserId) {
      updateData.respondedBy = new ObjectId(adminUserId);
    }
  }

  const updated = await updateInquiry(id, updateData);
  if (!updated) {
    throw new AppError('Failed to update inquiry', HTTP_STATUS.INTERNAL_ERROR);
  }

  const inquiry = await findInquiryById(id);
  return sanitizeInquiry(inquiry!);
};

export const getAllInquiries = async (
  page = 1,
  limit = 10,
  status?: string
) => {
  const skip = (page - 1) * limit;
  const filters = status ? { status } : undefined;
  const { inquiries, total } = await findAllInquiries(skip, limit, filters);

  return {
    data: inquiries.map(sanitizeInquiry),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};