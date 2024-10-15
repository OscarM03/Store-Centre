import { Filters } from "../utils";
import { useRef } from "react";
import { Next, Prev } from "../constants";
import ProductCard from "../components/ProductCard";
import { ProductsList } from "../utils";
import Offer from "../components/Offer";


const Store = () => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -202,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () =>  {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 202,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="container">
      <div className="mx-20 max-md:mx-10 max-sm:mx-3">
        <div className="mt-20">
          <ul className="flex justify-center gap-4">
            {Filters.map((item) => (
              <li
                key={item}
                className="text-gray-400 border-r-2 border-xiaomi-color pr-4 hover:text-xiaomi-color"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="text-center">
            <h1 className="text-gray-400 pl-4 hover:text-xiaomi-color">Accessories</h1>
          </div>
        </div>
        <div className="mt-20 flex gap-[5%]">
          <div className="w-[25%] border-r max-md:hidden"></div>

          <div className="w-[70%] max-md:w-full">
            <div className="relative max-md:mx-10 max-sm:mx-3">
              <div className="relative">
                <div
                  className="flex overflow-x-scroll scrollbar-hide whitespace-nowrap"
                  ref={scrollContainerRef}
                >
                  {ProductsList.map((product) => (
                    <ProductCard
                      key={product.name}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      original={product.original}
                      category={product.category}
                    />
                  ))}
                </div>
                <div
                  onClick={scrollLeft}
                  className="border border-xiaomi-color absolute -left-10 top-1/2 transform 
                        -translate-y-1/2 z-10 text-black p-2 rounded-full 
                        shadow-md flex justify-center items-center cursor-pointer max-sm:-left-5"
                >
                  <img src={Prev} alt="Scroll Left" width={20} />
                </div>
                <div
                  onClick={scrollRight}
                  className="border border-xiaomi-color absolute -right-14 top-1/2 transform
                        -translate-y-1/2 z-10 text-black p-2 rounded-full
                        shadow-md flex justify-center items-center cursor-pointer max-sm:-right-5"
                >
                  <img src={Next} alt="Scroll Right" width={20} />
                </div>
              </div>
            </div>
            <Offer />
            {/* <div className="mt-10">
              <h1 className="text-xiaomi-color text-2xl text-center font-bold">
                Screens
              </h1>
              <div className="grid grid-cols-4 mt-10 gap-20">
              {ProductsList.map((product) => (
                    <ProductCard
                      key={product.name}
                      image={product.image}
                      name={product.name}
                      price={product.price}
                      original={product.original}
                      category={product.category}
                    />
                  ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Store;
