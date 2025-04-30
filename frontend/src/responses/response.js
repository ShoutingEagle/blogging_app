
class ClientResponse {
    constructor(success, data = null, message = "", statusCode = 200) {
        this.success = success;
        this.data = data;
        this.message = message;
        this.statusCode = statusCode;
    }

    static success(data = null, message = "success", statusCode = 200) {
        return new ClientResponse(true, data, message, statusCode);
    }

    static error(message = "Something went wrong", statusCode = 500) {
        return new ClientResponse(false, null, message, statusCode);
    }
}

export default ClientResponse;
