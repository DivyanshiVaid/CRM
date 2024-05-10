import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { Row, Spin } from 'antd';
import useCustomHook from "../customHooks/useCustomHook.jsx"

const HomePage = () => {
    const { fetchProductData } = useCustomHook()
    const { products, loading } = useSelector((state) => ({
        products: state.products.products,
        loading: state.products.loading
    }));

    useEffect(() => {
        fetchProductData();
    }, []);

    return (
        <div>
            <h2>All the available products here!!</h2>
            <Row wrap justify="start" >
                {loading ? <Spin size="large"/> :
                    products?.length > 0 ? (
                        products.map((productData) => (
                            <ProductCard key={productData.id} product={productData} />
                        ))
                    ) : (
                        <h2>No data</h2>
                    )
                }
            </Row>

        </div>
    );
};

export default HomePage;