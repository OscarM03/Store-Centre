import Button from "../components/Button";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { WhatsApp } from "../constants";
import { products } from "../utils";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const product = products.find((p) => p.id === parseInt(id));

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

  // const fetchProduct = async (id) => {
  //   const response = await api.get(`api/v1/products/${id}`);
  //   return response.data;
  // };
  // const {
  //   data: product,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["product", id],
  //   queryFn: () => fetchProduct(id),
  //   enabled: !!id,
  // });

  // const addToCartMutation = useMutation({
  //   mutationFn: async (productId) => {
  //     const response = await api.post("api/v1/cart/", {
  //       product_id: productId,
  //     });
  //     return response.data;
  //   },
  //   onError: (error) => {
  //     console.error("Error adding product to cart", error);
  //   },
  //   onSuccess: (data) => {
  //     console.log("Total price:", data.total_price);
  //     setTimeout(() => {
  //       navigate("/mycart");
  //     }, 2000);
  //   },
  // });

  useEffect(() => {
    if (product && product.image) {
      setSelectedImage(product.image);
    }
  }, [product]);

  // const handleAddToCart = () => {
  //   const token = Cookies.get("access_token");

  //   if (!token) {
  //     navigate("/login");
  //     return;
  //   }
  //   addToCartMutation.mutate(id);
  // };

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Something went wrong</div>;

  const { features } = product;
  return (
    <section className="container">
      <div className=" flex justify-center flex-col items-center bg-gradient-bg bg-center bg-no-repeat pb-20 pt-14 relative max-lg:bg-top mx-10 max-sm:mx-3">
        <div className="inline-block font-bold text-gray-400">
          <h1>
            <a href="/">Home</a> / {product.name}
          </h1>
        </div>
        <img
          src={selectedImage}
          alt={product.name}
          width={450}
          className="mt-4 z-10"
        />
        <div>
          <h1 className="absolute inset-0 flex justify-center items-start mt-20 max-lg:mt-[94px] text-7xl text-white font-bold max-lg:text-5xl max-sm:text-4xl -z-0">
            {product.name}
          </h1>
        </div>
        <div className="flex gap-4 z-10">
          {product.thumbnail_1 && (
            <div
              className={`border-2 rounded-lg ${
                selectedImage === product.thumbnail_1
                  ? "border-xiaomi-color"
                  : "border-gray-400"
              }`}
            >
              <img
                src={product.thumbnail_1}
                alt={product.name}
                width={150}
                onClick={() => setSelectedImage(product.thumbnail_1)}
              />
            </div>
          )}
          {product.thumbnail_2 && (
            <div
              className={`border-2 rounded-lg ${
                selectedImage === product.thumbnail_2
                  ? "border-xiaomi-color"
                  : "border-gray-400"
              }`}
            >
              <img
                src={product.thumbnail_2}
                alt={product.name}
                width={150}
                onClick={() => setSelectedImage(product.thumbnail_2)}
              />
            </div>
          )}
          {product.thumbnail_3 && (
            <div
              className={`border-2 rounded-lg ${
                selectedImage === product.thumbnail_3
                  ? "border-xiaomi-color"
                  : "border-gray-400"
              }`}
            >
              <img
                src={product.thumbnail_3}
                alt={product.name}
                width={150}
                onClick={() => setSelectedImage(product.thumbnail_3)}
              />
            </div>
          )}
        </div>

        <div className="max-xl:flex gap-10 max-sm:flex-col max-sm:gap-0">
          <div className="xl:absolute left-0 bottom-[240px] border-2 border-xiaomi-color rounded-lg max-xl:mt-16 z-20 max-w-[400px]">
            <h1 className="text-xiaomi-color font-bold text-lg text-center pt-1">
              {product.name} features:
            </h1>
            <ul className=" text-gray-400 font-semibold px-6 py-2 text-center">
              {features &&
                Object.entries(features).map(([key, value]) => (
                  <li key={key} className="pb-1">
                    <span className="font-bold text-xiaomi-color">{key}:</span>{" "}
                    {value}
                  </li>
                ))}
            </ul>
          </div>

          <div className="xl:absolute right-16 bottom-[240px] border-2 p-4 rounded-lg border-xiaomi-color max-xl:mt-16 z-20">
            <h1 className="text-xiaomi-color font-bold text-center pb-2 text-lg">
              {product.name}
            </h1>
            <h1 className="text-gray-400 font-bold text-sm text-center pb-2">
              {product.stock}
            </h1>
            <h1 className="text-xiaomi-color text-center pb-2 hover:text-white text-xl font-bold">
              Ksh {parseFloat(product.current_price).toLocaleString()}
              <span className="line-through text-gray-400 text-xs">
                Ksh {parseFloat(product.original_price).toLocaleString()}
              </span>
            </h1>
            <div className="flex justify-center items-center py-2 border-2 rounded-lg border-gray-400 gap-2">
              <img src={WhatsApp} alt="whatsapp" width={24} />
              <h1 className="text-gray-400 hover:text-xiaomi-color">
                Order on Whatsapp
              </h1>
            </div>
            <div className="flex justify-center mt-4 gap-8">
              <div>
                <Button label="Add to Cart" onClick={handleAddToCart} />
              </div>

              <div>
                <Button label="Order" onClick={handleAddToCart} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-20 max-md:mx-10 max-sm:mx-3">
        <h1 className="text-2xl text-xiaomi-color mb-1 text-center">
          More Info
        </h1>
        {product.additional_info.split("\n").map((paragraph, index) => (
          <p key={index} className="text-gray-400 text-center mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
};

export default ProductDetails;
