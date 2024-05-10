import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import '../styleSheet/productForm.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useCustomHook from '../customHooks/useCustomHook';
const { TextArea } = Input;

const ProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate()
  const { getproductById, addSingleProduct, updateSingleProduct } = useCustomHook()
  const { products, currentProduct } = useSelector((state) => ({
    products: state?.products.products,
    currentProduct: state.products.currentProduct,
  }));
  const initialState = {
    id: 0,
    title: "",
    description: "",
    price: '',
    discountPercentage: '',
    rating: '',
    brand: "",
    category: "",
    thumbnail: "",
    images: ['']
  }

  const [product, setProduct] = useState(initialState);

  useEffect(() => {
    if (productId) {
      getproductById(productId);
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!productId) {
      let id = products ? products.length : 0; 
      addSingleProduct({ ...product, id:id });
    }
    else if (productId !== null) {
      updateSingleProduct(product)
    }
    setProduct(initialState)
    navigate('/products')
  };

  useEffect(() => {
    if (productId && currentProduct) {
      setProduct(currentProduct);
    }
  }, [currentProduct, productId]);

  return (
    <div className='product-form'>
      <h2>Add Product Details</h2>
      <Form
        onFinish={handleSubmit}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item label="Title">
          <Input name='title' value={product?.title} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Description">
          <TextArea name="description" value={product?.description} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Price">
          <Input name="price" value={product?.price} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Discount Percentage">
          <Input name="discountPercentage" value={product.discountPercentage} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Brand">
          <Input name="brand" value={product.brand} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Category">
          <Input name="category" value={product.category} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Thumbnail URL">
          <Input name="thumbnail" value={product.thumbnail} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Image URLs">
          <Input.TextArea name="images" autoSize={{ minRows: 3 }} value={product.images} onChange={handleChange} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
          <Button className="ant-btn ant-btn-primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ProductForm;
