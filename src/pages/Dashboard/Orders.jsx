import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useOrders from "../../hooks/useOrder";
import { Loader2, Eye, CheckCircle, Trash2 } from "lucide-react";

export default function Orders() {
  const { orders, getOrders, updateOrder, deleteOrder, loading } = useOrders();
  const navigate = useNavigate();

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-zinc-900 mr-3" />
        <span className="text-zinc-500 text-lg">Loading orders...</span>
      </div>
    );

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Orders</h2>
          <p className="text-zinc-500 mt-1 text-sm md:text-base">Manage customer orders and status.</p>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200">
            <thead className="bg-zinc-50/50">
              <tr>
                <th className="px-4 md:px-6 py-3 text-left text-[10px] md:text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-[10px] md:text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 md:px-6 py-3 text-left text-[10px] md:text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-4 md:px-6 py-3 text-right text-[10px] md:text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-zinc-100">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-zinc-50/50 transition-colors"
                >
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-zinc-900 font-mono">
                    #{order._id.slice(-6)}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium ${order.status === "Completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm font-bold text-zinc-900">
                    ₦{order.total?.toLocaleString()}
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right text-xs md:text-sm font-medium flex justify-end gap-1 md:gap-2">
                    {order.status !== "Completed" && (
                      <button
                        onClick={() =>
                          updateOrder(order._id, { status: "Completed" })
                        }
                        className="p-1 md:p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition"
                        title="Mark Completed"
                      >
                        <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => navigate(`/dashboard/orders/${order._id}`)}
                      className="p-1 md:p-1.5 text-zinc-500 hover:bg-zinc-100 rounded-md transition"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this order?')) deleteOrder(order._id);
                      }}
                      className="p-1 md:p-1.5 text-red-500 hover:bg-red-50 rounded-md transition"
                      title="Delete Order"
                    >
                      <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 md:px-6 py-12 text-center text-zinc-400"
                  >
                    No orders found yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
