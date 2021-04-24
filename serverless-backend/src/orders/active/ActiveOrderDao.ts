import { DynamoDB } from "aws-sdk";
import { ACTIVE_ORDER_TABLE_NAME } from "../../Constants";
import { OrderDO } from "../_types/OrderDO";

const dynamoDb = new DynamoDB.DocumentClient()

export default class ActiveOrderDao {

    static async findByShopIdAndOrderId(shopId: string, orderId: string,): Promise<OrderDO> {
        const params: DynamoDB.DocumentClient.GetItemInput = {
            TableName: ACTIVE_ORDER_TABLE_NAME,
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

    static async findAllByShopId(shopId: string): Promise<OrderDO[]> {

        const params: DynamoDB.DocumentClient.QueryInput = {
            TableName: ACTIVE_ORDER_TABLE_NAME,
            IndexName: "ShopIdIndex",
            KeyConditionExpression: "shopId = :shopId",
            ExpressionAttributeValues: {
                ":shopId": shopId
            }
        };

        // fetch shop from the database
        const result = await dynamoDb.query(params).promise();

        console.log("Success.");

        return result.Items as OrderDO[];
    }

    static async save(activeOrder: OrderDO): Promise<OrderDO> {

        if (!activeOrder.id) {
            throw 'ActiveOrder requires an id';
        }

        if (!activeOrder.stripeSessionId) {
            throw 'ActiveOrder requires a stripe session id';
        }

        activeOrder.createdAt = new Date().getTime();

        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: ACTIVE_ORDER_TABLE_NAME,
            Item: activeOrder
        }

        const result = await dynamoDb.put(params).promise();

        console.log("Success.");

        return activeOrder;
    }

    static async delete(shopId: string, orderId: string,): Promise<void> {
        const params: DynamoDB.DocumentClient.DeleteItemInput = {
            TableName: ACTIVE_ORDER_TABLE_NAME,
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