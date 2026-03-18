// src/components/ProductForm.tsx
import { useState } from "react";
import { categories } from "../constants/categories";

type ProductFormProps = {
  onAdd: (product: {
    name: string;
    category: string;
    price: number;
    quantity: number;
    description: string;
  }) => void;
};

const ProductForm = ({ onAdd }: ProductFormProps) => {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
  });

  const handleSubmit = () => {
    if (!form.name || !form.category || !form.price || !form.quantity) {
      return alert("All fields required");
    }

    if (Number(form.price) < 0 || Number(form.quantity) < 0) {
      return alert("Invalid values");
    }

    onAdd({
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
    });

    setForm({
      name: "",
      category: "",
      price: "",
      quantity: "",
      description: "",
    });
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow mb-6">

      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Add Product
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">

        {/* NAME */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 mb-1">
            Product Name
          </label>
          <input
            placeholder="Enter product name"
            value={form.name}
            onChange={(e)=>setForm({...form,name:e.target.value})}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* CATEGORY */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 mb-1">
            Category
          </label>
          <select
            value={form.category}
            onChange={(e)=>setForm({...form,category:e.target.value})}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select category</option>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* PRICE */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 mb-1">
            Price (₹)
          </label>
          <input
            type="number"
            min="0"
            placeholder="Enter price"
            value={form.price}
            onChange={(e)=>setForm({...form,price:e.target.value})}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* QUANTITY */}
        <div className="flex flex-col">
          <label className="text-xs text-gray-500 mb-1">
            Quantity
          </label>
          <input
            type="number"
            min="0"
            placeholder="Enter quantity"
            value={form.quantity}
            onChange={(e)=>setForm({...form,quantity:e.target.value})}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* BUTTON */}
        <div className="flex items-end">
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </div>

      </div>

      {/* DESCRIPTION */}
      <div className="mt-4">
        <label className="text-xs text-gray-500 mb-1 block">
          Description
        </label>
        <textarea
          placeholder="Enter product description (e.g. high quality material, durable, etc.)"
          value={form.description}
          onChange={(e)=>setForm({...form,description:e.target.value})}
          className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-400"
        />
      </div>

    </div>
  );
};

export default ProductForm;