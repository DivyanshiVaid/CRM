import React from 'react';
import '../styleSheets/productCard.css';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <div className="product-thumbnail">
                <img src={product.thumbnail} alt={product.title}/>
            </div>
            <div className="product-details">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div className="product-meta">
                    <span>${product.price}</span>
                    <span>{product.stock} in stock</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;