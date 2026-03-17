// src/components/ProductCard.tsx
import { Link } from "react-router-dom";

const ProductCard = ({ product }: any) => {
  return (
    <Link to={`/product/${product.id}`}>

      <div
        className="bg-white p-5 rounded-xl shadow 
                   hover:shadow-lg hover:-translate-y-1 
                   transition duration-200 cursor-pointer border"
      >

        <h2 className="text-lg font-semibold text-black">
          {product.name}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {product.category}
        </p>

        <p className="mt-2 font-medium text-black">
          ₹{product.price}
        </p>

      </div>

    </Link>
  );
};

export default ProductCard;