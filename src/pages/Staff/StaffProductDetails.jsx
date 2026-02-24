// src/pages/Staff/StaffProductDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { Loader2, ArrowLeft, Save, X, Edit, Image as ImageIcon } from "lucide-react";

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Kitchen",
  "Beauty",
  "Sports",
  "Toys",
  "Other",
  "Music",
];

export default function StaffProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, updateProduct } = useProducts();

  const [product, setProduct] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductById(id);
      setProduct(data);
    };
    fetchData();
  }, [id]);

  if (!product)
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-900 mr-3" />
        <span className="text-zinc-500 font-medium text-sm md:text-base">Loading product...</span>
      </div>
    );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleSave = async () => {
    setSaving(true);
    await updateProduct(id, product);
    setSaving(false);
    setEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 md:p-2 hover:bg-zinc-100 rounded-full transition-colors -ml-1.5 md:-ml-2"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-zinc-600" />
        </button>
        <h1 className="text-lg md:text-xl font-bold tracking-tight text-zinc-900">Product Details</h1>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">
        {editing ? (
          <div className="p-4 md:p-6 space-y-4">
            <h2 className="text-base md:text-lg font-semibold text-zinc-900 mb-2 md:mb-4">Edit Product</h2>
            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="text-xs md:text-sm font-medium text-zinc-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={product.title || ""}
                  onChange={handleChange}
                  placeholder="Title"
                  className="w-full border border-zinc-200 rounded-lg px-3 md:px-4 py-2 md:py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900 text-sm md:text-base"
                />
              </div>
              <div>
                <label className="text-xs md:text-sm font-medium text-zinc-700">Price (₦)</label>
                <input
                  type="number"
                  name="price"
                  value={product.price ?? ""}
                  onChange={handleChange}
                  placeholder="Price"
                  className="w-full border border-zinc-200 rounded-lg px-3 md:px-4 py-2 md:py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900 text-sm md:text-base"
                />
              </div>
              <div>
                <label className="text-xs md:text-sm font-medium text-zinc-700">Category</label>
                <select
                  name="category"
                  value={product.category || ""}
                  onChange={handleChange}
                  className="w-full border border-zinc-200 rounded-lg px-3 md:px-4 py-2 md:py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900 text-sm md:text-base"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs md:text-sm font-medium text-zinc-700">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={product.image || ""}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="w-full border border-zinc-200 rounded-lg px-3 md:px-4 py-2 md:py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900 text-sm md:text-base"
                />
              </div>
              <div>
                <label className="text-xs md:text-sm font-medium text-zinc-700">Description</label>
                <textarea
                  name="description"
                  value={product.description || ""}
                  onChange={handleChange}
                  placeholder="Description"
                  className="w-full border border-zinc-200 rounded-lg px-3 md:px-4 py-2 md:py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-zinc-900 text-sm md:text-base"
                  rows={4}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-zinc-100">
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full sm:w-auto bg-zinc-900 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-lg font-medium hover:bg-zinc-800 transition flex items-center justify-center gap-2 disabled:opacity-50 text-sm md:text-base"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Changes
              </button>
              <button
                onClick={() => setEditing(false)}
                className="w-full sm:w-auto bg-zinc-100 text-zinc-700 px-4 md:px-5 py-2 md:py-2.5 rounded-lg font-medium hover:bg-zinc-200 transition flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="aspect-[4/3] md:aspect-video w-full bg-zinc-100 overflow-hidden relative">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-300">
                  <ImageIcon className="w-10 h-10 md:w-12 md:h-12" />
                </div>
              )}
            </div>

            <div className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-zinc-900">{product.title}</h2>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 text-[10px] md:text-xs uppercase font-bold tracking-wider">
                    {product.category}
                  </span>
                </div>
                <p className="text-lg md:text-xl font-bold text-zinc-900">₦{product.price?.toLocaleString()}</p>
              </div>

              <div className="prose prose-sm prose-zinc mb-6 md:mb-8">
                <h3 className="text-xs md:text-sm font-medium text-zinc-900 uppercase tracking-wide mb-1 md:mb-2">Description</h3>
                <p className="text-sm text-zinc-600">{product.description}</p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-zinc-100">
                <button
                  onClick={() => setEditing(true)}
                  className="w-full sm:w-auto bg-zinc-900 text-white px-4 md:px-5 py-2.5 md:py-2.5 rounded-lg font-medium hover:bg-zinc-800 transition flex items-center justify-center gap-2 shadow-sm shadow-zinc-900/10 text-sm md:text-base"
                >
                  <Edit className="w-4 h-4" /> Edit Product
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
