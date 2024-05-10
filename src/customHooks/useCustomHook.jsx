import axios from "axios";
import { productAdded, productDeleted, productUpdated, setLoading, setProductData, setSingleProduct } from "../redux/slices/product.slice";
import { useDispatch } from "react-redux";

const useCustomHook = () => {
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
            console.error('Error fetching data:', error);
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
                console.error('Error:', error); // Logging any errors
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
                console.error('Error:', error); // Logging any errors
            });
    }

    const deleteSingleProduct = (prodcuctId) => {
        dispatch(productDeleted(prodcuctId))
    }

    // get product with id
    const getproductById = async (id) => {
        axios.get(`https://dummyjson.com/products/${id}`)
            .then(response => {
                dispatch(setSingleProduct(response?.data))
            })
            .catch(error => {
                return error;
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
                console.error('Error:', error); // Logging any errors
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
export default useCustomHook;
