import ExtendableError from 'es6-error';

export default class AdynataError extends ExtendableError {
    constructor(errorMessage, errorType){
        if (errorMessage){
            super(`${errorType || 'Error'}: "${errorMessage}"`)
        }
    }
}
