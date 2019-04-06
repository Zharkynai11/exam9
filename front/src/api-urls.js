import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api/v1';
const PRODUCTS_URL = '/product/';
const SHOWS_URL = '/shows/';
const LOGIN_URL = '/login/';
const REGISTER_URL = '/register/';
const REGISTER_ACTIVATE_URL = '/register/activate/';
const USERS_URL = '/users/';
const TOKEN_LOGIN_URL = '/token-login/';

const instance = axios.create({
    baseURL: BASE_URL
});

export {PRODUCTS_URL, SHOWS_URL, BASE_URL, LOGIN_URL,
    REGISTER_URL, REGISTER_ACTIVATE_URL, USERS_URL, TOKEN_LOGIN_URL};

export default instance;
