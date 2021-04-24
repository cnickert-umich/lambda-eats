import React, { useEffect, useState } from "react";

import { MenuDO } from "../../CustomTypes";
import Loading from "../loading/Loading";
import MenuDisplay from "./MenuDisplay";

export default function MenuList({ shopId }: { shopId: string }) {

    const [loading, setLoading] = useState<boolean>(false);

    const [menus, setMenus] = useState<MenuDO[]>();

    const fetchMenus = async (shopId: string) => {
        setLoading(true);

        const response: MenuDO[] = await (
            await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/shops/${shopId}/menus`
            )
        ).json();

        setMenus(response);

        setLoading(false);
    }

    useEffect(() => {
        fetchMenus(shopId);
    }, [shopId]);

    return (
        <div className="row">
            <div className="col-md-9 mx-auto">
                {menus && !loading ?
                    menus.map((menu) => {
                        return <MenuDisplay menu={menu} key={`menus-${menu.id}`} />
                    })
                    : <Loading />
                }
            </div>
        </div>
    );
}
