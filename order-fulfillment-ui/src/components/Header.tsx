import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand,
} from "mdb-react-ui-kit";
import React from "react";
import { ShopDO } from "../CustomTypes";

function Header(shopInfo: ShopDO) {
    return (
        <header style={{zIndex: 99}}>
            <MDBNavbar expand="lg" light bgColor="white" className="shadow-1-strong">
                <MDBContainer fluid>
                    <h1 className="text-primary h4">{shopInfo.name}</h1>
                    <h2 className="text-muted ms-2 h4">Order Fulfillment Portal</h2>
                </MDBContainer>
            </MDBNavbar>
        </header>
    );
}

export default Header;
