// src/components/ProductForm.tsx
import { useState } from "react";
import { categories } from "../constants/categories";

const ProductForm = ({ onAdd }: any) => {
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

    onAdd(form);

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

      <h2 className="text-lg font-semibold mb-4 text-black-600">
        Add Product
      </h2>

      <div className="grid md:grid-cols-5 gap-3">

        <input
          placeholder="Product Name"
          value={form.name}
          onChange={(e)=>setForm({...form,name:e.target.value})}
          className="border p-2 rounded outline-none"
        />

        <select
          value={form.category}
          onChange={(e)=>setForm({...form,category:e.target.value})}
          className="border p-2 rounded"
        >
          <option value="">Category</option>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e)=>setForm({...form,price:e.target.value})}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e)=>setForm({...form,quantity:e.target.value})}
          className="border p-2 rounded"
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white rounded px-4"
        >
          Add
        </button>

      </div>

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e)=>setForm({...form,description:e.target.value})}
        className="border p-2 mt-3 w-full rounded"
      />

    </div>
  );
};

export default ProductForm;