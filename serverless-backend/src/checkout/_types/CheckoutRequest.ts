import { CustomerInfo } from "../../orders/_types/CustomerInfo";

export type CheckoutRequest = {
    shopId?: string,
    customer: CustomerInfo,
    cart: CheckoutItem[],
    tipAmount: number,
    redirectUrl: string
}

export type CheckoutItem = {
    menuId: string,
    foodId: string
};
