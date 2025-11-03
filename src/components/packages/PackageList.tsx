'use client';

import PackageCard from './PackageCard';

interface PackageListProps {
  packages: any[];
  loading: boolean;
}

export default function PackageList({ packages, loading }: PackageListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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