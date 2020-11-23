import config from 'config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    create,
    getAll
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.apiUrl}/Users/Login`, requestOptions)
        .then(handleResponse)
        .then(response => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes

            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('userToken', response.token);

            return response.user;
        }).catch(function(e) {
            logout();
            location.reload();
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
}

function create(name, cpf, birthDate, email, password, userType = 0) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({name, cpf, birthDate, email, password, userType })
    };
    return fetch(`${config.apiUrl}/Users`, requestOptions)
    .then(handleResponse)
    .then(response => {
        return response.user;
    });
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
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