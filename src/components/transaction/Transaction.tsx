'use client';

import { Spin, Alert, Tag, Empty, Button } from 'antd';
import { 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  CloseCircleOutlined,
  SyncOutlined,
  ReloadOutlined,
  DollarOutlined,
  PhoneOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { useTransaction } from '@/hooks/useTransaction';

const Transaction = () => {
  const { transactions, transactionLoading, errorTransaction, clearError, fetchTransactions } = useTransaction();

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'verified':
        return { 
          color: 'bg-green-50 text-green-700 border-green-200', 
          icon: <CheckCircleOutlined className="text-green-600" />, 
          text: 'Verified',
          badge: 'bg-green-500'
        };
      case 'pending':
        return { 
          color: 'bg-amber-50 text-amber-700 border-amber-200', 
          icon: <ClockCircleOutlined className="text-amber-600" />, 
          text: 'Pending',
          badge: 'bg-amber-500'
        };
      case 'verifying':
        return { 
          color: 'bg-blue-50 text-blue-700 border-blue-200', 
          icon: <SyncOutlined spin className="text-blue-600" />, 
          text: 'Verifying',
          badge: 'bg-blue-500'
        };
      case 'rejected':
        return { 
          color: 'bg-red-50 text-red-700 border-red-200', 
          icon: <CloseCircleOutlined className="text-red-600" />, 
          text: 'Rejected',
          badge: 'bg-red-500'
        };
      default:
        return { 
          color: 'bg-slate-50 text-slate-700 border-slate-200', 
          icon: <ClockCircleOutlined className="text-slate-600" />, 
          text: status,
          badge: 'bg-slate-500'
        };
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      'bank_transfer': 'Bank Transfer',
      'cash': 'Cash',
      'CASH': 'Cash',
      'telenor_easypaisa': 'Easypaisa',
      'easypaisa': 'Easypaisa'
    };
    return labels[method] || method;
  };

  const getPaymentMethodIcon = (method: string) => {
    const methodLower = method.toLowerCase();
    if (methodLower.includes('bank')) return '🏦';
    if (methodLower.includes('cash')) return '💵';
    if (methodLower.includes('easypaisa')) return '📱';
    return '💳';
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  if (transactionLoading) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-12 shadow-lg border border-slate-200">
        <div className="flex flex-col justify-center items-center">
          <Spin size="large" />
          <p className="mt-4 text-slate-600 font-medium">Loading your transactions...</p>
        </div>
      </div>
    );
  }

  if (errorTransaction) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-red-200">
        <Alert
          message="Failed to Load Transactions"
          description={errorTransaction}
          type="error"
          showIcon
          closable
          onClose={clearError}
          action={
            <Button 
              size="small" 
              danger 
              onClick={fetchTransactions}
              icon={<ReloadOutlined />}
            >
              Retry
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Payment History</h2>
            <p className="text-orange-100 text-sm">
              {transactions.length} {transactions.length === 1 ? 'transaction' : 'transactions'} found
            </p>
          </div>
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchTransactions}
            className="bg-white/20 border-white/40 text-white hover:bg-white/30 font-semibold"
            loading={transactionLoading}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Transactions List */}
      {transactions.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-lg border border-slate-200">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <div>
                <p className="text-slate-600 font-medium mb-1">No Transactions Yet</p>
                <p className="text-slate-400 text-sm">Your payment history will appear here</p>
              </div>
            }
          />
        </div>
      ) : (
        <div className="grid gap-4">
          {transactions.map((transaction) => {
            const statusConfig = getStatusConfig(transaction.status);
            const paymentIcon = getPaymentMethodIcon(transaction.transactionDetails);
            
            return (
              <div
                key={transaction.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl border-2 border-slate-100 hover:border-orange-200 transition-all duration-300 overflow-hidden"
              >
                {/* Status Bar */}
                <div className={`h-1.5 ${statusConfig.badge}`}></div>
                
                <div className="p-5">
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-slate-800">
                          {transaction.packageTitle}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${statusConfig.color}`}>
                          {statusConfig.icon}
                          {statusConfig.text}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                        <CalendarOutlined />
                        <span>{formatDate(transaction.createdAt)}</span>
                      </div>
                    </div>
                    
                    {/* Amount Badge */}
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl px-4 py-2 text-right">
                      <div className="text-xs text-orange-600 font-semibold mb-0.5">Amount</div>
                      <div className="text-2xl font-bold text-orange-600">
                        {transaction.amount.toLocaleString()}
                        <span className="text-sm ml-1">PKR</span>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                    {/* Mobile Number */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <PhoneOutlined className="text-blue-600 text-lg" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-medium">Mobile Number</div>
                        <div className="text-sm font-semibold text-slate-800">{transaction.mobileNo}</div>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 text-xl">
                        {paymentIcon}
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 font-medium">Payment Method</div>
                        <div className="text-sm font-semibold text-slate-800">
                          {getPaymentMethodLabel(transaction.transactionDetails)}
                        </div>
                      </div>
                    </div>

                    {/* Transaction Ref (if not cash) */}
                    {transaction.transactionDetails && 
                     transaction.transactionDetails.toLowerCase() !== 'cash' && (
                      <div className="flex items-center gap-3 md:col-span-2">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <DollarOutlined className="text-purple-600 text-lg" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-slate-500 font-medium">Transaction Reference</div>
                          <div className="text-sm font-semibold text-slate-800 font-mono bg-slate-50 px-2 py-1 rounded inline-block">
                            {transaction.transactionDetails}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Transaction;