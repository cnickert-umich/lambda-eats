'use strict';

import { DynamoDB } from 'aws-sdk'
import * as uuid from 'uuid'
import { FOOD_TABLE_NAME } from '../Constants';
import { FoodDO } from './_types/FoodDO';
import { NewFood } from './_types/NewFood';
import { UpdateFood } from './_types/UpdateFood';

const dynamoDb = new DynamoDB.DocumentClient()

export default class FoodDao {

    static async create(newFood: NewFood): Promise<FoodDO> {
        const timestamp = new Date().getTime();

        const toSave: FoodDO = {
            id: uuid.v1(),
            shopId: newFood.shopId,
            title: newFood.title,
            description: newFood.description,
            cost: newFood.cost,
            createdAt: timestamp,
            updatedAt: timestamp
        }

        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: FOOD_TABLE_NAME,
            Item: toSave
        }

        const result = await dynamoDb.put(params).promise();

        console.log("Success.");

        return toSave;
    }


    static async findAllByShopId(shopId: string): Promise<FoodDO[]> {

        const params: DynamoDB.DocumentClient.QueryInput = {
            TableName: FOOD_TABLE_NAME,
            IndexName: "ShopIdIndex",
            KeyConditionExpression: "shopId = :shopId",
            ExpressionAttributeValues: {
                ":shopId": shopId
            }
        };

        // fetch shop from the database
        const result = await dynamoDb.query(params).promise();

        console.log("Success.");

        return result.Items as FoodDO[];
    }

    static async findByShopIdAndFoodId(shopId: string, foodId: string,): Promise<FoodDO> {

        const params: DynamoDB.DocumentClient.GetItemInput = {
            TableName: FOOD_TABLE_NAME,
            Key: {
                id: foodId,
                shopId: shopId
            }
        };

        // fetch shop from the database
        const result = await dynamoDb.get(params).promise();

        console.log("Success.");

        return result.Item as FoodDO;
    }

    static async findAllByShopIdAndFoodIds(shopId: string, foodIds: string[],): Promise<FoodDO[]> {

        if (foodIds.length == 0) {
            return [];
        }

        const params = {
            RequestItems: {}
        };

        params.RequestItems[FOOD_TABLE_NAME] = {
            Keys: []
        };

        foodIds.forEach((foodId) => {
            params.RequestItems[FOOD_TABLE_NAME].Keys.push({
                id: foodId,
                shopId: shopId
            });
        });

        console.log(`Batch gets request: ${JSON.stringify(params)}`);

        // fetch shop from the database
        const result = await dynamoDb.batchGet(params).promise();

        console.log("Success.");

        return result.Responses[FOOD_TABLE_NAME] as FoodDO[];
    }


    static async update(updateFood: UpdateFood): Promise<FoodDO> {
        const timestamp = new Date().getTime();

        const params: DynamoDB.DocumentClient.UpdateItemInput = {
            TableName: FOOD_TABLE_NAME,
            Key: {
                id: updateFood.id,
                shopId: updateFood.shopId
            },
            ExpressionAttributeValues: {
                ':title': updateFood.title,
                ':description': updateFood.description,
                ':cost': updateFood.cost,
                ':updatedAt': timestamp
            },

            UpdateExpression: 'SET title = :title, description = :description, cost = :cost, updatedAt = :updatedAt',
            ReturnValues: 'ALL_NEW',
        };

        const result = await dynamoDb.update(params).promise();

        console.log("Success.");

        return await this.findByShopIdAndFoodId(updateFood.shopId, updateFood.id);
    }

}
