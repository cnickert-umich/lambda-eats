'use strict'

import { APIGatewayProxyHandler } from "aws-lambda";
import ResponseUtil from "../utils/ResponseUtil";
import CheckoutService from "./CheckoutService";
import { CheckoutRequest } from "./_types/CheckoutRequest";
import { CheckoutResponse } from "./_types/CheckoutResponse";

export const beginCheckout: APIGatewayProxyHandler = async (event, context) => {
    try {
        const shopId: string = event.pathParameters.shopId;

        const requestBody: CheckoutRequest = typeof event.body == "string" ? JSON.parse(event.body) : event.body;

        console.log("Checkout request", requestBody);
        
        requestBody.shopId = shopId;

        const responseBody: CheckoutResponse = await CheckoutService.beginCheckout(requestBody);

        return ResponseUtil.success(responseBody);
    } catch (e) {
        return ResponseUtil.error(e);
    }
}
