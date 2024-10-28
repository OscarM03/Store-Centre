
import { useState, useEffect } from "react";
// import api from "../api";
import { useLocation } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import { products } from "../utils";

const All = () => {
    const [columns, setColumns] = useState(5);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q') || '';

    // const fetchProductsList = async () => {
    //         const response = await api.get('api/v1/products/', { params: { q: query } });
    //         return response.data;
    //     };

    //     const { data: productList = [], isLoading, error } = useQuery({
    //         queryKey: ['productList'],
    //         queryFn: fetchProductsList,
    //     });
    useEffect(() => {
        const filtered = products.filter(
            (product) => 
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [query]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 380) {
                setColumns(1);
            } else if (window.innerWidth < 550) {
                setColumns(2);
            } else if (window.innerWidth < 640) {
                setColumns(3);
            } else if (window.innerWidth < 766) {
                setColumns(4);
            } else if (window.innerWidth < 1200) {
                setColumns(5);
            } else {
                setColumns(6);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [setColumns]);

    const getGridColumnsClass = () => {
        switch (columns) {
            case 1:
                return "grid-cols-1";
            case 2:
                return "grid-cols-2";
            case 3:
                return "grid-cols-3";
            case 4:
                return "grid-cols-4";
            case 5:
                return "grid-cols-5";
            default:
                return "grid-cols-6";
        }
    };

    // if (error) return <p>Error fetching products</p>;


    return (
        <section className="container">
        <div className={`grid ${getGridColumnsClass()} mx-10 max-md:mx-8 max-sm:mx-3 gap-y-8 mt-24`}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              current_price={product.current_price}
              original_price={product.original_price}
              category={product.category.name}
              discount={product.discount}
              className="cursor-pointer"
            />
          ))}
        </div>
        </section>
    );
};

export default All;

