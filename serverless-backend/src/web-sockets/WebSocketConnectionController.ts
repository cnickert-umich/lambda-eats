import WebSocketConnectionDao from './WebSocketConnectionDao';

export const connect = async event => {
    try {
        const connectionId = event.requestContext.connectionId;
        const shopId = event.queryStringParameters.shopId;

        // //consider uncommenting this if there starts to be an issue with stale connections
        // await WebSocketConnectionDao.removeAllForShop(shopId);

        await WebSocketConnectionDao.save(connectionId, shopId);
        console.log("Everything seems to be fine...");
    } catch (e) {
        console.log("Something went wrong. Could not establish connection");
        throw e;
    }
    return {
        statusCode: 200
    };
};

export const disconnect = async event => {
    const connectionId = event.requestContext.connectionId;
    await WebSocketConnectionDao.remove(connectionId);
    return {
        statusCode: 200
    };
};
