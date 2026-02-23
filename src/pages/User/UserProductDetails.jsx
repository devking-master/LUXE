import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useUserProductDetails from "../../hooks/useUserProductDetails";
import { useCart } from "../../AuthContext/CartContext";
import { Loader2, ArrowLeft, ShoppingBag, Check } from "lucide-react";

const UserProductDetails = () => {
  const { id } = useParams();
  const { product, loading, error } = useUserProductDetails(id);
  const { addToCart } = useCart();

  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowNotification(true);

    // Hide after 2 seconds
    setTimeout(() => setShowNotification(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-zinc-900 mb-4" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link
        to="/user/shop"
        className="inline-flex items-center text-zinc-500 hover:text-zinc-900 mb-8 transition font-medium text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collection
      </Link>

      <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
         <div className="grid md:grid-cols-2">
            {/* Image Section */}
            <div className="bg-zinc-100 p-8 flex items-center justify-center min-h-[400px]">
               {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-[500px] w-full object-contain rounded-lg shadow-sm"
                  />
               ) : (
                  <div className="text-zinc-400">No Image Available</div>
               )}
            </div>

            {/* Details Section */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
               <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4 font-display">
                 {product.name}
               </h1>
               
               <p className="text-2xl text-zinc-900 font-bold mb-6">
                 ₦{product.price?.toLocaleString()}
               </p>

               <div className="prose prose-zinc mb-8 text-zinc-600 leading-relaxed">
                  <p>{product.description}</p>
               </div>

               <div className="flex items-center gap-4 mt-auto">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-zinc-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-zinc-800 transition flex items-center justify-center gap-2 shadow-lg shadow-zinc-900/10 active:scale-95 duration-200"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* ✅ Notification */}
      {showNotification && (
        <div className="fixed top-24 right-8 bg-zinc-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-right-10 duration-300 z-50">
          <div className="bg-green-500 rounded-full p-1">
             <Check className="w-3 h-3 text-white" />
          </div>
          <div>
             <p className="font-semibold text-sm">Added to Cart</p>
             <p className="text-zinc-400 text-xs">{product.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProductDetails;
