import QuantitySelector from "../components/QuantitySelector";
import { useEffect, useState } from "react";
import { closeIcon } from "../constants";
import BillingForm from "../components/BillingForm";

const MyCart = () => {


    const [selectedShipping, setSelectedShipping] = useState("");
    const [shippingCost, setShippingCost] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
            setCartItems(JSON.parse(savedCart
            ))
        }
    }, []);


    // const {data: cartItems = [], isLoading, error} = useQuery({
    //     queryKey: ['cartItems'],
    //     queryFn: async () => {
    //         const response = await api.get('api/v1/cart/');
    //         return response.data;
    //     }
    // })

    // const deleteMutation = useMutation({
    //     mutationFn: async (cartItemId) => {
    //         await api.delete(`api/v1/cart/delete/${cartItemId}/`);
    //     },
    //     onSuccess: () => {
    //         queryClient.invalidateQueries(['cartItems']);
    //     },
    //     onError: (error) => {
    //         console.error('Error deleting the cart item', error);
    //     }
    // });
    

    const handleDelete = (cartItemId) => {
        const newCart = cartItems.filter(item => item.id !== cartItemId);
        setCartItems(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
    }
    // useEffect(() => {
    //     const fetchCartItems = async () => {
    //         try {
    //             const response = await api.get('api/v1/cart/');
    //             setCartItems(response.data);
    //         } catch (error) {
    //             console.error('Error fetching the cart items', error);
    //         }
    //     }
    //     fetchCartItems();
    // }, []);

    // const handleDelete = async (cartItemId) => {
    //     try {
    //         await api.delete(`api/v1/cart/delete/${cartItemId}/`);
            
            
    //         setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
    
    //         console.log('Cart Item Deleted');
    //     } catch (error) {
    //         console.error('Error deleting the cart item', error);
    //     }
    // };
    

    const items = [
        "Shipping around Nairobi-free",
        "Shipping outside Nairobi-Ksh 500",
        "Shop-pickup"
    ];

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedShipping(value);
        if (value.includes("Nairobi-free")) {
            setShippingCost(0);
        } else if (value.includes("outside Nairobi-Ksh 500")) {
            setShippingCost(500);
        } else {
            setShippingCost(0);
        }
    };

    const handleQuantityChange = (productId, newQuantity) => {
            const updatedCartItems = cartItems.map((item) =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            );

            setCartItems(updatedCartItems);
            localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.current_price * item.quantity), 0);
    };

    const total = calculateTotal();
    const totalWithShipping = total + shippingCost;

    // Function to format numbers as currency
    const formatCurrency = (amount) => {
        return parseFloat(amount).toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
    };


    return (
        <section className="container">
            <div className="mx-20 max-md:mx-10 max-sm:mx-3 mt-20">
                <div className="flex gap-[10vw] max-lg:flex-col ">
                    <div className="w-[50vw] max-lg:w-full">
                        <div className="flex justify-between">
                            <h1 className="text-xl text-xiaomi-color">My Cart</h1>
                            <p className="text-gray-400 ">{cartItems.length} Products</p>
                        </div>
                        {cartItems.map((item) => (
                                <div key={item.id} className="flex justify-between items-center border border-gray-400 rounded-lg p-3 mt-4 relative">
                                    <div>
                                        <img src={item.image} alt="" width={100} />
                                        <h1 className="text-gray-400 font-semi-bold">{item.name}</h1>
                                    </div>
                                    <QuantitySelector 
                                        quantity={item.quantity} 
                                        onQuantityChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)} 
                                    />
                                    <div className="text-center">
                                        <h1 className="text-xiaomi-color font-bold">{formatCurrency(item.current_price)}</h1>
                                        <h1 className="text-gray-400 font-bold text-sm">{item.stock}</h1>
                                        <h2 className="text-gray-400 font-semibold">Total: {formatCurrency(item.current_price * item.quantity)}</h2>
                                    </div>
                                    <div className="absolute top-2 right-2" onClick={() => handleDelete(item.id)}>
                                        <img src={closeIcon} alt="close icon" width={10} />
                                    </div>
                                </div>
                            ))}

                    </div>
                    <div className="w-[40vw] max-lg:w-full mt-[45px rounded-lg">
                        <div>
                            <h1 className="text-xiaomi-color text-xl text-center pt-2 border-b border-gray-400">Summary</h1>
                            <div>
                                <div className="px-10 flex justify-between mt-4">
                                    <h1 className="text-gray-400 font-semibold">ITEMS {cartItems.length}</h1>
                                    <h1 className="text-xiaomi-color font-bold">{formatCurrency(total)}</h1>
                                </div>
                                <div className="flex justify-center gap-20 max-lg:gap-10 px-10 mt-6 items-center">
                                    <h1 className="font-semibold text-gray-400">SHIPPING</h1>
                                    <ul>
                                        {items.map((item, index) => (
                                            <li key={index}>
                                                <input
                                                    type="radio"
                                                    name="shipping"
                                                    value={item}
                                                    checked={selectedShipping === item}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor={item} className="ml-2 font-semibold text-slate-gray">
                                                    {item}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-12 text-center">
                                    <h1 className="text-xiaomi-color font-bold border-b border-gray-400">
                                        TOTAL: {formatCurrency(totalWithShipping)}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <h1 className="text-xiaomi-color text-2xl text-center">BILLING & SHIPPING INFORMATION</h1>
                    <div className="flex gap-[10vw] max-lg:flex-col-reverse max-lg:gap-20">
                        <div className="w-[50vw] max-lg:w-full">
                        <BillingForm totalWithShipping={totalWithShipping} shippingOption={selectedShipping} items={cartItems} />

                        </div>
                        <div className="w-[40vw] max-lg:w-full border h-[20vh] mt-16 rounded-lg ">
                        
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default MyCart;
