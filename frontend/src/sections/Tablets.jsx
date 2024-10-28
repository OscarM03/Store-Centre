// import { useQuery } from "@tanstack/react-query";
import TabletsCard from "../components/TabletsCard";
import { products } from "../utils";
// import api from "../api";

const Tablets = () => {
  const tabletsList = products.filter((product) => product.category === "tablet");
  // const fetchTablets = async () => {
  //   const response = await api.get("api/v1/tablets/");
  //   return response.data;
  // };

  // const {
  //   data: tabletsList = [],
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["tabletsList"],
  //   queryFn: fetchTablets,
  // });

  // if (error) return <p>Error fetching tablets</p>;

  return (
    <section className="container">
      <div className="mx-20 max-md:mx-10 max-sm:mx-3 mt-10 ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-xiaomi-color font-bold">Tablets</h1>
          <a href={`/all?q=${encodeURIComponent("tablets")}`}>
            <h1 className="text-sm text-gray-400 font-bold border-r-2 border-l-2 px-2 border-xiaomi-color">
              See All
            </h1>
          </a>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {
            tabletsList.map((item) => (
              <TabletsCard
                key={item.name}
                id={item.id}
                name={item.name}
                image={item.image}
                f_1={item.feature_1}
                f_2={item.feature_2}
                f_3={item.feature_3}
                discount={item.discount}
                current_price={item.current_price}
                original_price={item.original_price}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Tablets;
