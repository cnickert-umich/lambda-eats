'use strict';

import AuthorizationChecker from '../authorization/AuthorizationChecker';
import MenuService from '../menus/MenuService';
import { MenuDO } from '../menus/_types/MenuDO';
import FoodDao from './FoodDao';
import { FoodDO } from './_types/FoodDO';
import { NewFood } from './_types/NewFood';
import { UpdateFood } from './_types/UpdateFood';

export default class FoodService {

    static async create(newFood: NewFood, username: string): Promise<FoodDO> {
        try {
            const isAdmin = AuthorizationChecker.isAdmin(newFood.shopId, username);
            if (!isAdmin) {
                throw `Username ${username} is unauthorized to create food for shop.`;
            }

            return FoodDao.create(newFood);
        } catch (e) {
            console.log(e);
            throw "Could not create food for shop.";
        }
    }

    static async getShopFood(shopId: string): Promise<FoodDO[]> {
        try {
            return FoodDao.findAllByShopId(shopId);
        } catch (e) {
            console.log(e);
            throw "Could not retreive shop food list.";
        }
    }

    static async getFood(shopId: string, foodId: string): Promise<FoodDO> {
        try {
            return FoodDao.findByShopIdAndFoodId(shopId, foodId);
        } catch (e) {
            console.log(e);
            throw "Could not retreive shop food.";
        }
    }

    static async listAllFoodForMenu(shopId: string, menuId: string): Promise<FoodDO[]> {
        try {
            const menu: MenuDO = await MenuService.getMenu(shopId, menuId)

            return FoodDao.findAllByShopIdAndFoodIds(shopId, menu.foodIds);
        } catch (e) {
            console.log(e);
            throw "Could not retreive shop food list.";
        }
    }

    static async update(updateFood: UpdateFood, username: string): Promise<FoodDO> {
        try {
            const isAdmin = AuthorizationChecker.isAdmin(updateFood.shopId, username);
            if (!isAdmin) {
                throw `Username ${username} is unauthorized to update food for shop.`;
            }

            return FoodDao.update(updateFood);
        } catch (e) {
            console.log(e);
            throw "Could not update food for shop.";
        }
    }
}
