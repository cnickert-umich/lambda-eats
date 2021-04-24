import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBBtn, MDBModalBody, MDBModalFooter, MDBInput } from "mdb-react-ui-kit";
import React, { useState } from "react";
import { useCartContext } from "../../contexts/useCartContext";
import {  ShopDO } from "../../CustomTypes";
import CartItems from "./CartItems";
import CheckoutButton from "./CheckoutButton";
import useTip from "./useTip";


export default function CartModal({ shop, show, closeModal }: { shop: ShopDO, show: boolean, closeModal: Function }) {

    const { cart, subTotal, addToCart, removeFromCart, setCart } = useCartContext();

    const { tip, tipInput } = useTip();
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const total = subTotal + tip;

    return (
        <MDBModal show={show} tabIndex='-1'>
            <MDBModalDialog size="fullscreen">
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle><i className="fas fa-shopping-cart me-2"></i>{shop.name}</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={closeModal}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody className="col-12 col-md-10 col-lg-7 mx-auto">
                        <CartItems />
                    </MDBModalBody>

                    <MDBModalFooter >
                        <div className="col-12 col-md-9 col-lg-6 mx-auto">
                            <MDBInput label='Name' id='name' type='text' onChange={(e: any) => { setName(e.target.value) }} value={name} className="mb-2" />
                            <MDBInput label='Phone' id='phone' type='text' onChange={(e: any) => { setPhone(e.target.value) }} value={phone} className="mb-2" />
                            <MDBInput label='Email' id='email' type='text' onChange={(e: any) => { setEmail(e.target.value) }} value={email} className="mb-2" />
                            {tipInput}
                            <CheckoutButton shop={shop} name={name} phone={phone} email={email} tip={tip} className="w-100"/>
                        </div>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}
