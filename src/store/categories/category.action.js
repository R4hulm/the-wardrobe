import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";


export const setcategoriesMap = (categoriesMap) => 
    createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categoriesMap);
