interface HTTPError{
    message: string;
    status: number;
}

class NotFoundError implements HTTPError {
    message: string;
    status: number;

    constructor(message: string) {
        this.message = message;
        this.status = 404;
    }
}

class NotAuthorizedError implements HTTPError {
    message: string;
    status: number;

    constructor(message: string) {
        this.message = message;
        this.status = 401;
    }
}

class ValidationError implements HTTPError {
    message: string;
    status: number;
    errors: { [key: string]: string };

    constructor(message: string, errors: { [key: string]: string }) {
        this.message = message;
        this.status = 422;
        this.errors = errors;
    }
}

function isHttpError(object: any): object is HTTPError {
    return 'status' in object && 'message' in object;
}

export { type HTTPError, NotFoundError, NotAuthorizedError, ValidationError, isHttpError };