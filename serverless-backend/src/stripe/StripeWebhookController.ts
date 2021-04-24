'use strict';

import { APIGatewayProxyHandler } from 'aws-lambda';
import ResponseUtil from "../utils/ResponseUtil";
import Stripe from 'stripe';
import { STRIPE_SECRET, STRIPE_WEBHOOK_EVENT_PAYMENT_INTENT_SUCCEEDED, STRIPE_WEBHOOK_SIGNATURE_HEADER_NAME, STRIPE_WEBHOOK_SIGNING_SECRET } from "../Constants";
import CheckoutService from "../checkout/CheckoutService";

const stripe = new Stripe(STRIPE_SECRET, {
    apiVersion: '2020-08-27'
});

export const checkoutSessionCompleted: APIGatewayProxyHandler = async (event, context) => {
    try {
        console.log("made it here");

        const sig = event.headers[STRIPE_WEBHOOK_SIGNATURE_HEADER_NAME];

        console.log(`signature ${sig}`);

        const webhookEvent = stripe.webhooks.constructEvent(event.body, sig, STRIPE_WEBHOOK_SIGNING_SECRET);

        console.log(`webhookEvent ${webhookEvent}`);

        if (webhookEvent.type != STRIPE_WEBHOOK_EVENT_PAYMENT_INTENT_SUCCEEDED) {
            throw `This endpoint is only for the ${STRIPE_WEBHOOK_EVENT_PAYMENT_INTENT_SUCCEEDED} event`;
        }

        const paymentIntent = webhookEvent.data.object as Stripe.PaymentIntent;

        console.log(`paymentIntent ${paymentIntent}`);

        const shopId = paymentIntent.metadata.shopId;
        const orderId = paymentIntent.metadata.orderId;

        await CheckoutService.completeCheckout(shopId, orderId);

        const responseForStripe = {
            message: `Order ${orderId} successfully created for shop ${shopId}`
        };

        return ResponseUtil.success(responseForStripe);
    } catch (e) {
        return ResponseUtil.error(e);
    }
}