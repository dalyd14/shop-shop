import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from '../assets/spinner.gif'

import { useSelector, useDispatch } from 'react-redux'
import { updateCartQuantity, addToCart, selectCart, removeFromCart } from '../utils/cartSlice'
import { updateProducts, selectProducts } from '../utils/productSlice'

import Cart from '../components/Cart'

import { idbPromise } from '../utils/helpers'

function Detail() {

  const  dispatch = useDispatch()
  const cart = useSelector(selectCart)
  const products = useSelector(selectProducts)
  const { id } = useParams()

  const [ currentProduct, setCurrentProduct ] = useState({})

  const { loading, data } = useQuery(QUERY_PRODUCTS)

  const addToCartClick = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id)

    if (itemInCart) {
      dispatch(updateCartQuantity({
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      }))

      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      })
    } else {
      dispatch(addToCart({ ...currentProduct, purchaseQuantity: 1 }))
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 })   
    }
  }

  const removeFromCartClick = () => {
    dispatch(removeFromCart(currentProduct._id))

    idbPromise('cart', 'delete', { ...currentProduct })
  }

  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id))
    } else if (data) {
      dispatch(updateProducts(data.products))

      data.products.forEach((product) => {
        idbPromise('products', 'put', product)
      })
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch(updateProducts(products))
      })
    }
  }, [products, data, dispatch, id, loading])

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">
            ← Back to Products
          </Link>

          <h2>{currentProduct.name}</h2>

          <p>
            {currentProduct.description}
          </p>

          <p>
            <strong>Price:</strong>
            ${currentProduct.price}
            {" "}
            <button onClick={addToCartClick}>
              Add to Cart
            </button>
            <button
              disabled={!cart.find(p => p._id === currentProduct._id)}
              onClick={removeFromCartClick}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
      <Cart />
    </>
  );
};

export default Detail;
