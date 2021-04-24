import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { WEB_SOCKET_CONNECTION_TABLE } from '../Constants';
import { ConnectionDO } from './_types/ConnectionDO';

const dynamoDb = new DocumentClient();

export default class WebSocketConnectionDao {
    static async save(connectionId: string, shopId: string) {
        const toSave: ConnectionDO = {
            id: connectionId,
            shopId: shopId
        }

        await dynamoDb.put({
            TableName: WEB_SOCKET_CONNECTION_TABLE,
            Item: toSave,
        })
            .promise();
    };

    static async removeAllForShop(shopId: string) {
        const connections: ConnectionDO[] = await this.findAll(shopId);
        const removeRequests = [];
        for(const connection of connections) {
            removeRequests.push(this.remove(connection.id));
        }
        await Promise.all(removeRequests);
    };

    static async remove(connectionId: string) {
        await dynamoDb
            .delete({
                TableName: WEB_SOCKET_CONNECTION_TABLE,
                Key: {
                    id: connectionId
                },
            })
            .promise();
    };

    static async findAll(shopId: string): Promise<ConnectionDO[]> {
        const params: DocumentClient.QueryInput = {
            TableName: WEB_SOCKET_CONNECTION_TABLE,
            IndexName: "ShopIdIndex",
            KeyConditionExpression: "shopId = :shopId",
            ExpressionAttributeValues: {
                ":shopId": shopId
            }
        };

        // fetch all connections for the shops
        const result = await dynamoDb.query(params).promise();

        console.log("Success.");

        return result.Items as ConnectionDO[];
    };
}