// src/components/ProductTable.tsx
type Props = {
  products: any[];
  onDelete: (id: string) => void;
  onEdit: (product: any) => void;
};

const ProductTable = ({ products, onDelete, onEdit }: Props) => {
  return (
    <div className="bg-white shadow rounded-xl overflow-x-auto">

      <table className="w-full text-sm">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3">Category</th>
            <th className="p-3">Price</th>
            <th className="p-3">Qty</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t">

              <td className="p-3">{p.name}</td>
              <td className="p-3 text-center">{p.category}</td>
              <td className="p-3 text-center">₹{p.price}</td>
              <td className="p-3 text-center">{p.quantity}</td>

              <td className="p-3 flex gap-2 justify-center">

                <button
                  onClick={()=>onEdit(p)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={()=>onDelete(p.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default ProductTable;