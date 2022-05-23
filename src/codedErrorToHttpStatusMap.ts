import { HttpStatusCodes } from '@vladbasin/strong-api-constants';
import { CommonErrorCodes } from './errors';

class CodedErrorToHttpStatusMap {
    private _map = {
        [CommonErrorCodes.notFound]: HttpStatusCodes.NotFound,
        [CommonErrorCodes.validationFailed]: HttpStatusCodes.BadRequest,
        [CommonErrorCodes.unknown]: HttpStatusCodes.InternalServerError,
        [CommonErrorCodes.unauthorized]: HttpStatusCodes.Unauthorized,
        [CommonErrorCodes.forbidden]: HttpStatusCodes.Forbidden,
    };

    public extend(newItems: Record<string, number>) {
        this._map = { ...this._map, ...newItems };
    }

    public getHttpCode(errorCode: string) {
        return this._map[errorCode] || HttpStatusCodes.InternalServerError;
    }
}

export const codedErrorToHttpStatusMap = new CodedErrorToHttpStatusMap();
