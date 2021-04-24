
export const SHOP_TABLE_NAME: string = process.env.DYNAMODB_SHOP_TABLE;
export const MENU_TABLE_NAME: string = process.env.DYNAMODB_MENU_TABLE;
export const FOOD_TABLE_NAME: string = process.env.DYNAMODB_FOOD_TABLE;

export const PENDING_ORDER_TABLE_NAME: string = process.env.DYNAMODB_PENDING_ORDER_TABLE;
export const ACTIVE_ORDER_TABLE_NAME: string = process.env.DYNAMODB_ACTIVE_ORDER_TABLE;

export const WEB_SOCKET_CONNECTION_TABLE: string = process.env.DYNAMODB_WEB_SOCKET_CONNECTION_TABLE;
export const API_GATEWAY_ENDPOINT: string = `https://${process.env.API_GATEWAY_ENDPOINT}`;//process.env.API_GATEWAY_ENDPOINT;

export const SUPER_ADMIN_LIST: string[] = [];

export const STRIPE_SECRET = "sk_test_51IW9knGviEUd3LJfeAj7iqQk9aux9mxkxRv8LeoGhe9e9F5QMDvzuaymBiaiwNMYC377ILdaSoXKnUfg5x4MAXXd00FdGqBzLt";
export const STRIPE_WEBHOOK_SIGNING_SECRET = "whsec_RVD9TfFN7jRzNLyZapT32DtezNaGC2CX";
export const STRIPE_WEBHOOK_SIGNATURE_HEADER_NAME = "Stripe-Signature";
export const STRIPE_WEBHOOK_EVENT_PAYMENT_INTENT_SUCCEEDED = "payment_intent.succeeded";
export const STRIPE_CURRENCY = "USD";
export const STRIPE_TIP_AMOUNT_NAME = "Tip";
