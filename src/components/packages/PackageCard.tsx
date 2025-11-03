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
    <div className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
      popular ? 'ring-4 ring-orange-500 transform scale-105' : ''
    }`}>
      {/* Popular Badge */}
      {popular && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 text-sm font-bold rounded-bl-2xl">
          MOST POPULAR
        </div>
      )}

      {/* Header */}
      <div className={`p-8 text-center ${
        popular 
          ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white' 
          : 'bg-gradient-to-br from-slate-50 to-slate-100'
      }`}>
        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-4">
          <Crown className={`w-8 h-8 ${popular ? 'text-white' : 'text-orange-500'}`} />
        </div>
        <h3 className={`text-3xl font-bold mb-2 ${popular ? 'text-white' : 'text-slate-900'}`}>
          {pkg.name}
        </h3>
        <div className="mb-4">
          <span className={`text-5xl font-bold ${popular ? 'text-white' : 'text-orange-600'}`}>
            {pkg.price.toLocaleString()}
          </span>
          <span className={`text-xl ml-2 ${popular ? 'text-white/80' : 'text-slate-600'}`}>
            PKR
          </span>
        </div>
        <p className={`text-lg ${popular ? 'text-white/90' : 'text-slate-600'}`}>
          Valid for {pkg.validity} months
        </p>
      </div>

      {/* Features */}
      <div className="p-8">
        <div className="mb-6 p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
          <p className="text-center text-lg">
            <span className="font-bold text-orange-600 text-2xl">{pkg.totalCount}</span>
            <span className="text-slate-700 ml-2">Contact Views</span>
          </p>
        </div>

        <ul className="space-y-4 mb-8">
          {pkg.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-slate-700">{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          href={`/account/packages/${pkg.id}/checkout`}
          className={`block text-center font-bold text-lg py-4 rounded-xl transition-all shadow-lg hover:shadow-xl ${
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