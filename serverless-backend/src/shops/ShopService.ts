'use strict';

import AuthorizationChecker from '../authorization/AuthorizationChecker';
import { ShopDO } from './_types/ShopDO';
import ShopDao from './ShopDao';
import { NewShop } from './_types/NewShop';
import { UpdateShop } from './_types/UpdateShop';

export default class ShopService {

    static async getShop(shopId: string): Promise<ShopDO> {
        try {
            return ShopDao.findById(shopId);
        } catch (e) {
            console.log(e);
            throw "Could not retreive shop.";
        }
    }

    static async create(newShop: NewShop): Promise<ShopDO> {
        try {
            return ShopDao.create(newShop);
        } catch (e) {
            console.log(e);
            throw "Could not create shop.";
        }
    }

    static async update(updateShop: UpdateShop, username: string): Promise<ShopDO> {
        try {
            const isAdmin = AuthorizationChecker.isAdmin(username, updateShop.id);
            if(!isAdmin) {
                throw `Username ${username} is unauthorized to update shop.`;
            }
            return ShopDao.update(updateShop);
        } catch (e) {
            console.log(e);
            throw "Could not update shop.";
        }
    }

}
