import { useQuery } from "@tanstack/react-query";
import api from "../api";

const Screens = () => {
  const fetchScreens = async () => {
    const response = await api.get("api/v1/screens/");
    return response.data;
  };

  const {
    data: screenList = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["screenList"],
    queryFn: fetchScreens,
  });

  console.log(screenList);

  if (error) return <p>Error fetching screens</p>;

  return (
    <section className="container">
      <div className="mx-20 max-md:mx-10 max-sm:mx-3 mt-10 ">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-xiaomi-color font-bold">Screens</h1>
          <a href={`/all?q=${encodeURIComponent("screens")}`}>
            <h1 className="text-sm text-gray-400 font-bold border-r-2 border-l-2 px-2 border-xiaomi-color">
              See All
            </h1>
          </a>
        </div>
        <div className="grid grid-cols-4  md:gap-8 mt-4 max-lg:grid-cols-2 max-sm:grid-cols-1 ">
          {isLoading ? ( // Check if loading
            <p>Loading...</p> // Display loading message while items are being loaded
          ) : (
            screenList.map((screen) => (
              <div
                key={screen.id}
                className="flex flex-col items-center relative"
              >
                <a href={`/product-details/${screen.id}`}>
                  <img src={screen.image} alt="" width={300} />
                </a>
                <div className="text-center">
                  <a href={`/product-details/${screen.id}`}>
                    <h1 className="text-xiaomi-color text-xl font-bold">
                      {screen.name}
                    </h1>
                  </a>
                  <p className="text-gray-400 font-semi-bold">
                    {screen.feature_1}
                  </p>
                  <p className="text-gray-400 font-semi-bold">
                    {screen.feature_2}
                  </p>
                  <h1 className="text-xiaomi-color font-bold text-xl">
                    Ksh {parseFloat(screen.current_price).toLocaleString()}
                  </h1>
                  <h1 className="line-through text-gray-400 text-sm font-bold">
                    Ksh {parseFloat(screen.original_price).toLocaleString()}
                  </h1>
                </div>
                <div className="absolute top-5 right-0">
                  <p className="text-xiaomi-color text-sm font-bold">
                    -{screen.discount}%
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Screens;
