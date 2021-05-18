import React, {Component} from 'react';
import  './Login.css';
import logo from '../img/ey.svg';
import AuthServices from '../Services/AuthServices';


class Login extends Component{
    state={
        formDatos:{
            username:"",
            password:""
        },
        errores:{
            username: {
                flag: false,
                mensaje:""
            },
            password: {
                flag: false,
                mensaje:""
            }
        },
        interacciones:{
            username: false,
            password: false
        },
        alerta: {
            mostrar:false,
            texto:""
        }
    }   
    constructor(){
        super();
        this.auth = new AuthServices();
        this.blurInputHandler = this.blurInputHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.loginHandler = this.loginHandler.bind(this);
    }
    componentDidMount(){
        document.title = "Fibra App";
      }
    blurInputHandler = event =>{
        const name = event.target.name;
        const valor = event.target.value;
        const errores = {...this.state.errores}
        // Validar si es obligatorio
        if (errores[name] && valor ===""){
            errores[name].flag = true;
            errores[name].mensaje = "Este campo es obligatorio";
        }
        this.setState({
            interacciones: { ...this.state.interacciones, [name]:true},
            errores: errores
        });
    }
    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;
        const datos = {...this.state.formDatos};
        const errores = {...this.state.errores}
        // Reiniciar el marcador de errores al cambiar
        if (errores[name]){
            errores[name].flag = false;
            errores[name].mensaje = "";
        }
        datos[name] = value;        
        this.setState({
            formDatos: datos,
            errores: errores
        });
    }
    keyPressEnterHandler = (event) =>{
        if (event.key==="Enter"){
            this.loginHandler();
        }
    }
    componentWillMount(){
        if (this.auth.loggedIn()){
            this.props.history.replace('/fibra/mantenimiento')
        }
        
    }
    loginHandler=() =>{
        if (this.state.formDatos.username && this.state.formDatos.password){ 

          this.auth.login(this.state.formDatos.username,this.state.formDatos.password).then(resp=>{
            if (resp.data.isAuth === true){
              this.props.history.replace('/fibra/mantenimiento');  
            }else{
                var alerta = {
                    mostrar: true,
                    texto: resp.data.mensaje
                };
                this.setState({alerta:alerta});
            }
          });

        }else{
            alert("Completa todos los campos obligatorios.");
        }
    }
    render(){
        return(<div>
            <div className="l_cont_login">           
                <div className="l_card">
                    <img src={logo} alt="Logo" className="l_logo"/>
                    <h2 className="l_logtitulo">Fibra App</h2>
                    <div className="row">
                        <input name="username" onChange={this.changeHandler} onBlur={this.blurInputHandler} type="email" placeholder="Usuario" className="l_input"></input>
                        <p className="l_mensaje_alertainput">{this.state.errores.username.mensaje}</p>
                    </div>
                    <div className="row mt-1">
                        <input onKeyPress={this.keyPressEnterHandler} name="password" onChange={this.changeHandler} onBlur={this.blurInputHandler} type="password" placeholder="Contraseña" className="l_input"></input>
                        <p className="l_mensaje_alertainput">{this.state.errores.password.mensaje}</p>
                    </div>                    
                    <div className="row mt-1 mb-1">
                        <button onClick={this.loginHandler} className="l_botonlogin">Ingresar</button>
                    </div>
                    {this.state.alerta.mostrar? <span className="l_mensaje_alerta">{this.state.alerta.texto}</span> : null}
                </div>
            </div>
        </div>);
    }    
}

export default Login;