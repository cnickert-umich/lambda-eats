import { APIGatewayProxyHandler } from "aws-lambda";
import FoodDao from "../food/FoodDao";
import { FoodDO } from "../food/_types/FoodDO";
import { NewFood } from "../food/_types/NewFood";
import MenuDao from "../menus/MenuDao";
import { NewMenu } from "../menus/_types/NewMenu";
import ShopDao from "../shops/ShopDao";
import { NewShop } from "../shops/_types/NewShop";
import { ShopDO } from "../shops/_types/ShopDO";
import ResponseUtil from "../utils/ResponseUtil";
import { FOOD_DATA, MENU_DATA, SHOP_DATA } from "./TestData";

export const populateDatabase: APIGatewayProxyHandler = async (event, context) => {

    try {

        const shopIds = [];
        for (let i = 0; i < 5; i++) {
            const shopId: string = await generateShopData();
            shopIds.push(shopId);
        }

        const response = { "shopIds": shopIds };

        return ResponseUtil.success(response);
    } catch (e) {
        return ResponseUtil.error(e);
    }

}


async function generateShopData(): Promise<string> {
    const newShop: NewShop = { ...SHOP_DATA };
    newShop.name = `${["Bangkok", "Pak Chong", "Mae Sot", "Betong"][Math.floor(Math.random() * 4)]} ${Math.floor(Math.random() * 100)} ${["Restaurant", "Eatery", "Thai Shop", "Sitdown"][Math.floor(Math.random() * 4)]}`;
    newShop.waitTime = 1350000 + Math.floor((Math.random()*1359999))
    newShop.address = `${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)} ${["Ford Rd", "Telegraph Rd", "8 Mile", "Michigan Ave"][Math.floor(Math.random() * 4)]}, ${["Detroit", "Dearborn", "Allen Park", "Southfield"][Math.floor(Math.random() * 4)]} MI, ${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;

    const savedShop: ShopDO = await ShopDao.create(newShop);
    const shopId = savedShop.id;

    const savedFoodList: FoodDO[] = await createFoodList(shopId);

    await createMenusWithFoodItems(shopId, savedFoodList);

    return shopId;
}


async function createFoodList(shopId: string): Promise<FoodDO[]> {
    const newFoodList: NewFood[] = [...FOOD_DATA];

    const savedFoodList: FoodDO[] = [];
    for (let i = 0; i < newFoodList.length; i++) {
        const newFood = { ...newFoodList[i] };
        newFood.shopId = shopId;
        newFood.title = `${["", "Mild ", "Hot ", "Thai Hot "][Math.floor(Math.random() * 4)]}${newFood.title}${["", "", " with noodles", " with rice"][Math.floor(Math.random() * 4)]}`;
        newFood.cost = parseInt((Math.random() * 1000).toFixed(0)) + 249
        const savedFood = await FoodDao.create(newFood);
        savedFoodList.push(savedFood);
    }

    return savedFoodList;
}

async function createMenusWithFoodItems(shopId: string, savedFoodList: FoodDO[]) {
    const newMenus: NewMenu[] = [...MENU_DATA];

    newMenus[0].foodIds = [savedFoodList[0].id, savedFoodList[1].id];
    newMenus[1].foodIds = [savedFoodList[2].id, savedFoodList[3].id];
    newMenus[2].foodIds = [savedFoodList[4].id, savedFoodList[5].id, savedFoodList[6].id, savedFoodList[7].id, savedFoodList[8].id];

    for (let i = 0; i < newMenus.length; i++) {
        const newMenu = { ...newMenus[i] };
        newMenu.shopId = shopId;
        await MenuDao.create(newMenu);
    }
}

