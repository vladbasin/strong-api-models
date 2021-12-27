import { CommonErrorCodes } from './CommonErrorCodes';
import { InnerErrorType } from './types';

export class CodedError extends Error {
    /**
     * Creates new CodedError
     * @param code - code corresponding to this error (good for API response for further parsing by clients)
     * @param message
     * @param errors - inner errors to capture
     * @param stack
     * @param details - any additional details
     */
    constructor(
        public code: string,
        public message: string,
        public errors: InnerErrorType[] = [],
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
     * @param errors - inner errors to capture
     * @param details - any aditional details
     * @returns CodedError
     */
    static from(
        error: Error,
        code: string = CommonErrorCodes.unknown,
        errors: InnerErrorType[] = [],
        details: Record<string, unknown> = {}
    ): CodedError {
        if (error instanceof CodedError) {
            return error;
        }

        const { message, stack } = error;

        return new CodedError(code, message, errors, stack, details);
    }
}
