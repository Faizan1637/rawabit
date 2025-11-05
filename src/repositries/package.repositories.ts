import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/db/mongodb';
import { Package } from '@/types/package';

const COLLECTION = 'packages';

export const findAllPackages = async () => {
  const db = await getDatabase();
  return await db
    .collection<Package>(COLLECTION)
    .find({ isActive: true })
    .sort({ price: 1 })
    .toArray();
};

export const findPackageById = async (id: string): Promise<Package | null> => {
  const db = await getDatabase();
  const collection = db.collection<Package>(COLLECTION);

  try {
    const objectId = new ObjectId(id);
    const byObjectId = await collection.findOne({ _id: objectId });
    if (byObjectId) return byObjectId;
  } catch (err) {
    console.log(err)
  }

  // fallback for string _id
  return await collection.findOne({ _id: id } as any);
};



export const createPackage = async (pkg: Omit<Package, '_id'>): Promise<string> => {
  const db = await getDatabase();
  const result = await db.collection<Package>(COLLECTION).insertOne(pkg);
  return result.insertedId.toString();
};