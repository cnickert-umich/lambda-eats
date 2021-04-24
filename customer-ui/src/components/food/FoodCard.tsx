import React, { useEffect, useState } from "react";
import { useCartContext } from "../../contexts/useCartContext";
import { FoodDO } from "../../CustomTypes";


export default function FoodCard({ food, menuId }: { food: FoodDO, menuId: string }) {

    const { cart, subTotal, addToCart, removeFromCart, setCart } = useCartContext();

    const click = () => {
        addToCart(food, menuId);
    }

    return (
        <div className="d-flex justify-content-between">
            <div>
                <h4>{food.title}</h4>
                <p>{food.description}</p>
                <p>{(food.cost / 100).toFixed(2)}</p>
            </div>
            <div className="my-auto">
                <button className="btn btn-success" onClick={click}>
                    <i className="fas fa-plus"></i>
                    <span className="visually-hidden">Add {food.title} to Cart</span>
                </button>
            </div>
        </div>
    );
}
