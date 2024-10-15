
import { useState, useEffect } from "react";
import api from "../api";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const All = () => {
    const [columns, setColumns] = useState(5);
    const [productList, setProductList] = useState([]);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q') || '';

    useEffect(() => {
        const fetchProductList = async () => {
            try {
                // Fetch products based on the search query
                const response = await api.get('api/v1/products/', { params: { q: query } });
                const data = response.data;
                console.log('API Response:', data);
                setProductList(data);
            } catch (error) {
                console.error('Error fetching product list', error);
            }
        };

        fetchProductList();
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

    return (
        <section className="container">
            <div className={`grid ${getGridColumnsClass()} mx-10 max-md:mx-8 max-sm:mx-3 gap-y-8 mt-24`}>
                {productList.map((product) => (
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

