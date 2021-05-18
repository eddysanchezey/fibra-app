import React, { Component } from 'react';
import AuthServices from '../../Services/AuthServices';

export default function withAuth(AuthComponent){
    const Auth = new AuthServices();
    
    return class AutoWrapped extends Component{
        constructor(){
            super();
            this.state = {
                user: null
            }
        }

        componentWillMount(){
            if (!Auth.loggedIn()){
                this.props.history.replace("/login")
            }
            else
            {
                try
                {
                    const sesion = Auth.getProfile();
                    this.setState({
                        user: sesion
                    });
                }
                catch (error)
                {
                    Auth.logout();
                    this.props.history.replace("/login");
                }

            }
        }

        render(){
            if (this.state.user)
            {
                return <AuthComponent {...this.props} user={this.state.user} />
            }
            else
            {
                return null;
            }
        }

    }
}