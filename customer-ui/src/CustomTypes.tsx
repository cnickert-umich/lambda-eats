export type CartFoodItem = FoodDO & {
    menuId: string
}

export type CheckoutData = {
    customer: {
        customerName: string,
        customerPhone: string,
        customerEmail: string
    },
    cart: CheckoutItem[],
    redirectUrl: string,
    tipAmount : number
}

export type CheckoutItem = {
    menuId: string,
    foodId: string
}

export type ShopDO = {
    id: string,
    name: string,
    website: string,
    address: string,
    phone: string,
    email: string,
    waitTime: number,
    accountId: string,
    createdAt: number,
    updatedAt: number
};

export type MenuDO = {
    id: string,
    shopId: string,
    title: string,
    description: string,
    createdAt: number,
    updatedAt: number,
    foodIds: string[]
};

export type FoodDO = {
    id: string,
    shopId: string,
    title: string,
    description: string,
    createdAt: number,
    updatedAt: number,
    cost: number
};
