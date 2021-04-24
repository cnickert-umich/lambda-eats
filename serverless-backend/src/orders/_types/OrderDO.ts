import Stripe from "stripe";
import { FoodDO } from "../../food/_types/FoodDO";
import { ShopDO } from "../../shops/_types/ShopDO";
import { CustomerInfo } from "./CustomerInfo";

export type OrderDO = {
    id: string,
    shopId: string,
    stripeSessionId?: string,
    shopSnapshot: ShopDO,
    customer: CustomerInfo,
    selectedFood: FoodDO[],
    totalAmount?: number,
    tipAmount: number,
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[]
    createdAt: number
}