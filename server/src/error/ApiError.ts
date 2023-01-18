export class ApiError extends Error {
    status: number;
    errors: any;
    // Creating Error
    constructor(status: number, message: string, errors: Array<any> = []) {
        super(message);
        this.errors = errors;
        this.status = status;
    }
    // Bad Request 400
    static badRequest(message: string, errors: Array<any> = []) {
        return new ApiError(400, message, errors);
    }
    // Unauth error 401
    static unauthorized(errors: Array<any> = []) {
        return new ApiError(401, 'User unauthorized');
    }
    // Forbidden 403
    static forbidden(message: string, errors: Array<any> = []) {
        return new ApiError(403, message, errors);
    }
    // Not Found 404
    static notFound(message: string, errors: Array<any> = []) {
        return new ApiError(404, message, errors);
    }
    // Not Acceptable 406
    static notAcceptable(message: string, errors: Array<any> = []) {
        return new ApiError(406, message, errors);
    }
    // Conflict 409
    static conflict(message: string, errors: Array<any> = []) {
        return new ApiError(409, message, errors);
    }
}
