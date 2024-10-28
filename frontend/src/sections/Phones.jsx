import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { products } from "../utils";
// import { useQuery } from "@tanstack/react-query";
// import api from "../api";

const Phones = () => {
  const[phonesList, setPhonesList] = useState([]);
  // const fetchPhones = async () => {
  //   const response = await api.get("api/v1/phones/");
  //   return response.data;
  // };

  // const {
  //   data: phonesList = [],
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["phonesList"],
  //   queryFn: fetchPhones,
  // });

  // if (error) return <p>Error fetching phones</p>;
  useEffect(() => {
    setPhonesList(products.filter((product) => product.category === "smartphone"));
  }, []);

  return (
    <section className="container">
      <div className="mx-20 max-md:mx-10 max-sm:mx-3 mt-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-xiaomi-color font-bold">Phones</h1>
          <a href={`/all?q=${encodeURIComponent("phones")}`}>
            <h1 className="text-sm text-gray-400 font-bold border-r-2 border-l-2 px-2 border-xiaomi-color">
              See All
            </h1>
          </a>
        </div>
        <div className="grid grid-cols-6 mt-2 max-lg:grid-cols-4 gap-4 max-md:grid-cols-3 max-sm:grid-cols-2">
          {phonesList.map((product) => (
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
      </div>
    </section>
  );
};

export default Phones;
