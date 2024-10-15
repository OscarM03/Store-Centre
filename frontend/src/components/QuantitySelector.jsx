import { useState, useEffect } from "react";

const QuantitySelector = ({ quantity, onQuantityChange }) => {
    const [localQuantity, setLocalQuantity] = useState(quantity);

    // Update local quantity when prop quantity changes
    useEffect(() => {
        setLocalQuantity(quantity);
    }, [quantity]);

    const increment = () => {
        setLocalQuantity(prevQuantity => {
            const newQuantity = prevQuantity + 1;
            if (onQuantityChange) onQuantityChange(newQuantity); // Notify parent component of the change
            return newQuantity;
        });
    };

    const decrement = () => {
        setLocalQuantity(prevQuantity => {
            const newQuantity = Math.max(prevQuantity - 1, 1); // Ensure quantity doesn't go below 1
            if (onQuantityChange) onQuantityChange(newQuantity); // Notify parent component of the change
            return newQuantity;
        });
    };

    return (
        <div>
            <button
                className="font-bold px-4 max-md:px-2 rounded text-lg border border-xiaomi-color text-gray-400"
                onClick={decrement}
            >
                -
            </button>
            <span className="text-xl px-4 max-md:px-2 text-gray-400 py-2">{localQuantity}</span>
            <button
                className="font-bold px-4 max-md:px-2 rounded text-lg text-gray-400 border border-xiaomi-color"
                onClick={increment}
            >
                +
            </button>
        </div>
    );
};

export default QuantitySelector;
