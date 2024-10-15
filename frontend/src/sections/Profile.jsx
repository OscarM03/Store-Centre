import api from "../api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { EditIcon } from "../constants";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

const Profile = () => {
  const navigate = useNavigate();

  const { data: profileData } = useQuery({
    queryKey: ['profileData'],
    queryFn: async () => {
      const response = await api.get('api/v1/profile/');
      return response.data;
    },
    onSuccess: () => {
      console.log('Profile data fetched successfully');
    },
  });
  
  

  const { data: orderData } = useQuery({
    queryKey: ['orderData'],
    queryFn: async () => {
      const response = await api.get('api/v1/order/');
      return response.data;
    }
  });

  const productIds = useMemo(() => {
    if (!orderData) return [];
    return orderData.flatMap(order => order.items.map(item => item.product));
  }, [orderData]);

  const { data: productsData } = useQuery({
    queryKey: ['products', productIds],
    queryFn: async () => {
      if (productIds.length === 0) return []; // Avoid fetching if no IDs
      const productPromises = productIds.map(id => api.get(`api/v1/products/${id}`));
      const responses = await Promise.all(productPromises);
      return responses.map(response => response.data);
    },
    enabled: productIds.length > 0, // Only run if there are product IDs
  });

  const orderItems = useMemo(() => {
    if (!orderData || !productsData) return [];

    const productMap = Object.fromEntries(productsData.map(product => [product.id, product]));

    return orderData.map(order => ({
      ...order,
      items: order.items.map(item => {
        const product = productMap[item.product];
        return {
          name: product?.name || 'Unknown Product',
          price: parseFloat(product?.current_price) || 0,
          quantity: item.quantity,
          total: item.quantity * (parseFloat(product?.current_price) || 0),
        };
      }),
    }));
  }, [orderData, productsData]);

  const logout = async () => {
    try {
      const refreshToken = Cookies.get("refresh_token");
      await api.post('api/v1/jwt/blacklist/', { refresh: refreshToken });
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      navigate('/login');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };


  return (
    <section className="container">
      <div className="mx-20 max-md:mx-10 max-sm:mx-3 mt-16 ">
        <div className="text-xiaomi-color text-xs flex justify-center">
          <a href="/" className="border-r border-gray-400 pr-3">
            <h1 className="">Home</h1>
          </a>
          <button onClick={logout} className="pl-4">Logout</button>
        </div>
        <div className="flex gap-[5vw] max-lg:flex-col max-lg:items-center">
          <div className="w-[30vw] max-lg:w-full">
            <div className="max-lg:flex max-lg:justify-center max-lg:gap-20 max-lg:mt-10 max-md:flex-col items-center max-md:gap-4">
              <div className="relative w-[200px]">
                <img
                  src={profileData?.profile_image || ''}
                  alt="Profile Image"
                  width={200}
                  className="rounded-full"
                />
              </div>
              <div className="max-md:text-center">
                <h1 className="text-xiaomi-color mt-4 text-2xl font-bold">
                {profileData?.user?.username || "Loading..."}
                </h1>
                <p className="text-gray-400 mt-2">{profileData?.user?.email || "Loading..."}</p>
                <p className="text-gray-400 mt-2">{profileData?.user?.first_name} {profileData?.user?.last_name}</p>
                <div className="flex max-md:justify-center">
                  <div className="flex items-center justify-center gap-3 border w-[50%] p-1 rounded-sm border-xiaomi-color mt-4 cursor-pointer">
                    <h1 className="text-gray-400">Edit Profile</h1>
                    <a href="/profile/update"><img src={EditIcon} alt="edit" width={16} /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[65vw] max-lg:w-full">
            <h1 className="text-2xl font-semibold text-xiaomi-color mt-4 pb-10 text-center max-md:mt-10 max-md:pb-4">
              My Orders
            </h1>
            <table className="min-w-full bg-dark-bg border border-gray-400 rounded-lg">
              <thead>
                <tr className="text-xiaomi-color font-semibold">
                  <th className="py-3 px-4 text-left border-b border-gray-400">
                    Product Name
                  </th>
                  <th className="py-3 px-4 text-left border-b border-gray-400">
                    Quantity
                  </th>
                  <th className="py-3 px-4 text-left border-b border-gray-400">
                    Total Price
                  </th>
                  <th className="py-3 px-4 text-left border-b border-gray-400">
                    Delivery Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((order, orderIndex) => (
                  order.items.map((item, itemIndex) => (
                    <tr key={`${orderIndex}-${itemIndex}`}>
                      <td className="py-3 px-4 border-b border-gray-400 text-gray-400">
                        {item.name}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-400 text-gray-400">
                        {item.quantity}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-400 text-xiaomi-color">
                        Ksh {parseFloat(item.total).toLocaleString()}
                      </td>
                      <td className={`py-3 px-4 border-b border-gray-400 ${order.delivery_status === 'Delivered' ? 'text-green-400' : 'text-gray-400'}`}>
                        {order.delivery_status}
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Profile;
