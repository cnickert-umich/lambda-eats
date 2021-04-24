'use strict';

import AuthorizationChecker from '../../authorization/AuthorizationChecker';
import { OrderDO } from '../_types/OrderDO';
import ActiveOrderDao from './ActiveOrderDao';

export default class ActiveOrderService {
    static async getAllActiveOrders(shopId: string, username: string): Promise<OrderDO[]> {
        try {
            const isAdmin = AuthorizationChecker.isAdmin(shopId, username);
            if (!isAdmin) {
                throw `Username ${username} is unauthorized to view orders for shop.`;
            }
            
            return await ActiveOrderDao.findAllByShopId(shopId);
        } catch (e) {
            console.log(e);
            throw "Could not retreive shop order list.";
        }
    }

}
