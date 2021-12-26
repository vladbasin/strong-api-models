import { CommonErrorCodes } from './CommonErrorCodes';

export class CodedError extends Error {
    /**
     * Creates new CodedError
     * @param code - code corresponding to this error (good for API response for further parsing by clients)
     * @param message
     * @param stack
     * @param details - any additional details
     */
    constructor(
        public code: string,
        public message: string,
        public stack = '',
        public details: Record<string, unknown> = {}
    ) {
        super(message);

        this.code = code;
        this.stack = stack;
        this.details = details;
    }

    /**
     * Creates CodedError based on another error
     * @param error - error occured
     * @param code - code corresponding to this error (good for API response for further parsing by clients)
     * @param details - any aditional details
     * @returns CodedError
     */
    static from(
        error: Error,
        code: string = CommonErrorCodes.unknown,
        details: Record<string, unknown> = {}
    ): CodedError {
        if (error instanceof CodedError) {
            return error;
        }

        const { message, stack } = error;

        return new CodedError(code, message, stack, details);
    }
}
