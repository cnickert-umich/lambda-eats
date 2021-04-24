import React, { useEffect, useState } from "react";

import { FoodDO, MenuDO } from "../../CustomTypes";
import FoodCard from "../food/FoodCard";
import Loading from "../loading/Loading";

export default function MenuDisplay({ menu }: { menu: MenuDO }) {

    const [loading, setLoading] = useState<boolean>(false);

    const [foodList, setFoodList] = useState<FoodDO[]>();

    const fetchMenuFoodList = async (menuId: string) => {
        setLoading(true);

        const response: FoodDO[] = await (
            await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/shops/${menu.shopId}/menus/${menu.id}/food`
            )
        ).json();

        setFoodList(response);

        setLoading(false);
    }

    useEffect(() => {
        fetchMenuFoodList(menu.id);
    }, [menu]);

    return (
        <>
            <h2 className="text-primary">{menu.title}</h2>
            <h3 className="text-muted">{menu.description}</h3>
            <ul className="list-group">
                {foodList && !loading ?
                    foodList.map((food) => {
                        return <li className="list-group-item" key={`menus-${menu.id}-food-${food.id}`}>
                            <FoodCard food={food} menuId={menu.id} />
                        </li>;
                    })
                    : <Loading />
                }
            </ul>
        </>
    );
}
