// src/pages/User/Orders.jsx
import React, { useEffect } from "react";
import useUserOrders from "../../hooks/useUserOrder";
import { Loader2, Package, Clock, CheckCircle, Truck, XCircle } from "lucide-react";

const getStatusIcon = (status) => {
   switch(status?.toLowerCase()) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'shipped': return <Truck className="w-4 h-4 text-blue-600" />;
      case 'cancelled': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-amber-600" />;
   }
};

const getStatusColor = (status) => {
   switch(status?.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-amber-100 text-amber-700';
   }
};

const UserOrders = () => {
  const { orders, fetchOrders, loading, error } = useUserOrders();

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-8">
         <Package className="w-8 h-8 text-zinc-900" />
         <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">My Orders</h2>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-12">
           <Loader2 className="w-8 h-8 animate-spin text-zinc-900" />
        </div>
      )}

      {/* Error State */}
      {error && (
         <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
         </div>
      )}

      {/* Empty Orders */}
      {orders.length === 0 && !loading ? (
        <div className="text-center py-16 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
           <Package className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
           <p className="text-zinc-500 text-lg">You have no orders yet.</p>
           <a href="/user/shop" className="text-zinc-900 font-semibold hover:underline mt-2 inline-block">Start Shopping</a>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
               {/* Order Header */}
              <div className="bg-zinc-50/50 px-6 py-4 border-b border-zinc-100 flex flex-wrap gap-4 justify-between items-center">
                 <div className="flex gap-4 text-sm">
                    <div>
                       <span className="block text-zinc-500 text-xs uppercase tracking-wider font-semibold">Order Placed</span>
                       <span className="text-zinc-900 font-medium">
                         {new Date(order.createdAt).toLocaleDateString("en-NG", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                         })}
                       </span>
                    </div>
                    <div>
                       <span className="block text-zinc-500 text-xs uppercase tracking-wider font-semibold">Total Amount</span>
                       <span className="text-zinc-900 font-medium">₦{order.totalAmount.toLocaleString()}</span>
                    </div>
                    <div>
                       <span className="block text-zinc-500 text-xs uppercase tracking-wider font-semibold">Order #</span>
                       <span className="text-zinc-900 font-mono">{order._id.slice(-6).toUpperCase()}</span>
                    </div>
                 </div>
                 
                 <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status}
                 </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-6">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-16 h-16 bg-zinc-100 rounded-lg overflow-hidden flex-shrink-0">
                         {item.productId?.image ? (
                           <img
                             src={item.productId.image}
                             alt={item.productId?.title}
                             className="w-full h-full object-cover"
                           />
                         ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-300">
                               <Package className="w-6 h-6" />
                            </div>
                         )}
                      </div>

                      <div className="flex-1">
                        <h4 className="font-semibold text-zinc-900 mb-1">
                           {item.productId?.title || "Product no longer available"}
                        </h4>
                        <p className="text-sm text-zinc-500">
                           Qty: {item.quantity} × ₦{item.price?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrders;
