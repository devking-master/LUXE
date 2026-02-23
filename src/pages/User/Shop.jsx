// src/pages/User/Shop.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useClient from "../../hooks/useClient";
import { Loader2, ShoppingBag } from "lucide-react";

const Shop = ({ userId }) => {
  const { products, loading, error, fetchProducts, addToCart } = useClient(userId);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
         <div>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Shop Collection</h2>
            <p className="text-zinc-500 mt-2">Curated for lifestyle excellence.</p>
         </div>
         {/* Filter/Sort controls could go here */}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center h-64">
           <Loader2 className="w-8 h-8 animate-spin text-zinc-900 mb-4" />
           <p className="text-zinc-500">Loading collection...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-lg text-center">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="group relative"
          >
            <Link to={`/user/products/${product._id}`}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-zinc-100 mb-4">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-zinc-400">No Image</div>
                )}
              </div>
            </Link>
            
            {/* Add to Cart Button - Separate from Link */}
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="absolute top-4 right-4 h-10 w-10 bg-white shadow-lg rounded-full flex items-center justify-center text-zinc-900 hover:bg-zinc-900 hover:text-white transition-all transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10"
              title="Add to Cart"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            
            <Link to={`/user/products/${product._id}`}>
              <h3 className="text-lg font-medium text-zinc-900 hover:text-zinc-600 transition-colors">{product.title || product.name}</h3>
              <p className="text-sm text-zinc-500 line-clamp-1 mb-2">{product.description}</p>
              <p className="font-semibold text-zinc-900">₦{product.price?.toLocaleString()}</p>
            </Link>
          </div>
        ))}

        {products.length === 0 && !loading && (
          <div className="col-span-full py-24 text-center">
            <p className="text-zinc-400 text-lg">No products found in this collection.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
