# Strong API models

Common models for Strong API framework

## Installation

### npm

`npm install @vladbasin/strong-api-models`

### yarn

`yarn add @vladbasin/strong-api-models`

## Usage

### CodedError
Create `CodedError` to match errors with particular strings for reason parsing by consumers (e.g., InvalidInput, NotAuthorized, ValidationFailed, etc.)

```typescript
import { CodedError } from '@vladbasin/strong-api-constants';

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
    )

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
    ): CodedError
}
```

### CommonErrorCodes

```typescript
export enum CommonErrorCodes {
    unknown = 'Unknown',
    unauthorized = 'Unauthorized',
    notFound = 'NotFound',
    validationFailed = 'ValidationFailed',
}
```

### Get HTTP status code for error code

```typescript
// get HTTP status code
codedErrorToHttpStatusMap.getHttpCode('InvalidParameter'); //returns 400

// add custom error codes
codedErrorToHttpStatusMap.extend({ 'MyNewErrorCode': 502 });
codedErrorToHttpStatusMap.getHttpCode('MyNewErrorCode'); //returns 502
```
