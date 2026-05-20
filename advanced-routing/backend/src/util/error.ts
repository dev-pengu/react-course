class NotFoundError extends Error {
    message: string;
    status: number;

    constructor(message: string) {
        super(message);
        this.message = message;
        this.status = 404;
    }
}

export { NotFoundError };