import { OrderDO } from "../../orders/_types/OrderDO";

export type CreateSessionParams = {
    redirectUrl: string,
    pendingOrder: OrderDO
}