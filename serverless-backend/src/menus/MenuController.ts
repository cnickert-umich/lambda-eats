'use strict';

import ResponseUtil from "../utils/ResponseUtil";
import { APIGatewayProxyHandler } from 'aws-lambda';
import { NewMenu } from "./_types/NewMenu";
import { MenuDO } from "./_types/MenuDO";
import MenuService from "./MenuService";
import { UpdateMenu } from "./_types/UpdateMenu";

export const createMenu: APIGatewayProxyHandler = async (event, context) => {
    try {
        const shopId: string = event.pathParameters.shopId;

        const username = ""//event.requestContext.authorizer.claims['cognito:username'];

        const requestBody: NewMenu = JSON.parse(event.body);
        requestBody.shopId = shopId;

        const responseBody: MenuDO = await MenuService.create(requestBody, username);

        return ResponseUtil.success(responseBody);
    } catch (e) {
        return ResponseUtil.error(e);
    }
}

export const listAllMenus: APIGatewayProxyHandler = async (event, context) => {
    try {
        const shopId: string = event.pathParameters.shopId;

        const responseBody: MenuDO[] = await MenuService.getShopMenus(shopId);

        return ResponseUtil.success(responseBody);
    } catch (e) {
        return ResponseUtil.error(e);
    }
}

export const findMenuByShopIdAndMenuId: APIGatewayProxyHandler = async (event, context) => {
    try {
        const shopId: string = event.pathParameters.shopId;
        const menuId: string = event.pathParameters.menuId;

        const responseBody: MenuDO = await MenuService.getMenu(shopId, menuId);

        return ResponseUtil.success(responseBody);
    } catch (e) {
        return ResponseUtil.error(e);
    }
}

export const updateMenu: APIGatewayProxyHandler = async (event, context) => {
    try {
        const shopId: string = event.pathParameters.shopId;
        const menuId: string = event.pathParameters.menuId;

        const username = ""//event.requestContext.authorizer.claims['cognito:username'];

        const requestBody: UpdateMenu = JSON.parse(event.body);
        requestBody.shopId = shopId;
        requestBody.id = menuId;

        const responseBody: MenuDO = await MenuService.update(requestBody, username);

        return ResponseUtil.success(responseBody);
    } catch (e) {
        return ResponseUtil.error(e);
    }
}


