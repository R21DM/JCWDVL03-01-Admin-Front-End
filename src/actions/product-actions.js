import Axios from 'axios'
import { GET_PRODUCTS, START_GET_PRODUCTS, END_GET_PRODUCTS } from './types'
const API_URL = process.env.REACT_APP_API_URL

export const getProducts = (category) => {
    return async (dispatch) => {
        // // fecth data dari api
        // Axios.get(API_URL + '/products')
        // .then(res => {
        //     dispatch({ type : GET_PRODUCTS, payload : res.data })
        // })
        // .catch(error => console.log(error))

        try {
            dispatch({ type : START_GET_PRODUCTS })

            const query = category === "" ? '/products' : `/products?category=${category}`
            const respond = await Axios.get(API_URL + query)
            dispatch({ type : GET_PRODUCTS, payload : respond.data })

            dispatch({ type : END_GET_PRODUCTS })
        } catch (error) {
            dispatch({ type : END_GET_PRODUCTS })
            console.log(error)
        }
    }
}