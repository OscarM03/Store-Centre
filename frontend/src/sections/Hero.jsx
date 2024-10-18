import { useEffect, useState } from "react"
import Cookies from "js-cookie";
import {menuIcon} from "../constants"
import { useNavigate } from "react-router-dom";
import api from "../api";
import { useQuery, useMutation } from "@tanstack/react-query";

const filters = [
    { name: "Redmi", href: `/all?q=${encodeURIComponent('Redmi')}` },
    { name: "Poco", href: `/all?q=${encodeURIComponent('Poco')}` },
    { name: "Mi Phones", href: `/all?q=${encodeURIComponent('Mi Phones')}` },
    { name: "watches", href: `/all?q=${encodeURIComponent('watches')}` },
    { name: "Audio", href: `/all?q=${encodeURIComponent('Audio')}` },
    { name: "Screens", href: `/all?q=${encodeURIComponent('Screens')}` },
    { name: "Tablets", href: `/all?q=${encodeURIComponent('Tablets')}` },
    { name: "Accessories", href: `/all?q=${encodeURIComponent('Accessories')}` }
];

const Hero = () => {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    const navigate = useNavigate()
    const [currrentPropductIndex, setCurrentProductIndex] = useState(0)

    const toggleCategory = () => {
        if (window.innerWidth > 1024) {
            setIsCategoryOpen(false)
        } else {
            setIsCategoryOpen(!isCategoryOpen)
        }
    }

    const fetchHeroProducts = async () => {
        const response  = await api.get('api/v1/heroproducts/');
        console.log(response.data)
        return response.data
        
    }
    

    const { data:heroProductList = [], isLoading, error} = useQuery({
        queryKey: ['heroProductList'],
        queryFn: fetchHeroProducts
    })

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
    }

    // const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentProductIndex((prevIndex) => 
                prevIndex === heroProductList.length - 1 ? 0 : prevIndex + 1
            );
        }, 20000);
        return () => clearInterval(interval);
    }, [heroProductList]);

    if (error) return <p>Error fetching products</p>

    const currentProduct = heroProductList[currrentPropductIndex];

    return (
        <section className="container">
            <div className="div-section mt-20 flex h-[450px] gap-16 max-md:h-[600px] relative max-md:mx-3">
                <div className="ml-20 w-[18%] bg-dark-bg max-lg:absolute max-md:ml-3 max-sm:w-[20%]">
                    <div className=" pb-1 flex justify-center gap-4 border-gray-400 border-b max-sm:mt-1">
                        <img src={menuIcon} alt="" width={20} className="max-xl:hidden"/>
                        <h1 className="text-xiaomi-color text-sm max-lg:hidden cursor-pointer">SHOP BY CATEGORIES</h1>
                        <h1 className="text-xiaomi-color text-sm lg:hidden max-sm:text-xs z-20 cursor-pointer" onClick={toggleCategory}>CATEGORIES</h1>
                    </div>
                    <div className="max-lg:hidden max-md:ml-2">
                        {filters.map((filter, index) => (
                            <div key={index} className="flex justify-center items-center py-[9px] max-xl:py-2 px-4 border-gray-400 border-b last:border-b-0">
                                <a href={filter.href}><h1 className="hover:text-xiaomi-color">{filter.name}</h1></a>
                            </div>
                        ))}
                    </div>
                </div>
                {isLoading ? (
                    <p>Loading..</p>
                ) : (
                    currentProduct && (
                        <div key={currentProduct.id} className="w-[70%] flex justify-center items-center max-lg:w-full max-md:flex-col max-md:gap-4 z-10">
                            <div className="w-[40%] max-md:text-center max-md:w-full">
                                <a href={`/product-details/${currentProduct.id}`}>
                                    <h1 className="text-4xl text-xiaomi-color pb-1 font-bold">{currentProduct.name}</h1>
                                </a>
                                <h1 className="text-lg pb-1">{currentProduct.slogan}</h1>
                                <h1 className="text-gray-400 pb-1">{currentProduct.feature_1}</h1>
                                <h1 className="text-xiaomi-color font-semibold pt-1 hover:text-white">
                                    Ksh {parseFloat(currentProduct.current_price).toLocaleString()}
                                    {currentProduct.original_price && currentProduct.original_price > 0 && (
                                        <span className="line-through text-gray-400 text-xs">Ksh {parseFloat(currentProduct.original_price).toLocaleString()}</span>
                                    )}
                                </h1>
                                <button className="border py-1 px-2 mt-6 bg-dark-bg text-xiaomi-color border-gray-400" onClick={() => handleAddToCart(currentProduct.id)}>
                                    Order Now
                                </button>
                            </div>
                            <div className="flex justify-center items-center">
                                <a href={`/product-details/${currentProduct.id}`}>
                                    <img src={currentProduct.image} alt="" width={400} className="max-lg:w-[370px]" />
                                </a>
                            </div>
                        </div>
                    )
                )}
                
                {isCategoryOpen && (
                    <div className="absolute mt-8 bg-dark-bg z-20">
                    {filters.map((filter, index) => (
                        <div key={index} className="flex justify-center items-center py-2 px-2 border-gray-400 border-b last:border-b-0">
                            <a href={filter.href}><h1 className="hover:text-xiaomi-color">{filter.name}</h1></a>
                        </div>
                    ))}
                </div>
                )}
            </div>
            {/* <div className="mx-20 pt-20 flex justify-center items-center max-custom-900:flex-col max-md:mx-10 max-sm:mx-3">
                <div className="text-white w-[55vw] max-md:w-full max-custom-900:text-center">
                    <h1 className="text-4xl pb-2 max-lg:text-3xl max-md:text-4xl">Experience <span className="text-xiaomi-color font-bold text-5xl max-lg:text-4xl max-md:text-5xl">Innovation</span> </h1>

                    <h1 className="text-2xl pb-4 max-lg:text-xl max-md:text-2xl">with <span className="text-xiaomi-color font-bold text-3xl max-lg:text-2xl max-md:text-3xl">Xiaomi's</span> Latest Cutting-Edge Products</h1>

                    <p className="text-md max-lg:text-sm max-md:text-md text-gray-400">Xiaomi are committed to pushing the boundaries of technology to bring you innovative and reliable products that enhance your everyday life. From smartphones to smart home devices, their latest offerings combine cutting-edge features with sleek designs, all at unbeatable prices. Explore their range and elevate your tech experience with Xiaomi</p>
                    <div className="flex items-center justify-start gap-16 max-lg:gap-10 mt-10 text-sm text-gray-400 font-bold max-custom-900:justify-center">
                        <div className="flex flex-col items-center justify-center">
                            <h1>5 Stars Rated</h1>
                            <div className="flex gap-1 pt-1">
                                <Stars />
                                <Stars />
                                <Stars />
                                <Stars />
                                <Stars />
                            </div>
                        </div>
                        <div>
                            <h1 className="">Our Clients</h1>
                            <h1 className="font-kalam text-xiaomi-color">50 Million+</h1>
                        </div>
                        <div>
                            <h1 className="">Products Sold</h1>
                            <h1 className="font-kalam text-xiaomi-color">200 Million+</h1>
                        </div>
                    </div>
                </div>
                <div className="w-[45vw] flex flex-col items-center max-md:w-full max-custom-900:mt-20">
                    <div className="custom-bg rounded-full w-[300px] h-[300px]  flex flex-col items-center justify-center mt-4
                    max-md-[300px] max-md:h-[300px]">
                        <img 
                        src={images[currentImageIndex]}
                        alt="Xiaomi Products"
                        width={250}
                        className="transition-opacity duration-1000 ease-in-out max-lg:w-[200px] max-md:w-[250px]"
                        />
                    </div>
                    
                    <img src={robotHand} alt="robot hand" 
                    width={600}
                    className="max-md:mt-4"
                    />
                    
                </div>
            </div> */}
        </section>
    )
}

export default Hero
