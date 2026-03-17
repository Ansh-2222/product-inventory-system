// src/pages/ProductDetails.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import EditModal from "../components/EditModal";

const ProductDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [editProduct, setEditProduct] = useState<any>(null);

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const res = await API.get(`/products/${id}`);
            setProduct(res.data);
        } catch {
            toast.error("Failed to load product");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const deleteProduct = async () => {
        if (!confirm("Delete this product?")) return;

        try {
            await API.delete(`/products/${id}`);
            toast.success("Product deleted");
            navigate("/dashboard");
        } catch {
            toast.error("Delete failed");
        }
    };

    const updateProduct = async (data: any) => {
        try {
            await API.put(`/products/${data.id}`, data);
            toast.success("Product updated");

            setEditProduct(null);
            fetchProduct(); // refresh data

        } catch {
            toast.error("Update failed");
        }
    };
    <EditModal
        product={editProduct}
        onClose={() => setEditProduct(null)}
        onSave={updateProduct}
    />

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                Loading...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                Product not found
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-3xl mx-auto px-4 py-8">

                <div className="bg-white p-6 rounded-xl shadow border">

                    <h1 className="text-2xl font-semibold mb-3">
                        {product.name}
                    </h1>

                    <p className="text-gray-500 mb-4">
                        {product.category}
                    </p>

                    <div className="space-y-4 text-sm">

                        

                        <div>
                            <p className="text-gray-500 text-xs">Price</p>
                            <p>₹{product.price}</p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-xs">Quantity</p>
                            <p>{product.quantity}</p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-xs">Description</p>
                            <p className="text-gray-600">
                                {product.description || "No description"}
                            </p>
                        </div>

                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-3 mt-6">

                        <button
                            onClick={() => setEditProduct(product)}
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                        >
                            Edit
                        </button>

                        <button
                            onClick={deleteProduct}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            </div>

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

export default ProductDetails;