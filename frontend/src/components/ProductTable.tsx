// src/components/ProductTable.tsx

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
};

type Props = {
  products: Product[];
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
  loading?: boolean;
};

const ProductTable = ({ products, onDelete, onEdit, loading }: Props) => {
  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    onDelete(id);
  };

  return (
    <div className="bg-white shadow rounded-xl overflow-x-auto">

      <table className="w-full text-sm">

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

          {/* LOADING */}
          {loading ? (
            <tr>
              <td colSpan={6} className="text-center py-6">
                Loading...
              </td>
            </tr>
          ) : products.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-6 text-gray-500">
                No products found 📦
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr
                key={p.id}
                className="border-t hover:bg-gray-50 transition"
              >

                {/* NAME */}
                <td className="p-3 font-medium text-gray-800">
                  {p.name}
                </td>

                {/* CATEGORY */}
                <td className="p-3 text-center text-gray-600">
                  {p.category}
                </td>

                {/* PRICE */}
                <td className="p-3 text-center font-medium">
                  ₹{p.price}
                </td>

                {/* QUANTITY */}
                <td className="p-3 text-center">
                  {p.quantity}
                </td>

                {/* STATUS */}
                <td className="p-3 text-center">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      p.quantity === 0
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {p.quantity === 0 ? "Out of Stock" : "In Stock"}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-3 flex gap-2 justify-center">

                  <button
                    onClick={() => onEdit(p)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Delete
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