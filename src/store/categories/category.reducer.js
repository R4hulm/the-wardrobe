export const CATEGORIES_INITIAL_STATE = {
    categoriesMap: {}
}

export const  categoriesReducer = (
    state = CATEGORIES_INITIAL_STATE ,
    action ={}) => {
    const {type, payload} = action;

    switch(type){
        case 'SET_CATAGORIES_MAP':
            return {...state,categoriesMap:payload};
        default : 
            return state;
    }
};
