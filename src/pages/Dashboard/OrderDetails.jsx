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
            <span className="text-zinc-500 font-medium text-sm md:text-base">Loading order details...</span>
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
         <div className="text-center py-12 text-zinc-500 text-sm md:text-base">
            Order not found.
         </div>
      );

   return (
      <div className="space-y-4 md:space-y-6">
         <div className="flex items-center gap-3 md:gap-4">
            <button
               onClick={() => navigate(-1)}
               className="p-1.5 md:p-2 hover:bg-zinc-100 rounded-full transition-colors -ml-1.5 md:-ml-2"
            >
               <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-zinc-600" />
            </button>
            <div>
               <h1 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
                  Order #{order._id.slice(-6).toUpperCase()}
                  <span className={`text-[10px] md:text-xs px-2 py-0.5 rounded-full font-medium ${order.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                     }`}>
                     {order.status}
                  </span>
               </h1>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Order Info */}
            <div className="col-span-1 md:col-span-2 space-y-4 md:space-y-6">
               <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="px-4 md:px-6 py-3 md:py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                     <h3 className="text-sm md:text-base font-semibold text-zinc-900 flex items-center gap-2">
                        <Package className="w-4 h-4 md:w-5 md:h-5 text-zinc-500" />
                        Items
                     </h3>
                     <span className="text-xs md:text-sm text-zinc-500">{order.products?.length || 0} items</span>
                  </div>
                  <div className="divide-y divide-zinc-100">
                     {order.products?.map((p) => (
                        <div key={p._id} className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
                           <div>
                              <p className="text-sm md:text-base font-medium text-zinc-900">{p.title}</p>
                              <p className="text-[10px] md:text-xs text-zinc-500">Qty: {p.quantity}</p>
                           </div>
                           <p className="text-sm md:text-base font-medium text-zinc-900">₦{(p.price * p.quantity).toLocaleString()}</p>
                        </div>
                     ))}
                  </div>
                  <div className="px-4 md:px-6 py-3 md:py-4 bg-zinc-50 border-t border-zinc-100 flex justify-between items-center">
                     <span className="text-sm md:text-base font-medium text-zinc-700">Total Amount</span>
                     <span className="text-lg md:text-xl font-bold text-zinc-900">₦{order.total?.toLocaleString()}</span>
                  </div>
               </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-4 md:space-y-6">
               <div className="bg-white border border-zinc-200 rounded-xl p-4 md:p-6 shadow-sm">
                  <h3 className="text-sm md:text-base font-semibold text-zinc-900 mb-3 md:mb-4 flex items-center gap-2">
                     <User className="w-4 h-4 md:w-5 md:h-5 text-zinc-500" />
                     Customer
                  </h3>
                  <div className="space-y-3">
                     <div>
                        <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-wide">Name</p>
                        <p className="text-sm md:text-base font-medium text-zinc-900">{order.customerName || "Guest User"}</p>
                     </div>
                     <div>
                        <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-wide">ID</p>
                        <p className="text-xs md:text-sm text-zinc-600 font-mono break-all">{order.user || "N/A"}</p>
                     </div>
                  </div>
               </div>

               <div className="bg-white border border-zinc-200 rounded-xl p-4 md:p-6 shadow-sm">
                  <h3 className="text-sm md:text-base font-semibold text-zinc-900 mb-3 md:mb-4 flex items-center gap-2">
                     <Calendar className="w-4 h-4 md:w-5 md:h-5 text-zinc-500" />
                     Details
                  </h3>
                  <div className="space-y-3">
                     <div>
                        <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-wide">Date Placed</p>
                        <p className="text-xs md:text-sm text-zinc-900">
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
                        <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-wide">Payment Status</p>
                        <span className="inline-flex items-center gap-1 md:gap-1.5 px-2 py-1 bg-green-50 text-green-700 rounded-md text-[10px] md:text-xs font-medium mt-1">
                           <CreditCard className="w-3 h-3 md:w-4 md:h-4" />
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
