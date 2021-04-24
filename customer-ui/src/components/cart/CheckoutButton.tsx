import { MDBBtn } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCartContext } from "../../contexts/useCartContext";
import { CheckoutData, CheckoutItem, ShopDO } from "../../CustomTypes";
import Loading from "../loading/Loading";
  
import { loadStripe, Stripe } from "@stripe/stripe-js";

const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

export default function CheckoutButton({ shop, name, phone, email, tip, className }: { shop: ShopDO, name: string, phone: string, email: string, tip: number, className?: string }) {

    const { cart, subTotal, addToCart, removeFromCart, setCart } = useCartContext();

    const total = subTotal + tip;

    const [loading, setLoading] = useState<boolean>();

    const checkout = async () => {
        setLoading(true);

        const checkoutCart: CheckoutItem[] = [];
        for (const cartItem of cart) {
            checkoutCart.push({
                menuId: cartItem.menuId,
                foodId: cartItem.id
            });
        }

        const checkoutRequest: CheckoutData = {
            customer: {
                customerName: name,
                customerPhone: phone,
                customerEmail: email
            },
            redirectUrl: window.location.href,
            tipAmount: tip,
            cart: checkoutCart
        };

        const response: { stripeSessionId: string } = await (
            await fetch(`${process.env.REACT_APP_API_BASE_URL}/shops/${shop.id}/checkout`,
                { method: "POST", body: JSON.stringify(checkoutRequest) }
            )
        ).json();

        stripeRedirect(response.stripeSessionId, shop.accountId);
    }

    const btnDisabled = loading || !(name && phone && email) || subTotal == 0;

    return (
        <MDBBtn color="success" size="lg" disabled={btnDisabled} onClick={checkout} className={className}>
            {loading ? <Loading /> :
                <span>${(total / 100).toFixed(2)} - Checkout</span>
            }
        </MDBBtn>
    );
}
async function stripeRedirect(stripeSessionId: string, shopAccountId: string) {
    const stripe = await loadStripe(stripePublicKey as string, { stripeAccount: shopAccountId }) as Stripe;
    await stripe.redirectToCheckout({ sessionId: stripeSessionId });
}

