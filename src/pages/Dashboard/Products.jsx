import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { Loader2, Plus, Trash2, Eye, Image as ImageIcon } from "lucide-react";

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Kitchen",
  "Beauty",
  "Sports",
  "Toys",
  "Other",
];

export default function Products() {
  const { products, createProduct, deleteProduct, loading, error } = useProducts();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const [actionLoading, setActionLoading] = useState(false);
  const [actionType, setActionType] = useState(""); // "create" or "delete"

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionType("create");
    setActionLoading(true);
    await createProduct(form);
    setForm({ title: "", price: "", description: "", category: "", image: "" });
    setActionLoading(false);
    setActionType("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setActionType("delete");
    setActionLoading(true);
    await deleteProduct(id);
    setActionLoading(false);
    setActionType("");
  };

  return (
    <div className="space-y-8">
      <div>
         <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Products</h1>
         <p className="text-zinc-500">Manage your product inventory.</p>
      </div>

      {/* Product Form */}
      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-zinc-900 mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
             <label className="text-sm font-medium text-zinc-700">Product Title</label>
             <input
               name="title"
               value={form.title}
               onChange={handleChange}
               placeholder="e.g. Premium Leather Bag"
               required
               className="w-full border border-zinc-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition text-sm"
               disabled={actionLoading && actionType === "create"}
             />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-700">Price (₦)</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="0.00"
              required
              className="w-full border border-zinc-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition text-sm"
              disabled={actionLoading && actionType === "create"}
            />
          </div>

          <div className="space-y-1">
             <label className="text-sm font-medium text-zinc-700">Image URL</label>
             <input
               name="image"
               value={form.image}
               onChange={handleChange}
               placeholder="https://..."
               required
               className="w-full border border-zinc-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition text-sm"
               disabled={actionLoading && actionType === "create"}
             />
          </div>

          <div className="space-y-1">
             <label className="text-sm font-medium text-zinc-700">Category</label>
             <select
               name="category"
               value={form.category}
               onChange={handleChange}
               required
               className="w-full border border-zinc-200 rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition text-sm"
               disabled={actionLoading && actionType === "create"}
             >
               <option value="">Select Category</option>
               {categories.map((cat) => (
                 <option key={cat} value={cat}>{cat}</option>
               ))}
             </select>
          </div>

          <div className="md:col-span-2 space-y-1">
             <label className="text-sm font-medium text-zinc-700">Description</label>
             <textarea
               name="description"
               value={form.description}
               onChange={handleChange}
               placeholder="Product details..."
               required
               className="w-full border border-zinc-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition text-sm min-h-[100px]"
               rows={3}
               disabled={actionLoading && actionType === "create"}
             />
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-zinc-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-zinc-800 transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={actionLoading && actionType === "create"}
            >
              {actionLoading && actionType === "create" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Error & Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-900 mr-3" />
          <span className="text-zinc-500 font-medium">Loading inventory...</span>
        </div>
      )}
      
      {error && (
         <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-lg text-sm">
            {error}
         </div>
      )}

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.isArray(products) && products.map((p) => (
          <div
            key={p._id}
            className="group bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <div className="aspect-video bg-zinc-100 overflow-hidden relative">
              {p.image ? (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
              ) : (
                  <div className="flex items-center justify-center h-full text-zinc-300">
                     <ImageIcon className="w-8 h-8" />
                  </div>
              )}
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => navigate(`/dashboard/products/${p._id}`)}
                    className="p-2 bg-white text-zinc-900 rounded-full hover:bg-zinc-50 transition"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition disabled:opacity-50"
                    disabled={actionLoading && actionType === "delete"}
                    title="Delete"
                  >
                     {actionLoading && actionType === "delete" ? <Loader2 className="w-4 h-4 animate-spin"/> : <Trash2 className="w-4 h-4" />}
                  </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="text-sm font-semibold text-zinc-900 line-clamp-1 flex-1" title={p.title}>{p.title}</h3>
                 <span className="text-sm font-bold text-zinc-900 ml-2">₦{p.price?.toLocaleString()}</span>
              </div>
              <p className="text-xs text-zinc-500 mb-3 uppercase tracking-wider font-medium">{p.category}</p>
              <p className="text-sm text-zinc-600 line-clamp-2 min-h-[2.5em]">{p.description}</p>
            </div>
          </div>
        ))}
        {Array.isArray(products) && products.length === 0 && !loading && (
          <div className="col-span-full text-center py-12 bg-zinc-50 rounded-xl border border-dashed border-zinc-200">
            <p className="text-zinc-500">No products found. Start by adding one above.</p>
          </div>
        )}
      </div>
    </div>
  );
}