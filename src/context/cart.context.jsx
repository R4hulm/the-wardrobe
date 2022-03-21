import {createContext,useReducer} from 'react';
import  {createAction} from '../utils/reducer/reducer.utils';

export const addCartItem = (cartItems,productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) =>
     cartItem.id === productToAdd.id);

    if (existingCartItem){
        return cartItems.map((cartItem) => 
        cartItem.id === productToAdd.id 
        ? {...cartItem,quantity: cartItem.quantity+1}
        : cartItem 
        );
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem=(cartItems,cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) =>
     cartItem.id === cartItemToRemove.id);

     if (existingCartItem.quantity===1){
         return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
     }

     return cartItems.map((cartItem) => 
     cartItem.id === cartItemToRemove.id 
     ? {...cartItem,quantity: cartItem.quantity-1}
     : cartItem 
     );
}

const clearCartItem = (cartItems,cartItemToClear) => cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
    isCartOpen:false,
    setIsOpen: () => {},
    cartItems : [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart : () => {},
    cartItemCount : 0,
    cartTotal : 0
});

const INITIAl_STATE = {
    isCartOpen:false,
    cartItems : [],
    cartItemCount : 0,
    cartTotal : 0
}

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const CartReducer = (state,action) => {
    const {type,payload} = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS :
            return{
                ...state,
                ...payload,
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN :
            return{
                ...state,
                isCartOpen: payload,
            }    

        default:
            throw new Error(`inhandled type of ${type} in cartReducer`);
    }

}

export const CartProvider = ({ children }) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartItemCount, setCartItemCount] = useState(0);
    // const [cartTotal, setCartTotal] = useState(0);

    // useEffect(() => {
    //     const count = cartItems.reduce(
    //         (total, cartItem) => total +cartItem.quantity,0)
    //     setCartItemCount(count);
    // },[cartItems]);

    // useEffect(() => {
    //     const newCartTotal = cartItems.reduce(
    //         (total, cartItem) => total +cartItem.quantity*cartItem.price,0)
    //     setCartTotal(newCartTotal);
    // },[cartItems]);

    const [{cartItems,isCartOpen,cartItemCount,cartTotal}, dispatch] = useReducer(CartReducer,INITIAl_STATE);

    const updateCartItemReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total +cartItem.quantity,0
        );

        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total +cartItem.quantity*cartItem.price,0
        );

            dispatch(
                createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{
                    cartItems: newCartItems ,
                    cartTotal : newCartTotal,
                    cartItemCount : newCartCount
                }))

    }


    const addItemToCart= (productToAdd)=> {
        const newCartItems = addCartItem(cartItems,productToAdd);
        updateCartItemReducer(newCartItems);
    }

    const removeItemFromCart= (cartItemToRemove)=> {
        const newCartItems = removeCartItem(cartItems,cartItemToRemove);
        updateCartItemReducer(newCartItems);

    }

    const clearItemFromCart= (cartItemToClear)=> {
        const newCartItems = clearCartItem(cartItems,cartItemToClear);
        updateCartItemReducer(newCartItems);

    }

    const setIsCartOpen = (bool) => {
        dispatch (createAction( CART_ACTION_TYPES.SET_IS_CART_OPEN, bool ))
    }
    

    const value = { 
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartItemCount,
        cartTotal
     };

    return <CartContext.Provider value = {value}>{children}</CartContext.Provider>;
};