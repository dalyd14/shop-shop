import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        cartOpen: false,
    },
    reducers: {
        addToCart: (state, action) => {
            state.cartOpen = true
            state.cart = [...state.cart, action.payload]
        },
        addMultipleToCart: (state, action) => {
            state.cart = [...state.cart, ...action.payload]
        },
        removeFromCart (state, action) {
            let cart = state.cart.filter(item => item._id !== action.payload)
            let cartOpen = false
            if (cart.length) {
                cartOpen = true
            }

            state.cartOpen = cartOpen
            state.cart = cart
        },
        updateCartQuantity (state, action) {
            let newCart = state.cart.map(item => {
                if (item._id === action.payload._id) {
                    item.purchaseQuantity = action.payload.purchaseQuantity
                }
                return item
            })
            
            state.cartOpen = true
            state.cart = newCart
        },
        clearCart (state) {
            state.cartOpen = false
            state.cart = []
        },
        toggleCart (state) {
            state.cartOpen = !state.cartOpen
        }
    }
})

export const {
    addToCart,
    addMultipleToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    toggleCart 
} = cartSlice.actions

export const selectCartOpen = state => state.cart.cartOpen
export const selectCart = state => state.cart.cart

export default cartSlice.reducer