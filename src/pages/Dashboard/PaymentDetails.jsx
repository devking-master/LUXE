import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import usePayments from "../../hooks/usePayment";
import { Loader2, ArrowLeft, CreditCard, User, Calendar, DollarSign, FileText } from "lucide-react";

export default function PaymentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { payment, getPaymentById, loading, error } = usePayments();

  useEffect(() => {
    getPaymentById(id);
  }, [id, getPaymentById]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-900 mr-3" />
        <span className="text-zinc-500 font-medium">Loading payment...</span>
      </div>
    );

  if (error)
     return (
       <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-lg text-sm text-center mt-8">
         {error}
       </div>
     );

  if (!payment)
     return (
       <div className="text-center py-12 text-zinc-500">
         Payment not found.
       </div>
     );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
       <div className="flex items-center gap-4">
         <button
           onClick={() => navigate(-1)}
           className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
         >
           <ArrowLeft className="w-5 h-5 text-zinc-600" />
         </button>
         <h1 className="text-xl font-bold tracking-tight text-zinc-900">Payment Details</h1>
       </div>

       <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center">
                   <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                   <p className="text-sm font-medium text-zinc-500">Total Amount</p>
                   <p className="text-xl font-bold text-zinc-900">₦{payment.amount?.toLocaleString()}</p>
                </div>
             </div>
             <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                payment.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
             }`}>
                {payment.status}
             </span>
          </div>
          
          <div className="p-6 space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide flex items-center gap-2 mb-2">
                      <FileText className="w-3 h-3" /> Transaction ID
                   </label>
                   <p className="text-sm font-mono text-zinc-900 bg-zinc-50 p-2 rounded border border-zinc-100 break-all">
                      {payment._id}
                   </p>
                </div>
                <div>
                   <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide flex items-center gap-2 mb-2">
                       <CreditCard className="w-3 h-3" /> Associated Order
                   </label>
                   <p className="text-sm font-mono text-zinc-900 bg-zinc-50 p-2 rounded border border-zinc-100 break-all">
                      {payment.orderId || "N/A"}
                   </p>
                </div>
             </div>

             <div className="h-px bg-zinc-100" />

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide flex items-center gap-2 mb-2">
                      <User className="w-3 h-3" /> Customer
                   </label>
                   <p className="font-medium text-zinc-900">{payment.customerName || "Guest Payment"}</p>
                </div>
                <div>
                   <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide flex items-center gap-2 mb-2">
                      <Calendar className="w-3 h-3" /> Date
                   </label>
                   <p className="text-sm text-zinc-700">
                      {new Date(payment.createdAt).toLocaleString()}
                   </p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}