import '../Body.css';
import './Mantenimiento.css'
import React, {Component} from 'react';
import InputComponent from '../../../Helpers/Component/Input/InputComponent';
import {FiPlusCircle,FiMinusCircle} from "react-icons/fi";
import axios from 'axios';
import TableImpuestoV2 from '../../../Helpers/Tables/TableImpuestoV2';
import authServices from '../../../Services/AuthServices';

const auth = new authServices();
class Inversionista extends Component{
    state={
        idContratoSeleccionado:0,
        showbtnsave:true,        
        showdatafiber:false,
        //idioma
        lang:2,
        //Show table when click on search-btn( if flag:true)
        showtable:false,
        //Datos en tabla
        lstcontratos:[],        
        //Lista de Fecha-Venta-Terceros y Rebajas
        numerocontratos:1,
        VentaContrato:[{id:0,idInversionista:'',fechaVentatercero:'',montoRebaja:''}],
        //inputs
        fibraselect: {
            type:"select",
            options: [{id:1, descripcion:"Cargando..."}],
            name: "fibraselect",                
            label: "Fibra *",
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
            label: "Inversionista *",
            options: [{id:1, descripcion:"Cargando..."}],
                            
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
        periodo:{
            type:"input",
            name: "periodo",                
            label: "Trimestre *",                            
            value:"",
            inputProps:{
                type:"input",
                disabled: false
            },
            valid: {                    
                flag: false,
                touched: false,
                message: ""
            }, 
            validation:{
                required: false,
                isTrimestre:true
            }

        },        
        fechainversion: {
            type:"input",          
            name: "fechainversion",
            label: "Fecha de Inversión",
            value:"",
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
            //type:"select",
            //options:[{id:1,descripcion:2000},{id:1,descripcion:2020}],
            type:"input",          
            name: "fechaventa",
            label: "Fecha de Venta Tercero",
            value:"",
            inputProps:{
                //type:"text",
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
                flag: true,
                touched: false,                
                message: ""
            }, 
            validation:{
                required: false,
                isNumber:true
            }               
        },
        ingresoalquilerinput:{
            type:"input",
            name: "ingresoalquilerinput",                
            label: "Ingreso por alquiler",
            value:"",
            inputProps:{
                type:"text",
                disabled: false
            },
            valid: {                    
                flag: true,
                touched: false,                
                message: ""
            }, 
            validation:{
                required: false,
                isNumber:true
            }
        },
        resultadoejerinput:{
            type:"input",
            name: "resultadoejerinput",                
            label: "Resultado de ejercicio",
            value:"",
            inputProps:{
                type:"text",
                disabled: false
            },
            valid: {                    
                flag: true,
                touched: false,                
                message: ""
            }, 
            validation:{
                required: false,
                isNumber:true
            }
        },
        rebajainput: {
            type:"input",
            name: "rebajainput",                
            label: "Inversión *",
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
                required: false,
                isNumber: true
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
                message: "",
                isMontoActual:true
            }, 
            validation:{
                required: true,
                isMontoActual:true
            }               
        },
    }
    componentWillMount(){
        //Actualizar lista de fibras
        axios.get('/mantenimiento/devolverlistafibra').then(respta =>{
            const listtipdoc = {...this.state};
            listtipdoc.fibraselect.options=respta.data.objeto;
            listtipdoc.fibraselect.value=respta.data.objeto[0].id;
            this.setState({fibraselect: listtipdoc.fibraselect});

        });
        //Actualizar lista de inversionistas
        axios.get('/mantenimiento/devolverlistainversionista').then(respta =>{
            const listtipdoc = {...this.state};
            listtipdoc.inversionistaselect.options=respta.data.objeto;
            listtipdoc.inversionistaselect.value=respta.data.objeto[0].id;
            this.setState({inversionistaselect: listtipdoc.inversionistaselect});

        });
        //Actualizar lista de Años o Periodos
        //fechaventa
        /*
        axios.get('/mantenimiento/devolverlistatperiodo').then(respta =>{
            const listtipdoc = {...this.state};
            listtipdoc.fechaventa.options=respta.data.objeto;
            listtipdoc.fechaventa.value=respta.data.objeto[0].id;
            this.setState({fechaventa: listtipdoc.fechaventa});

        });
        */
    
    

    }
    changeHandlerupdate=(event,nomInput,indice)=>{
        if(nomInput==='fechaventa'){
            // CONSTANTES
            const inputsUpdated = {...this.state};        
            const inputUpdated = inputsUpdated.VentaContrato;
            
            
            //this.setState({nomInput: inputsUpdated});
            if(nomInput==='fechaventa'){
                
                for (let l=0;l<this.state.numerocontratos;l++){
                    //asignar valor  
                    if(l===indice){
                        inputUpdated[indice].fechaVentatercero=event.target.value.substr(0,10)
                    }
                }
                // Guardar cambios
                inputsUpdated['VentaContrato'] = inputUpdated;                
                this.setState({VentaContrato:inputUpdated});
            }
            
            

        }else{
        // CONSTANTES
        const inputsUpdated = {...this.state};        
        const inputUpdated = inputsUpdated[nomInput];
        //console.log(event.target.value);

        // VALIDAR ERRORES DE FORMATO DE ENTRADA
        let nuevoValor = event.target.value;
        let ultimoCaracter = nuevoValor.charAt(nuevoValor.length-1);
        //
        if(inputUpdated.validation.fibraselect){
            //Evita el cambio de seleccion del despleagble
            inputUpdated.inputProps.disabled=true
        }
        if(inputUpdated.validation.inversionistaselect){
            //Evita el cambio de seleccion del despleagble
            //inputUpdated.inputProps.disabled=true
        }
        // Validación si es TRIMESTRE
        if (inputUpdated.validation.isTrimestre){
            
            let estaborrando = (nuevoValor.length < inputUpdated.value.length);
            
            const re = /^[0-9\b]+$/;
            // Agregar "-0" Para el proyecto de fibra else "-"
            if (!estaborrando && nuevoValor.length === 4){
                nuevoValor = nuevoValor + "-0";
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
            //Valido solo para el proyecto de Fibra
            //la seccion periodo solo admite 1 al 4 en la parte Trimestre
            if(nuevoValor.length>=7 && ultimoCaracter*1>4 ){
                //console.log('holi')
                nuevoValor = nuevoValor.substring(0,6)
               

            }
            
            

            event.target.value=nuevoValor
                
        }
        if(nomInput==='inversionistaselect'){  
            const inputUpdateds = inputsUpdated.VentaContrato
            console.log(event.target.value)
            //Inicio
            for (let l=0;l<this.state.numerocontratos;l++){
                //asignar valor  
                if(l===indice){
                    inputUpdateds[indice].idInversionista=event.target.value
                }
            }
            // Guardar cambios
            inputsUpdated['VentaContrato'].idInversionista = inputUpdateds;                
                this.setState({VentaContrato:inputUpdateds});
            //Fin         
        }
        if(inputUpdated.validation.isNumber){
            //Verificar si es numero
            const re = /^[.0-9\b]+$/;
                if (!(re.test(ultimoCaracter)|| nuevoValor==="")){                
                    nuevoValor = inputUpdated.value;
                    event.target.value=nuevoValor                    
                }
            //Verificar si existe parte decimal
            if((event.target.value).toString().split(".")[1]>=0){
                //console.log('hola',(event.target.value).toString().split(".")[1]);
                //Determina la cantidad de caracteres
                let largo=(event.target.value).toString().length
                //determina el numero de decimales
                let decimal=((event.target.value).toString().split(".")[1]).length
                //console.log(decimal)
                if(decimal*1<=2){
                    event.target.value=nuevoValor
                }
                else{
                    event.target.value=nuevoValor.toString().substr(0,largo*1-1)
                }

                

            }
            
            if(nomInput==='rebajainput'){  
                const inputUpdateds = inputsUpdated.VentaContrato
                //Inicio
                for (let l=0;l<this.state.numerocontratos;l++){
                    //asignar valor  
                    if(l===indice){
                        inputUpdateds[indice].montoRebaja=event.target.value
                    }
                }
                // Guardar cambios
                inputsUpdated['VentaContrato'].montoRebaja = inputUpdateds;                
                    this.setState({VentaContrato:inputUpdateds});
                //Fin         
            }
            

        }


        //asignar valor        
        inputUpdated.value=event.target.value
        //event.target.value;
        // Guardar cambios
        inputsUpdated[nomInput] = inputUpdated;
        this.setState({nomInput: inputsUpdated});

        
    }
    //Calcular el cambio del Monto Actual de Inversion
    //this.montoActualInversion()  


    }
    searchHandler = () => {
        //RESULTADO        
        const request = {
            IdFibra: this.state.fibraselect.value,
            Periodo:this.state.periodo.value,          
            //
            UsuCreacion : ''+auth.getProfile().idusuario,
        }
        //console.log(request);
        // DATOS GENERALES   
        
        axios.post('/contrato/buscarContratoV2',request).then(resp =>{
            if(resp.data.flag){
                this.setState({showdatafiber:true})
                //console.log(resp.data.objeto);
                //ResultadoEjercicio:this.state.resultadoejerinput.value,
                //IngresoAlquiler:this.state.ingresoalquilerinput.value,
                //this.setState({resultadoejerinput:resp.data.objeto})
                //this.setState({ingresoalquilerinput:resp.data.objeto})
                this.setState({lstcontratos:resp.data.objeto})
                this.setState({showtable:true})
            }else{
                this.setState({showdatafiber:true})
                alert('No se encontraron registros para la Fibra seleccionada.')
            }                         
        }); 
    }
    submitHandler = () => {
        
        
        // DATOS GENERALES        
        const request = {
            IdFibra: this.state.fibraselect.value,
            Periodo:this.state.periodo.value,
            ResultadoEjercicio:this.state.resultadoejerinput.value,
            IngresoAlquiler:this.state.ingresoalquilerinput.value,
            //Inversion:this.state.inversioninput.value*1,             
            //
            UsuCreacion : ''+auth.getProfile().idusuario,
            lstInversion:this.state.VentaContrato
        }
        //console.log(request);
        //RESULTADO 
        //Verifica datos Principales
        let datos_princ=false;
        if(request.IdFibra===this.state.fibraselect.options[0].id || request.Periodo===""||this.state.periodo.valid===false)
        {
            datos_princ=true;
        }
        //Verifica datos de Contacto 
        let datos_contacto=false;
        let fila=0;
        for(var i=1;i<request.lstInversion.length;i++)
        {
            fila=i;
            //Verificar si el Inverionista y Monto Rebaja en Datos Contacto esta marcada
            if(request.lstInversion[fila].idInversionista==="" || request.lstInversion[fila].montoRebaja*1=== 0)
            {
                //en caso este vacia
                datos_contacto=true;
                break
            }

        }
        //Verificar el Monto Actual Inversión mayor a cero y el Inversionista
        if( datos_princ===true||datos_contacto===true ){    
            alert('No se Guardo registros. Verificar los Datos Pincipales, Ingresos e Inversiones');
        }
        else{
            //Grabar Registros
            axios.post('/contrato/grabarContratoV2',request).then(resp =>{
                if(resp.data.flag){
                    alert('Registro grabado');
                    this.limpiarData()
                }                    
            });
        }
         
        
    }
    limpiarData=()=>{
        const inputsUpdated = {...this.state};
        //ID del registro seleccionado
            inputsUpdated.idContratoSeleccionado=0;
            //Otros datos relacionados
            
            inputsUpdated.fibraselect.value=inputsUpdated.fibraselect.options[0].id;
            inputsUpdated.fibraselect.inputProps.disabled=false;
            inputsUpdated.inversionistaselect.value=inputsUpdated.inversionistaselect.options[0].id;
            inputsUpdated.inversionistaselect.inputProps.disabled=false;
            inputsUpdated.fechainversion.value="";
            inputsUpdated.inversioninput.value="";
            inputsUpdated.montoactualinput.value="";

            inputsUpdated.periodo.value="";
            inputsUpdated.resultadoejerinput.value="";
            inputsUpdated.ingresoalquilerinput.value="";



            
            this.setState({fibraselect:inputsUpdated.fibraselect})
            this.setState({inversionistaselect:inputsUpdated.inversionistaselect})
            this.setState({fechainversion:inputsUpdated.fechainversion})
            this.setState({inversioninput:inputsUpdated.inversioninput})
            this.setState({montoactualinput:inputsUpdated.montoactualinput})

            this.setState({periodo:inputsUpdated.periodo})
            this.setState({resultadoejerinput:inputsUpdated.resultadoejerinput})
            this.setState({ingresoalquilerinput:inputsUpdated.ingresoalquilerinput})
            
            //Fuente de inversion por contrato
            inputsUpdated.VentaContrato=[{id:0,idInversionista:'',fechaVentatercero:'',montoRebaja:''}];
            inputsUpdated.numerocontratos=1;
            this.setState({numerocontratos:inputsUpdated.numerocontratos})
            this.setState({VentaContrato:inputsUpdated.VentaContrato})
            //El boton esta en modo de grabar un nuevo registro
            this.setState({showbtnsave:true})
            this.setState({showdatafiber:false})
            this.setState({showtable:false})
        
    }
    editHandler=()=>{
         
         // DATOS GENERALES       
         const request = {
            Id:this.state.idContratoSeleccionado*1,
            IdFibra: this.state.fibraselect.value*1,
            Periodo:this.state.periodo.value,
            ResultadoEjercicio:this.state.resultadoejerinput.value,
            IngresoAlquiler:this.state.ingresoalquilerinput.value,
            
            //
            UsuModificacion : ''+auth.getProfile().idusuario,
            lstInversion:this.state.VentaContrato
        }
        //console.log(request);
        //RESULTADO 
        //Verifica datos Principales
        let datos_princ=false;
        if(request.IdFibra===this.state.fibraselect.options[0].id || request.Periodo===""||this.state.periodo.valid===false)
        {
            datos_princ=true;
        }
        //Verifica datos de Contacto 
        let datos_contacto=false;
        let fila=0;
        for(var i=1;i<request.lstInversion.length;i++)
        {
            fila=i;
            //Verificar si el Inverionista y Monto Rebaja en Datos Contacto esta marcada
            if(request.lstInversion[fila].idInversionista==="" || request.lstInversion[fila].montoRebaja*1=== 0)
            {
                //en caso este vacia
                datos_contacto=true;
                break
            }

        }
        //Verificar el Monto Actual Inversión mayor a cero y el Inversionista
        if( datos_princ===true||datos_contacto===true ){    
            alert('No se Guardo registros. Verificar los Datos Pincipales, Ingresos e Inversiones');
        }else{
            axios.post('/contrato/editarContratoV2',request).then(resp =>{
                if(resp.data.flag){
                    alert('Se actualizo el registro');                
                    this.setState({showbtnsave:!this.state.showbtnsave})
                    this.limpiarData();
                }
    
                        
            });

        } 
            
        
    }
    blurHandler = (event, nomInput,indice) =>{     
        const inputsUpdated = {...this.state};        
        const inputUpdated = inputsUpdated[nomInput];
        if(nomInput==="rebajainput"){
            //console.log('oli')
            inputUpdated.valid = this.valid(inputUpdated,indice);
            
        }
        else{
            inputUpdated.valid = this.validationHandler(inputUpdated);

        }

        inputUpdated.valid = this.validationHandler(inputUpdated);
        if (inputUpdated.valid.flag===false && event.target.type ==='input'){
            inputUpdated.value = "";
        }
        // Guardar cambios
        inputsUpdated[nomInput] = inputUpdated;
        this.setState({input: inputsUpdated});
    }
    valid=(input,indice)=>{
        const valido = {...input.valid};
        valido.touched = true;
        valido.flag  =true;
        if (input.validation.isNumber){
            input.value=this.state.VentaContrato[indice].montoRebaja;
            console.log(input)

            //Validacion correo @ y . en dominio
            //const  Monto = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            //
            valido.flag=input.value.length*1===0?true:false
            if (valido.flag===false)
            {
                if (isNaN(input.value)){
                    //alert ("Ups... " + input.value + " no es un número.");
                    valido.flag=false;
                    valido.message=valido.flag?"":"No es un número";
                    
                } else {
                    if (input.value - Math.floor(input.value) === 0) {
                        //alert ("Es un numero entero");
                    } else {
                        //alert ("Es un numero decimal");
                    }
                    valido.flag=true;

                }
                valido.message=valido.flag?"":"Usa . decimal o revisa los dígitos";
                
                

            } 
        }
        return valido;
    }
    validationHandler = (input) => {
        
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
                    valido.message = valido.flag?"":"Periodo incorrecto.";
                }
            }
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
                valido.flag=input.value.length*1===0?true:false
                if (valido.flag===false)
            {
                if (isNaN(input.value)){
                    //alert ("Ups... " + input.value + " no es un número.");
                    valido.flag=false;
                    valido.message=valido.flag?"":"No es un número";
                    
                } else {
                    if (input.value - Math.floor(input.value) === 0) {
                        //alert ("Es un numero entero");
                    } else {
                        //alert ("Es un numero decimal");
                    }
                    valido.flag=true;

                }
                valido.message=valido.flag?"":"Usa . decimal o revisa los dígitos";
                
                

                }
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
            if(input.validation.isMontoActual){
                console.log('validar',input.value)
                const valor = input.value
                valido.flag= (valor*1>=0)?true:false;
                valido.message=valido.flag?"":"No es número";

            }
        }
        //console.log(valido)

        return valido;
    }
    callbackFunction = (childData) => {
        this.setState({showbtnsave:!this.state.showbtnsave})
        //call back recovery data
        this.setState({data: childData})
        //hide table
        this.setState({showtable:!this.state.showtable})
        //console.log(childData)
             
        const inputsUpdated = {...this.state};
        //ID del registro seleccionado
            inputsUpdated.idContratoSeleccionado=childData.id;
            //Otros datos relacionados
            
            inputsUpdated.fibraselect.value=childData.idFibra;
            inputsUpdated.periodo.value=childData.periodo;
            inputsUpdated.ingresoalquilerinput.value=childData.ingresoAlquiler;
            inputsUpdated.resultadoejerinput.value=childData.resultadoEjercicio;
            //Fuente de inversion por contrato
            
            inputsUpdated.numerocontratos=childData.lstInversion.length;
            inputsUpdated.VentaContrato=childData.lstInversion;
            /*for(var i=0;i<inputsUpdated.numerocontratos;i++){
                //
                const temp={id:0,idInversionista:'',fechaVentatercero:'',montoRebaja:''}
                inputsUpdated.VentaContrato.push(temp)


            }*/
            //Grabar valores

                      
            this.setState({numerocontratos:inputsUpdated.numerocontratos})

            this.setState({idContratoSeleccionado:inputsUpdated.idContratoSeleccionado})
            this.setState({fibraselect:inputsUpdated.fibraselect})
            this.setState({periodo:inputsUpdated.periodo})
            this.setState({ingresoalquilerinput:inputsUpdated.ingresoalquilerinput})
            this.setState({resultadoejerinput:inputsUpdated.resultadoejerinput})

            this.setState({VentaContrato:inputsUpdated.VentaContrato})
    }
    PlusIcon=()=>{
        const seccion = this.state
        const numerocontratos=seccion.numerocontratos+1;
        this.setState({numerocontratos:numerocontratos})

        let VentaContrato=this.state.VentaContrato; 
        VentaContrato.push({id:numerocontratos,  
                idInversionista:'',              
                fechaVentatercero:'',
                montoRebaja:''});
        this.setState({VentaContrato:VentaContrato});

    }
    MinusIcon=()=>{
        const seccion = this.state
        const numerocontratos=seccion.numerocontratos-1;
        if(numerocontratos!==0)
        {
            //Reduccion del numero de inversion por contrato
            this.setState({numerocontratos:numerocontratos})
            //Actualizacion de los datos de inversion
            let VentaContrato=this.state.VentaContrato;
            var VentaContratoTemp=[];
            for(let j=0;j<numerocontratos;j++){
                //Asignacion a lista temporal
                VentaContratoTemp.push(
                {id:VentaContrato[j].id,
                    idInversionista:VentaContrato[j].idInversionista===undefined?'':VentaContrato[j].idInversionista,
                    fechaVentatercero:VentaContrato[j].fechaVentatercero===undefined?'':VentaContrato[j].fechaVentatercero,
                    montoRebaja:VentaContrato[j].montoRebaja===undefined?'':VentaContrato[j].montoRebaja,
                });
            }
        //Actualizacion de lista original
        this.setState({VentaContrato:VentaContratoTemp});
        }
        

    }
    dibujar=()=>{
        var i;
        let objeto=[];

        for (i = 0; i <this.state.numerocontratos; i++) {
            let j=i;

            objeto.push(
                <React.Fragment>            
                    <div id={'bloque'+i} key={'bloque'+i}  className="row margenbloque">
                        <div key={'seccioninversionista'+i} className="col_60">     
                            <div key={'contenedorinversionista'+i} className="pad-input">                            
                                <InputComponent key={'componeteinversionista'+i} className="body_tabinput"
                                    {...this.state.inversionistaselect}   
                                    value={this.state.VentaContrato[j].idInversionista}                            
                                    changed={(event)=>this.changeHandlerupdate(event,"inversionistaselect",j)}
                                />            
                            </div>                
                        </div>
                        <div key={'seccionrebaja'+i}  className="pd-3 col_18">
                            <div key={'contenedorreabja'+i} className="pad-input49 margenDerechoNumero">
                                <InputComponent key={'componeterebaja'+i} className=""
                                    {...this.state.rebajainput}   
                                    value={this.state.VentaContrato[j].montoRebaja}
                                    changed={(event)=>this.changeHandlerupdate(event,"rebajainput",j)}
                                    blur={(event)=>this.blurHandler(event,"rebajainput",j)}  
                                />                            
                            </div>                
                        </div>            
                        <div key={'componentemas'+i} className="pd-3 margin_5">
                            <div key={'contenedormas'+i} className="i_contenedorPlus margenPlus">
                                <FiPlusCircle key={'botonmas'+i}  raised='true'
                                    name='heartbeat'
                                    type='font-awesome'
                                    size='26'
                                    color=''/*#f50 */
                                    onClick={() => this.PlusIcon()} 
                                />
                            </div>
                        </div>
                        <div key={'componentemenos'+i} className="pd-3 margin_5">
                            <div key={'contenedormenos'+i} className="i_contenedorPlus margenPlus">
                                <FiMinusCircle  key={'botonmenos'+i}  raised='true'
                                    name='heartbeat'
                                    type='font-awesome'
                                    size='26'
                                    color=''/*#f50 */
                                    onClick={() => this.MinusIcon()} 
                                />
                            </div>
                        </div>                    
                    </div>           
                </React.Fragment>
            )}
        return objeto
    }
    montoActualInversion=()=>{
        const VentaContrato=this.state.VentaContrato;
        let suma=0;//this.state.inversioninput.value;
        
        VentaContrato.forEach(element => {
            //let valor= element.MontoRebaja===NaN?0:element.MontoRebaja*1;
            suma+= isNaN(element.montoRebaja)?0:element.montoRebaja*1;
                       
        });
        //console.log(suma);
        const inputUpdated={...this.state}
        
        inputUpdated.montoactualinput.value=(inputUpdated.inversioninput.value*1-suma*1).toFixed(3);
        if(inputUpdated.montoactualinput.value<0){            
            alert("Revise los montos ingresados, el Monto Actual de Inversion debe ser mayor igual a cero")
        }else{
        this.setState({montoactualinput:inputUpdated.montoactualinput})}
    }
    render(){        
        return(
            <React.Fragment> 
                <div className="tab_seccrigth">                    
                    <div className="row">
                        {/*<h4 className="rowsubheader">Datos Principales</h4>*/}
                        <div className="row">
                            
                            <div className="col-6">
                                <InputComponent className="body_tabinput"
                                    {...this.state.fibraselect}   
                                    value={this.state.fibraselect.value}  
                                    changed={(event)=>this.changeHandlerupdate(event,"fibraselect")}
                                />
                            </div>
                            <div className="col-20 ">
                                <InputComponent className="body_tabinput"
                                    {...this.state.periodo}   
                                    value={this.state.periodo.value}  
                                    changed={(event)=>this.changeHandlerupdate(event,"periodo")}
                                    blur={(event)=>this.blurHandler(event,"periodo")} 
                                />                                
                            </div>
                            <div className="col-30 i_btn">
                                <button className="tab_botonmove" onClick={()=>this.limpiarData()}>{'Limpiar'}</button> 
                                        {this.state.showbtnsave?
                                            <button className="tab_botonmove" onClick={()=>this.submitHandler()}>{'Grabar'}</button>:
                                            <button className="tab_botonmove" onClick={()=>this.editHandler()}>{'Grabar'}</button>
                                        }  
                                <button className="tab_botonmove" onClick={()=>this.searchHandler()}>{'Buscar'}</button>
                            </div>
                            
                            {/* 
                            <div className="row text-derecha">                                
                                <div className="i_contenedorBtn">                                        
                                <button className="tab_botonmove" onClick={()=>this.searchHandler()}>{'Buscar'}</button>
                                </div>
                            </div>
                            */}
                        </div>

                        {this.state.showdatafiber?
                            <div className="row">
                                <div className="rowsubheader margin-subheader">
                                    <h4 >Ingresos declarados en EERR</h4>
                                </div>                                
                                <div className="col-30 margenDerechoNumero pad-inputMoney">
                                    <InputComponent className="body_tabinput"
                                        {...this.state.ingresoalquilerinput}   
                                        value={(this.state.ingresoalquilerinput.value)}                                  
                                        blur={(event)=>this.blurHandler(event,"ingresoalquilerinput")} 
                                        changed={(event)=>this.changeHandlerupdate(event,"ingresoalquilerinput")}
                                    />
                                </div>
                                <div className="col-25 margenDerechoNumero pad-inputMoney">
                                    <InputComponent className="body_tabinput"
                                        {...this.state.resultadoejerinput}   
                                        value={this.state.resultadoejerinput.value}                                  
                                        blur={(event)=>this.blurHandler(event,"resultadoejerinput")} 
                                        changed={(event)=>this.changeHandlerupdate(event,"resultadoejerinput")}
                                    />
                                </div>

                                <div className="row">
                                    <h4 className="pad-subheader">Lista de Inversionistas</h4>
                                </div>
                                

                                {this.dibujar()}
                                {/*
                                <div className="row text-derecha">
                                    <div className="i_contenedorBtnAdi">
                                        <button className="tab_botonmove" onClick={()=>this.limpiarData()}>{'Limpiar'}</button> 
                                        {this.state.showbtnsave?
                                            <button className="tab_botonmove" onClick={()=>this.submitHandler()}>{'Grabar'}</button>:
                                            <button className="tab_botonmove" onClick={()=>this.editHandler()}>{'Grabar'}</button>
                                        }                            
                                    </div>
                                </div>
                                */
                                }

                            </div>                            
                        :null}                              
                        {
                        /*
                        <div className="row">
                        <div className="col-6">
                        <InputComponent className="body_tabinput"
                                {...this.state.fechainversion}   
                                value={this.state.fechainversion.value}  
                                changed={(event)=>this.changeHandlerupdate(event,"fechainversion")}
                                />

                        </div>
                        <div className="col-6 margenDerechoNumero">
                        <InputComponent className="body_tabinput"
                                {...this.state.inversioninput}   
                                value={this.state.inversioninput.value}  
                                changed={(event)=>this.changeHandlerupdate(event,"inversioninput")}
                                blur={(event)=>this.blurHandler(event,"inversioninput")} 
                                />
                        </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                            
                            </div>
                            <div className="col-6 margenDerechoNumero">
                        <InputComponent className="body_tabinput block"
                                {...this.state.montoactualinput}   
                                value={this.state.montoactualinput.value}  
                                changed={(event)=>this.changeHandlerupdate(event,"montoactualinput")}
                                blur={(event)=>this.blurHandler(event,"montoactualinput")} 
                                />
                        </div>
                        </div>
                        */
                        }
                    </div>
                    {this.state.showtable?
                        <div className="row">                    
                            <TableImpuestoV2 content={this.state.lstcontratos}  parentCallback = {this.callbackFunction}></TableImpuestoV2>
                        </div>
                    :null}        
                </div>
            </React.Fragment>
        );
    }
}
export default Inversionista;