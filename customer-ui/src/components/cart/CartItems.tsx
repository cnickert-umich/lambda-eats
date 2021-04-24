import React from "react";
import { useCartContext } from "../../contexts/useCartContext";
import CartItemCard from "./CartItemCard";

export default function CartItems() {
    const { cart, subTotal, addToCart, removeFromCart, setCart } = useCartContext();

    return (
        <ul className="list-group">
            {cart.map((cartFoodItem, index) => {
                return (
                    <li className="list-group-item" key={`card-${cartFoodItem.id}-index-${index}`}>
                        <CartItemCard cartItem={cartFoodItem} removeFromCart={() => { removeFromCart(index) }} />
                    </li>
                );
            })}
        </ul>
    );
}
