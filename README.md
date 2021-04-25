# lambda-eats
This project is a SaaS online ordering system. It scales by taking advantage of [AWS Lambda](https://aws.amazon.com/lambda/). The system allows independent shops to sell food through a dedicated React webpage.

The project mainly consists of the TypeScript language throughout the whole stack.

The project consists of three main folders:
- Serverless Backend
- Customer Facing Shop Site
- Order Fulfillment Portal

## Serverless Backend
The backend code consits of many AWS Lambda functions. These functions are invoked by AWS events. All of the AWS events are fired from AWS API Gateway.

The majority of events firing from API gateway follow the REST protocol. A few events follow WebSocket protocol. Regardless, AWS calls the Lambda function accordingly.

The backend is deployed to AWS via [Serverless](https://serverless.com/). The [serverless.yml](https://github.com/cnickert-umich/lambda-eats/blob/53eb9df39b3ff543fd39dd382abc77d66aa6ed79/serverless-backend/serverless.yml) file is what informs Serverless the resources it must create in AWS.

## Customer Facing Shop Site
The customer facing shop site consists of a React application. It knows which shop information to bring up through the `shop_id` included in the path of the URL.

The site allows customers to place orders at a shop.

For the purposes of this project, it is just ran locally using `npm start`. Howevever, it could be build using `npm build` and deployed to an an [AWS S3 Bucket](https://aws.amazon.com/s3/).

The `REACT_APP_API_BASE_URL` field in the [/customer-ui/.env](https://github.com/cnickert-umich/lambda-eats/blob/master/customer-ui/.env) file must be modified with the correct URL to work properly.

## Order Fulfillment Portal
The order fulfillment portal consists of a React application. It knows which shop information to bring up through the `shop_id` included in the path of the URL. It currently does not have any authentication surronding it.

The portal fetches shop order information. It also receives order notifications through a WebSocket.

For the purposes of this project, it is just ran locally using `npm start`. Howevever, it could be build using `npm build` and deployed to an an [AWS S3 Bucket](https://aws.amazon.com/s3/).

The `REACT_APP_API_BASE_URL` and `REACT_APP_WS_BASE_URL` fields in the [/order-fulfillment-ui/.env](https://github.com/cnickert-umich/lambda-eats/blob/master/order-fulfillment-ui/.env) file must be modified with the correct URLs to work properly.

