
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

export type OrderDO = {
    id: string,
    shopId: string,
    stripeSessionId: string,
    shopSnapshot: ShopDO,
    customer: CustomerInfo,
    selectedFood: FoodDO[],
    totalAmount: number,
    tipAmount: number,
    lineItems: LineItem[]
    createdAt: number,
    isNew?: boolean
}

export type CustomerInfo = {
    customerName: string,
    customerPhone: string,
    customerEmail: string
}


export type LineItem = {
    name: string,
    amount: number,
    quantity: number
}
