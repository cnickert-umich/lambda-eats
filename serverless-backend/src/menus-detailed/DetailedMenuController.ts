'use strict';

import ResponseUtil from "../utils/ResponseUtil";
import { APIGatewayProxyHandler } from 'aws-lambda';
import { DetailedMenu } from "./_types/DetailedMenu";
import DetailedMenuService from "./DetailedMenuService";

export const listAllMenusWithDetails: APIGatewayProxyHandler = async (event, context) => {
    try {
        const shopId: string = event.pathParameters.shopId;

        const responseBody: DetailedMenu[] = await DetailedMenuService.getShopMenusWithDetails(shopId);

        return ResponseUtil.success(responseBody);
    } catch (e) {
        return ResponseUtil.error(e);
    }
}
