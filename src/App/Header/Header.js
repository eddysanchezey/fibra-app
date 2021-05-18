import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { TiPower } from "react-icons/ti"; // Ícono
import AuthService from '../../Services/AuthServices';
import logo from '../../img/logo.png';

const Auth = new AuthService();
class Header extends  Component{
    state = {}    
    logoutHandler=()=>{
        Auth.logout();
        this.props.history.replace('/login');
    }
    render(){
        return (
            <div className="header">
                <div className="logo">
                    <img src={logo} alt="Logo" className="imglogo"/>
                </div>
                <div className="header_derecha">
                    <div className="header_titulo">Fibra</div>
                    <div id="user_mail" className="header_usuario">
                        <Link className="link_userheader" to={'/perfil'} ><div className="cls_usuario">{this.props.user.nombre}</div> </Link>
                        
                        <TiPower onClick={this.logoutHandler} title="Salir"  className="iconoSalir"/> 
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;