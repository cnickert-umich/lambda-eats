import React, { useState, useContext } from "react";
import { CartFoodItem, FoodDO } from "../CustomTypes";

type ContextTyping = {
    cart: CartFoodItem[],
    subTotal: number,
    addToCart: (food: FoodDO, menuId: string) => void
    removeFromCart: (index: number) => void
    setCart: (cart: CartFoodItem[]) => void
};


const CartContext = React.createContext<ContextTyping>({
    cart: [],
    subTotal: 0,
    addToCart: () => { },
    removeFromCart: () => { },
    setCart: () => { }
});


export function CartProvider(props: any) {

    const [cart, setCart] = useState<CartFoodItem[]>([]);

    const addToCart = (food: FoodDO, menuId: string) => {
        const toAdd: CartFoodItem = {
            ...food,
            menuId: menuId
        }

        const cartCopy = [...cart];
        cartCopy.push(toAdd);
        setCart(cartCopy);
    };

    const removeFromCart = (index: number) => {
        console.log(`Removing ${index}`);
        const cartCopy = [...cart];
        cartCopy.splice(index, 1);
        setCart(cartCopy);
    };


    let subTotal = 0;
    for (const food of cart) {
        subTotal += food.cost;
    }

    return (
        <CartContext.Provider value={{ cart, subTotal, addToCart: addToCart, removeFromCart: removeFromCart, setCart: setCart }} >
            { props.children}
        </ CartContext.Provider>
    )
}

export function useCartContext() {
    return useContext(CartContext);
}