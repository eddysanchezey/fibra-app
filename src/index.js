import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import App from './App/App';
import Login from './login/Login'
import AuthServices from './Services/AuthServices'
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import Axios from 'axios';
const auth = new AuthServices();

// Local backend Fibra
//axios.defaults.baseURL = "http://localhost:64969/api";
// IIS local
//axios.defaults.baseURL = "http://10.0.75.1:3004/api";
// IIS producción Fibra
axios.defaults.baseURL = "http://10.20.103.68:92/api"; 

axios.interceptors.request.use(function (config){
    // Validar si el token es válido
    //console.log(config.url);
    if (auth.loggedIn() === false && config.url !== 'sesion/login'){
        //console.log("No logueado");
        return config;        
    }else{
        
        //console.log("logueado");
        // Agregar token a las peticiones
        config.headers.Authorization = 'Bearer ' + auth.getToken();
        // Agregar pantalla de carga
        if (config.url !== '/contribuyente/autocomplete' 
        && config.url !== '/reporte/expedientes/anual/nivel1' 
        && config.url !== '/reporte/porcontribuyente/nive2'
        && config.url !== '/reporte/porcontribuyente/nivel3'
        && config.url !== '/contribuyente/grupoeconomico/sugest' 
        && config.url !== '/expedientes/reparo/sugest' ){
            document.body.classList.add('loading-indicator');
        }
        return config;
    }
   
},function (error) {
    
    return Promise.reject(error);
});

Axios.interceptors.response.use(function (response) {
    document.body.classList.remove('loading-indicator');
    return response;
}, function (error) {
    if (error.response){
        // PETICIÓN HECHA
        if (error.response.status === 401) {
            alert("Sesión expirada.");
            localStorage.clear();
            window.location.reload();            
        }
        else if (error.response.status === 500) {
            alert("Error en el servidor.");
            window.location.reload();
        }
    }else{
        alert("Error de red.");
        window.location.reload();
    }
    
  return Promise.reject(error);
});

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={Login}/>
            <Route path="/"  component={App}/>
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));

    serviceWorker.unregister();
