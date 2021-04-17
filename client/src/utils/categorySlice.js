import { createSlice } from '@reduxjs/toolkit'

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        currentCategory: ''
    },
    reducers: {
        updateCategories: (state, action) => {
            state.categories = [...action.payload]
        },
        updateCurrentCategory: (state, action) => {
            state.currentCategory = action.payload
        }
    }
})

export const { updateCategories, updateCurrentCategory } = categorySlice.actions

export const selectCategories = state => state.category.categories
export const selectCurrentCategory = state => state.category.currentCategory

export default categorySlice.reducer