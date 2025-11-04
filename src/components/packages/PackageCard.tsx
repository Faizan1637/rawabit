'use client';

import { Check, Crown } from 'lucide-react';
import Link from 'next/link';

interface PackageCardProps {
  package: {
    id: string;
    name: string;
    price: number;
    validity: number;
    totalCount: number;
    features: string[];
  };
  popular?: boolean;
}

export default function PackageCard({ package: pkg, popular }: PackageCardProps) {
  return (
    <div className={`relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
      popular ? 'ring-2 ring-orange-500 transform scale-105' : ''
    }`}>
      {/* Popular Badge */}
      {popular && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 text-xs font-bold rounded-bl-xl">
          MOST POPULAR
        </div>
      )}

      {/* Header */}
      <div className={`p-4 text-center ${
        popular 
          ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white' 
          : 'bg-gradient-to-br from-slate-50 to-slate-100'
      }`}>
        <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full mb-2">
          <Crown className={`w-6 h-6 ${popular ? 'text-white' : 'text-orange-500'}`} />
        </div>
        <h3 className={`text-xl font-bold mb-1 ${popular ? 'text-white' : 'text-slate-900'}`}>
          {pkg.name}
        </h3>
        <div className="mb-2">
          <span className={`text-3xl font-bold ${popular ? 'text-white' : 'text-orange-600'}`}>
            {pkg.price.toLocaleString()}
          </span>
          <span className={`text-sm ml-1 ${popular ? 'text-white/80' : 'text-slate-600'}`}>
            PKR
          </span>
        </div>
        <p className={`text-sm ${popular ? 'text-white/90' : 'text-slate-600'}`}>
          Valid for {pkg.validity} months
        </p>
      </div>

      {/* Features */}
      <div className="p-4">
        <div className="mb-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
          <p className="text-center text-sm">
            <span className="font-bold text-orange-600 text-xl">{pkg.totalCount}</span>
            <span className="text-slate-700 ml-1 text-xs">Contact Views</span>
          </p>
        </div>

        <ul className="space-y-2 mb-4">
          {pkg.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <Check className="w-3 h-3 text-green-600" />
              </div>
              <span className="text-slate-700 text-sm leading-tight">{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          href={`/account/packages/${pkg.id}/checkout`}
          className={`block text-center font-bold text-sm py-3 rounded-lg transition-all shadow-md hover:shadow-lg ${
            popular
              ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white'
              : 'bg-slate-900 hover:bg-slate-800 text-white'
          }`}
        >
          Choose {pkg.name}
        </Link>
      </div>
    </div>
  );
}