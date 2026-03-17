// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";
import { categories } from "../constants/categories";

const Dashboard = () => {

    const [products, setProducts] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await API.get(
                `/products?search=${search}&category=${category}`
            );
            setProducts(res.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [search, category]);

    const addProduct = async (data: any) => {
        await API.post("/products", data);
        fetchProducts();
    };

    return (
        <div className="min-h-screen bg-blue-50">

            <Navbar />

            <div className="max-w-6xl mx-auto px-4 py-6">

                <h1 className="text-2xl font-semibold mb-4 text-black-600">
                    Product Inventory
                </h1>

                {/* SEARCH */}
                <div className="flex flex-col sm:flex-row gap-3 mb-4">

                    <input
                        placeholder="Search product..."
                        onChange={(e) => setSearch(e.target.value)}
                        className="border p-2 rounded w-full"
                    />

                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className="border p-2 rounded w-full"
                    >
                        <option value="">All Categories</option>
                        {categories.map(c => <option key={c}>{c}</option>)}
                    </select>

                </div>

                <ProductForm onAdd={addProduct} />

                {/* LOADER / EMPTY / DATA */}
                {loading ? (
                    <div className="text-center py-10">Loading...</div>
                ) : products.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        No products found 📦
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {products.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                )}

            </div>

        </div >
    );
};

export default Dashboard;