// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";
import EditModal from "../components/EditModal";
import { categories } from "../constants/categories";
import toast from "react-hot-toast";
import { Package, AlertTriangle, Layers, Search } from "lucide-react";
import type { Product } from "../types/product";


const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get(
        `/products?search=${search}&category=${category}`
      );

      const normalized = res.data.map((p: any) => ({
        ...p,
        description: p.description || ""
      }));

      setProducts(normalized);

    } catch {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const addProduct = async (data: any) => {
    try {
      await API.post("/products", data);
      toast.success("Product added");
      fetchProducts();
    } catch {
      toast.error("Add failed");
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    try {
      await API.delete(`/products/${id}`);
      toast.success("Deleted");
      fetchProducts();
    } catch {
      toast.error("Delete failed");
    }
  };

  const updateProduct = async (data: Product) => {
    try {
      await API.put(`/products/${data.id}`, data);
      toast.success("Updated");

      setEditProduct(null);
      fetchProducts();
    } catch {
      toast.error("Update failed");
    }
  };

  // STATS
  const totalValue = products.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );

  const activeCategories = new Set(products.map(p => p.category)).size;

  const lowStock = products.filter(p => p.quantity < 10).length;

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">

          <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
            <Package className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Total Inventory Value</p>
              <h2 className="font-semibold">₹{totalValue}</h2>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
            <Layers className="text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Active Categories</p>
              <h2 className="font-semibold">{activeCategories}</h2>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
            <AlertTriangle className="text-red-500" />
            <div>
              <p className="text-sm text-gray-500">Low Stock</p>
              <h2 className="font-semibold">{lowStock}</h2>
            </div>
          </div>

        </div>

        <ProductForm onAdd={addProduct} />

        {/* SEARCH + FILTER */}
        <div className="flex flex-col sm:flex-row gap-3 my-4">

          <div className="relative w-full">
            <Search className="absolute left-2 top-3 text-gray-400" size={18} />
            <input
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              className="border pl-8 p-2 rounded w-full focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <select
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded w-full sm:w-60 focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>

        </div>

        {/* TABLE */}
        <ProductTable
          products={products}
          onDelete={deleteProduct}
          onEdit={(p) =>
            setEditProduct({
              ...p,
              description: p.description || ""
            })
          } loading={loading}
        />

      </div>

      {/* EDIT MODAL */}
      {editProduct && (
        <EditModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSave={updateProduct}
        />
      )}

    </div>
  );
};

export default Dashboard;