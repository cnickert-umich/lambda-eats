'use strict';

import { DynamoDB } from 'aws-sdk'
import ResponseUtil from '../utils/ResponseUtil';

const dynamoDb = new DynamoDB.DocumentClient()
const params = {
  TableName: process.env.DYNAMODB_SHOP_TABLE,
  ExpressionAttributeNames: {
    "#id": "id",
    "#name": "name"
  },
  ProjectionExpression: "#id, #name"
};

module.exports.list = async (event, context) => {
  // fetch all shops from the database
  // For production workloads you should design your tables and indexes so that your applications can use Query instead of Scan.
  try {
    const result = await dynamoDb.scan(params).promise();

    // create a response
    return ResponseUtil.success(result.Items);
  } catch (error) {
    console.log(error);
    return ResponseUtil.error(error);
  }

};
