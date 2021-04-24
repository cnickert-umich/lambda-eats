import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch, useParams, useRouteMatch } from "react-router-dom";

import Header from "../header/Header";
import { ShopDO } from "../../CustomTypes";
import Loading from "../loading/Loading";
import MenuList from "../menu/MenuList";
import SuccessPage from "../success/SuccessPage";


export default function ShopFront() {
    const { shopId } = useParams() as { shopId: string };

    let { path, url } = useRouteMatch();

    const [loading, setLoading] = useState<boolean>(false);

    const [shop, setShop] = useState<ShopDO>();

    const fetchShopInfo = async (shopId: string) => {
        setLoading(true);

        const response: ShopDO = await (
            await fetch(
                `${process.env.REACT_APP_API_BASE_URL}/shops/${shopId}`
            )
        ).json();

        setShop(response);

        setLoading(false);
    }

    useEffect(() => {
        fetchShopInfo(shopId);
    }, [shopId]);

    return (
        <>
            {shop && !loading ?
                <>
                    <Header shop={shop} />
                    <div className="container">
                        <Switch>

                            <Route path={`${path}/success`}>
                                <SuccessPage shop={shop} />
                            </Route>

                            <Route exact path={path}>
                                <MenuList shopId={shopId} />
                            </Route>

                            <Route>
                                <Redirect to={`/${shop.id}`} />
                            </Route>

                        </Switch>
                    </div>
                </>
                : <div className="w-100 d-flex mt-5 pt-5">
                    <Loading />
                </div>
            }
        </>
    );
}
