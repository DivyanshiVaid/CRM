import { Button, Col, Flex, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useCustomHook from '../customHooks/useCustomHook';
import PopUp from '../components/modals/Modal';
import { useNavigate } from 'react-router-dom';
import { Empty } from 'antd';

const ProductsPage = () => {
  const { fetchProductData, deleteSingleProduct } = useCustomHook()
  const navigate = useNavigate();
  const [productId, setproductId] = useState(null);
  const { products } = useSelector((state) => ({
    products: state.products.products,
  }));

  // table columns 
  const columns = [
    {
      title: 'Product Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'name',
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'discountPercentage',
      dataIndex: 'discountPercentage',
      key: 'discountPercentage',
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'id',
      render: (text, record) => <Flex wrap gap="small">
        <Button type="primary" danger onClick={() => { setproductId(record?.id) }} >Delete</Button>
        <Button type="primary" onClick={()=>{ navigate(`/product/${record?.id}`)}}>Update</Button>
      </Flex>,
    },
  ];

  //functions
  const handleDeleteProduct = () => {
    deleteSingleProduct(productId)
    setproductId(null)
  }

  // side effects
  useEffect(() => {
    if (products?.length === 0) {
      fetchProductData();
    }
  }, [products]);
  return (
    <>
      <PopUp showModal={productId !== null} handleOk={handleDeleteProduct} handleCancel={() => setproductId('')} />
      <Row justify="space-between" align="middle">
        <Col>
          <h2>Manage Products</h2>
        </Col>
        <Col>
          <Button type="primary" onClick={()=>{ navigate('/product')}}>Add new product</Button>
        </Col>
      </Row>
      {products.length > 0 ? <Table dataSource={products} columns={columns} /> : <Empty/>}

    </>
  );
};

export default ProductsPage;