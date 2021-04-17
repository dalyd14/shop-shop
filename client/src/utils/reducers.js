import { useReducer } from 'react'

import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from './actions'

export const reducer = (state, action) => {
    switch (action.type) {
        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: [...action.products]
            }
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            }
        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            }
        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.product]
            }
        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.products]
            }
        case REMOVE_FROM_CART:
            let cart = state.cart.filter(item => item._id !== action._id)
            let cartOpen = false
            if (cart.length) {
                cartOpen = true
            }

            return {
                ...state,
                cartOpen,
                cart
            }
        case UPDATE_CART_QUANTITY:
            let newCart = state.cart.map(item => {
                if (item._id === action._id) {
                    item.purchaseQuantity = action.purchaseQuantity
                }
                return item
            })

            return {
                ...state,
                cartOpen: true,
                cart: newCart
            }
        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            }
        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            }
        default:
            return state
    }
}

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState)
}