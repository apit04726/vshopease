import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import reducer from "../reducer/productReducer";
import { SET_API_DATA, SET_SINGLE_ERROR, SET_SINGLE_PRODUCT, SET_SINGLE_LOADING, SET_LOADING, API_ERROR } from "../common/content";

const AppContext = createContext();

const API = "https://fakestoreapi.com/products";
// const API = "https://api.pujakaitem.com/api/products";


const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
  isSingleLoading: false,
  singleProduct: {},
};

// Transform FakeStore API data to match app format
const transformProduct = (product) => {
  return {
    id: product.id.toString(),
    name: product.title,
    company: product.category,
    price: Math.round(product.price * 100), // Convert to cents
    description: product.description,
    category: product.category,
    stock: Math.floor(Math.random() * 50) + 10, // Random stock between 10-60
    stars: product.rating?.rate || 0,
    reviews: product.rating?.count || 0,
    featured: product.rating?.rate >= 4.5 || false,
    colors: ["#FF0000", "#0000FF", "#00FF00", "#FFFF00", "#000000"],
    image: product.image, // String URL for list view
    images: [
      { url: product.image, filename: `${product.id}-1.jpg` },
      { url: product.image, filename: `${product.id}-2.jpg` },
      { url: product.image, filename: `${product.id}-3.jpg` }
    ] // Array for single product view
  };
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (url) => {
    dispatch({ type: SET_LOADING });
    try {
      const res = await axios.get(url);
      const products = res.data.map(transformProduct);
      dispatch({ type: SET_API_DATA, payload: products });
    } catch (error) {
      dispatch({ type: API_ERROR });
    }
  };

  const getSingleProduct = useCallback(async (url) => {
    dispatch({ type: SET_SINGLE_LOADING });
    try {
      const res = await axios.get(url);
      const transformedProduct = transformProduct(res.data);
      // For single product, use images array instead of image string
      dispatch({ type: SET_SINGLE_PRODUCT, payload: { ...transformedProduct, image: transformedProduct.images } });
    } catch (error) {
      dispatch({ type: SET_SINGLE_ERROR });
    }
  }, []);

  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
