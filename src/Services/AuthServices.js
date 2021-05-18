import axios from 'axios';
import decode from 'jwt-decode';

export default class AuthServices{
    constructor(){
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    async login(username, password) {
        const datos = {
            username: username,
            password: password
        }
        //console.log(datos)        
        const resp = await axios.post("sesion/login", datos);
        if (resp.data.isAuth === true) {
            this.setToken(resp.data.token); // Setting the token in localStorage

        }
        return Promise.resolve(resp);
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('token_bf', idToken)
    }
    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('token_bf')
    }
    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('token_bf');
        
    }
    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else{
                return false;
            }
        }
        catch (err) {
            return false;
        }
    }
    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }
}