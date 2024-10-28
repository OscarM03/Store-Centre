import { useState } from 'react';
import { products } from '../utils';

const ProductCard = ({ image, name, current_price, original_price, category, discount, id }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (product_id) => {
    if (isAdding) return; // Prevent multiple clicks

    setIsAdding(true); // Set adding state to true

    // Simulate a network request (optional, for demonstration)
    setTimeout(() => {
      const savedCart = localStorage.getItem("cart");
      const cart = savedCart ? JSON.parse(savedCart) : [];
      const existingProductIndex = cart.findIndex((item) => item.id === product_id);
      const product = products.find((item) => item.id === product_id);

      if (existingProductIndex !== -1) {
        // Update quantity if product already exists in the cart
        cart[existingProductIndex].quantity += 1;
      } else {
        // Add new product to the cart
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
      setIsAdding(false); // Reset adding state after the operation
    }, 500); // Simulate delay (optional)
  };

  const nameLengthThreshold = 18;

  return (
    <div className="flex flex-shrink-0 flex-col items-center border-gray-400 relative group transition-opacity ease-in-out duration-1000 w-[180px]">
      <a href={`/product-details/${id}`}>
        <img src={image} alt={name} width={180} />
      </a>
      <div className="text-center w-full">
        <p className="text-gray-400 text-sm font-medium">{category}</p>
        <a href={`/product-details/${id}`}>
          <h1 className={`text-white pt-2 hover:text-xiaomi-color w-full overflow-hidden text-ellipsis whitespace-nowrap 
            ${name.length >= nameLengthThreshold ? 'text-start' : 'text-center'}`}>
            {name}
          </h1>
        </a>
        <h1 className="text-xiaomi-color font-semibold pt-1 hover:text-white">
          Ksh {parseFloat(current_price).toLocaleString()}
          {original_price && original_price > 0 && (
            <span className="line-through text-gray-400 text-xs">Ksh {parseFloat(original_price).toLocaleString()}</span>
          )}
        </h1>
      </div>
      <div>
        <div 
          className={`border border-gray-400 px-2 mt-3 text-xiaomi-color text-center opacity-0 group-hover:opacity-100 hover:border-xiaomi-color hover:text-gray-400 transition-opacity ease-in-out duration-1000 cursor-pointer ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`} 
          onClick={() => handleAddToCart(id)} 
          disabled={isAdding} // Disable the button if adding
        >
          <h1>{isAdding ? 'Adding...' : 'Add to Cart'}</h1>
        </div>
      </div>
      {discount && (
        <div className="absolute right-1 -top-2"> 
          <p className="text-xiaomi-color text-sm font-bold">-{discount}%</p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
