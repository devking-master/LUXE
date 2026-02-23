import React from "react";
import { useCart } from "../../AuthContext/CartContext";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";

const UserCart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  // ✅ Calculate total
  const totalPrice = cart.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
    0
  );

  // 🛒 Checkout handler (just redirect)
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }
    window.location.href = "checkout"; // 🚀 navigate to checkout
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
         <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Your Cart</h1>
         <span className="text-zinc-500">{cart.length} Items</span>
      </div>

      {cart.length === 0 ? (
        <div className="bg-zinc-50 border border-dashed border-zinc-200 rounded-xl p-16 text-center">
           <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-zinc-400">
              <ShoppingBag className="w-8 h-8" />
           </div>
           <h2 className="text-lg font-semibold text-zinc-900 mb-2">Cart is empty</h2>
           <p className="text-zinc-500 mb-6">Looks like you haven't added anything yet.</p>
           <a href="/user/shop" className="inline-flex items-center justify-center px-6 py-3 bg-zinc-900 text-white font-medium rounded-lg hover:bg-zinc-800 transition">
              Start Shopping
           </a>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-12">
           {/* Cart Items */}
           <div className="flex-1 space-y-6">
             {cart.map((item) => (
               <div
                 key={item._id}
                 className="flex gap-6 p-4 bg-white border border-zinc-100 rounded-xl shadow-sm hover:shadow-md transition-shadow"
               >
                 <div className="w-24 h-24 bg-zinc-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.productId?.image}
                      alt={item.productId?.name}
                      className="w-full h-full object-cover"
                    />
                 </div>
                 
                 <div className="flex-1 flex flex-col justify-between">
                   <div className="flex justify-between items-start">
                      <div>
                         <h2 className="text-lg font-medium text-zinc-900">
                           {item.productId?.name}
                         </h2>
                         <p className="text-sm text-zinc-500">
                           Unit Price: ₦{item.productId?.price?.toLocaleString()}
                         </p>
                      </div>
                      <p className="font-bold text-zinc-900">
                        ₦{((item.productId?.price || 0) * item.quantity).toLocaleString()}
                      </p>
                   </div>
                   
                   <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center gap-3 bg-zinc-50 rounded-lg p-1">
                        <button
                          onClick={() => decreaseQuantity(item.productId._id)}
                          className="p-1 text-zinc-500 hover:text-zinc-900 transition disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-medium text-sm w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.productId._id)}
                          className="p-1 text-zinc-500 hover:text-zinc-900 transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.productId._id)}
                        className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                   </div>
                 </div>
               </div>
             ))}
             
             <button
               onClick={() => {
                  if(confirm('Are you sure you want to clear your cart?')) clearCart();
               }}
               className="text-red-600 text-sm font-medium hover:underline"
             >
               Clear Shopping Cart
             </button>
           </div>

           {/* Order Summary */}
           <div className="w-full lg:w-96">
              <div className="bg-zinc-950 text-white rounded-xl p-8 sticky top-24 shadow-xl shadow-zinc-900/10">
                 <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                 
                 <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-zinc-400">
                       <span>Subtotal</span>
                       <span>₦{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                       <span>Shipping</span>
                       <span className="text-zinc-500 italic">Calculated at checkout</span>
                    </div>
                    <div className="border-t border-zinc-800 pt-4 flex justify-between font-bold text-xl">
                       <span>Total</span>
                       <span>₦{totalPrice.toLocaleString()}</span>
                    </div>
                 </div>

                 <button
                   onClick={handleCheckout}
                   className="w-full bg-white text-zinc-950 py-4 rounded-lg font-bold hover:bg-zinc-200 transition-colors shadow-lg"
                 >
                   Proceed to Checkout
                 </button>
                 
                 <p className="text-xs text-zinc-500 text-center mt-6">
                    Secure Checkout powered by Luxe Inc.
                 </p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default UserCart;
