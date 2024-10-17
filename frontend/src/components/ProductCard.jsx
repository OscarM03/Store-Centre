import { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useMutation } from '@tanstack/react-query';

const ProductCard = ({ image, name, current_price, original_price, category, discount, id }) => {
    const [isAdding, setIsAdding] = useState(false);
    const navigate = useNavigate();

    const addToCartMutation = useMutation({
        mutationFn: async (productId) => {
            const response = await api.post('api/v1/cart/', {
                product_id: productId,
            });
            return response.data;
        },
        onError: (error) => {
            console.error('Error adding product to cart', error);
        },
        onSuccess: (data) => {
            console.log('Total price:', data.total_price);
        },
        onSettled: () => {
            setIsAdding(false);
        }
    });

    const handleAddToCart = () => {
        const token = Cookies.get('access_token');

        if (!token) {
            navigate('/login');
            return;
        }

        setIsAdding(true);
        addToCartMutation.mutate(id); // Trigger the mutation with the product id
    };

    return (
        <div className="flex flex-shrink-0 flex-col items-center border-gray-400 relative group transition-opacity ease-in-out duration-1000 w-[200px]">
            <a href={`/product-details/${id}`}>
                <img src={image} alt={name} width={180} className=""/>
            </a>
            <p className="text-gray-400 text-sm font-medium">{category}</p>
            <a href={`/product-details/${id}`}><h1 className="text-white pt-2 hover:text-xiaomi-color">{name}</h1></a>
            <h1 className="text-xiaomi-color font-semibold pt-1 hover:text-white">
                Ksh {parseFloat(current_price).toLocaleString()}
                {original_price && original_price > current_price && (
                    <span className="line-through text-gray-400 text-xs ml-2">
                        Ksh {parseFloat(original_price).toLocaleString()}
                    </span>
                )}
            </h1>
            <div>
                <div 
                    className={`border border-gray-400 px-2 mt-3 text-xiaomi-color text-center opacity-0 group-hover:opacity-100 hover:border-xiaomi-color hover:text-gray-400 transition-opacity ease-in-out duration-1000 cursor-pointer ${isAdding ? 'opacity-50 cursor-not-allowed' : ''}`} 
                    onClick={handleAddToCart} 
                    disabled={isAdding}
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
