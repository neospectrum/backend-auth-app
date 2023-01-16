export class ApiError extends Error {
    status: number;
    errors: any;

    constructor(status: number, message: string, errors: Array<any> = []) {
        super(message);
        this.errors = errors;
        this.status = status;
    }

    static badRequest(message: string, errors: Array<any> = []) {
        return new ApiError(400, message, errors);
    }
    static unauthorized(errors: Array<any> = []) {
        return new ApiError(401, 'User authorized');
    }
    static forbidden(message: string, errors: Array<any> = []) {
        return new ApiError(403, message, errors);
    }
    static notFound(message: string, errors: Array<any> = []) {
        return new ApiError(404, message, errors);
    }
    static notAcceptable(message: string, errors: Array<any> = []) {
        return new ApiError(406, message, errors);
    }
    static conflict(message: string, errors: Array<any> = []) {
        return new ApiError(409, message, errors);
    }
}
