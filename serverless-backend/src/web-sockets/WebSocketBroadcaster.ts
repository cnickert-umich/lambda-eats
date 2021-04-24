import { ApiGatewayManagementApi } from "aws-sdk";
import { API_GATEWAY_ENDPOINT } from "../Constants";
import WebSocketConnectionDao from "./WebSocketConnectionDao";
import { ConnectionDO } from "./_types/ConnectionDO";

type DATA_NAME = "NEW_ORDER" | "";
export default class WebSocketBroadcaster {

  static async send(shopId: string, dataName: DATA_NAME, data: any): Promise<void> {

    console.log("Attempting to notify shop");

    // Retrieve the list of active WebSocket connections that you recorded on connect
    const connections: ConnectionDO[] = await WebSocketConnectionDao.findAll(shopId);

    console.log(`Fetched connections ${JSON.stringify(connections)}`);

    if (connections == null || connections.length == 0) {
      throw `There are no web sockets to push to for shop ${shopId}`;
    }

    const promises = [];
    for (const connection of connections) {
      const messagePromise = sendMessageToClient(connection.id, dataName, data);
      promises.push(messagePromise);
    }

    const results = await Promise.allSettled(promises);

    let numberOfSuccesses = 0;
    for (const result of results) {
      if (result.status == "fulfilled") {
        numberOfSuccesses++;
      }
    }

    if (numberOfSuccesses == 0) {
      throw `Zero successful messages were sent for shop ${shopId}`;
    }

    return;
  }

}

async function sendMessageToClient(connectionId: string, dataName: string, data: JSON): Promise<boolean> {
  console.log(`Attempting to connect to ${API_GATEWAY_ENDPOINT}`);
  // API Gateway WebSocket service
  const apiGateway = new ApiGatewayManagementApi({
    apiVersion: "2018-11-29",
    endpoint: API_GATEWAY_ENDPOINT,
  });

  try {
    // And send them a message!
    console.log(`Attempting to send broadcast to ${connectionId}`);
    await apiGateway
      .postToConnection({
        ConnectionId: connectionId,
        Data: JSON.stringify({
          dataName: dataName,
          data: data,
        }),
      })
      .promise();
    console.log(`Success`);
    return true;
  } catch (error) {

    console.log(`Something wrong with the websocket connection ${connectionId}. Going to kill the connection and remove its reference.`);

    await apiGateway.deleteConnection({
      ConnectionId: connectionId
    }).promise();

    await WebSocketConnectionDao.remove(connectionId);

    if (error.statusCode === 410) {
      console.log(`Connection ${connectionId} was stale.`);
    }

    console.log(`Connection ${connectionId} gave an error ${JSON.stringify(error)}`);
    throw `Connection ${connectionId} gave an error ${JSON.stringify(error)}`;
  }

}

