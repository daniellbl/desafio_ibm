import config from 'config';
import { authHeader } from '../_helpers';

export const transactionService = {
    create,
    getByAccount,
    getAll
};

function create(accountId, bankNumber, branchNumber, accountNumber, value, description) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({accountId, bankNumber, branchNumber, accountNumber, value, description})
    };
    return fetch(`${config.apiUrl}/Transactions`, requestOptions)
    .then(handleResponse)
    .then(response => {
        return response;
    });
}

function getByAccount(accountId){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`${config.apiUrl}/Transactions/ByAccount/${accountId}`, requestOptions)
    .then(handleResponse)
    .then(response => {
        return response;
    });
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/Transactions`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}