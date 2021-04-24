'use strict';

import FoodDao from '../food/FoodDao';
import MenuService from '../menus/MenuService';
import { MenuDO } from '../menus/_types/MenuDO';

import { DetailedMenu } from './_types/DetailedMenu';

export default class DetailedMenuService {
    static async getShopMenusWithDetails(shopId: string): Promise<DetailedMenu[]> {
        try {

            const shallowMenus: MenuDO[] = await MenuService.getShopMenus(shopId);

            const detailedMenus: DetailedMenu[] = [];
            for (const shallowMenu of shallowMenus) {
                const detailedMenu: DetailedMenu = shallowMenu;
                detailedMenu.foodList = await FoodDao.findAllByShopIdAndFoodIds(shopId, shallowMenu.foodIds);
                detailedMenus.push(detailedMenu);
            };

            return detailedMenus;

        } catch (e) {
            console.log(e);
            throw "Could not retreive shop menu list.";
        }
    }


}
