import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import '../styleSheets/productForm.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useProductApis from '../customHooks/useProductApis';
const { TextArea } = Input;

const ProductForm = () => {
  const { productId } = useParams();
  const navigate = useNavigate()
  const { getproductById, addSingleProduct, updateSingleProduct } = useProductApis()
  const { products, currentProduct } = useSelector((state) => ({
    products: state?.products.products,
    currentProduct: state.products.currentProduct,
  }));

  //local states
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

  //functions
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
      addSingleProduct({ ...product, id: id });
    }
    else if (productId !== null) {
      updateSingleProduct(product)
    }
    setProduct(initialState)
    navigate('/products')
  };

  // Custom validations accept numbers only
  const validateNumber = (_, value) => {
    const regex = /^[0-9]+$/;
    if (!value || regex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject('Please enter numbers only.');
  };
  
  const isSubmitDisabled = () => {
    return Object.values(product).some(value => value === '');
  };

  // side effects
  useEffect(() => {
    if (productId) {
      getproductById(productId);
    }
  }, [productId]);

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
        <Form.Item label="Title" rules={[{ required: true, message: 'Please enter your title' }]}>
          <Input name='title' value={product?.title} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Description" rules={[{ required: true, message: 'Please enter description' }]}>
          <TextArea name="description" value={product?.description} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Price" rules={[{ required: true, message: 'Please enter price' }, { validator: validateNumber }]}>
          <Input name="price" value={product?.price} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Discount Percentage" rules={[{ required: true, message: 'Please enter discount percentage' }, { validator: validateNumber }]}>
          <Input name="discountPercentage" value={product.discountPercentage} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Brand" rules={[{ required: true, message: 'Please enter brand name' }]}>
          <Input name="brand" value={product.brand} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Category" rules={[{ required: true, message: 'Please enter category' }]}>
          <Input name="category" value={product.category} onChange={handleChange} />
        </Form.Item>
        <Form.Item label="Thumbnail URL" rules={[{ required: true, message: 'Please enter thumbnail url' }]}>
          <Input name="thumbnail" value={product.thumbnail} onChange={handleChange} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
          <Button className="ant-btn ant-btn-primary" htmlType="submit" disabled={isSubmitDisabled()}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ProductForm;
