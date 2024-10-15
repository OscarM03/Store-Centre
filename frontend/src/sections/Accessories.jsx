
import ProductCard from "../components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import api from "../api";

const Accessories = () => {

  const fetchAccessories = async () => {
    const response = await api.get('api/v1/accessories/')
    return response.data
  }

  const {data: accessoriesList = [], isLoading, error} = useQuery({
    queryKey: ['accessoriesList'],
    queryFn: fetchAccessories,
    })


  // const scrollContainerRef = useRef(null);

  // const scrollLeft = () => {
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollBy({
  //       left: -202,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  // const scrollRight = () => {
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollBy({
  //       left: 202,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching accessories</p>;
  
  return (
    <section className="container">
      <section className="container">
            <div className="mx-20 max-md:mx-10 max-sm:mx-3  mt-10">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl text-white font-bold">Other <span className="text-xiaomi-color">Products</span> You May Like</h1>
                    {/* <h1 className="text-sm text-gray-400 font-bold border-r-2 border-l-2 px-2 border-xiaomi-color">See All</h1> */}
                </div>
                <div className="grid grid-cols-6 gap-6 mt-2 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
                    {accessoriesList.map((product) => (
                        <ProductCard 
                        key={product.id}
                        id = {product.id}
                        image=
                        {product.image}
                        name={product.name}
                        current_price={product.current_price}
                        original_price={product.original_price}
                        category={product.category.name}
                        discount={product.discount}
                        />
                    ))}
                </div>
            </div>
        </section>
      {/* <div className="mx-20 mt-16 relative max-md:mx-10 max-sm:mx-3">
        <h1 className="text-2xl text-xiaomi-color text-center font-bold">
          Other Products You May Like
        </h1>
        <div className="relative max-md:mx-10 max-sm:mx-3">
          <div
            className="flex mt-10 overflow-x-scroll scrollbar-hide whitespace-nowrap"
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
      </div> */}
    </section>
  );
};

export default Accessories;
