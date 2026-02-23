// src/pages/User/Payments.jsx
import React, { useEffect } from "react";
import useClient from "../../hooks/useClient";
import { Loader2, CreditCard, CheckCircle, XCircle, Clock } from "lucide-react";

const getStatusIcon = (status) => {
  switch(status?.toLowerCase()) {
    case 'completed':
    case 'success':
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'failed':
      return <XCircle className="w-4 h-4 text-red-600" />;
    default:
      return <Clock className="w-4 h-4 text-amber-600" />;
  }
};

const getStatusColor = (status) => {
  switch(status?.toLowerCase()) {
    case 'completed':
    case 'success':
      return 'bg-green-100 text-green-700';
    case 'failed':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-amber-100 text-amber-700';
  }
};

const UserPayments = ({ userId }) => {
  const { payments, fetchPayments, loading, error } = useClient(userId);

  useEffect(() => {
    fetchPayments();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <CreditCard className="w-8 h-8 text-zinc-900" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Payment History</h1>
          <p className="text-zinc-500 text-sm">View all your transaction records</p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-900" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">
          {error}
        </div>
      )}

      {/* Empty State */}
      {!loading && payments.length === 0 ? (
        <div className="text-center py-16 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
          <CreditCard className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
          <p className="text-zinc-500 text-lg mb-2">No payment history</p>
          <p className="text-zinc-400 text-sm">Your transactions will appear here once you make a purchase.</p>
        </div>
      ) : (
        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-zinc-50 border-b border-zinc-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Payment ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {payments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-zinc-900">
                        #{payment._id.slice(-8).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-zinc-900">
                        ₦{payment.amount?.toLocaleString() || '0'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        {payment.status}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-500">
                      {payment.createdAt ? new Date(payment.createdAt).toLocaleDateString('en-NG', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPayments;
