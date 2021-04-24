'use strict';

import Stripe from 'stripe';
import { STRIPE_SECRET } from "../Constants";
import { OrderDO } from '../orders/_types/OrderDO';
import StripeLineItemBuilder from './StripeLineItemBuilder';
const stripe = new Stripe(STRIPE_SECRET, {
    apiVersion: '2020-08-27'
});

export default class StripeSessionService {

    static async createStripeSession(pendingOrder: OrderDO, successUrl: string, cancelUrl: string): Promise<Stripe.Checkout.Session> {
        try {

            const lineItems = [...pendingOrder.lineItems];

            attachTipAmountToLineItems(lineItems, pendingOrder.tipAmount);

            console.log("Line Items:", JSON.stringify(lineItems));

            const session: Stripe.Response<Stripe.Checkout.Session> = await stripe.checkout.sessions.create(
                {
                    payment_method_types: ['card'],
                    customer_email: pendingOrder.customer.customerEmail,
                    line_items: lineItems,
                    mode: 'payment',
                    payment_intent_data: {
                        receipt_email: pendingOrder.customer.customerEmail,
                        metadata: {
                            shopId: pendingOrder.shopId,
                            orderId: pendingOrder.id
                        }
                    },
                    success_url: successUrl,
                    cancel_url: cancelUrl
                },
                {
                    stripeAccount: pendingOrder.shopSnapshot.accountId,
                }
            );

            return session;
        } catch (e) {
            console.log(e);
            throw "Could not create stripe session.";
        }
    }

}

function attachTipAmountToLineItems(lineItems: Stripe.Checkout.SessionCreateParams.LineItem[], tipAmount: number) {
    const tipAmountLineitem = StripeLineItemBuilder.buildTipLineItem(tipAmount);
    lineItems.push(tipAmountLineitem);
}

