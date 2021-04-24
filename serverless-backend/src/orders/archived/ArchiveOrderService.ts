'use strict';

import AuthorizationChecker from '../../authorization/AuthorizationChecker';
import ActiveOrderDao from '../active/ActiveOrderDao';

export default class ArchiveOrderService {
    static async archiveOrder(shopId: string, orderId: string, username: string): Promise<void> {
        try {
            const isAdmin = AuthorizationChecker.isAdmin(shopId, username);
            if (!isAdmin) {
                throw `Username ${username} is unauthorized to archive orders for shop.`;
            }

            await ActiveOrderDao.delete(shopId, orderId);

            return;
        } catch (e) {
            console.log(e);
            throw "Could not archive shop order.";
        }
    }

}
