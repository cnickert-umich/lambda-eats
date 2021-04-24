'use strict';

import { DynamoDB } from 'aws-sdk'
import * as uuid from 'uuid'
import { MENU_TABLE_NAME } from '../Constants';
import { MenuDO } from './_types/MenuDO';
import { NewMenu } from './_types/NewMenu';
import { UpdateMenu } from './_types/UpdateMenu';

const dynamoDb = new DynamoDB.DocumentClient()

export default class MenuDao {

    static async findAllByShopId(shopId: string): Promise<MenuDO[]> {

        const params: DynamoDB.DocumentClient.QueryInput = {
            TableName: MENU_TABLE_NAME,
            IndexName: "ShopIdIndex",
            KeyConditionExpression: "shopId = :shopId",
            ExpressionAttributeValues: {
                ":shopId": shopId
            }
        };

        // fetch shop from the database
        const result = await dynamoDb.query(params).promise();

        console.log("Success.");

        return result.Items as MenuDO[];
    }

    static async findByShopIdAndMenuId(shopId: string, menuId: string, ): Promise<MenuDO> {

        const params: DynamoDB.DocumentClient.GetItemInput = {
            TableName: MENU_TABLE_NAME,
            Key: {
                id: menuId,
                shopId: shopId
            }
        };

        // fetch shop from the database
        const result = await dynamoDb.get(params).promise();

        console.log("Success.");

        return result.Item as MenuDO;
    }

    static async create(newMenu: NewMenu): Promise<MenuDO> {
        const timestamp = new Date().getTime();

        const toSave: MenuDO = {
            id: uuid.v1(),
            shopId: newMenu.shopId,
            title: newMenu.title,
            description: newMenu.description,
            createdAt: timestamp,
            updatedAt: timestamp,
            foodIds: newMenu.foodIds ? newMenu.foodIds : []
        }

        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: MENU_TABLE_NAME,
            Item: toSave
        }

        const result = await dynamoDb.put(params).promise();

        console.log("Success.");

        return toSave;
    }

    
    static async update(updateMenu: UpdateMenu): Promise<MenuDO> {
        const timestamp = new Date().getTime();

        const params : DynamoDB.DocumentClient.UpdateItemInput = {
            TableName: MENU_TABLE_NAME,
            Key: {
                id: updateMenu.id,
                shopId: updateMenu.shopId
            },
            ExpressionAttributeValues: {
                ':title': updateMenu.title,
                ':description': updateMenu.description,
                ':foodIds': updateMenu.foodIds,
                ':updatedAt': timestamp
            },

            UpdateExpression: 'SET title = :title, description = :description, foodIds = :foodIds, updatedAt = :updatedAt',
            ReturnValues: 'ALL_NEW',
        };

        const result = await dynamoDb.update(params).promise();

        console.log("Success.");

        return await this.findByShopIdAndMenuId(updateMenu.shopId, updateMenu.id);
    }

}
