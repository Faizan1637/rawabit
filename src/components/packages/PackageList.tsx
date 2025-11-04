'use client';

import PackageCard from './PackageCard';

interface PackageListProps {
  packages: any[];
  packagesLoading: boolean;
}

export default function PackageList({ packages, packagesLoading }: PackageListProps) {
  if (packagesLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-orange-500 mx-auto mb-3"></div>
          <p className="text-slate-600 text-sm">Loading packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {packages.map((pkg, index) => (
        <PackageCard
          key={pkg.id}
          package={pkg}
          popular={index === 1} // Middle package (Platinum) is popular
        />
      ))}
    </div>
  );
}