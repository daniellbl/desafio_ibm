import { transactionConstants } from '../_constants';

export function transac(state = {}, action) {
    switch (action.type) {
        case transactionConstants.GET_BY_ACCOUNT_REQUEST:
            return {
                loading: true
            };
        case transactionConstants.GET_BY_ACCOUNT_SUCCESS:
            return {
                items: action.transac
            };
        case transactionConstants.GET_BY_ACCOUNT_FAILURE:
            return {
                error: action.error
            };
        case transactionConstants.CREATE_REQUEST:
            return {
                loading: true
            };
        case transactionConstants.CREATE_SUCCESS:
            return {
                items: action.transac
            };
        case transactionConstants.CREATE_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}