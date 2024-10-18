import { useQuery } from "@tanstack/react-query";
import api from "../api";
import { Storage } from "../constants";

const LatestProduct = () => {

  const fetchLatestPhone = async () => {
    const response = await api.get("api/v1/latestphone/");
    return response.data;
}
const {data: latestPhones = [], isLoading, error} = useQuery ({
    queryKey: ['latestPhones'],
    queryFn: fetchLatestPhone
})

  const product = latestPhones[0] || {};

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching latest phone</p>;
  return (
    <section className="container bg-gradient-bg bg-center max-md:bg-cover bg-no-repeat py-10">
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold text-white">
          Latest Phone<span className="text-xiaomi-color"> - <a href={`/product-details/${product.id}`}>{product.name}</a></span>
        </h1>
        <p className="text-gray-400 font-bold">
          Discover our latest phone and it features
        </p>
      </div>
      <div className="m-auto mt-6 rounded-lg flex justify-center relative max-sm:mx-3">
        <a href={`/product-details/${product.id}`}><img src={product.image} alt={product.name} width={500} /></a>
        <div className="absolute flex items-center gap-2 border px-1 py-1 rounded-md bg-light-dark max-lg:px-2 max-lg:bg-opacity-70 left-[67%] top-0 max-md:left-[57%] max-custom-380:hidden">
          <div className="bg-icon-color1 w-8 h-8 rounded-lg flex justify-center items-center max-md:w-6 max-md:h-6">
            <img
              src={Storage}
              alt="RAM icon"
              width={20}
              className="max-md:w-[16px]"
            />
          </div>
          <h1 className="text-xiaomi-color font-bold max-md:text-xs text-sm">
            {product.feature_1}
          </h1>
        </div>

        <div className="absolute flex items-center gap-2 border px-1 py-1 rounded-md bg-light-dark max-lg:px-2 max-lg:bg-opacity-70 left-[72%] top-28 max-md:left-[67%]  max-sm:top-[90px] max-custom-380:hidden">
          <div className="bg-icon-color2 w-8 h-8 rounded-lg flex justify-center items-center max-md:w-6 max-md:h-6">
            <img
              src={Storage}
              alt="Storage icon"
              width={20}
              className="max-md:w-[16px]"
            />
          </div>
          <h1 className="text-xiaomi-color font-bold max-md:text-xs text-sm">
          {product.feature_2}
          </h1>
        </div>

        <div className="absolute flex items-center gap-2 border px-1 py-1 rounded-md bg-light-dark max-lg:px-2 max-lg:bg-opacity-70 left-[67%] top-56 max-md:left-[57%] max-sm:top-[180px] max-custom-380:hidden">
          <div className="bg-icon-color3 w-8 h-8 rounded-lg flex justify-center items-center max-md:w-6 max-md:h-6">
            <img
              src={Storage}
              alt="Battery icon"
              width={20}
              className="max-md:w-[16px]"
            />
          </div>
          <h1 className="text-xiaomi-color font-bold max-md:text-xs text-sm">
          {product.feature_3}
          </h1>
        </div>

        <div className="absolute flex items-center gap-2 border px-1 py-1 rounded-md bg-light-dark max-lg:px-2 max-lg:bg-opacity-70 left-[72%] top-[336px] max-md:left-[67%]  max-sm:top-[270px] max-custom-380:hidden">
          <div className="bg-icon-color4 w-8 h-8 rounded-lg flex justify-center items-center max-md:w-6 max-md:h-6">
            <img
              src={Storage}
              alt="Main Camera icon"
              width={20}
              className="max-md:w-[16px]"
            />
          </div>
          <h1 className="text-xiaomi-color font-bold max-md:text-xs text-sm">
          {product.feature_4}
          </h1>
        </div>

        <div className="absolute flex items-center gap-2 border px-1 py-1 rounded-md bg-light-dark max-lg:px-2 max-lg:bg-opacity-70 left-[67%] top-[448px] max-md:left-[57%] max-sm:top-[360px] max-custom-380:hidden">
          <div className="bg-icon-color1 w-8 h-8 rounded-lg flex justify-center items-center max-md:w-6 max-md:h-6">
            <img
              src={Storage}
              alt="Front Camera icon"
              width={20}
              className="max-md:w-[16px]"
            />
          </div>
          <h1 className="text-xiaomi-color font-bold max-md:text-xs text-sm">
          {product.feature_5}
          </h1>
        </div>

        <div className="absolute flex items-center gap-2 border px-1 py-1 rounded-md bg-light-dark max-lg:px-2 max-lg:bg-opacity-70 left-[18%] top-0 max-md:left-[16%] max-sm:left-[6%] max-custom-380:hidden">
          <div className="bg-icon-color2 w-8 h-8 rounded-lg flex justify-center items-center max-md:w-6 max-md:h-6">
            <img
              src={Storage}
              alt="Display icon"
              width={20}
              className="max-md:w-[16px]"
            />
          </div>
          <h1 className="text-xiaomi-color font-bold max-md:text-xs text-sm">
          {product.feature_6}
          </h1>
        </div>

        <div className="absolute flex items-center gap-2 border px-1 py-1 rounded-md bg-light-dark max-lg:px-2 max-lg:bg-opacity-70 left-[10%] top-28 max-md:left-[26%] max-sm:left-[16%] max-sm:top-[90px] max-custom-380:hidden">
          <div className="bg-icon-color3 w-8 h-8 rounded-lg flex justify-center items-center max-md:w-6 max-md:h-6">
            <img
              src={Storage}
              alt="Processor icon"
              width={20}
              className="max-md:w-[16px]"
            />
          </div>
          <h1 className="text-xiaomi-color font-bold max-md:text-xs text-sm">
          {product.feature_7}
          </h1>
        </div>

        <div className="absolute flex items-center gap-2 border px-1 py-1 rounded-md bg-light-dark max-lg:px-2 max-lg:bg-opacity-70 left-[18%] top-56 max-md:left-[16%] max-sm:left-[6%] max-sm:top-[180px] max-custom-380:hidden">
          <div className="bg-icon-color4 w-8 h-8 rounded-lg flex justify-center items-center max-md:w-6 max-md:h-6">
            <img
              src={Storage}
              alt="5G Connectivity icon"
              width={20}
              className="max-md:w-[16px]"
            />
          </div>
          <h1 className="text-xiaomi-color font-bold max-md:text-xs text-sm">
          {product.feature_8}
          </h1>
        </div>

        <div className="absolute flex items-center gap-2 border px-1 py-1 rounded-md bg-light-dark max-lg:px-2 max-lg:bg-opacity-70 left-[10%] top-[336px] max-md:left-[26%] max-sm:left-[16%] max-sm:top-[270px] max-custom-380:hidden ">
          <div className="bg-icon-color1 w-8 h-8 rounded-lg flex justify-center items-center max-md:w-6 max-md:h-6">
            <img
              src={Storage}
              alt="Color options icon"
              width={20}
              className="max-md:w-[16px]"
            />
          </div>
          <h1 className="text-xiaomi-color font-bold max-md:text-xs text-sm">
          {product.feature_9}
          </h1>
        </div>

        <div className="absolute flex items-center gap-2 border px-1 py-1 rounded-md bg-light-dark max-lg:px-2 max-lg:bg-opacity-70 left-[18%] top-[448px] max-md:left-[16%] max-sm:left-[6%] max-sm:top-[360px] max-custom-380:hidden">
          <div className="bg-icon-color2 w-8 h-8 rounded-lg flex justify-center items-center max-md:w-6 max-md:h-6">
            <img
              src={Storage}
              alt="OS icon"
              width={20}
              className="max-md:w-[16px]"
            />
          </div>
          <h1 className="text-xiaomi-color font-bold max-md:text-xs text-sm">
          {product.feature_10}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default LatestProduct;
