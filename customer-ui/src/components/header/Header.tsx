import React, { useState } from "react";
import { useCartContext } from "../../contexts/useCartContext";
import { ShopDO } from "../../CustomTypes";
import CartModal from "../cart/CartModal";

const Header = ({ shop }: { shop: ShopDO }) => {
    const { cart, subTotal, addToCart, removeFromCart, setCart } = useCartContext();

    const [showCart, setShowCart] = useState<boolean>(false);

    return (
        <>
            <nav id="header" className="navbar sticky-top bg-light p-1 border border-primary rounded-pill">
                <div className="container-fluid text-center d-block d-md-flex">
                    <div className="d-flex">
                        <a className="my-auto me-1" href={shop.website}><button className="btn btn-primary"><i className="fas fa-arrow-left me-1"></i></button></a>
                        <div>
                            <h1 className="my-auto">{shop.name}</h1>
                            <p className="my-auto small"><i className="my-auto fas fa-map-marked me-2 text-primary"></i>{shop.address}</p>
                        </div>
                    </div>

                    <div>
                        <button className="btn btn-primary" onClick={() => { setShowCart(true) }}>
                            <i className="fas fa-shopping-cart me-1"></i>
                            <span>Cart - ${(subTotal / 100).toFixed(2)}</span>
                        </button>
                    </div>
                </div>
            </nav>
            <CartModal shop={shop} show={showCart} closeModal={() => { setShowCart(false) }} />
        </>
    )


}

export default Header;