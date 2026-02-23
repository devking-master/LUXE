import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useOrders from "../../hooks/useOrder";
import { Loader2, ArrowLeft, Package, User, CreditCard, Calendar } from "lucide-react";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { order, getOrderById, loading, error } = useOrders();

  useEffect(() => {
    getOrderById(id);
  }, [id, getOrderById]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-900 mr-3" />
        <span className="text-zinc-500 font-medium">Loading order details...</span>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-lg text-sm text-center mt-8">
        {error}
      </div>
    );

  if (!order)
    return (
      <div className="text-center py-12 text-zinc-500">
        Order not found.
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-zinc-600" />
        </button>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
             Order #{order._id.slice(-6).toUpperCase()}
             <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                 order.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
             }`}>
                {order.status}
             </span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Order Info */}
         <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
               <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                  <h3 className="font-semibold text-zinc-900 flex items-center gap-2">
                     <Package className="w-4 h-4 text-zinc-500" />
                     Items
                  </h3>
                  <span className="text-sm text-zinc-500">{order.products?.length || 0} items</span>
               </div>
               <div className="divide-y divide-zinc-100">
                  {order.products?.map((p) => (
                    <div key={p._id} className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
                       <div>
                          <p className="font-medium text-zinc-900">{p.title}</p>
                          <p className="text-xs text-zinc-500">Qty: {p.quantity}</p>
                       </div>
                       <p className="font-medium text-zinc-900">₦{(p.price * p.quantity).toLocaleString()}</p>
                    </div>
                  ))}
               </div>
               <div className="px-6 py-4 bg-zinc-50 border-t border-zinc-100 flex justify-between items-center">
                  <span className="font-medium text-zinc-700">Total Amount</span>
                  <span className="text-xl font-bold text-zinc-900">₦{order.total?.toLocaleString()}</span>
               </div>
            </div>
         </div>

         {/* Sidebar Info */}
         <div className="space-y-6">
            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
               <h3 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-zinc-500" />
                  Customer
               </h3>
               <div className="space-y-3">
                  <div>
                     <p className="text-xs text-zinc-500 uppercase tracking-wide">Name</p>
                     <p className="font-medium text-zinc-900">{order.customerName || "Guest User"}</p>
                  </div>
                  <div>
                     <p className="text-xs text-zinc-500 uppercase tracking-wide">ID</p>
                     <p className="text-sm text-zinc-600 font-mono">{order.user || "N/A"}</p>
                  </div>
               </div>
            </div>

            <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-sm">
               <h3 className="font-semibold text-zinc-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-zinc-500" />
                  Details
               </h3>
               <div className="space-y-3">
                  <div>
                     <p className="text-xs text-zinc-500 uppercase tracking-wide">Date Placed</p>
                     <p className="text-sm text-zinc-900">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                           year: 'numeric',
                           month: 'long',
                           day: 'numeric',
                           hour: '2-digit',
                           minute: '2-digit'
                        })}
                     </p>
                  </div>
                  <div>
                     <p className="text-xs text-zinc-500 uppercase tracking-wide">Payment Status</p>
                     <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-50 text-green-700 rounded-md text-xs font-medium mt-1">
                        <CreditCard className="w-3 h-3" />
                        Paid
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
