
export default class ResponseUtil {

    static success(responseBody?: any) {

        const reponse = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: responseBody ? JSON.stringify(responseBody) : ""
        }

        console.log(reponse);

        return reponse;
    }

    static error(error: Error, statusCode = 400) {

        const reponse = {
            statusCode: statusCode,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: {
                "error": 400,
                "message": error.message
            }
        }

        console.log(reponse);

        return reponse;
    }

}
