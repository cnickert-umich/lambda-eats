'use strict';

import ActiveOrderDao from "../orders/active/ActiveOrderDao";
import PendingOrderBuilder from "../orders/pending/PendingOrderBuilder";
import PendingOrderDao from "../orders/pending/PendingOrderDao";

import { OrderDO } from "../orders/_types/OrderDO";

import StripeSessionService from "../stripe/StripeSessionService";
import WebSocketBroadcaster from "../web-sockets/WebSocketBroadcaster";
import { CheckoutRequest } from "./_types/CheckoutRequest";
import { CheckoutResponse } from "./_types/CheckoutResponse";

export default class CheckoutService {

    static async beginCheckout(checkoutRequest: CheckoutRequest): Promise<CheckoutResponse> {
        try {

            const pendingOrder: OrderDO = await PendingOrderBuilder.buildFromCheckoutRequest(checkoutRequest);

            console.log("Checkout Data:", JSON.stringify(pendingOrder));

            const stripeSession = await StripeSessionService.createStripeSession(pendingOrder, `${checkoutRequest.redirectUrl}/success?orderid=${pendingOrder.id}`, `${checkoutRequest.redirectUrl}/cancelled`);

            pendingOrder.stripeSessionId = stripeSession.id;
            pendingOrder.totalAmount = stripeSession.amount_total;

            const savedOrder = await PendingOrderDao.save(pendingOrder);

            const response: CheckoutResponse = {
                stripeSessionId: savedOrder.stripeSessionId
            }

            return response;
        } catch (e) {
            console.log(e);
            throw "Could not begin checkout.";
        }
    }

    static async completeCheckout(shopId: string, orderId: string): Promise<void> {
        try {
            
            const pendingOrder = await PendingOrderDao.findByShopIdAndOrderId(shopId, orderId);

            if (pendingOrder) {
                console.log(`Converting order ${orderId} into an active order.`);
                const activeOrder = await ActiveOrderDao.save(pendingOrder);

                await PendingOrderDao.delete(shopId, orderId);

                await WebSocketBroadcaster.send(shopId, "NEW_ORDER", activeOrder);

                return;
            }

            const activeOrder = await ActiveOrderDao.findByShopIdAndOrderId(shopId, orderId);
            if (activeOrder) {
                console.log(`Received a duplicate notification for ${orderId}. The order was already saved in the db. No problem.`);
            } else {
                throw `The order ${orderId} cannot be found in any of our tables. There was either an issue creating it in the first place or it was somehow deleted.`;
            }

            return;
        } catch (e) {
            console.log(e);
            console.log(`Could not finish checkout for order ${orderId} at shop ${shopId}. We might want to consider refunding the customers money.`);
            throw `Could not finish checkout for order ${orderId} at shop ${shopId}. We might want to consider refunding the customers money.`;
        }
    }

}
