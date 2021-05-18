import '../Body.css';
import './Mantenimiento.css'
import React, {Component} from 'react';

import InputComponent from '../../../Helpers/Component/Input/InputComponent';

import axios from 'axios';
//import TableCalculo from '../../../Helpers/Tables/TableCalculo';
import TablePais from '../../../Helpers/Tables/TablePais';
//import { TiStarHalf } from 'react-icons/ti';
import TableCalculoResultado from '../../../Helpers/Tables/TableCalculoResultado';
class Calculo extends Component{
    state={
        data: null,
        //idioma
        lang:2,
        //Show table when click on search-btn( if flag:true)
        showtable:false,
        //inputs
        numerofuentes:1,
        //
        calculoResultado:{
            totales:{utilidadAnual:123,totalUtilidadNetaFuente:34234,totalCertificado:79765},
        listBuscarCalculo:[{
            id:1,
            descripcion:'Tipo 1',
            numeroContratos:2,
            valorNominal:234.432,
            montoActualInversion:132.321,// totalInversion
            rentaFibra:0.05,
            utilidadFntPersona:2121.21,
            utilidadFntTrimestre:4321,            
            utilidadAnual:3213,
            utilidadProyTrimestre:312321.312,
            showData:false,
            data:[{
                id:34,
                nombreInversionista:'Nombre de Inversionista',
                valorNominal:234.432,
                totalInversion:132.321,
                rentaFibra:1312.21,
                utilidadFntPersona:2121.21,
                utilidadFntTrimestre:4321,            
                utilidadAnual:3213,
                utilidadProyTrimestre:12321.312
                },
                {
                id:35,
                nombreInversionista:'Inversionista',
                valorNominal:264.432,
                totalInversion:642.321,
                rentaFibra:112.21,
                utilidadFntPersona:121.21,
                utilidadFntTrimestre:321,            
                utilidadAnual:213,
                utilidadProyTrimestre:99321.312
                }]
            },
            {id:2,
                descripcion:'Tipo 2',
                numeroContratos:2,
                valorNominal:234.432,
                montoActualInversion:132.321,// totalInversion
                rentaFibra:0.29,
                utilidadFntPersona:2121.21,
                utilidadFntTrimestre:4321,            
                utilidadAnual:3213,
                utilidadProyTrimestre:312321.312,
                showData:false,
                data:[{
                    id:39,
                    nombreInversionista:'Nombre de Inversionista',
                    valorNominal:234.432,
                    totalInversion:132.321,
                    rentaFibra:1312.21,
                    utilidadFntPersona:2121.21,
                    utilidadFntTrimestre:4321,            
                    utilidadAnual:3213,
                    utilidadProyTrimestre:12321.312
                    },
                    {
                    id:33,
                    nombreInversionista:'Inversionista',
                    valorNominal:264.432,
                    totalInversion:642.321,
                    rentaFibra:112.21,
                    utilidadFntPersona:121.21,
                    utilidadFntTrimestre:321,            
                    utilidadAnual:213,
                    utilidadProyTrimestre:99321.312
                    }]
                },
            
        ],

        },
        
        listCalculoFibra:[{
            id:1,
            descripcion:'Tipo 1',
            numeroContratos:2,
            valorNominal:234.432,
            montoActualInversion:132.321,// totalInversion
            rentaFibra:0.05,
            utilidadFntPersona:2121.21,
            utilidadFntTrimestre:4321,            
            utilidadAnual:3213,
            utilidadProyTrimestre:312321.312,
            showData:false,
            data:[{
                id:34,
                nombreInversionista:'Nombre de Inversionista',
                valorNominal:234.432,
                totalInversion:132.321,
                rentaFibra:1312.21,
                utilidadFntPersona:2121.21,
                utilidadFntTrimestre:4321,            
                utilidadAnual:3213,
                utilidadProyTrimestre:12321.312
                },
                {
                id:35,
                nombreInversionista:'Inversionista',
                valorNominal:264.432,
                totalInversion:642.321,
                rentaFibra:112.21,
                utilidadFntPersona:121.21,
                utilidadFntTrimestre:321,            
                utilidadAnual:213,
                utilidadProyTrimestre:99321.312
                }]
            },
            {id:2,
                descripcion:'Tipo 2',
                numeroContratos:2,
                valorNominal:234.432,
                montoActualInversion:132.321,// totalInversion
                rentaFibra:0.29,
                utilidadFntPersona:2121.21,
                utilidadFntTrimestre:4321,            
                utilidadAnual:3213,
                utilidadProyTrimestre:312321.312,
                showData:false,
                data:[{
                    id:39,
                    nombreInversionista:'Nombre de Inversionista',
                    valorNominal:234.432,
                    totalInversion:132.321,
                    rentaFibra:1312.21,
                    utilidadFntPersona:2121.21,
                    utilidadFntTrimestre:4321,            
                    utilidadAnual:3213,
                    utilidadProyTrimestre:12321.312
                    },
                    {
                    id:33,
                    nombreInversionista:'Inversionista',
                    valorNominal:264.432,
                    totalInversion:642.321,
                    rentaFibra:112.21,
                    utilidadFntPersona:121.21,
                    utilidadFntTrimestre:321,            
                    utilidadAnual:213,
                    utilidadProyTrimestre:99321.312
                    }]
                },
            
        ],
        lstPais:[{id:1,pais:'Ecuador',monto:'',impuestoPagado:'25% + 0%'},
        {id:2,pais:'Colombia',monto:'',impuestoPagado:'33% + 5%'},
        {id:3,pais:'Bolivia',monto:'',impuestoPagado:''}
        ],
        fibraselect: {
            type:"select",
            options: [{id:1, descripcion:"Tipo1"},{id:2, descripcion:"Tipo2"},{id:3, descripcion:"Tipo3"},{id:4, descripcion:"Tipo4"}],
            name: "fibraselect",                
            label: "Fibra",
            value:"",
            inputProps:{
                type:"text",
                disabled: false
            },
            valid: {                    
                flag: false,
                touched: false,
                message: ""
            }, 
            validation:{
                required: true,
                fibraselect:true
            } 
        },
        inversionistaselect: {
            type:"select",
            name: "inversionistaselect",                
            label: "Inversionista",
            options: [{id:1, descripcion:"País1"},{id:2, descripcion:"País2"},{id:3, descripcion:"País3"},{id:4, descripcion:"País4"}],
                           
            value:"",
            inputProps:{
                type:"text",
                disabled: false
            },
            valid: {                    
                flag: false,
                touched: false,
                message: ""
            }, 
            validation:{
                required: true,
                inversionistaselect:true
            }                
        },
        lstimpuesto:[],
        fechainversion: {
            type:"input",          
            name: "fechainversion",
            label: "Fecha de Inversión",
            value:"2019-11-23",
            inputProps:{
                type:"date",
                disabled: false
            },
            valid: {                    
                flag: false,
                touched: false,
                message: ""
            }, 
            validation:{
                required: true,
            }
            
        },

        fechaventa: {
            type:"select",
            options:[{id:1,descripcion:2000},{id:1,descripcion:2020}],
            //type:"input",          
            name: "fechaventa",
            label:"Año",
            //label: "Fecha de Venta Tercero",
            value:"",
            inputProps:{
                type:"text",
                //type:"date",
                disabled: false
            },
            valid: {                    
                flag: false,
                touched: false,
                message: ""
            }, 
            validation:{
                required: true,
                fechaventa:true
            }
            
        },
        inversioninput: {
            type:"input",
            name: "inversioninput",                
            label: "Inversion",
            value:"",
            inputProps:{
                type:"text",
                disabled: false
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
        rebajainput: {
            type:"input",
            name: "rebajainput",                
            label: "Monto Rebaja",
            value:"",
            inputProps:{
                type:"text",
                disabled: false
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
        montoactualinput: {
            type:"input",
            name: "montoactualinput",                
            label: "Monto Actual Inversión",
            value:"",
            inputProps:{
                type:"text",
                disabled: false
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

    }
    componentWillMount(){
        //Actualizar lista de tipo inversionista
        axios.get('/mantenimiento/devolverlistafibra').then(respta =>{
            const listtipdoc = {...this.state};
            listtipdoc.fibraselect.options=respta.data.objeto;
            listtipdoc.fibraselect.value=respta.data.objeto[0].id;
            this.setState({fibraselect: listtipdoc.fibraselect});

        });
        //Actualizar lista de Años o Periodos
        //fechaventa
        axios.get('/mantenimiento/devolverlistatperiodo').then(respta =>{
            const listtipdoc = {...this.state};
            listtipdoc.fechaventa.options=respta.data.objeto;
            listtipdoc.fechaventa.value=respta.data.objeto[0].id;
            this.setState({fechaventa: listtipdoc.fechaventa});

        });
    }
    changeHandlerupdate=(event,nomInput)=>{
        // CONSTANTES
        const inputsUpdated = {...this.state};        
        const inputUpdated = inputsUpdated[nomInput];
        //console.log(event.target.value);

        // VALIDAR ERRORES DE FORMATO DE ENTRADA
        let nuevoValor = event.target.value;
        let ultimoCaracter = nuevoValor.charAt(nuevoValor.length-1);
        //
        if (inputUpdated.validation.fibraselect){
            
            inputUpdated.inputProps.disabled=true
                
        }
        if (inputUpdated.validation.inversionistaselect){
            
            inputUpdated.inputProps.disabled=true
                
        }
        if(inputUpdated.validation.fechaventa){
            inputUpdated.inputProps.disabled=true
        }
        // Validación si es TRIMESTRE
        if (inputUpdated.validation.isTrimestre){
            
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
            //console.log(nuevoValor)
            event.target.value=nuevoValor
                
        }

        //asignar valor
        
        inputUpdated.value=event.target.value
        //event.target.value;
        // Guardar cambios
        inputsUpdated[nomInput] = inputUpdated;
        this.setState({nomInput: inputsUpdated});


    }
    limpiarData(){
        const inputsUpdated = {...this.state};
        inputsUpdated.fibraselect.value=inputsUpdated.fibraselect.options[0].id;
        inputsUpdated.fibraselect.inputProps.disabled=false;
        inputsUpdated.fechaventa.inputProps.disabled=false;
        inputsUpdated.inversionistaselect.value=inputsUpdated.inversionistaselect.options[0].id;
        inputsUpdated.inversionistaselect.inputProps.disabled=false;
        this.setState({fibraselect:inputsUpdated.fibraselect})
        this.setState({fechaventa:inputsUpdated.fechaventa})
        this.setState({inversionistaselect:inputsUpdated.inversionistaselect})
    }
    searchHandlerDatPrin = () => {
        //this.setState({showtable:!this.state.showtable})
        //
        //RESULTADO        
        const request = {
            IdFibra:this.state.fibraselect.value,
            IdAño:this.state.fechaventa.value
            //UsuCreacion : ''+auth.getProfile().idusuario,
        }
        //console.log(request);
        // DATOS GENERALES   
           /* 
        axios.post('/calculo/buscarFibra',request).then(resp =>{
            if(resp.data.flag){
                //console.log(resp.data.objeto)
                this.setState({listCalculoFibra:resp.data.objeto})
                //this.setState({showtable:true})
            }
                                
        });  */
        axios.post('/calculo/buscarCalculo',request).then(resp =>{
            if(resp.data.flag){
                console.log('Buscar Calculo',resp.data.objeto)
                this.setState({calculoResultado:resp.data.objeto})
                this.setState({showtable:true})
            }else{
                alert('No se encontro registros')
            }     
                                
        }); 
    }
    submitHandlerDatPrin = () => {
        
        //el objeto request contiene las variables que son consumidas por un endpoint 
        /*
        const request = {
            fibraselect: this.state.fibraselect.value,
            Trimestre: this.state.inversionistaselect.value,
        }
        */
        /*
        axios.post('/mantenimiento/grabardatprinc',request).then(resp =>{
            console.log(request.data)
            if (request.data.flag)
            this.setState({showtable:true})

        }).catch(console.log(request))
        */
    }
    blurHandler = (event, nomInput) =>{     
        const inputsUpdated = {...this.state};        
        const inputUpdated = inputsUpdated[nomInput];

        inputUpdated.valid = this.validationHandler(inputUpdated);
        if (inputUpdated.valid.flag===false && event.target.type ==='input'){
            inputUpdated.value = "";
        }
        // Guardar cambios
        inputsUpdated[nomInput] = inputUpdated;
        this.setState({input: inputsUpdated});
    }
    validationHandler = (input) => {
        console.log(input)
        const valido = {...input.valid};
        valido.touched = true;
        valido.flag  =true;

        // REGLAS VALIDADAS
        if (input.validation.required)
        {
            valido.flag = isNaN(input.value)?input.value.trim() !== "":(input.value!==0 && input.value!=="") ;
            valido.message = valido.flag?"":"Este campo es obligatorio";
        }
        else 
        {
            if (input.validation.isPeriodo)
            {
            const valor = input.value;
            valido.flag = ((valor.length === 7)
                            && (valor.split("-").length === 2)) || valor==="";
            valido.message = valido.flag?"":"Periodo incorrecto.";
            // Nivel dos de validaciones (consistencia)
                if (valido.flag && valor!=="")
                {
                    let mm = valor.split("-")[1]*1;
                    const yyyy =  valor.split("-")[0];
                    valido.flag = (yyyy > 1900) && (mm > 0 && mm <= 13);
                    valido.message = valido.flag?"":"Mes o año incorrecto.";
                }
            }
            if (input.validation.isNumber)
            {
                console.log(input.value)
                const valor = input.value
                valido.flag= Number.isInteger(valor*1)?true:false;
                valido.message=valido.flag?"":"No es número";
            }
            if (input.validation.isTrimestre)
            {
                const valor = input.value;
                valido.flag = ((valor.length === 7)
                                && (valor.split("-").length === 2)) || valor==="";
                valido.message = valido.flag?"":"Periodo incorrecto.";
                // Nivel dos de validaciones (consistencia)
                if (valido.flag && valor!=="")
                {
                    let mm = valor.split("-")[1]*1;
                    const yyyy =  valor.split("-")[0];
                    valido.flag = (yyyy > 1900) && (mm > 0 && mm <= 4);
                    valido.message = valido.flag?"":"Trimestre o año incorrecto.";
                }
            }
        }
        console.log(valido)

        return valido;
    }
    callbackFunction = (childData) => {
        //call back recovery data
        this.setState({data: childData})
        //hide table
        //this.setState({showtable:!this.state.showtable})
        /*

        //Fila Seleccionada
        let j=childData.id*1
        console.log(childData.id)

        //Cambiar estado de flag 'showData'
        console.log(childData.showData)
        const inputsUpdated = {...this.state};
        inputsUpdated.listCalculoFibra[j].showData=!childData.showData;
        this.setState({listCalculoFibra:inputsUpdated.listCalculoFibra})
        */


    }
    callbackFunctionResultado=(childData)=>{
        //Fila Seleccionada
        let j=childData.id
        console.log('fila',childData.id,'=',j)

        //Cambiar estado de flag 'showData'
        console.log(childData.showData)
        console.log(!(childData.showData))
        const inputsUpdated = {...this.state};
        console.log(inputsUpdated.calculoResultado.listBuscarCalculo[j].showData);
        inputsUpdated.calculoResultado.listBuscarCalculo[j].showData=childData.showData===false?true:false;//!(childData.showData);
        this.setState({calculoResultado:inputsUpdated.calculoResultado})

    }
    render(){
        
        return(
            <React.Fragment>
                <div className="b_navegation">
                    
                </div>
                <div className="tab_seccrigth">
                    
                    <div className="row">
                        
                        <div className="row">
                        <div className="col-6">
                        <InputComponent className="body_tabinput"
                                {...this.state.fibraselect}   
                                value={this.state.valorSeleccionado}  
                                changed={(event)=>this.changeHandlerupdate(event,"fibraselect")}
                                
                                />
                        </div>
                        <div className="col-6">
                        <InputComponent  className="body_tabinput"
                            {...this.state.fechaventa}   
                            value={this.state.valorSeleccionado}  
                            changed={(event)=>this.changeHandlerupdate(event,"fechaventa")}
                            /> 
                        </div>
                            
                        </div>
                                                
                    </div>
                    <div className="row text-derecha">
                        <div className="i_contenedor">
                            <button className="tab_botonmove" onClick={()=>this.limpiarData()}>{'Limpiar'} 
                            </button>
                            
                            <button className="tab_botonmove"
                                onClick={()=>this.searchHandlerDatPrin()}>{'Buscar'} 
                            </button>
                            
                        </div>
                    </div>
                    {/*this.state.showtable?
                    <div className="row">
                    
                    <TableCalculo content={this.state.listCalculoFibra} parentCallback = {this.callbackFunction} >
                                       
                    </TableCalculo>
                    </div>
                    :null*/}
                    {this.state.showtable?
                    <div className="row">
                    
                    <TableCalculoResultado content={this.state.calculoResultado} parentCallback = {this.callbackFunctionResultado} >
                                       
                    </TableCalculoResultado>
                    </div>
                    :null}
                    
                    {this.state.showtable?
                    <div className="row">
                        <h3>Renta Fuente Extranjera</h3>
                        <div className="row">
                        <div className="col-6_pd-3"></div>
                        <div className="col-6_pd-3">
                            <TablePais content={this.state.lstPais}  parentCallback = {this.callbackFunction} >
                                            
                            </TablePais>
                        </div>
                        <div className="col-6_pd-3"></div>
                    </div>
                    </div>
                    
                    :null}
                    
                    
                </div>

            </React.Fragment>
        );

    }
}
export default Calculo;