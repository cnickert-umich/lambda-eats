

import React from "react";
import { CartFoodItem } from "../../CustomTypes";


export default function CartItemCard({ cartItem, removeFromCart }: { cartItem: CartFoodItem, removeFromCart: Function }) {

    return (
        <div className="w-100 d-flex justify-content-between">
            <div>
                <p>{cartItem.title}</p>
                <p>{(cartItem.cost / 100).toFixed(2)}</p>
            </div>

            <div className="my-auto">
                <button className="btn btn-danger" onClick={() => { removeFromCart() }}>
                    <i className="fas fa-ban"></i>
                    <span className="visually-hidden">Remove {cartItem.title} from Cart</span>
                </button>
            </div>
        </div>
    );
}
