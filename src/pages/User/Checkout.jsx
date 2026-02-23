import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../AuthContext/CartContext";
import { privateApiClient } from "../../lib/client";
import { Loader2, ShieldCheck, CreditCard, ShoppingBag } from "lucide-react";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Prepare items for backend order
  const items = cart.map((it) => ({
    productId: it.productId?._id || it._id,
    quantity: it.quantity,
    price: it.productId?.price ?? it.price,
    image: it.productId?.image,
    name: it.productId?.name,
  }));

  const totalAmount = useMemo(
    () => items.reduce((acc, i) => acc + (i.price || 0) * (i.quantity || 1), 0),
    [items]
  );

  const handleCreateOrder = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await privateApiClient.post("/orders", {
        items,
        totalAmount,
      });

      const order = res.data.order;
      setLoading(false);

      // move to fake payment
      simulatePaymentFlow(order._id);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || "Failed to create order");
    }
  };

  // ✅ Simulated Payment
  const simulatePaymentFlow = (orderId) => {
    setPaying(true);
    setError(null);

    setTimeout(async () => {
      try {
        await privateApiClient.post(`/orders/${orderId}/pay-fake`, {
          txRef: `FAKE-${Date.now()}`,
        });

        clearCart(); // empty cart after payment
        setPaying(false);
        navigate("/user/orders"); // redirect to order history
      } catch (err) {
        setPaying(false);
        setError(err.response?.data?.message || err.message || "Payment failed");
      }
    }, 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
         {/* Left Side: Summary (Dark) */}
         <div className="space-y-6 order-2 md:order-1">
            <div className="bg-zinc-950 text-white rounded-2xl p-8 shadow-2xl">
               <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" /> Order Summary
               </h3>
               <div className="space-y-6">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                       <div className="w-16 h-16 bg-zinc-800 rounded-lg overflow-hidden flex-shrink-0 border border-zinc-700">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-90" />
                       </div>
                       <div className="flex-1">
                          <p className="text-sm font-medium text-white line-clamp-1">{item.name}</p>
                          <p className="text-xs text-zinc-400">Qty: {item.quantity}</p>
                       </div>
                       <p className="font-medium text-white">₦{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                  
                  <div className="border-t border-zinc-800 pt-6 space-y-3">
                     <div className="flex justify-between text-zinc-400 text-sm">
                        <span>Items Total</span>
                        <span>₦{totalAmount.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between text-2xl font-bold text-white pt-2">
                        <span>Total Pay</span>
                        <span>₦{totalAmount.toLocaleString()}</span>
                     </div>
                  </div>
               </div>
            </div>
            
            {/* Error Message if any */}
            {error && (
               <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-lg text-sm md:hidden">
                  {error}
               </div>
            )}
         </div>

         {/* Right Side: Payment (White) */}
         <div className="order-1 md:order-2 self-start py-4">
            <div className="mb-8">
               <h1 className="text-4xl font-bold tracking-tight text-zinc-900 mb-2">Checkout</h1>
               <p className="text-zinc-500">Securely complete your purchase.</p>
            </div>
            
            {error && (
               <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-lg text-sm mb-6 hidden md:block">
                  {error}
               </div>
            )}

            {!paying ? (
            <div className="space-y-6">
                 {/* Payment Methods */}
                 <div className="space-y-4">
                    <label className="text-sm font-semibold text-zinc-900 block">Payment Method</label>
                    <div className="grid gap-4">
                       <div className="flex items-center gap-3 p-4 border border-zinc-200 rounded-xl bg-zinc-50 opacity-60 cursor-not-allowed">
                          <CreditCard className="w-5 h-5 text-zinc-400" />
                          <div className="flex-1">
                             <p className="font-medium text-zinc-700 text-sm">Credit / Debit Card</p>
                             <p className="text-xs text-zinc-400">Temporarily Unavailable</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-3 p-4 border-2 border-zinc-900 bg-white rounded-xl shadow-sm cursor-pointer relative overflow-hidden">
                          <div className="absolute top-0 right-0 bg-zinc-900 text-white text-[10px] px-2 py-0.5 rounded-bl-lg">Active</div>
                          <ShieldCheck className="w-5 h-5 text-zinc-900" />
                          <div>
                             <p className="font-bold text-zinc-900 text-sm">Simulated Gateway</p>
                             <p className="text-xs text-zinc-500">For testing purposes only</p>
                          </div>
                       </div>
                    </div>
                 </div>

                  <button
                    onClick={handleCreateOrder}
                    disabled={loading || items.length === 0}
                    className="w-full bg-zinc-900 text-white py-4 rounded-lg font-bold hover:bg-zinc-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                       <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing Order...
                       </>
                    ) : (
                       "Pay Now"
                    )}
                  </button>
               </div>
            ) : (
               <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="relative">
                     <div className="w-16 h-16 border-4 border-zinc-100 border-t-zinc-900 rounded-full animate-spin"></div>
                  </div>
                  <div>
                     <h3 className="text-lg font-bold text-zinc-900">Processing Payment</h3>
                     <p className="text-zinc-500 text-sm mt-2">Connecting to secure gateway...</p>
                  </div>
                  <p className="text-xs text-zinc-400">Please do not close this window.</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default Checkout;
