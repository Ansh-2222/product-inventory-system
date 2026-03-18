// src/components/ProductTable.tsx
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string; // ✅ FIX
};

type Props = {
  products: Product[];
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
  loading?: boolean;
};

const ProductTable = ({ products, onDelete, onEdit, loading }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow rounded-xl overflow-x-auto">

      <table className="w-full text-sm min-w-[600px]">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-center">Category</th>
            <th className="p-3 text-center">Price</th>
            <th className="p-3 text-center">Qty</th>
            <th className="p-3 text-center">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>

          {loading ? (
            <tr>
              <td colSpan={6} className="text-center py-6">Loading...</td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-6">No products</td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">

                <td className="p-3">{p.name}</td>
                <td className="p-3 text-center">{p.category}</td>
                <td className="p-3 text-center">₹{p.price}</td>
                <td className="p-3 text-center">{p.quantity}</td>

                <td className="p-3 text-center">
                  <span className={`px-2 py-1 text-xs rounded ${
                    p.quantity < 10
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}>
                    {p.quantity < 10 ? "Low Stock" : "In Stock"}
                  </span>
                </td>

                <td className="p-3 flex justify-center gap-3">

                  <button onClick={() => navigate(`/product/${p.id}`)}>
                    <Eye size={18} />
                  </button>

                  <button onClick={() => onEdit(p)}>
                    <Pencil size={18} className="text-blue-600" />
                  </button>

                  <button onClick={() => onDelete(p.id)}>
                    <Trash2 size={18} className="text-red-500" />
                  </button>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
};

export default ProductTable;