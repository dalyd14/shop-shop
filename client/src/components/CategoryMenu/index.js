import React, { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from "../../utils/queries";

import { useSelector, useDispatch } from 'react-redux'
import { updateCategories, updateCurrentCategory, selectCategories } from '../../utils/categorySlice'

import { idbPromise } from '../../utils/helpers'

function CategoryMenu() {

  const { data: categoryData, loading } = useQuery(QUERY_CATEGORIES)
  
  const dispatch = useDispatch()
  const categories = useSelector(selectCategories)

  useEffect(() => {
    if (categoryData) {
      dispatch(updateCategories(categoryData.categories))
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category)
      })
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch(updateCategories(categories))
      })
    }
  }, [categoryData, dispatch, loading])
  

  const handleClick = id => {
    dispatch(updateCurrentCategory(id))
  }

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
