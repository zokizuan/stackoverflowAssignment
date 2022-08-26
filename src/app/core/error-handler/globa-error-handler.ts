import { ErrorHandler, Injectable } from '@angular/core';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    handleError(error: Error) {
        const err = {
            message: error.message ? error.message : error.toString(),
            stack: error.stack ? error.stack : ''
        };
        // Log the error to browser console
        console.warn(err);
        console.log(error);
    }
}