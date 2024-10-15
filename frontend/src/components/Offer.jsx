import { useEffect, useState, useRef } from "react";
import Button from "./Button";
import api from "../api";
import { useQuery, useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Offer = () => {
    const [timeLeftList, setTimeLeftList] = useState([]);
    const scrollContainerRef = useRef(null);

    const fetchOffers = async () => {
        const response = await api.get("api/v1/offers/");
        return response.data;
    }
    const {data: offerList = [], isLoading, error} = useQuery ({
        queryKey: ['offerList'],
        queryFn: fetchOffers
    })

    // Update countdown for each product
    useEffect(() => {
        const updateTimers = () => {
            const updatedTimeLeft = offerList.map((product) => {
                const offerEndDate = new Date(product.enddate);
                const now = new Date();
                const timeDifference = offerEndDate - now;

                if (timeDifference <= 0) {
                    return "Offer has ended";
                }

                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
                const seconds = Math.floor((timeDifference / 1000) % 60);

                return `${days}d ${hours}h ${minutes}m ${seconds}s`;
            });

            setTimeLeftList(updatedTimeLeft);
        };

        // Update every second
        const timerInterval = setInterval(updateTimers, 1000);

        return () => clearInterval(timerInterval);
    }, [offerList]);

    // Auto-scrolling logic
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        let scrollAmount = 0;

        const scrollInterval = setInterval(() => {
            if (scrollContainer) {
                scrollAmount += 0.5;
                scrollContainer.scrollLeft += 1;

                if (scrollAmount >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
                    scrollAmount = 0;
                    scrollContainer.scrollLeft = 0;
                }
            }
        }, 50);

        return () => clearInterval(scrollInterval);
    }, []);

    // Get responsive width for products
    const getResponsiveWidth = () => {
        if (window.innerWidth <= 640) {
            return "100%";
        } else {
            return "50%";
        }
    };

    const [width, setWidth] = useState(getResponsiveWidth());

    useEffect(() => {
        const handleResize = () => {
            setWidth(getResponsiveWidth());
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
            setTimeout(() => {
                navigate('/mycart');
            }, 2000)
        },
    });

    const handleAddToCart = (productId) => {
        const token = Cookies.get('access_token');

        if (!token) {
            navigate('/login');
            return;
        }
        addToCartMutation.mutate(productId);
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching offers</p>;
    
    return (
        <section className="container">
            <div className="mx-20 max-md:mx-10 max-sm:mx-3 mt-8 border-2 rounded-lg border-gray-400">
                <div className="text-center pt-2">
                    <h1 className="text-2xl text-xiaomi-color font-bold">
                        Special Offers
                    </h1>
                </div>
                <div ref={scrollContainerRef} className="flex items-center max-md:gap-10 overflow-x-scroll scrollbar-hide whitespace-nowrap">
                    {offerList.map((product, index) => (
                        <div key={index} className="flex-shrink-0 flex max-lg:flex-col justify-center items-center md:border-r" style={{ width: width }}>
                            <div className="text-center font-bold p-2">
                                <h1 className="text-xiaomi-color text-3xl max-md:text-4xl font-semibold max-sm:mt-6">Exclusive Deal:</h1>
                                <h1 className="text-gray-400 text-sm font-bold">SmartPhone</h1>
                                <h1 className="text-white text-2xl">{product.name}</h1>
                                <h1 className="text-white mt-1">{product.storage}</h1>
                                <h1 className="text-xiaomi-color font-semibold pt-1 hover:text-white">
                                Ksh {parseFloat(product.current_price).toLocaleString()}
                                    <span className="line-through text-gray-400 text-xs font-bold">Ksh {parseFloat(product.original_price).toLocaleString()}</span>
                                </h1>
                                <p className="text-gray-400 text-sm mt-1 font-bold"><span className="text-xiaomi-color">Offer ends:</span> {timeLeftList[index]}</p>
                                <div className="flex gap-8 justify-center mt-4">
                                    <a href={`/product-details/${product.id}`}>
                                        <Button label="View" />
                                    </a>
                                    
                                    <Button label="Order" onClick={() => handleAddToCart(product.id)}/>
                                </div>
                            </div>
                            <div>
                                <img src={product.image} alt="Poco X4" width={300} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Offer;

