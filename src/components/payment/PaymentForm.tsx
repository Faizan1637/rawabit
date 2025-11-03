'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { transactionApi, CreateTransactionData } from '@/client/api/transaction.api';
import { CreditCard, DollarSign, Smartphone, CheckCircle, AlertCircle } from 'lucide-react';

interface PaymentFormProps {
  package: {
    id: string;
    name: string;
    price: number;
  };
}

export default function PaymentForm({ package: pkg }: PaymentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<CreateTransactionData>({
    packageId: pkg.id,
    paymentMethod: 'cash',
    mobileNo: '',
    transactionRefNo: '',
  });

  useEffect(()=>{
    console.log(formData)
  },[])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handlePaymentMethodChange = (method: CreateTransactionData['paymentMethod']) => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await transactionApi.createTransaction(formData);
      setSuccess(true);
      setTimeout(() => {
        router.push('/account/subscriptions');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit payment');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-2xl p-8">
        <div className="text-center">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Payment Submitted!</h3>
          <p className="text-slate-700 text-lg mb-2">
            Your payment is being verified by our team.
          </p>
          <p className="text-slate-600 mb-6">
            You will receive confirmation within 24-48 hours.
          </p>
          <div className="animate-pulse text-orange-600 font-semibold">
            Redirecting to subscriptions...
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        </div>
      )}

      {/* Payment Method Selection */}
      <div>
        <label className="block text-slate-700 font-bold text-lg mb-4">
          Payment Method <span className="text-red-500">*</span>
        </label>

        <div className="space-y-3">
          {/* Bank Transfer */}
          <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
            formData.paymentMethod === 'bank_transfer'
              ? 'border-orange-500 bg-orange-50'
              : 'border-slate-300 hover:border-orange-300'
          }`}>
            <input
              type="radio"
              name="paymentMethod"
              checked={formData.paymentMethod === 'bank_transfer'}
              onChange={() => handlePaymentMethodChange('bank_transfer')}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-slate-900">Bank Transfer</span>
              </div>
              {formData.paymentMethod === 'bank_transfer' && (
                <div className="mt-3 p-4 bg-amber-50 rounded-lg border border-amber-200 text-sm">
                  <p className="font-semibold text-slate-900 mb-2">Bank Details:</p>
                  <p className="text-slate-700">Bank: <strong>Meezan Bank Limited</strong></p>
                  <p className="text-slate-700">Account Title: <strong>Hafiz Muhammad Safi Ullah</strong></p>
                  <p className="text-slate-700">Account No: <strong>0215-0101643530</strong></p>
                  <p className="text-slate-700">IBAN: <strong>PK63MEZN0002150101643530</strong></p>
                </div>
              )}
            </div>
          </label>

          {/* Cash */}
          <label className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
            formData.paymentMethod === 'cash'
              ? 'border-orange-500 bg-orange-50'
              : 'border-slate-300 hover:border-orange-300'
          }`}>
            <input
              type="radio"
              name="paymentMethod"
              checked={formData.paymentMethod === 'cash'}
              onChange={() => handlePaymentMethodChange('cash')}
            />
            <DollarSign className="w-5 h-5 text-orange-600" />
            <span className="font-semibold text-slate-900">Cash</span>
          </label>

          {/* Telenor Easypaisa */}
          <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
            formData.paymentMethod === 'telenor_easypaisa'
              ? 'border-orange-500 bg-orange-50'
              : 'border-slate-300 hover:border-orange-300'
          }`}>
            <input
              type="radio"
              name="paymentMethod"
              checked={formData.paymentMethod === 'telenor_easypaisa'}
              onChange={() => handlePaymentMethodChange('telenor_easypaisa')}
              className="mt-1"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-5 h-5 text-orange-600" />
                <span className="font-semibold text-slate-900">Telenor Easypaisa</span>
              </div>
              {formData.paymentMethod === 'telenor_easypaisa' && (
                <div className="mt-3 p-4 bg-amber-50 rounded-lg border border-amber-200 text-sm">
                  <p className="font-semibold text-slate-900 mb-2">Easypaisa Details:</p>
                  <p className="text-slate-700">CNIC: <strong>35202-3966655-7</strong></p>
                  <p className="text-slate-700">Mobile No: <strong>+92-3034750787</strong></p>
                </div>
              )}
            </div>
          </label>
        </div>
      </div>

      {/* Mobile Number */}
      <div>
        <label htmlFor="mobileNo" className="block text-slate-700 font-semibold mb-2">
          Mobile No <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="mobileNo"
          name="mobileNo"
          value={formData.mobileNo}
          onChange={handleChange}
          required
          disabled={loading}
          placeholder="Mobile Number"
          className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
        />
      </div>

      {/* Transaction Reference (for Bank Transfer and Easypaisa) */}
      {(formData.paymentMethod === 'bank_transfer' || formData.paymentMethod === 'telenor_easypaisa') && (
        <div>
          <label htmlFor="transactionRefNo" className="block text-slate-700 font-semibold mb-2">
            Transaction Ref No {formData.paymentMethod === 'bank_transfer' && <span className="text-red-500">*</span>}
          </label>
          <input
            type="text"
            id="transactionRefNo"
            name="transactionRefNo"
            value={formData.transactionRefNo}
            onChange={handleChange}
            required={formData.paymentMethod === 'bank_transfer'}
            disabled={loading}
            placeholder="Transaction Ref No"
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
          />
        </div>
      )}

      {/* Payment Instructions */}
      {formData.paymentMethod !== 'cash' && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
          <p className="font-bold text-slate-900 mb-3">Payment Instructions:</p>
          <ol className="list-decimal list-inside space-y-2 text-slate-700">
            <li>
              Make payment via {formData.paymentMethod === 'bank_transfer' ? 'Bank Transfer/Deposit' : 'Telenor Easypaisa'} using details above
            </li>
            <li>Note down transaction reference number</li>
            <li>Enter correct Transaction Reference No and Mobile Number</li>
            <li>Click Process Order</li>
          </ol>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : 'Process Order'}
      </button>

      {/* Note */}
      <p className="text-center text-red-600 text-sm font-semibold">
        NOTE: ***All payment(s) are non-refundable.
      </p>
    </form>
  );
}