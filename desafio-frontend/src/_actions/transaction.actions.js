import { transactionConstants } from '../_constants';
import { transactionService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const transactionActions = {
    create,
    getByAccount,
    getAll
};

function getByAccount(AccountId) {


    return dispatch => {
        dispatch(request({ AccountId }));
        transactionService.getByAccount(AccountId)
            .then(
                transac => {
                    dispatch(success(transac));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(AccountId) { return { type: transactionConstants.GET_BY_ACCOUNT_REQUEST, AccountId } }
    function success(transac) { return { type: transactionConstants.GET_BY_ACCOUNT_SUCCESS, transac } }
    function failure(error) { return { type: transactionConstants.GET_BY_ACCOUNT_FAILURE, error } }
}

function create(accountId, bankNumber, branchNumber, accountNumber, value, description) {
    return dispatch => {
        dispatch(request({ accountId }));

        transactionService.create(accountId, bankNumber, branchNumber, accountNumber, value, description)
            .then(
                transac => {
                    dispatch(success(transac));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(transac) { return { type: transactionConstants.CREATE_REQUEST, transac } }
    function success(transac) { return { type: transactionConstants.CREATE_SUCCESS, transac } }
    function failure(error) { return { type: transactionConstants.CREATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        transactionService.getAll()
            .then(
                accounts => dispatch(success(accounts)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: transactionConstants.GETALL_REQUEST } }
    function success(accounts) { return { type: transactionConstants.GETALL_SUCCESS, accounts } }
    function failure(error) { return { type: transactionConstants.GETALL_FAILURE, error } }
}