import config from 'config';
import { authHeader } from '../_helpers';

export const accountService = {
    create,
    getByUser,
    getAll
};

function create(userId, BranchId, balance) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId, BranchId, balance })
    };
    return fetch(`${config.apiUrl}/Accounts`, requestOptions)
    .then(handleResponse)
    .then(response => {
        return response.account;
    });
}

function getByUser(userId){
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    return fetch(`${config.apiUrl}/Accounts/ByUser/${userId}`, requestOptions)
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

    return fetch(`${config.apiUrl}/Accounts`, requestOptions).then(handleResponse);
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