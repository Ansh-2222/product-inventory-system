// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";
import { categories } from "../constants/categories";
import toast from "react-hot-toast";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
};

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  //  Debounce search (VERY IMPORTANT)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get(
        `/products?search=${debouncedSearch}&category=${category}`
      );
      setProducts(res.data);
    } catch {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch, category]);

  const addProduct = async (data: Omit<Product, "id">) => {
    try {
      await API.post("/products", data);
      toast.success("Product added ");
      fetchProducts();
    } catch {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">

      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-6">

        <h1 className="text-2xl font-semibold mb-4 text-gray-700">
          Product Inventory
        </h1>

        {/* SEARCH */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">

          <input
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

        </div>

        {/* ADD PRODUCT */}
        <ProductForm onAdd={addProduct} />

        {/* CONTENT */}
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No products found 
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;