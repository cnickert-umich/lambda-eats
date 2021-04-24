import { DynamoDB } from "aws-sdk";
import { PENDING_ORDER_TABLE_NAME } from "../../Constants";
import { OrderDO } from "../_types/OrderDO";

const dynamoDb = new DynamoDB.DocumentClient()

export default class PendingOrderDao {

    static async findByShopIdAndOrderId(shopId: string, orderId: string, ): Promise<OrderDO> {
        const params: DynamoDB.DocumentClient.GetItemInput = {
            TableName: PENDING_ORDER_TABLE_NAME,
            Key: {
                id: orderId,
                shopId: shopId
            }
        };

        // fetch order from the database
        const result = await dynamoDb.get(params).promise();

        console.log("Success.");

        return result.Item as OrderDO;
    }

    static async save(pendingOrder: OrderDO): Promise<OrderDO> {
        if(!pendingOrder.id) {
            throw 'PendingOrder requires an id';
        }

        if(!pendingOrder.createdAt) {
            throw 'PendingOrder requires a createdAt timestamp';
        }

        if(!pendingOrder.stripeSessionId) {
            throw 'PendingOrder requires a stripe session id';
        }

        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: PENDING_ORDER_TABLE_NAME,
            Item: pendingOrder
        }

        const result = await dynamoDb.put(params).promise();

        console.log("Success.");

        return pendingOrder;
    }

    static async delete(shopId: string, orderId: string, ): Promise<void> {
        const params: DynamoDB.DocumentClient.DeleteItemInput = {
            TableName: PENDING_ORDER_TABLE_NAME,
            Key: {
                id: orderId,
                shopId: shopId
            }
        };

        // fetch order from the database
        const result = await dynamoDb.delete(params).promise();

        console.log("Success.");

        return;
    }
}