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

  const [errors, setErrors] = useState<any>({});

  const validate = () => {
    let newErrors: any = {};

    if (!form.name) newErrors.name = "Product name required";
    if (!form.category) newErrors.category = "Category required";
    if (!form.price) newErrors.price = "Price required";
    if (!form.quantity) newErrors.quantity = "Quantity required";

    if (Number(form.price) < 0)
      newErrors.price = "Price cannot be negative";

    if (Number(form.quantity) < 0)
      newErrors.quantity = "Quantity cannot be negative";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

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

    setErrors({});
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow mb-6">

      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Add Product
      </h2>

      <div className="grid md:grid-cols-5 gap-3">

        {/* Name */}
        <div className="flex flex-col">
          <input
            placeholder="Product Name"
            value={form.name}
            onChange={(e)=>setForm({...form,name:e.target.value})}
            className="border p-2 rounded outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.name && (
            <span className="text-red-500 text-xs mt-1">
              {errors.name}
            </span>
          )}
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <select
            value={form.category}
            onChange={(e)=>setForm({...form,category:e.target.value})}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Category</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-500 text-xs mt-1">
              {errors.category}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <input
            type="number"
            min="0"
            placeholder="Price"
            value={form.price}
            onChange={(e)=>setForm({...form,price:e.target.value})}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
          {errors.price && (
            <span className="text-red-500 text-xs mt-1">
              {errors.price}
            </span>
          )}
        </div>

        {/* Quantity */}
        <div className="flex flex-col">
          <input
            type="number"
            min="0"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e)=>setForm({...form,quantity:e.target.value})}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
          />
          {errors.quantity && (
            <span className="text-red-500 text-xs mt-1">
              {errors.quantity}
            </span>
          )}
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white rounded px-4 hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      {/* Description */}
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e)=>setForm({...form,description:e.target.value})}
        className="border p-2 mt-3 w-full rounded focus:ring-2 focus:ring-blue-400"
      />

    </div>
  );
};

export default ProductForm;