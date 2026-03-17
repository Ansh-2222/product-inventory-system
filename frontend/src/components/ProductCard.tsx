// src/components/ProductCard.tsx
import { Link } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
};

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <Link to={`/product/${product.id}`}>

      <div
        className="bg-white p-5 rounded-xl shadow 
                   hover:shadow-lg hover:-translate-y-1 
                   transition duration-200 cursor-pointer border
                   focus:outline-none focus:ring-2 focus:ring-blue-400"
      >

        {/* NAME */}
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.name || "Unnamed Product"}
        </h2>

        {/* CATEGORY */}
        <p className="text-sm text-gray-500 mt-1">
          {product.category || "No Category"}
        </p>

        {/* PRICE */}
        <p className="mt-2 font-medium text-gray-900">
          ₹{product.price ?? 0}
        </p>

        {/* QUANTITY */}
        <p
          className={`text-xs mt-1 ${
            product.quantity === 0
              ? "text-red-500"
              : "text-green-600"
          }`}
        >
          {product.quantity === 0
            ? "Out of stock"
            : `Stock: ${product.quantity}`}
        </p>

      </div>

    </Link>
  );
};

export default ProductCard;