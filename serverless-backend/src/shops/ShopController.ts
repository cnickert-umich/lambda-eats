'use strict';

import ResponseUtil from "../utils/ResponseUtil";
import ShopService from "./ShopService";
import { APIGatewayProxyHandler } from 'aws-lambda';
import { ShopDO } from "./_types/ShopDO";
import { NewShop } from "./_types/NewShop";
import { UpdateShop } from "./_types/UpdateShop";

export const findShopById: APIGatewayProxyHandler = async (event, context) => {
    try {
        const shopId: string = event.pathParameters.shopId;

        const responseBody: ShopDO = await ShopService.getShop(shopId);

        return ResponseUtil.success(responseBody);
    } catch (e) {
        return ResponseUtil.error(e);
    }
}

export const createShop: APIGatewayProxyHandler = async (event, context) => {

    try {
        const requestBody: NewShop = JSON.parse(event.body);

        const responseBody: ShopDO = await ShopService.create(requestBody);

        return ResponseUtil.success(responseBody);
    } catch (e) {
        return ResponseUtil.error(e);
    }

}

export const updateShop: APIGatewayProxyHandler = async (event, context) => {

    try {
        const shopId: string = event.pathParameters.shopId;

        const username = ""//event.requestContext.authorizer.claims['cognito:username'];

        const requestBody: UpdateShop = JSON.parse(event.body);
        requestBody.id = shopId;

        const responseBody: ShopDO = await ShopService.update(requestBody, username);

        return ResponseUtil.success(responseBody);
    } catch (e) {
        return ResponseUtil.error(e);
    }
}
