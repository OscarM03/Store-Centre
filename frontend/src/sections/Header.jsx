import { useEffect, useState } from "react";
import {
  SearchIcon,
  menuIcon,
  closeIcon,
  Profile,
  Cart,
  XiaomiLogo,
} from "../constants";
// import { useQuery } from "@tanstack/react-query";
// import api from "../api";
import Button from "../components/Button";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleMenu = () => {
    if (window.innerWidth > 1024) {
      setIsMenuOpen(false);
    } else {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  // const toggleSearch = () => {
  //   setIsSearchOpen(!isSearchOpen);
  // };

  const navLinks = [
    { name: "Xiaomi", href: "https://www.mi.com/global/" },
    { name: "Our Products", href: "/all" },
    { name: "Latest Phones", href: `/all?q=${encodeURIComponent("phones")}` },
  ];

  useEffect(() => {
    const updateCartItems = () => {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    };
  
    // Initial call to set cart items
    updateCartItems();
  
    // Set interval to update cart items every 5 seconds (5000 ms)
    const intervalId = setInterval(updateCartItems, 5000);
  
    // Cleanup function to clear the interval
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  
  //   const {data: cartItems = [], isLoading, error} = useQuery({
  //     queryKey: ['cartItems'],
  //     queryFn: async () => {
  //         const response = await api.get('api/v1/cart/');
  //         return response.data;
  //     },
  //     refetchInterval: 10000,
  // })

  const cartItemCount = cartItems.length;

  return (
    <header className="fixed top-0 left-0 right-0 w-full border-b border-gray-400 bg-dark-bg bg-opacity-90 z-50 font-sora">
      <nav className=" flex justify-between items-center py-1 mx-20 max-md:mx-4">
        <a href="/" className="header__logo">
          <div className="flex items-center">
            <img
              src={XiaomiLogo}
              alt="Logo"
              width={50}
              className="max-md:w-[40px]"
            />
            <h1 className="text-xiaomi-color font-bold">Xiaomi Centre</h1>
          </div>
        </a>

        {/* Render navigation links using map */}
        <div className="text-white font-semibold text-sm gap-16 flex  max-lg:hidden">
          {navLinks.map((link, index) => (
            <a href={link.href} key={index} className="hover:text-xiaomi-color">
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex justify-center items-center gap-5">
          <div className="flex justify-center items-center gap-2 relative p-2 max-lg:hidden">
            <form action="/all">
              <input
                type="text"
                name="q"
                placeholder="Search..."
                className="p-1 rounded-full text-white bg-dark-bg border-2 border-xiaomi-color outline-none px-2"
              />
              <button type="submit">
                <img
                  src={SearchIcon}
                  alt="Search"
                  width="18"
                  className="absolute right-5 top-4"
                />
              </button>
            </form>
          </div>

          <div className="relative group">
            <a href="/profile">
              <img
                src={Profile}
                alt="Profile icon"
                width={24}
                className="cursor-pointer"
              />
            </a>
          </div>

          <div className="relative">
            <a href="/mycart">
              <img src={Cart} alt="My Cart" width={24} />
            </a>
            <p className="absolute -top-3 -right-1 bg-dark-bg text-xiaomi-color font-bold">
              {" "}
              {cartItemCount}
            </p>
          </div>
          <div className="relative group lg:hidden">
            <img
              src={isMenuOpen ? closeIcon : menuIcon}
              alt={isMenuOpen ? "close icon" : "menu icon"}
              width={18}
              onClick={toggleMenu}
            />
          </div>
        </div>

        {isSearchOpen && (
          <div className="absolute right-10 top-[100%] font-semibold">
            <div className="flex justify-center items-center gap-2 relative mt-2  p-2">
              <form action="/all">
                <input
                  type="text"
                  name="q"
                  placeholder="Search..."
                  className="p-1 rounded-full text-white bg-dark-bg border-2 border-xiaomi-color outline-none px-2"
                />
                <button type="submit">
                  <img
                    src={SearchIcon}
                    alt="Search"
                    width="20"
                    className="absolute right-5 top-4"
                  />
                </button>
              </form>
            </div>
          </div>
        )}
      </nav>

      {isMenuOpen && (
        <div className="flex flex-col justify-center items-center relative lg:hidden bg-dark-bg bg-opacity-90">
          <div className="flex flex-col justify-center items-center text-white font-bold font-poppins pt-8 w-[60%]">
            {navLinks.map((link, index) => (
              <a
                href="link.href"
                key={index}
                className="mb-4 hover:text-xiaomi-color border-b w-full text-center"
              >
                <h1>{link.name}</h1>
              </a>
            ))}
          </div>
          <div className="my-4 flex gap-6">
            <Button label="Login" />
            <Button label="Register" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
