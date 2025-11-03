import { findAllPackages, findPackageById } from '@/repositries/package.repositories';
import { Package, PackageResponse } from '@/types/package';

export const sanitizePackage = (pkg: Package): PackageResponse => {
  return {
    id: pkg._id!.toString(),
    name: pkg.name,
    price: pkg.price,
    validity: pkg.validity,
    totalCount: pkg.total Count,
    features: pkg.features,
    isActive: pkg.isActive,
  };
};

export const getAllPackages = async (): Promise<PackageResponse[]> => {
  const packages = await findAllPackages();
  return packages.map(sanitizePackage);
};

export const getPackageById = async (id: string): Promise<PackageResponse> => {
  const pkg = await findPackageById(id);
  if (!pkg) {
    throw new Error('Package not found');
  }
  return sanitizePackage(pkg);
};