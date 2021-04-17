import { configureStore } from '@reduxjs/toolkit'

import productReducer from './productSlice'
import categoryReducer from './categorySlice'
import cartReducer from './cartSlice'

export default configureStore({
    reducer: {
        product: productReducer,
        category: categoryReducer,
        cart: cartReducer
    }
}) 