import { useRef } from "react";
import { Prev, Next } from "../constants";

import ProductCard from "../components/ProductCard";
import api from "../api";
import { useQuery,} from "@tanstack/react-query";

const Products = () => {

  const scrollContainerRef = useRef(null);
  
  const fetchProducts = async () => {
    const response = await api.get('api/v1/products/');
    return response.data;
};

const { data: productList = [], isLoading, error } = useQuery({
    queryKey: ['productList'],
    queryFn: fetchProducts,
});


  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -180,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 180,
        behavior: "smooth",
      });
    }
  };

  if (error) return <p>Error fetching products</p>;

  return (
    <section className="container">
      <div className="mx-20 relative mt-10 max-md:mx-10 max-sm:mx-3">
        <h1 className="text-white font-bold text-2xl">
          Our <span className="text-xiaomi-color">Products</span>
        </h1>
        <div className="max-md:mx-10 max-sm:mx-3">
          <div
            className="flex pt-10 overflow-x-scroll scrollbar-hide whitespace-nowrap"
            ref={scrollContainerRef}
          >
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              productList.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  name={product.name}
                  current_price={product.current_price}
                  original_price={product.original_price}
                  category={product.category.name}
                  discount={product.discount}
                />
              ))
            )}
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

export default Products;
