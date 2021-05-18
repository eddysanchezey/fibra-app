import React, {Component} from 'react';
import  './Perfil.css';
import swal from 'sweetalert';
import Input from '../../../Helpers/Component/Input/InputComponent';
import { TiUserOutline } from "react-icons/ti"; // Ícono
import Axios from 'axios';

const inputsLimpios = () =>{
    return { 
        currentPass: {
            type:"input",
            label: "Contraseña actual",
            name:"Password",
            value:"",
            width: 9,
            inputProps:{
                disabled: false,
                type: "password"
            },
            valid: {                    
                flag: false,
                touched: false,
                message: ""
            }, 
            validation:{
                required: true
            }               
        },
        newPass: {
            type:"input",
            label: "Nueva contraseña",
            name:"passwordNueva1",
            value:"",
            width: 9,
            inputProps:{
                disabled: false,
                type: "password"
            },
            valid: {                    
                flag: false,
                touched: false,
                message: ""
            }, 
            validation:{
                required: true
            }               
        }, 
        newPass2: {
            type:"input",
            label: "Confirmación nueva contraseña",
            name:"passwordNueva2",
            value:"",
            width: 9,
            inputProps:{
                disabled: false,
                type: "password"
            },
            valid: {                    
                flag: false,
                touched: false,
                message: ""
            }, 
            validation:{
                required: true
            }               
        }                        
    };
}

class Perfil extends Component{
    state = {
        inputs:{ 
            currentPass: {
                type:"input",
                label: "Contraseña actual",
                name:"Password",
                value:"",
                width: 9,
                inputProps:{
                    disabled: false,
                    type: "password"
                },
                valid: {                    
                    flag: false,
                    touched: false,
                    message: ""
                }, 
                validation:{
                    required: true
                }               
            },
            newPass: {
                type:"input",
                label: "Nueva contraseña",
                name:"passwordNueva1",
                value:"",
                width: 9,
                inputProps:{
                    disabled: false,
                    type: "password"
                },
                valid: {                    
                    flag: false,
                    touched: false,
                    message: ""
                }, 
                validation:{
                    required: true
                }               
            }, 
            newPass2: {
                type:"input",
                label: "Confirmación nueva contraseña",
                name:"passwordNueva2",
                value:"",
                width: 9,
                inputProps:{
                    disabled: false,
                    type: "password"
                },
                valid: {                    
                    flag: false,
                    touched: false,
                    message: ""
                }, 
                validation:{
                    required: true
                }               
            }                        
        },
        button:{
            text: "Cambiar contraseña",
            type: "buscarHandler",
            class: "btn_negro",
            show: true
        },
        title: "Cambiar contraseña",
        show: true,
        showInputs: true,
    }
    // FUNCIONES PRINCIPALES
    buscarHandler = () =>{
        let inputs = {...this.state.inputs}
        const objValidacion = this.validarErroresPorSección(inputs);         
        if (objValidacion.valido){
            // contruir petición automaticmaente
            const request = {};
            for (let input in this.state.inputs){
                const objeto = this.state.inputs[input];
                if (objeto.name && objeto.name !== ""){
                    request[objeto.name]= objeto.value;                    
                }
            };

            // Validar que la scontraseñas sean iguales
            if (request.passwordNueva1 === request.passwordNueva2){
                // Añadir campos específicos
                request.correo = this.props.user.correo;
                // HACER PETICIÓN      
                Axios.post('/sesion/changepassword', request).then(respuesta => {
                    if (respuesta.data.isAuth){
                        swal("Operación exitosa", respuesta.data.mensaje, "success");
                        this.limpiarHander();
                    }else{
                        swal("Error", respuesta.data.mensaje, "error");
                    }
                   
                });
            }else{
                swal("Error", "La contraseña nueva no coincide con la contraseña de confirmación. Deben ser las mismas.", "error");
            }            
        }else{
            inputs = objValidacion.inputs;
            this.setState({inputs: inputs, idDeuda: 0});
        }
    }
    limpiarHander = () =>{
        const inputs = inputsLimpios();
        this.setState({inputs:inputs});
    }

    // FUNCIONES DE VALIDACIÓN
    validationHandler = (input) => {
        const valido = {...input.valid};
        valido.touched = true;
        valido.flag  =true;

        // REGLAS VALIDADAS
        if (input.validation.required){
            valido.flag = isNaN(input.value)?input.value.trim() !== "":(input.value!==0 && input.value!=="") ;
            valido.message = valido.flag?"":"Este campo es obligatorio";
        }
        if (input.validation.isPeriodo && input.value!=="" ){
            const valor = input.value;
            valido.flag = (valor.length === 7)
                            && (valor.split("-").length === 2);
            valido.message = valido.flag?"":"Periodo incorrecto.";
            // Nivel dos de validaciones (consistencia)
            if (valido.flag){
                let mm = valor.split("-")[1]*1;
                const yyyy =  valor.split("-")[0];
                valido.flag = (yyyy > 1900) && (mm > 0 && mm <= 13);
                valido.message = valido.flag?"":"Mes o año incorrecto.";
            }
        }

        return valido;
    }        
    validarErroresPorSección=(inputs)=>{
        let valido = true;
        for (let key in inputs){
            inputs[key].valid = this.validationHandler(inputs[key]);
            valido = valido && inputs[key].valid.flag;
        };
        return {inputs: inputs, valido: valido};
    }
    // INPUT HANDLERS
    changeHandler = (event, nomInput) => {     
        // CONSTANTES
        const inputsUpdated = {...this.state.inputs};        
        const inputUpdated = inputsUpdated[nomInput];

        // VALIDAR SI SE TRATA DE UN CHECKBOX
        if (event.target.type ==='checkbox'){
            inputUpdated.value = event.target.checked;
        }else{
        // CAMBIAR EL VALOR DE
            // VALIDAR ERRORES DE FORMATO DE ENTRADA
            let nuevoValor = event.target.value;
            let ultimoCaracter = nuevoValor.charAt(nuevoValor.length-1);
            // Validación si es PERIODO
            if (inputUpdated.validation.isPeriodo){
                let estaborrando = (nuevoValor.length < inputUpdated.value.length);
                const re = /^[0-9\b]+$/;
                // Agregar "-"
                if (!estaborrando && nuevoValor.length === 4){
                    nuevoValor = nuevoValor + "-";
                }
                // Borrar cuando hay "-"
                if (estaborrando && nuevoValor.length === 4){
                    nuevoValor = nuevoValor.substring(0,3);
                }
                // Validar si tiene el formato, sino regresar al numero previo
                if (!( (re.test(ultimoCaracter) || nuevoValor==="" 
                    || ( ultimoCaracter ==="-" && estaborrando ))
                    && nuevoValor.length <= 7 )){
                        nuevoValor = inputUpdated.value;
                    };
                    
            }
            inputUpdated.value = nuevoValor;
        }
        // Reiniciar errores
        if (!inputUpdated.valid.flag){
            inputUpdated.valid.flag = false;
            inputUpdated.valid.message="";
        }
        // Guardar cambios
        inputsUpdated[nomInput] = inputUpdated;
        this.setState({inputs: inputsUpdated});
    }
    blurHandler = (event, nomInput) =>{     
        const inputsUpdated = {...this.state.inputs};        
        const inputUpdated = inputsUpdated[nomInput];

        inputUpdated.valid = this.validationHandler(inputUpdated);
        if (inputUpdated.valid.flag===false && event.target.type ==='input'){
            inputUpdated.value = "";
        }
        // Guardar cambios
        inputsUpdated[nomInput] = inputUpdated;
        this.setState({input: inputsUpdated});
    }
    // RENDER FUNCTION   
    crearFormulario = () =>{
        // Construir un array de seccion en base a los objetos del input: { {},{} } => [ {},{} ]       
        const secc = {...this.state};
        const inputs = [];
        for (let inpKey in this.state.inputs){
            inputs.push({
                id: inpKey,
                config: this.state.inputs[inpKey]
            })
        };
        secc.inputs = inputs;        
        // Crear el formulario completo en base al state
        return (                        
            <React.Fragment>
                {                                     
                // Determinar según la propiedad [SHOW] si una [SECCIÓN] se crea 
                secc.show?           
                (<div className="mb-1">
                    <h4 className="titulo_seccion">
                        <span>{secc.title}</span>
                    </h4>
                    <div className="row">
                    {
                        // Mapear los [INPUTS] de la sección
                        secc.showInputs?
                        secc.inputs.map(inp => (
                            // Función auxiliar que crea los INPUTS:
                            this.dibujarInput(inp)
                        ))
                        :null                        
                    }
                    </div>
                </div>)
                :null
                // FIN SECCIONES
                } 
            </React.Fragment>
            );      
    }  
    dibujarInput = (inp) =>{
        let btnClick = null;
        // Agregar la función de click cuando el input es tipo "inputyBtn"
        if (inp.config.click){
            switch (inp.config.click) {
                default:
                    btnClick = null;
                    break;
            }
        }
        return (
            <div key={inp.id} className={'col-' + (inp.config.width?inp.config.width:'6')}> 
                <Input {...inp.config}               
                changed={(event)=>this.changeHandler(event,inp.id)}
                btnClick = {btnClick}
                blur={(event)=>this.blurHandler(event,inp.id)}/>
            </div>
        );
    }
    render(){
        return(
            <div className="p_container">
                <div className="p_sec_barra">
                    <div className="p_imgperfil">
                        <TiUserOutline/>
                    </div>
                    <p className="p_sec1_name">{this.props.user.nombre}</p>
                    <p className="p_sec1_mail">{this.props.user.correo}</p>
                    <p className="p_sec1_mail">{this.props.user.rol}</p>
                </div>
                <div className="p_sec_contenido">                 
                    {
                        this.crearFormulario()
                    }
                    <div className="p_cont_botones">
                        <button onClick={this.limpiarHander} className="btn_limpiar">Limpiar</button>
                        <button onClick={this.buscarHandler} className="btn_ok">Cambiar contraseña</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Perfil;