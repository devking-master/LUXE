import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usePayments from "../../hooks/usePayment";
import { Loader2, CheckCircle, Trash2, Eye } from "lucide-react";

export default function StaffPayments() {
  const { payments, getPayments, updatePayment, deletePayment, loading } = usePayments();
  const navigate = useNavigate();

  useEffect(() => {
    getPayments();
  }, [getPayments]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-900 mr-3" />
        <span className="text-zinc-500 font-medium">Loading payments...</span>
      </div>
    );

  return (
    <div className="space-y-6">
      <div>
         <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Payments</h1>
         <p className="text-zinc-500">Monitor transaction history and status.</p>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
         <div className="overflow-x-auto">
           <table className="min-w-full divide-y divide-zinc-200">
             <thead className="bg-zinc-50/50">
               <tr>
                 <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">ID</th>
                 <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Customer</th>
                 <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Amount</th>
                 <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                 <th className="px-6 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider">Date</th>
                 <th className="px-6 py-3 text-right text-xs font-semibold text-zinc-500 uppercase tracking-wider">Actions</th>
               </tr>
             </thead>
             <tbody className="bg-white divide-y divide-zinc-100">
               {payments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-400">
                      No payments found.
                    </td>
                  </tr>
               ) : (
                  payments.map((p) => (
                    <tr key={p._id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-900 font-mono">
                        {p._id.slice(-6).toUpperCase()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-600">
                        {p.customerName || "Unknown"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-zinc-900">
                        ₦{p.amount?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                         <span
                           className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                             p.status === "Completed"
                               ? "bg-emerald-100 text-emerald-800"
                               : "bg-amber-100 text-amber-800"
                           }`}
                         >
                           {p.status}
                         </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                         {new Date(p.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end gap-2">
                        {p.status !== "Completed" && (
                           <button
                             onClick={() => updatePayment(p._id, { status: "Completed" })}
                             className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition"
                             title="Mark Completed"
                           >
                              <CheckCircle className="w-4 h-4" />
                           </button>
                        )}
                        <button
                          onClick={() => navigate(`/staff/payments/${p._id}`)}
                          className="p-1.5 text-zinc-500 hover:bg-zinc-100 rounded-md transition"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
               )}
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
}