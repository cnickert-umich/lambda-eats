'use strict';

import { DynamoDB } from 'aws-sdk'
import { SUPER_ADMIN_LIST } from '../Constants';

const dynamoDb = new DynamoDB.DocumentClient()

export default class AuthorizationChecker {

  static async isAdmin(userId: string, shopId?: string, ): Promise<boolean> {

    const isSuperAdmin = SUPER_ADMIN_LIST.includes(userId);
    if (isSuperAdmin) {
      return true;
    }

    const isShopManager = true;     //do a check to see if this user has access to modify this shop. for now, everyone has access
    if (isShopManager) {
      return true;
    }

    return false;

  }

}
