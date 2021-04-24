import { MDBBtn } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { ShopDO } from "../../CustomTypes";

export default function SuccessPage({ shop }: { shop: ShopDO }) {

    const query = useQuery();

    const [orderId, setOrderId] = useState<string>();

    useEffect(() => {
        if (query) {
            const newOrderId = query.get("orderid");
            if (newOrderId) {
                setOrderId(newOrderId);
            }
        }
    }, [query]);

    return (
        <div className="row mt-5">
            <div className="col-md-9 mx-auto">
                <div className="d-flex justify-content-between">
                    <h2 className="text-success">Success!</h2>
                    <MDBBtn color="info" onClick={() => { window.print() }} size="sm"><span className="small"><i className="fas fa-print me-1"></i>Print</span></MDBBtn>
                </div>
                <h3 className="small">Your order has been created successfully. A receipt will be sent to your email shortly.</h3>
                <hr />
                <div className="pb-5 mb-5">
                    <p>Order Number: <strong>{orderId}</strong></p>
                    <p>Will be ready in ~<strong>{Math.round(shop.waitTime / 60000)} minutes</strong> from time of payment</p>
                </div>
                <div className="text-center">
                    <hr />
                    <p className="small">Please call {shop.name} at <a href={`tel:${shop.phone}`}>{shop.phone}</a> for any changes to your order.</p>
                    <hr />
                    <Link to={`/${shop.id}`}><MDBBtn size="lg">Place Another Order</MDBBtn></Link>
                </div>
            </div>
        </div>
    );
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}