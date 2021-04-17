import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: []
    },
    reducers: {
        updateProducts: (state, action) => {
            state.products = [...action.payload]
        }
    }
})

export const { updateProducts } = productSlice.actions

export const selectProducts = state => state.product.products

export default productSlice.reducer