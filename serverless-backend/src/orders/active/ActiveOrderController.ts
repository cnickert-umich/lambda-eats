'use strict';

import ResponseUtil from "../../utils/ResponseUtil";
import { APIGatewayProxyHandler } from 'aws-lambda';
import ActiveOrderService from "./ActiveOrderService";
import { OrderDO } from "../_types/OrderDO";


export const listActiveOrders: APIGatewayProxyHandler = async (event, context) => {
    try {
        const shopId: string = event.pathParameters.shopId;

        const username = ""//event.requestContext.authorizer.claims['cognito:username'];

        const responseBody: OrderDO[] = await ActiveOrderService.getAllActiveOrders(shopId, username);

        return ResponseUtil.success(responseBody);
    } catch (e) {
        return ResponseUtil.error(e);
    }
}
