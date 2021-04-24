'use strict';

import ResponseUtil from "../../utils/ResponseUtil";
import { APIGatewayProxyHandler } from 'aws-lambda';
import ArchiveOrderService from "./ArchiveOrderService";

export const archiveOrder: APIGatewayProxyHandler = async (event, context) => {
    try {
        const shopId: string = event.pathParameters.shopId;
        const orderId: string = event.pathParameters.orderId;

        const username = ""//event.requestContext.authorizer.claims['cognito:username'];
        await ArchiveOrderService.archiveOrder(shopId, orderId, username);

        return ResponseUtil.success();
    } catch (e) {
        return ResponseUtil.error(e);
    }
}
