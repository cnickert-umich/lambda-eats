'use strict';

import FoodService from '../../food/FoodService';
import MenuAvailibilityChecker from '../../menus/MenuAvailibilityChecker';
import MenuService from '../../menus/MenuService';
import { MenuDO } from '../../menus/_types/MenuDO';

import * as uuid from 'uuid'

import ShopService from "../../shops/ShopService";
import { ShopDO } from "../../shops/_types/ShopDO";
import { CheckoutItem, CheckoutRequest } from '../../checkout/_types/CheckoutRequest';
import { OrderDO } from '../_types/OrderDO';
import StripeLineItemBuilder from '../../stripe/StripeLineItemBuilder';
import { FoodDO } from '../../food/_types/FoodDO';

export default class PendingOrderBuilder {

    static async buildFromCheckoutRequest(checkoutRequest: CheckoutRequest): Promise<OrderDO> {
        try {

            const shopSnapshot: ShopDO = await ShopService.getShop(checkoutRequest.shopId);
            const selectedFood: FoodDO[] = await getDetailsForCart(checkoutRequest);
            const lineItems = StripeLineItemBuilder.buildLineItems(selectedFood);

            const pendingOrder: OrderDO = {
                id: uuid.v1(),
                shopId: shopSnapshot.id,
                shopSnapshot: shopSnapshot,
                customer: checkoutRequest.customer,
                selectedFood: selectedFood,
                createdAt: new Date().getTime(),
                tipAmount: checkoutRequest.tipAmount,
                lineItems: lineItems
            }

            return pendingOrder;
        } catch (e) {
            console.log(e);
            throw "Could not convert checkout request into pending order.";
        }
    }

}

async function getDetailsForCart(checkoutRequest: CheckoutRequest): Promise<FoodDO[]> {

    const detailedFoodList: FoodDO[] = [];

    for (const cartItem of checkoutRequest.cart) {
        const detailedFood: FoodDO = await getDetailsForCartItem(checkoutRequest.shopId, cartItem);
        detailedFoodList.push(detailedFood);
    }

    return detailedFoodList;
}

async function getDetailsForCartItem(shopId: string, cartItem: CheckoutItem): Promise<FoodDO> {

    await assertSelectionIsAvailible(shopId, cartItem);

    const detailedFood: FoodDO = await FoodService.getFood(shopId, cartItem.foodId);

    return detailedFood;

}

async function assertSelectionIsAvailible(shopId: string, cartItem: CheckoutItem): Promise<void> {
    const menu: MenuDO = await MenuService.getMenu(shopId, cartItem.menuId);
    if (!menu.foodIds.includes(cartItem.foodId)) {
        console.log(`Cart Item type ${typeof cartItem}...`);
        console.log(`Cart item non-strifified ${cartItem}...`);
        console.log(`Strigified cart item ${JSON.stringify(cartItem)}...`);
        console.log(`Menu ${cartItem.menuId} only allows ${menu.foodIds}`);
        throw `Menu ${cartItem.menuId} does not contain food ${cartItem.foodId}`;
    }
}
