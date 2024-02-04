class ApiError extends Error {

    statusCode: number;
    message: string;
    stack?: string;
    success: boolean;
    errors: any[];
    data: any;

    constructor(
        statusCode: number,
        message: string = "Something went wrong",
        errors: any[] = [],
        data: any = null,
        stack: string = "",
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export { ApiError };