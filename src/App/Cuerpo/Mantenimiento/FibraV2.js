import '../Body.css';
import './Mantenimiento.css'
import React, {Component} from 'react';
import {FiPlusCircle,FiMinusCircle} from "react-icons/fi";
import InputComponent from '../../../Helpers/Component/Input/InputComponent';
import axios from 'axios';
import TableFibras from '../../../Helpers/Tables/TableFibras';
import authServices from '../../../Services/AuthServices';

const auth = new authServices();
class Fibra extends Component{
    state={
        idFibraSeleccionado:0,
        detallepanel: false,
        showbtnsave:true,
        //Show table when click on search-btn( if flag:true)
        showtable:false,
        //Datos en tabla
        lstBeneficiarios:[],

        loading:true,
        editable:true,
        
        disabled:false,
        eliminar:false,        
        //Lista Fuente Persona
        numerofuentes:1,
        FuentePersona:[{id:1,año:'',depreciacion:'',establecimiento:''}],
        
        inilang: 0,
        lang:2,
        
        pais:"",
        periodo:"",
        rentabruta:"",
        depreciacion:"",
        utilidadneta:"",
        baseimponible:"",
        //Flag Activo
        /*
        activecheck:{
            type:"checkbox",
            name:"activecheck",                
            label:"Check Registro Activo",
            value:0,
            inputProps:{
                placeholder:"",
                type:"checkbox",
                disabled: false
                
            },
            valid: {                    
                flag: false,
                touched: false,
                message: ""
            }, 
            validation:{
                required: false,            
            }
    
        }, 
        */

        //Datos generales
        rucinput: {
            type:"input",
            name: "rucinput",                
            label: "RUC",
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
                isRuc:true
            }               
        },
        nombredatprincipalinput: {
            type:"input",
            name: "nombredatprincipalinput",                
            label: "Nombre*",
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
                name:true
            }               
        },
        direcciondatprincipalinput: {
            type:"input",
            name: "direcciondatprincipalinput",                
            label: "Domicilio/Resolución Fiscal",
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
                comments:true
            }               
        },
        //
        entidadtitulizadorainput:{
            type:"input",
            name: "direcciondatprincipalinput",                
            label: "Entidad Titulizadora",
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
                comments:true
            }
        },
        contadorgeneralinput:{
            type:"input",
            name: "contadorgeneralinput",                
            label: "Contador General ET",
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
                comments:true
            }               
        },
        
        //Representante legal
        nrodocrepresentlegalinput: {
            type:"input",
            name: "nrodocinput",                
            label: "Número de documento",
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
        nombrerepresentlegalinput: {
            type:"input",
            name: "nombrerepresentlegalinput",                
            label: "Representante Legal ET",
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
                comments:true
            }               
        },
        tpodocrepresentlegalinput: {
            type:"select",
            options: [{id:1, descripcion:"DNI"},{id:2, descripcion:"RUC"},{id:3, descripcion:"Carnet extranjeria"},{id:4, descripcion:"NIT"}],
            name: "tpodocinput",                
            label: "Tipo de documento",
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
        //Detalles monetarios
        paisinput: {
            type:"select",
            options: [{id:1, descripcion:"Perú"},{id:2, descripcion:"Bolivia"},{id:3, descripcion:"Chile"},{id:4, descripcion:"Argentina"}],
            name: "paisinput",                
            label: "País Residencia Fiscal",
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
        periodoinput: {
            type:"select",
            options:[{id:1,descripcion:2009},{id:2,descripcion:2010},{id:3,descripcion:2011},{id:4,descripcion:2012},{id:5,descripcion:2013},{id:6,descripcion:2014}],
            //type:"input",          
            name: "periodoinput",
            label: "Año",
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
            }
            
        },
        
        rentabrutainput: {
            type:"input",
            name: "rentabrutainput",                
            label: "Renta bruta",
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
        estandarinput: {
            type:"input",
            name: "estandarinput",                
            label: "Estándar",
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
                isNumber:true
            }               
        },
        utilidadnetainput: {
            type:"input",
            name: "utilidadnetainput",                
            label: "Utilidad neta",
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
        establecimientoinput: {
            type:"input",
            name: "establecimientoinput",                
            label: "Establecimiento Permanente",
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
    
    searchHandler = () => {
        //RESULTADO        
        const request = {
            Descripcion: this.state.nombredatprincipalinput.value,
            Ruc: this.state.rucinput.value,
            IdPais:this.state.paisinput.value,
            EntidadTitulizadora:this.state.entidadtitulizadorainput.value,
            Domicilio:this.state.direcciondatprincipalinput.value,
            ContadorGeneral:this.state.contadorgeneralinput.value,
            fntPersona:this.state.FuentePersona,
            //
            UsuCreacion : ''+auth.getProfile().idusuario,
        }
        //console.log(request);
        // DATOS GENERALES   
            
        axios.post('/fibra/buscarFibra',request).then(resp =>{
            if(resp.data.flag){
                this.setState({lstBeneficiarios:resp.data.objeto})
                this.setState({showtable:true})
            }
            else{
                alert('No se encontro registros')
            }                    
        });     
        
    }    
    
    submitHandler = () => {
        
        // DATOS GENERALES      
        const request = {
            Descripcion: this.state.nombredatprincipalinput.value,
            Ruc: this.state.rucinput.value,
            IdPais:this.state.paisinput.value,
            RepLegal:this.state.nombrerepresentlegalinput.value,
            EntidadTitulizadora:this.state.entidadtitulizadorainput.value,
            Domicilio:this.state.direcciondatprincipalinput.value,
            ContadorGeneral:this.state.contadorgeneralinput.value,
            //fntPersona:this.state.FuentePersona,
            //
            UsuCreacion : ''+auth.getProfile().idusuario,
        }
        //console.log(request);
        //RESULTADO  
        let depreciacion_vacio=false;
        /*
        let fila=0;
        for(var i=1;i<request.fntPersona.length;i++)
        {
            fila=i;
            //Verificar si la fecha y monto en la fuente persona esta marcada
            if(request.fntPersona[fila].depreciacion==="" || request.fntPersona[fila].año=== this.state.paisinput.options[0].id)
            {
                //en caso este vacia
                depreciacion_vacio=true;
                break
            }

        }
        */
        //Verificar que los campos nombre de fibra , año y monto de fuente persona este registrados
        if( request.Descripcion==="" || depreciacion_vacio===true)
        {
            alert('No se Guardo los registros. Verificar Nombre , Año y Estándar en fuente persona');

        }
        else{
            //Grabar Registros
            axios.post('/fibra/grabarFibra',request).then(resp =>{
                if(resp.data.flag){
                    alert('Registro grabado');
                    this.limpiarData()
                }                    
            }); 

        }

            
        
    }
    editHandler = () => {
        
        // DATOS GENERALES      
        const request = {
            Id:this.state.idFibraSeleccionado,
            Descripcion: this.state.nombredatprincipalinput.value,
            Ruc: this.state.rucinput.value,
            IdPais:this.state.paisinput.value,
            RepLegal:this.state.nombrerepresentlegalinput.value,
            EntidadTitulizadora:this.state.entidadtitulizadorainput.value,
            Domicilio:this.state.direcciondatprincipalinput.value,
            ContadorGeneral:this.state.contadorgeneralinput.value,
            //fntPersona:this.state.FuentePersona,
            //
            UsuModificacion : ''+auth.getProfile().idusuario,
        }
        //console.log(request);
        //RESULTADO  
        let depreciacion_vacio=false;
        
        /*
        let fila=0;
        for(var i=1;i<request.fntPersona.length;i++)
        {
            fila=i;
            //Verificar si la fecha y monto en la fuente persona esta marcada
            if(request.fntPersona[fila].depreciacion==="" || request.fntPersona[fila].año=== this.state.paisinput.options[0].id)
            {
                //en caso este vacia
                depreciacion_vacio=true;
                break
            }

        }
        */
        //Verificar que los campos nombre de fibra , año y monto de fuente persona este registrados
        if( request.Descripcion==="" || depreciacion_vacio===true)
        {
            alert('No se Actualizo los registros. Verificar Nombre , Año y Estándar en fuente persona');

        } else{
            axios.post('/fibra/editarFibra',request).then(resp =>{
                if(resp.data.flag){
                    alert('Se actualizo el registro');
                    this.setState({showbtnsave:!this.state.showbtnsave})   
                    this.limpiarData()
                }
    
                        
            });
            
        } 
            
        
    }
    limpiarData=()=>{
        const inputsUpdated = {...this.state};
        //ID del registro seleccionado
        inputsUpdated.numerofuentes=1;
        inputsUpdated.idSeleccionado=0
        inputsUpdated.nombredatprincipalinput.value="";
        inputsUpdated.rucinput.value="";
        inputsUpdated.paisinput.value=inputsUpdated.paisinput.options[0].id;    
        inputsUpdated.entidadtitulizadorainput.value="";  
        inputsUpdated.nombrerepresentlegalinput.value="";
        inputsUpdated.direcciondatprincipalinput.value="";
        inputsUpdated.contadorgeneralinput.value="";
        inputsUpdated.FuentePersona=[{id:1,año:'',depreciacion:'',establecimiento:''}];

        this.setState({numerofuentes:inputsUpdated.numerofuentes})
        this.setState({nombrerepresentlegalinput:inputsUpdated.nombrerepresentlegalinput})
        this.setState({idSeleccionado:inputsUpdated.idSeleccionado})
        this.setState({nombredatprincipalinput:inputsUpdated.nombredatprincipalinput})    
        this.setState({rucinput:inputsUpdated.rucinput})
        this.setState({paisinput:inputsUpdated.paisinput})
        this.setState({entidadtitulizadorainput:inputsUpdated.entidadtitulizadorainput})    
        this.setState({direcciondatprincipalinput:inputsUpdated.direcciondatprincipalinput})    
        this.setState({contadorgeneralinput:inputsUpdated.contadorgeneralinput})
        this.setState({FuentePersona:inputsUpdated.FuentePersona})
    }
    panelClickHandler = () => {
        this.setState({detallepanel: !this.state.detallepanel})
    }
    callbackFunction = (childData) => {
        this.setState({showbtnsave:!this.state.showbtnsave})
        //call back recovery data
        this.setState({data: childData})
        console.log(childData)        
        //hide table
        this.setState({showtable:!this.state.showtable})        
        const inputsUpdated = {...this.state};
        //ID del registro seleccionado
            inputsUpdated.idFibraSeleccionado=childData.id;
            //Otros datos relacionados
            inputsUpdated.nombredatprincipalinput.value=childData.descripcion;            
            inputsUpdated.rucinput.value=childData.ruc;            
            inputsUpdated.paisinput.value=childData.idPais;
            inputsUpdated.nombrerepresentlegalinput.value=childData.repLegal;
            
            inputsUpdated.entidadtitulizadorainput.value=childData.entidadTitulizadora===null?"":childData.entidadTitulizadora;
            inputsUpdated.direcciondatprincipalinput.value=childData.domicilio===null?"":childData.domicilio;
            inputsUpdated.contadorgeneralinput.value=childData.contadorGeneral===null?"":childData.contadorGeneral;
            //Fuente de utilidad neta persona 

            //inputsUpdated.FuentePersona=childData.fntPersona;
            //inputsUpdated.numerofuentes=childData.fntPersona.length;
        //this.setState({numerofuentes:inputsUpdated.numerofuentes})
        

        this.setState({idFibraSeleccionado:inputsUpdated.idFibraSeleccionado})
        this.setState({nombredatprincipalinput:inputsUpdated.nombredatprincipalinput})
        this.setState({rucinput:inputsUpdated.rucinput})
        this.setState({paisinput:inputsUpdated.paisinput})
        this.setState({nombrerepresentlegalinput:inputsUpdated.nombrerepresentlegalinput})
        this.setState({entidadtitulizadorainput:inputsUpdated.entidadtitulizadorainput})
        this.setState({direcciondatprincipalinput:inputsUpdated.direcciondatprincipalinput})
        this.setState({contadorgeneralinput:inputsUpdated.contadorgeneralinput})
        //this.setState({FuentePersona:inputsUpdated.FuentePersona})
    
    }
    valid=(input,indice)=>{
        const valido = {...input.valid};
        valido.touched = true;
        valido.flag  =true;
        if (input.validation.isNumber){
            input.value=this.state.FuentePersona[indice].depreciacion;
            //console.log(input)
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
    validationHandler=(input)=>{
        //console.log(input)
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
            if(input.validation.emails){
                            
                //Validacion correo @ y . en dominio
                const  emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
                //
                valido.flag=input.value.length*1===0?true:false
                
                if (valido.flag===false)
                {
                    valido.flag=emailRegex.test(input.value)?true:false;
                    //console.log(input.value.length,' ',input.value.substring(input.value.length*1-4,4))
                    //valido.flag=valido.flag&&input.value.substring(input.value.length*1-4,4)==='.com'?true:false;
                    valido.message=valido.flag?"":"Verificar correo ( '.' o '@' en dominio)";
    
                }          
            }
            if (input.validation.isMonto)
            {
                //console.log(input)
                //Validacion correo @ y . en dominio
                //const  Monto = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
                //
                valido.flag=input.value.length*1===0?true:false
                if (valido.flag===false)
                {
                    if (isNaN(input.value)){
                        //alert ("Ups... " + input.value + " no es un número.");
                        valido.flag=true;
                        valido.message=valido.flag?"":"Verificar correo ( '.' o '@' en dominio)";
                        
                    } else {
                        if (input.value - Math.floor(input.value) === 0) {
                            //alert ("Es un numero entero");
                        } else {
                            //alert ("Es un numero decimal");
                        }
                        valido.flag=false;

                    }
                    valido.message=valido.flag?"":"Es un numero entero";
                    
                    
    
                } 
            }
            

        }
        //console.log(valido)

        return valido;

    }
    changeHandlerupdate=(event,nomInput,indice)=>{
        
        if(/*nomInput==='estandarinput'||*/ nomInput==='periodoinput'||nomInput==='establecimientoinput'){
            // CONSTANTES
            const inputsUpdated = {...this.state};        
            const inputUpdated = inputsUpdated.FuentePersona;
            
            
            this.setState({nomInput: inputsUpdated});
            if(nomInput==='periodoinput'){
                
                for (let l=0;l<this.state.numerofuentes;l++){
                    //asignar valor  
                    if(l===indice){
                        inputUpdated[indice].año=event.target.value.substr(0,10)
                    }
                }
                // Guardar cambios
                inputsUpdated['FuentePersona'] = inputUpdated;                
                this.setState({FuentePersona:inputUpdated});
            }
            
            if(nomInput==='estandarinput'){
                for (let l=0;l<this.state.numerofuentes;l++){
                    //asignar valor  
                    if(l===indice){
                        let valor=Number.isInteger(event.target.value*1)?true:false;
                        if(valor){
                            inputUpdated[indice].depreciacion=event.target.value
                        }else{
                            console.log(event.target.value)
                            let ultimocar=Number.isInteger(event.target.value.substr(event.target.value.length-1,1));
                            
                            if(event.target.value.substr(event.target.value.length-2,1)==='.'){
                                console.log('if',event.target.value)
                                inputUpdated[indice].depreciacion=event.target.value
                            }
                            else{
                                console.log('else',event.target.value)
                                console.log(event.target.value.substr(event.target.value.length-1,1))
                                console.log(!ultimocar)
                                if(!ultimocar){
                                    inputUpdated[indice].depreciacion=event.target.value
                                }
                                
                            }
                            
                        }
                        
                    }
                }
                // Guardar cambios
                inputsUpdated['FuentePersona'] = inputUpdated;                
                this.setState({FuentePersona:inputUpdated});                
            }
            if(nomInput==='establecimientoinput'){
                for (let l=0;l<this.state.numerofuentes;l++){
                    //asignar valor  
                    if(l===indice){
                        inputUpdated[indice].establecimiento=event.target.value
                    }
                }
                // Guardar cambios
                inputsUpdated['FuentePersona'] = inputUpdated;                
                this.setState({FuentePersona:inputUpdated});                
            }

        }else{
            // CONSTANTES
            const inputsUpdated = {...this.state};        
            const inputUpdated = inputsUpdated[nomInput];
            // VALIDAR ERRORES DE FORMATO DE ENTRADA
            let nuevoValor = event.target.value;
            let ultimoCaracter = nuevoValor.charAt(nuevoValor.length-1);

            if(inputUpdated.validation.comments){
                let estaborrando = (nuevoValor.length < inputUpdated.value.length);
                //const re = /^[0-9\b]+$/;
                // Validar si tiene el formato, sino regresar al numero previo
                // if ((!( (!re.test(ultimoCaracter) || nuevoValor===""|| ( estaborrando ))&& nuevoValor.length <= 200 ))){
                if (!( (nuevoValor==="" ||  estaborrando ) || nuevoValor.length <= 90 )){
                    nuevoValor = inputUpdated.value;
                };
                //console.log(nuevoValor)
                event.target.value=nuevoValor
            }
            //Validacion si es emails
            if(inputUpdated.validation.emails){
                let estaborrando = (nuevoValor.length < inputUpdated.value.length);
                
                if (!( (nuevoValor==="" ||  estaborrando ) || nuevoValor.length <= 80 )){
                    nuevoValor = inputUpdated.value;
                };
                
                event.target.value=nuevoValor
            }
            //Validacion si es name
            if(inputUpdated.validation.name){
                if(Number.isInteger(nuevoValor*1))
                {event.target.value=''}
                else
                {
                let estaborrando = (nuevoValor.length < inputUpdated.value.length);
                const re = /^[0-9\b]+$/;
                // Validar si tiene el formato, sino regresar al numero previo
                if ((!( (!re.test(ultimoCaracter) || nuevoValor===""|| ( estaborrando ))&& nuevoValor.length <= 50 ))){
                        nuevoValor = inputUpdated.value;
                    };
                //console.log(nuevoValor)
                event.target.value=nuevoValor

                }
                
            }
            if(inputUpdated.validation.isRuc){
                let estaborrando = (nuevoValor.length < inputUpdated.value.length);
                const re = /^[0-9\b]+$/;
                // Validar si tiene el formato, sino regresar al numero previo
                if ((!( (re.test(ultimoCaracter) || nuevoValor===""|| ( estaborrando ))&& nuevoValor.length <=11 ))){
                        nuevoValor = inputUpdated.value;
                    };
                //console.log(nuevoValor)
                event.target.value=nuevoValor
            }
            if(inputUpdated.validation.isNumber){
                nuevoValor = event.target.value;
                ultimoCaracter = nuevoValor.charAt(nuevoValor.length-1);
                
                //Verificar si es numero
                const re = /^[.0-9\b]+$/;
                    if (!(re.test(ultimoCaracter)|| nuevoValor==="")){                
                        nuevoValor = inputUpdated.value;
                        event.target.value = nuevoValor;
                        //console.log('if',event.target.value);
                                           
                    }
                //Verificar si existe parte decimal
                if((event.target.value).toString().split(".")[1]>=0){
                    //console.log('hola',(event.target.value).toString().split(".")[1]);
                    //Determina la cantidad de caracteres
                    let largo=(event.target.value).toString().length
                    //determina el numero de decimales
                    let decimal=((event.target.value).toString().split(".")[1]).length
                    console.log(decimal)
                    if(decimal*1<=3){
                        event.target.value=nuevoValor
                    }
                    else{
                        event.target.value=nuevoValor.toString().substr(0,largo*1-1)
                    }
    
                }
                
                if(nomInput==='estandarinput'){  
                    const inputUpdateds = inputsUpdated.FuentePersona
                    //Inicio
                    for (let l=0;l<this.state.FuentePersona.length;l++){
                        //asignar valor  
                        if(l===indice){
                            inputUpdateds[indice].depreciacion=event.target.value
                        }
                    }
                    // Guardar cambios
                    inputsUpdated['FuentePersona'] = inputUpdateds;                
                        this.setState({FuentePersona:inputUpdateds});
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

    }
    
    changeHandler=(event,secc)=>{
        const seccion = this.state[secc];
        
        const input = seccion[event.target.name];
        input.value = event.target.value;
        seccion[event.target.name] = input;
        this.setState({[event.target.name]:seccion});   
    }
    blurHandler=(event, nomInput,indice)=>{
        const inputsUpdated = {...this.state};        
        const inputUpdated = inputsUpdated[nomInput];
        if(nomInput==="estandarinput"){
            inputUpdated.valid = this.valid(inputUpdated,indice);
            
        }
        else{
            inputUpdated.valid = this.validationHandler(inputUpdated);

        }
        //console.log(inputUpdated);
        if (inputUpdated.valid.flag===false && event.target.type ==='input'){
            inputUpdated.value = "";

        }
        // Guardar cambios
        inputsUpdated[nomInput] = inputUpdated;

        this.setState({input: inputsUpdated});
        //this.setState({showbtnsave:inputUpdated.valid.flag})
        
    }
    componentWillMount=()=>{
       
        //Actualizar lista de paises
        axios.get('/mantenimiento/devolverlistapaises').then(resp =>{
            
            const inputsUpdated = {...this.state};
            inputsUpdated.paisinput.options=resp.data.objeto;
            inputsUpdated.paisinput.value=resp.data.objeto[0].id;
            //console.log(resp.data.objeto[0].id);                                   
            this.setState({paisinput: inputsUpdated.paisinput});

        });
        //Actualizar lista de Año o Periodo
        //devolverlistatperiodo
        /*
        axios.get('/mantenimiento/devolverlistatperiodo').then(resp =>{
            
            const inputsUpdateds = {...this.state};
            inputsUpdateds.periodoinput.options=resp.data.objeto;
            //inputsUpdateds.periodoinput.value=resp.data.objeto[0].id;
            //console.log(resp.data.objeto[0].id);                                   
            this.setState({periodoinput: inputsUpdateds.periodoinput});

        });
        */
    }
    componentDidMount=()=>{
        
        this.setState({loading:false});
        console.log(this.state.periodoinput)
    }
    PlusIcon=()=>{
        const seccion = this.state
        const Numerofuentes=seccion.numerofuentes+1;
        this.setState({numerofuentes:Numerofuentes})

        let FuentePersona=this.state.FuentePersona; 
            FuentePersona.push({id:Numerofuentes,
                año:'',
                depreciacion:'',
                establecimiento:''});
        this.setState({FuentePersona:FuentePersona});
        //console.log(this.state.FuentePersona)

    }
    MinusIcon=()=>{
        const seccion = this.state;
        const Numerofuentes=seccion.numerofuentes-1;
        
        if(Numerofuentes!==0)
        {
            //Reduccion del numero de fuentes persona
            this.setState({numerofuentes:Numerofuentes})
            //Actualizacion de los datos nometario en la lista Fuente Persona
            let FuentePersona=this.state.FuentePersona;
            var FuentePersonaTemp=[];
            for(let j=0;j<Numerofuentes;j++){
                //Asignacion a lista temporal
                FuentePersonaTemp.push(
                {id:FuentePersona[j].id,
                    año:FuentePersona[j].año===undefined?'':FuentePersona[j].año,
                    depreciacion:FuentePersona[j].depreciacion===undefined?'':FuentePersona[j].depreciacion,
                    establecimiento:FuentePersona[j].establecimiento===undefined?'':FuentePersona[j].establecimiento}
                );
            }
        //Actualizacion de lista original
        this.setState({FuentePersona:FuentePersonaTemp});
        }
        
        
        

    }
    dibujar=()=>{
        var i;
        let objeto=[];
        for (i = 0; i <this.state.numerofuentes; i++) {
            let j=i;
            objeto.push(<React.Fragment key={i}>
            <div id={'bloque'+i} key={'bloque'+i}  className="row margenbloque">
            <div id={'mitadizq'+i} className="col-6">
            <div className="row">
            <div key={'seccionaño'+i} className="col-6 ">     
                        <div key={'contenedoraño'+i} className="i_contenedor">                            
                        <InputComponent  key={'componeteaño'+i} className="body_tabinput"
                            {...this.state.periodoinput}   
                            value={this.state.FuentePersona[j].año===''?this.state.periodoinput.value:this.state.FuentePersona[j].año}  
                            changed={(event)=>this.changeHandlerupdate(event,"periodoinput",j)}                            
                            />            
                        </div>                
            </div>
            <div key={'seccionestandar'+i}  className="col-6">
                        <div key={'contenedorestandar'+i} className="i_contenedor margenDerechoNumero">
                        <InputComponent key={'componeteestandar'+i} className=""
                            {...this.state.estandarinput}   
                            value={this.state.FuentePersona[j].depreciacion===undefined?'':this.state.FuentePersona[j].depreciacion}
                            changed={(event)=>this.changeHandlerupdate(event,"estandarinput",j)}
                            blur={(event)=>this.blurHandler(event,"estandarinput",j)}  
                            />                            
                        </div>
            </div>
            

            </div>
            
            </div>
            <div id={'mitadder'+i}  className="col-6">
                <div className="row">
                <div key={'seccionestablecimiento'+i} className="pd-3  ">            
                        <div key={'contenedorestablecimiento'+i}  className="i_contenedor">
                                                      
                            <InputComponent key={'componenteestablecimiento'+i}  className="body_tabinput"
                            {...this.state.establecimientoinput}   
                            value={this.state.FuentePersona[j].establecimiento===undefined?'':this.state.FuentePersona[j].establecimiento}
                            changed={(event)=>this.changeHandlerupdate(event,"establecimientoinput",j)} 
                            />
                            
                        </div>
            </div>
            <div key={'botonmas'+i} className="pd-3">
                <div  key={'contenedormas'+i} className="i_contenedor margenPlus">
                <FiPlusCircle key={'botonmas'+i} raised='true'
                name='heartbeat'
                type='font-awesome'
                size='26'
                color=''/*#f50 */
                onClick={() => this.PlusIcon()} />
                </div>
            </div>
            <div key={'botonmenos'+i} className="pd-3">
                <div key={'contenedormenos'+i} className="i_contenedor margenPlus">
                <FiMinusCircle key={'botonmenos'+i} raised='true'
                name='heartbeat'
                type='font-awesome'
                size='26'
                color=''/*#f50 */
                onClick={() => this.MinusIcon()} />
                </div>
            </div>
            

                </div>
                
            

            </div>
            
            </div>           
            </React.Fragment>)        
        }
        
        return objeto
    }
    render(){      
        
        return(            
            <React.Fragment>
                <div className="b_navegation">
                    
                </div>
                <div className="tab_seccrigth">
                
                    <div className="row">
                    <h3 className="tab_secctitulo">Datos principales</h3>
                    <div className="row ">
                    
                    <InputComponent className="body_tabinput"
                                                            {...this.state.nombredatprincipalinput}   
                                                            
                                                            value={this.state.nombredatprincipalinput.value}
                                                            changed={(event)=>this.changeHandlerupdate(event,"nombredatprincipalinput")}  
                                                            />
                    </div>
                    <div className="row ">
                        <div className="col-6">
                        <InputComponent className="body_tabinput"
                                                            {...this.state.rucinput}
                                                            
                                                            value={this.state.rucinput.value}  
                                changed={(event)=>this.changeHandlerupdate(event,"rucinput")}
                                />                            
                        </div>
                        <div className="col-6">
                        <InputComponent className="body_tabinput"
                                            {...this.state.entidadtitulizadorainput}
                                            value={this.state.entidadtitulizadorainput.value}
                                            
                                            changed={(event)=>this.changeHandlerupdate(event,"entidadtitulizadorainput")}   
                                            />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-6">
                        <InputComponent className="body_tabinput"
                            {...this.state.paisinput}   
                            value={this.state.paisinput.value}  
                            changed={(event)=>this.changeHandlerupdate(event,"paisinput")}
                            />                          
                        </div>
                        <div className="col-6">
                        <InputComponent className="body_tabinput"
                                            {...this.state.direcciondatprincipalinput}
                                            value={this.state.direcciondatprincipalinput.value}
                                            
                                            changed={(event)=>this.changeHandlerupdate(event,"direcciondatprincipalinput")}   
                                            />
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-6 ">
                            <InputComponent className="body_tabinput"
                                {...this.state.nombrerepresentlegalinput}   
                                
                                    value={this.state.nombrerepresentlegalinput.value}
                                    changed={(event)=>this.changeHandlerupdate(event,"nombrerepresentlegalinput")}  
                                />
                            
                        </div>
                    
                        <div className="col-6">
                                        <InputComponent className="body_tabinput"
                                            {...this.state.contadorgeneralinput}   
                                            
                                                value={this.state.contadorgeneralinput.value}
                                                changed={(event)=>this.changeHandlerupdate(event,"contadorgeneralinput")}  
                                            />
                                             
                        </div>
                    </div>
                    {/*
                    <div className="row margin-Bottom-20">
                        <div className="col-30">
                            
                        </div>
                        <div className="col-6">
                            
                        </div>
                        <div className="col-20 " >
                        <InputComponent className="body_tabinput"
                            {...this.state.activecheck}
                                            
                            value={this.state.activecheck.value}
                            blur={(event)=>this.blurHandler(event,"activecheck")}   
                            changed={(event)=>this.changeHandlerupdate(event,"activecheck")}/>
                            
                        </div>
                        
                    </div>
                    */}
                    </div>
                    
                    
                    {
                    /*
                    <div className="row">
                        <h3>Utilidad Neta de Fuente Persona</h3>
                    </div>
                    <div className="row">
                        {this.dibujar()}
                    </div> 
                    */
                    }
                    <div className="row text-derecha">
                        <div className="i_contenedor">
                            <button className="tab_botonmove" onClick={()=>this.limpiarData()}>{'Limpiar'} 
                            </button>
                            <button className="tab_botonmove" onClick={()=>this.searchHandler()}>{'Buscar'} 
                            </button>
                            {this.state.showbtnsave?<button className="tab_botonmove" onClick={()=>this.submitHandler()}>{'Grabar'} 
                            </button>:<button className="tab_botonmove" onClick={()=>this.editHandler()}>{'Grabar'} 
                            </button>
                            
                            }
                            
                            
                        </div>
                        
                    </div>
                    {
                        this.state.showtable?
                        <div className="row">
                        <TableFibras content={this.state.lstBeneficiarios} clickresult={this.iraHandler}  parentCallback = {this.callbackFunction} />
                        </div>
                        :null
                    }
                    
                </div>
            </React.Fragment>
        );
    }
}

export default Fibra;