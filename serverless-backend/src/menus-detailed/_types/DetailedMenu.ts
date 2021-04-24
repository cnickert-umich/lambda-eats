import { FoodDO } from "../../food/_types/FoodDO";
import { MenuDO } from "../../menus/_types/MenuDO";

export type DetailedMenu = MenuDO & {
    foodList?: FoodDO[]
};