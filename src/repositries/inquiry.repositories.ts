import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { Inquiry } from '@/types/inquiry';

const COLLECTION = 'inquiries';

export const createInquiry = async (inquiry: Omit<Inquiry, '_id'>): Promise<string> => {
  const db = await getDatabase();
  const result = await db.collection<Inquiry>(COLLECTION).insertOne(inquiry);
  return result.insertedId.toString();
};

export const findInquiryById = async (id: string): Promise<Inquiry | null> => {
  const db = await getDatabase();
  return await db
    .collection<Inquiry>(COLLECTION)
    .findOne({ _id: new ObjectId(id) });
};

export const findAllInquiries = async (
  skip = 0,
  limit = 10,
  filters?: Record<string, unknown>
) => {
  const db = await getDatabase();
  
  const query = filters || {};
  
  const inquiries = await db
    .collection<Inquiry>(COLLECTION)
    .find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();
  
  const total = await db.collection<Inquiry>(COLLECTION).countDocuments(query);
  
  return { inquiries, total };
};

export const updateInquiry = async (
  id: string,
  data: Partial<Inquiry>
): Promise<boolean> => {
  const db = await getDatabase();
  const result = await db.collection<Inquiry>(COLLECTION).updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
  return result.modifiedCount > 0;
};

export const deleteInquiry = async (id: string): Promise<boolean> => {
  const db = await getDatabase();
  const result = await db.collection<Inquiry>(COLLECTION).deleteOne({
    _id: new ObjectId(id),
  });
  return result.deletedCount > 0;
};

export const findInquiriesByEmail = async (email: string) => {
  const db = await getDatabase();
  return await db
    .collection<Inquiry>(COLLECTION)
    .find({ email })
    .sort({ createdAt: -1 })
    .toArray();
};