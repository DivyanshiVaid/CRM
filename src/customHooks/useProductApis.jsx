import axios from "axios";
import { productAdded, productDeleted, productUpdated, setLoading, setProductData, setSingleProduct } from "../redux/slices/product.slice";
import { useDispatch } from "react-redux";
import { message } from "antd";

const useProductApis = () => {
    const dispatch = useDispatch();

    // get product list
    const fetchProductData = async () => {
        dispatch(setLoading(true))
        try {
            const response = await axios.get('https://dummyjson.com/products');
            dispatch(setProductData(response?.data?.products))
            dispatch(setLoading(false))
        } catch (error) {
            dispatch(setLoading(false))
            message.error('Error fetching data');
        }
    };

    // add new product using redux and created axios api call 
    const addProduct = async (productData) => {
        axios.post('https://dummyjson.com/products/add', productData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                fetchProductData()
            })
            .catch(error => {
                message.error('Error Adding product');
            });
    }

    const addSingleProduct = (productData) => {
        dispatch(productAdded(productData))
    }

    // delete product with id using redux and created axios api call 
    const deleteProductById = async (id) => {
        axios.delete(`https://dummyjson.com/products/${id}`)
            .then(response => {
                fetchProductData()
            })
            .catch(error => {
                message.error('Error occured');
            });
    }

    const deleteSingleProduct = (prodcuctId) => {
        dispatch(productDeleted(prodcuctId))
    }

    // get single product with id using axios
    const getproductById = async (id) => {
        axios.get(`https://dummyjson.com/products/${id}`)
            .then(response => {
                dispatch(setSingleProduct(response?.data))
            })
            .catch(error => {
                message.error('Error fetching the data');
            });
    }

    // update product with id by using the redux and created axios api call 
    const updateProductById = async (id, productData) => {
        axios.patch(`https://dummyjson.com/products/${id}`, productData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                fetchProductData()
            })
            .catch(error => {
                message.error('Error occured while updating the data');
            });
    }

    const updateSingleProduct = (productData) => {
        dispatch(productUpdated(productData))
    }

    return {
        fetchProductData,
        addProduct,
        deleteProductById,
        getproductById,
        updateProductById,
        updateSingleProduct,
        deleteSingleProduct,
        addSingleProduct,
    };
}
export default useProductApis;
