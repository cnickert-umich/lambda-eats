'use strict';

import AuthorizationChecker from '../authorization/AuthorizationChecker';
import MenuDao from './MenuDao';
import { MenuDO } from './_types/MenuDO';
import { NewMenu } from './_types/NewMenu';
import { UpdateMenu } from './_types/UpdateMenu';

export default class MenuService {
    static async getShopMenus(shopId: string): Promise<MenuDO[]> {
        try {
            return MenuDao.findAllByShopId(shopId);
        } catch (e) {
            console.log(e);
            throw "Could not retreive shop menu list.";
        }
    }

    static async getMenu(shopId: string, menuId: string): Promise<MenuDO> {
        try {
            return MenuDao.findByShopIdAndMenuId(shopId, menuId);
        } catch (e) {
            console.log(e);
            throw "Could not retreive shop menu.";
        }
    }

    static async menuHasFood(menu: MenuDO, foodId: string): Promise<boolean> {
        try {
            return menu.foodIds.includes(foodId);
        } catch (e) {
            console.log(e);
            throw "Could not check menu for food.";
        }
    }

    static async create(newMenu: NewMenu, username: string): Promise<MenuDO> {
        try {
            const isAdmin = AuthorizationChecker.isAdmin(newMenu.shopId, username);
            if (!isAdmin) {
                throw `Username ${username} is unauthorized to create menu for shop.`;
            }

            return MenuDao.create(newMenu);
        } catch (e) {
            console.log(e);
            throw "Could not create menu for shop.";
        }
    }

    static async update(updateMenu: UpdateMenu, username: string): Promise<MenuDO> {
        try {
            const isAdmin = AuthorizationChecker.isAdmin(updateMenu.shopId, username);
            if (!isAdmin) {
                throw `Username ${username} is unauthorized to update menu for shop.`;
            }

            return MenuDao.update(updateMenu);
        } catch (e) {
            console.log(e);
            throw "Could not update menu for shop.";
        }
    }

}
