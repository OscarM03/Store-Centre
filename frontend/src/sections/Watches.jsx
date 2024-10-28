import { useRef, useState, useEffect } from "react";
import { Prev, Next } from "../constants";
import { products } from "../utils";
// import api from "../api";
// import { useQuery } from "@tanstack/react-query";

import ProductCard from "../components/ProductCard";

const Watches = () => {
  const scrollContainerRef = useRef(null);
  const[watchesList, setWatchesList] = useState([]);

  // const fetchWatches = async () => {
  //   const response = await api.get("api/v1/watches/");
  //   return response.data;
  // };

  // const {
  //   data: watchesList = [],
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["watchesList"],
  //   queryFn: fetchWatches,
  // });


  useEffect(() => {
    setWatchesList(products.filter((product) => product.category === "watch"));
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -202,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 202,
        behavior: "smooth",
      });
    }
  };

  // if (error) return <p>Error fetching watches</p>;

  return (
    <section className="container">
      <div className="mx-20 relative mt-10 max-md:mx-10 max-sm:mx-3">
        <h1 className="text-xiaomi-color font-bold text-2xl">Watches</h1>
        <div className="max-md:mx-10 max-sm:mx-3">
          <div
            className="flex pt-10 overflow-x-scroll scrollbar-hide whitespace-nowrap"
            ref={scrollContainerRef}
          >
            {watchesList.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  name={product.name}
                  current_price={product.current_price}
                  original_price={product.original_price}
                  category={product.category}
                  discount={product.discount}
                />
              ))}
          </div>
          <div
            onClick={scrollLeft}
            className="border border-xiaomi-color absolute -left-10 top-1/2 transform 
            -translate-y-1/2 z-10 text-black p-2 rounded-full 
            shadow-md flex justify-center items-center cursor-pointer max-md:hidden"
          >
            <img src={Prev} alt="Scroll Left" width={20} />
          </div>
          <div
            onClick={scrollRight}
            className="border border-xiaomi-color absolute -right-14 top-1/2 transform
            -translate-y-1/2 z-10 text-black p-2 rounded-full
            shadow-md flex justify-center items-center cursor-pointer max-md:hidden"
          >
            <img src={Next} alt="Scroll Right" width={20} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Watches;
