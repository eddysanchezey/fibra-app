import React, {Component} from 'react';
import axios from 'axios';
import Input from './Input/InputComponent';

class Buscador extends Component{
    state ={
        title: "Buscar por:",
        show: true,
        showInputs: true,
        disabled: false,
        inputs:{ 
            nroexpediente: {
                type:"input",
                name: "nroExpediente",                
                label: "Nro expediente:",
                value:"",
                inputProps:{
                    placeholder:"Nro de expediente",
                    type:"text",
                    disabled: false
                },
                valid: {                    
                    flag: false,
                    touched: false,
                    message: ""
                }, 
                validation:{
                    required: false
                }               
            },   
            periodo: {
                type:"input",                
                label: "Periodo:",
                value:"",
                inputProps:{
                    placeholder:"yyyy - mm",
                    type:"text",
                    disabled: false
                },
                valid: {                    
                    flag: false,
                    touched: false,
                    message: ""
                }, 
                validation:{
                    required: false,
                    isPeriodo: true,
                }               
            },
            reparo: {
                type:"input",
                label: "Reparo:",
                name: "reparo",
                value:"",
                inputProps:{      
                    placeholder:"Ingresa un texto"  ,
                    disabled: false       
                },
                valid: {                    
                    flag: false,
                    touched: false,
                    message: ""
                },  
                validation:{
                    required: false
                }
            },
            valor: {
                type:"input",                
                label: "Valor:",
                name:"valor",
                value:"",
                inputProps:{
                    placeholder:"Ingresa un texto",
                    type:"text",
                    disabled: false
                },
                valid: {                    
                    flag: false,
                    touched: false,
                    message: ""
                }, 
                validation:{
                    required: false
                }               
            },     
            tributo: {
                type:"selectAll",
                label: "Tributo",
                name:"idTributo",
                value:0,
                inputProps:{
                    disabled: false
                },
                options: [],
                valid: {                    
                    flag: false,
                    touched: false,
                    message: ""
                }, 
                validation:{
                    required: false
                }               
            },    
            tipo: {
                type:"selectAll",
                label: "Tipo",
                name:"idTipo",
                value:0,
                inputProps:{
                    disabled: false
                },
                options: [{id:1, descripcion:"Devolución"}],
                valid: {                    
                    flag: false,
                    touched: false,
                    message: ""
                }, 
                validation:{
                    required: false
                }               
            },        
            responsable: {
                type:"selectAll",
                label: "Responsable",
                name:"idResponsable",
                value:0,
                inputProps:{
                    disabled: false
                },
                options: [],
                valid: {                    
                    flag: false,
                    touched: false,
                    message: ""
                }, 
                validation:{
                    required: false
                }               
            },
            estado: {
                type:"selectAll",
                label: "Estado",
                name:"idEstado",
                value:0,
                inputProps:{
                    disabled: false
                },
                options: [],
                valid: {                    
                    flag: false,
                    touched: false,
                    message: ""
                }, 
                validation:{
                    required: false
                }               
            }              
        },                
        button:{
            text: "Continuar",
            type: "buscarHandler",
            class: "btn_negro",
            show: true
        },
        resultados:{},
        nroPagina: 1
    } 
    componentWillMount(){       
        const inputs = {...this.state.inputs}
        //Tributo
        const tributo = {...inputs.tributo};
        tributo.options = this.props.formdata.tributos;        
        // RESOPONSABLE, ESTADO
        const responsable = {...inputs.responsable};
        responsable.options = this.props.formdata.usuariosDiponibles;
        
        const estado = {...inputs.estado};
        estado.options = this.props.formdata.estados;
                
        // Actualizar estado
        inputs.tributo = tributo;
        inputs.responsable = responsable;
        inputs.estado = estado; 
        
        this.setState({inputs: inputs});
    }
    // PRINCIPAL FUNCTIONS
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
            }
            // Añadir campos específicos
            request.pagina = this.state.nroPagina;
            request.periodo = this.state.inputs.periodo.value.replace("-","");
            // HACER PETICIÓN
            console.log(request);
            axios.post('/expedientes/buscar',request).then(respuesta => {
                console.log(respuesta);
            });
        }else{
            inputs = objValidacion.inputs;
            this.setState({inputs: inputs});
        }
    }
    validationHandler = (input) => {
        const valido = {...input.valid};
        valido.touched = true;
        valido.flag  =true;

        // REGLAS VALIDADAS
        if (input.validation.required){
            valido.flag = isNaN(input.value)?input.value.trim() !== "":(input.value!==0 && input.value!=="") ;
            valido.message = valido.flag?"":"Este campo es obligatorio";
        }else if (input.validation.isPeriodo){
            const valor = input.value;
            valido.flag = ((valor.length === 7)
                            && (valor.split("-").length === 2)) || valor==="";
            valido.message = valido.flag?"":"Periodo incorrecto.";
            // Nivel dos de validaciones (consistencia)
            if (valido.flag && valor!==""){
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
                    {
                    // Crear un [BOTÓN] si es que la sección lo tiene                        
                        (secc.button && secc.showInputs && secc.button.show)?(
                            <div className="col-6">
                                <div className="i_contenedor">
                                    {   //Función auxiliar que crea los BOTONES:                                            
                                        secc.button.show?this.retornarBotones(secc.button.type,secc.button.text,secc.button.class):null
                                    }
                                </div>  
                            </div>
                        ):null
                    }
                    </div>
                </div>)
                :null
                // FIN SECCIONES
                }                
                <div className="col-12" style={{textAlign: "right"}}>
                    <div className="i_contenedor">
                        <button className="btn_limpiar" onClick={() => this.clickLimpiar()}>Limpiar</button>
                        <button className="btn_ok" onClick={() => this.clickSubmitHandler()}>Guardar</button>
                    </div>  
                </div>
            </React.Fragment>
            );      
    }
    retornarBotones(tipo,texto,clase){
        let boton = null;
        switch (tipo) {
            case "buscarHandler":
                boton = <button onClick={this.buscarHandler} className={clase}>{texto}</button>
                break; 
            default:
                break;
        }
        return boton;
    }    
    
    render(){
        return this.crearFormulario();        
    }
}
export default Buscador;