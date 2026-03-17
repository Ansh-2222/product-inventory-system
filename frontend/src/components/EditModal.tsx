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
    if (!product) return null;

    const handleChange = <K extends keyof Product>(
        field: K,
        value: Product[K]
    ) => {
        product[field] = value;
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center px-4">

            <div className="bg-white p-6 rounded-xl w-full max-w-sm">

                <h2 className="mb-4 font-semibold text-lg">
                    Edit Product
                </h2>

                {/* NAME */}
                <div className="mb-3">
                    <label className="text-xs text-gray-500">Product Name</label>
                    <input
                        defaultValue={product.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="border p-2 w-full rounded mt-1"
                    />
                </div>

                {/* CATEGORY */}
                <div className="mb-3">
                    <label className="text-xs text-gray-500">Category</label>
                    <select
                        defaultValue={product.category}
                        onChange={(e) => handleChange("category", e.target.value)}
                        className="border p-2 w-full rounded mt-1"
                    >
                        {categories.map((c) => (
                            <option key={c}>{c}</option>
                        ))}
                    </select>
                </div>

                {/* PRICE */}
                <div className="mb-3">
                    <label className="text-xs text-gray-500">Price</label>
                    <input
                        type="number"
                        defaultValue={product.price}
                        onChange={(e) => handleChange("price", Number(e.target.value))}
                        className="border p-2 w-full rounded mt-1"
                    />
                </div>

                {/* QUANTITY */}
                <div className="mb-3">
                    <label className="text-xs text-gray-500">Quantity</label>
                    <input
                        type="number"
                        defaultValue={product.quantity}
                        onChange={(e) => handleChange("quantity", Number(e.target.value))}
                        className="border p-2 w-full rounded mt-1"
                    />
                </div>

                {/* DESCRIPTION */}
                <div className="mb-3">
                    <label className="text-xs text-gray-500">Description</label>
                    <textarea
                        defaultValue={product.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        className="border p-2 w-full rounded mt-1"
                    />
                </div>

                {/* ACTIONS */}
                <div className="flex justify-between mt-4">
                    <button onClick={onClose} className="text-gray-500">
                        Cancel
                    </button>

                    <button
                        onClick={() => onSave(product)}
                        className="bg-black text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                </div>

            </div>
        </div>
    );
};

export default EditModal;