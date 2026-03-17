import { useState, useEffect } from "react";
import { categories } from "../constants/categories";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
};

type Props = {
  product: Product | null;
  onClose: () => void;
  onSave: (data: Product) => void;
};

const EditModal = ({ product, onClose, onSave }: Props) => {
  const [form, setForm] = useState<Product | null>(null);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (product) {
      setForm(product);
    }
  }, [product]);

  if (!form) return null;

  const handleChange = <K extends keyof Product>(
    field: K,
    value: Product[K]
  ) => {
    setForm((prev) => prev ? { ...prev, [field]: value } : prev);
  };

  const validate = () => {
    let newErrors: any = {};

    if (!form.name) newErrors.name = "Name required";
    if (!form.category) newErrors.category = "Category required";

    if (form.price < 0) newErrors.price = "Price cannot be negative";
    if (form.quantity < 0) newErrors.quantity = "Quantity cannot be negative";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center px-4">

      <div className="bg-white p-6 rounded-xl w-full max-w-sm shadow-lg">

        <h2 className="mb-4 font-semibold text-lg text-gray-700">
          Edit Product
        </h2>

        {/* NAME */}
        <div className="mb-3">
          <label className="text-xs text-gray-500">Product Name</label>
          <input
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="border p-2 w-full rounded mt-1 focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        {/* CATEGORY */}
        <div className="mb-3">
          <label className="text-xs text-gray-500">Category</label>
          <select
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="border p-2 w-full rounded mt-1 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
        </div>

        {/* PRICE */}
        <div className="mb-3">
          <label className="text-xs text-gray-500">Price</label>
          <input
            type="number"
            min="0"
            value={form.price}
            onChange={(e) => handleChange("price", Number(e.target.value))}
            className="border p-2 w-full rounded mt-1 focus:ring-2 focus:ring-blue-400"
          />
          {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
        </div>

        {/* QUANTITY */}
        <div className="mb-3">
          <label className="text-xs text-gray-500">Quantity</label>
          <input
            type="number"
            min="0"
            value={form.quantity}
            onChange={(e) => handleChange("quantity", Number(e.target.value))}
            className="border p-2 w-full rounded mt-1 focus:ring-2 focus:ring-blue-400"
          />
          {errors.quantity && <p className="text-red-500 text-xs">{errors.quantity}</p>}
        </div>

        {/* DESCRIPTION */}
        <div className="mb-3">
          <label className="text-xs text-gray-500">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="border p-2 w-full rounded mt-1 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditModal;