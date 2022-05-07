import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";


export const setCategories = (categoriesMap) => 
    createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesMap);

export const fetchCategoriesStart = () => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesMap) => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,categoriesMap);

export const fetchCategoriesFailed = () => 
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED);
