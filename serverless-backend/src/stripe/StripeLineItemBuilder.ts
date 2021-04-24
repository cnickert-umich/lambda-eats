import Stripe from "stripe";
import { STRIPE_CURRENCY, STRIPE_TIP_AMOUNT_NAME } from "../Constants";
import { FoodDO } from "../food/_types/FoodDO";

export default class StripeLineItemBuilder {

    static buildLineItems(selectedFoodList: FoodDO[]): Stripe.Checkout.SessionCreateParams.LineItem[] {
        const stripeLineItems = [];
        for (const food of selectedFoodList) {
            const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
                name: food.title,
                amount: food.cost,
                currency: 'USD',
                quantity: 1
            };

            stripeLineItems.push(lineItem);
        }

        return stripeLineItems;
    }

    static buildTipLineItem(tipAmount: number): Stripe.Checkout.SessionCreateParams.LineItem {
        const lineItemWithTip = {
            name: STRIPE_TIP_AMOUNT_NAME,
            amount: tipAmount,
            currency: STRIPE_CURRENCY,
            quantity: 1
        };

        return lineItemWithTip;
    }

}
