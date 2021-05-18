import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Navbar from './Navbar/Navbar';
import Lienzo from './Lienzo/Lienzo';

import Perfil from './Perfil/Perfil';
//import Fibra from './Mantenimiento/Fibra';
import FibraV2 from './Mantenimiento/FibraV2';
import Inversionista from './Mantenimiento/Inversionista'
//import Impuesto from './Mantenimiento/Impuesto'
//import Participes from './Mantenimiento/Participes'
import ParticipesV2 from './Mantenimiento/ParticipesV2'
//import Calculo from './Mantenimiento/Calculo'
import Certificado from './Mantenimiento/Certificado'

import authServices from '../../Services/AuthServices';
//import CalculoV2 from './Mantenimiento/CalculoV2';
import CalculoV3 from './Mantenimiento/CalculoV3';

const auth = new authServices();
//auth.getProfile().idRol*1!==3 rol Visualizador
//auth.getProfile().idusuario,


class Cuerpo extends Component{
    state = {
        opciones : [
            {id:1, icono:"IoIosCreate", texto:"Mantenimiento de fibras",to:"/fibra/mantenimiento"},
            {id:2, icono:"IoIosSearch", texto:"Mantenimiento inversionista",to:"/fibra/inversionista"},
            {id:3, icono:"IoMdFastforward", texto:"Registro participes",to:"/fibra/participes"},
            {id:4, icono:"IoIosFiling", texto:"Cálculo de Fibra",to:"/fibra/calculo"},
            {id:5, icono:"IoIosAlbums", texto:"Emisión Certificado",to:"/fibra/certificado"},
            //{id:6, icono:"IoMdCash", texto:"Impuestos",to:"/fibra/impuestos"},
           // {id:7, icono:"IoIosCash", texto:"Pago",to:"/expediente/pago"},
            //{id:7, icono:"IoMdStats", texto:"Reportes", to:"/fibra/reportes"},
            //{id:8, icono:"IoMdStats", texto:"Reportes NUEVO", to:"/fibra/reportes NUEVO"}
        ],
        formdata:null
    }
    switchSubmenu(idx){
        const opcion = {...this.state.opciones[idx]};
        opcion.submenuShow = !opcion.submenuShow ;
        const opciones = [...this.state.opciones];
        opciones[idx] = opcion; 
        this.setState({opciones:opciones});
    }
    componentDidMount(){    
            
    }
    render(){
        let cuerpo = <p>Cargando...</p>;
        if (this.state.formdata == null){
            auth.getProfile().idRol*1===1?
            
         cuerpo=<Switch>
            <Route path="/fibra/mantenimiento" exact component={(match)=><Lienzo titulo="Mantenimiento fibra"><FibraV2/> </Lienzo> }/>
            <Route path="/fibra/inversionista" exact component={(match)=><Lienzo titulo="Mantenimiento inversionista"><Inversionista></Inversionista></Lienzo>}/>
            <Route path="/fibra/participes" exact component={(match)=><Lienzo titulo="Registro participes"><ParticipesV2></ParticipesV2></Lienzo>}/>
            <Route path="/fibra/calculo" exact component={(match)=><Lienzo titulo="Retención de Impuesto Trimestral"><CalculoV3/></Lienzo>}/>
            <Route path="/fibra/certificado" exact component={(match)=><Lienzo titulo="Emisión de Certificado"><Certificado/></Lienzo>}/>
            <Route path="/perfil" excact component={(match)=><Lienzo titulo="Perfil de usuario" history={this.props.history}><Perfil {...this.props} match={match}/></Lienzo>  }/>
            </Switch>           :
            cuerpo=<Switch>
            <Route path="/fibra/participes" exact component={(match)=><Lienzo titulo="Registro participes"><ParticipesV2></ParticipesV2></Lienzo>}/>
            <Route path="/fibra/calculo" exact component={(match)=><Lienzo titulo="Retención de Impuesto Trimestral"><CalculoV3/></Lienzo>}/>
            <Route path="/fibra/certificado" exact component={(match)=><Lienzo titulo="Emisión de Certificado"><Certificado/></Lienzo>}/>
            <Route path="/perfil" excact component={(match)=><Lienzo titulo="Perfil de usuario" history={this.props.history}><Perfil {...this.props} match={match}/></Lienzo>  }/>
            </Switch>
                       
        }
        
        return(
            <div className="cuerpo">
                
                <Navbar opciones={this.state.opciones} clickSwitch={this.switchSubmenu.bind(this)}/>
                <div className="contenedor">   
                {cuerpo}
                </div>
            </div>
        );
    };
}

export default Cuerpo;