import { useEffect, useState } from "react";
import { menuIcon } from "../constants";
import { useNavigate } from "react-router-dom";
import { heroProducts } from "../utils";

const filters = [
  { name: "Redmi", href: `/all?q=${encodeURIComponent("Redmi")}` },
  { name: "Poco", href: `/all?q=${encodeURIComponent("Poco")}` },
  { name: "Mi Phones", href: `/all?q=${encodeURIComponent("Mi Phones")}` },
  { name: "watches", href: `/all?q=${encodeURIComponent("watches")}` },
  { name: "Audio", href: `/all?q=${encodeURIComponent("Audio")}` },
  { name: "Screens", href: `/all?q=${encodeURIComponent("Screens")}` },
  { name: "Tablets", href: `/all?q=${encodeURIComponent("Tablets")}` },
  { name: "Accessories", href: `/all?q=${encodeURIComponent("Accessories")}` },
];

const Hero = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const navigate = useNavigate();
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const toggleCategory = () => {
    if (window.innerWidth > 1024) {
      setIsCategoryOpen(false);
    } else {
      setIsCategoryOpen(!isCategoryOpen);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductIndex((prevIndex) =>
        prevIndex === heroProducts.length - 1 ? 0 : prevIndex + 1
      );
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const handleAddToCart = () => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      const newCart = [...cart];
      newCart[existingProductIndex].quantity += 1;
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      const newCart = [...cart, { ...product, quantity: 1 }];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
    setTimeout(() => {
      navigate("/mycart");
    }, 4000);
  };


  const product = heroProducts[currentProductIndex];

  return (
    <section className="container">
      <div className="div-section mt-20 flex h-[350px] gap-16 max-md:h-[700px] relative max-md:mx-3">
        <div className="ml-20 w-[18%] bg-dark-bg max-lg:absolute max-md:ml-3 max-sm:w-[20%]">
          <div className="pb-1 flex justify-center gap-4 border-gray-400 border-b max-sm:mt-1">
            <img src={menuIcon} alt="" width={20} className="max-xl:hidden" />
            <h1 className="text-xiaomi-color text-sm max-lg:hidden cursor-pointer">
              SHOP BY CATEGORIES
            </h1>
            <h1
              className="text-xiaomi-color text-sm lg:hidden max-sm:text-xs z-20 cursor-pointer"
              onClick={toggleCategory}
            >
              CATEGORIES
            </h1>
          </div>
          <div className="max-lg:hidden max-md:ml-2">
            {filters.map((filter, index) => (
              <div
                key={index}
                className="flex justify-center items-center py-[9px] max-xl:py-2 px-4 border-gray-400 border-b last:border-b-0"
              >
                <a href={filter.href}>
                  <h1 className="hover:text-xiaomi-color">{filter.name}</h1>
                </a>
              </div>
            ))}
          </div>
        </div>

          <div
            key={product.id}
            className="w-[70%] flex justify-center items-center max-lg:w-full max-md:flex-col max-md:gap-4 z-10"
          >
            <div className="w-[40%] max-md:text-center max-md:w-full">
              <a href={`/product-details/${product.id}`}>
                <h1 className="text-4xl text-xiaomi-color pb-1 font-bold">
                  {product.name}
                </h1>
              </a>
              <h1 className="text-lg pb-1">{product.slogan}</h1>
              <h1 className="text-gray-400 pb-1">{product.feature_1}</h1>
              <h1 className="text-xiaomi-color font-semibold pt-1 hover:text-white">
                Ksh {parseFloat(product.current_price).toLocaleString()}
                {product.original_price && product.original_price > 0 && (
                  <span className="line-through text-gray-400 text-xs">
                    Ksh
                    {parseFloat(product.original_price).toLocaleString()}
                  </span>
                )}
              </h1>
              <button className="border py-1 px-2 mt-6 bg-dark-bg text-xiaomi-color border-gray-400"
              onClick={handleAddToCart}
              >
                Order Now
              </button>
            </div>
            <div className="flex justify-center items-center">
              <a href="/product-details/1">
                <img
                  src={product.image}
                  alt={product.name}
                  width={400}
                  className="max-lg:w-[370px]"
                />
              </a>
            </div>
          </div>

        {isCategoryOpen && (
          <div className="absolute mt-8 bg-dark-bg z-20">
            {filters.map((filter, index) => (
              <div
                key={index}
                className="flex justify-center items-center py-2 px-2 border-gray-400 border-b last:border-b-0"
              >
                <a href={filter.href}>
                  <h1 className="hover:text-xiaomi-color">{filter.name}</h1>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
