import { accountConstants } from '../_constants';
import { accountService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const accountActions = {
    create,
    getByUser,
    getAll
};

function getByUser(UserId) {

    return dispatch => {
  
       
        accountService.getByUser(UserId)
            .then(
                account => { 
                    console.log("Teste",account.balance)
                    dispatch(success(account));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(account) { return { type: accountConstants.GET_BY_USER_REQUEST, account } }
    function success(account) { return { type: accountConstants.GET_BY_USER_SUCCESS, account } }
    function failure(error) { return { type: accountConstants.GET_BY_USER_FAILURE, error } }
}

function create(userId, BranchId, balance) {
    return dispatch => {
        dispatch(request({ userId }));

        accountService.create(userId, BranchId, balance)
            .then(
                account => { 
                    
                    dispatch(success(account));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(account) { return { type: accountConstants.CREATE_REQUEST, account } }
    function success(account) { return { type: accountConstants.CREATE_SUCCESS, account } }
    function failure(error) { return { type: accountConstants.CREATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        accountService.getAll()
            .then(
                accounts => dispatch(success(accounts)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: accountConstants.GETALL_REQUEST } }
    function success(accounts) { return { type: accountConstants.GETALL_SUCCESS, accounts } }
    function failure(error) { return { type: accountConstants.GETALL_FAILURE, error } }
}