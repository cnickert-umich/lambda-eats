'use strict';

import ResponseUtil from "../utils/ResponseUtil";
import { APIGatewayProxyHandler } from 'aws-lambda';
import { FoodDO } from "./_types/FoodDO";
import FoodService from "./FoodService";
import { NewFood } from "./_types/NewFood";
import { UpdateFood } from "./_types/UpdateFood";

export const listAllFood: APIGatewayProxyHandler = async (event, context) => {
    try {
        const shopId: string = event.pathParameters.shopId;

        const responseBody: FoodDO[] = await FoodService.getShopFood(shopId);

        return ResponseUtil.success(responseBody);
    } catch (e) {
        return ResponseUtil.error(e);
    }
}

export const createFood: APIGatewayProxyHandler = async (event, context) => {
    try {
        const shopId: string = event.pathParameters.shopId;

        const username = ""//event.requestContext.authorizer.claims['cognito:username'];

        const requestBody: NewFood = JSON.parse(event.body);
        requestBody.shopId = shopId;

        const responseBody: FoodDO = await FoodService.create(requestBody, username);

        return ResponseUtil.success(responseBody);
    } catch (e) {
        return ResponseUtil.error(e);
    }
}

export const findFoodByShopIdAndFoodId: APIGatewayProxyHandler = async (event, context) => {
    try {
        const shopId: string = event.pathParameters.shopId;
        const foodId: string = event.pathParameters.foodId;

        const responseBody: FoodDO = await FoodService.getFood(shopId, foodId);

        return ResponseUtil.success(responseBody);
    } catch (e) {
        return ResponseUtil.error(e);
    }
}

export const listAllFoodForMenu: APIGatewayProxyHandler = async (event, context) => {
    try {
        const shopId: string = event.pathParameters.shopId;
        const menuId: string = event.pathParameters.menuId;

        const responseBody: FoodDO[] = await FoodService.listAllFoodForMenu(shopId, menuId);

        return ResponseUtil.success(responseBody);
    } catch (e) {
        return ResponseUtil.error(e);
    }
}

export const updateFood: APIGatewayProxyHandler = async (event, context) => {
    try {
        const shopId: string = event.pathParameters.shopId;
        const foodId: string = event.pathParameters.foodId;

        const username = ""//event.requestContext.authorizer.claims['cognito:username'];

        const requestBody: UpdateFood = JSON.parse(event.body);
        requestBody.shopId = shopId;
        requestBody.id = foodId;

        const responseBody: FoodDO = await FoodService.update(requestBody, username);

        return ResponseUtil.success(responseBody);
    } catch (e) {
        return ResponseUtil.error(e);
    }
}