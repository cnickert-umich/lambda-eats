'use strict';

import { DynamoDB } from 'aws-sdk'
import * as uuid from 'uuid'
import { ShopDO } from './_types/ShopDO';
import { NewShop } from './_types/NewShop';
import { UpdateShop } from './_types/UpdateShop';
import { SHOP_TABLE_NAME } from '../Constants';

const dynamoDb = new DynamoDB.DocumentClient()

export default class ShopDao {

    static async findById(id: string): Promise<ShopDO> {

        const params : DynamoDB.DocumentClient.GetItemInput = {
            TableName: SHOP_TABLE_NAME,
            Key: {
                id: id
            }
        };

        // fetch shop from the database
        const result = await dynamoDb.get(params).promise();

        console.log("Success.");

        return result.Item as ShopDO;
    }

    static async create(newShop: NewShop): Promise<ShopDO> {
        const timestamp = new Date().getTime();

        const toSave: ShopDO = {
            id: uuid.v1(),
            name: newShop.name,
            website: newShop.website,
            address: newShop.address,
            phone: newShop.phone,
            email: newShop.email,
            waitTime: newShop.waitTime,
            accountId: newShop.accountId,
            createdAt: timestamp,
            updatedAt: timestamp
        }


        const params : DynamoDB.DocumentClient.PutItemInput = {
            TableName: SHOP_TABLE_NAME,
            Item: toSave
        }

        const result = await dynamoDb.put(params).promise();

        console.log("Success.");

        return toSave;
    }

    static async update(updateShop: UpdateShop): Promise<ShopDO> {
        const timestamp = new Date().getTime();

        const params : DynamoDB.DocumentClient.UpdateItemInput = {
            TableName: SHOP_TABLE_NAME,
            Key: {
                id: updateShop.id,
            },
            ExpressionAttributeNames: {
              '#shop_name': 'name',
            },
            ExpressionAttributeValues: {
                ':name': updateShop.name,
                ':website': updateShop.website,
                ':address': updateShop.address,
                ':phone': updateShop.phone,
                ':email': updateShop.email,
                ':waitTime': updateShop.waitTime,
                ':accountId': updateShop.accountId,
                ':updatedAt': timestamp
            },

            UpdateExpression: 'SET #shop_name = :name, website = :website, address = :address, phone = :phone, email = :email, waitTime = :waitTime, accountId = :accountId, updatedAt = :updatedAt',
            ReturnValues: 'ALL_NEW',
        };

        const result = await dynamoDb.update(params).promise();

        console.log("Success.");

        return await this.findById(updateShop.id);
    }

}
