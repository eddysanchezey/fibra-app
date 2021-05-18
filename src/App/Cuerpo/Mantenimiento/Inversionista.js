import '../Body.css';
import React, {Component} from 'react';
import InputComponent from '../../../Helpers/Component/Input/InputComponent';

import axios from 'axios';
import TableInversionista from '../../../Helpers/Tables/TableInversionista';
import authServices from '../../../Services/AuthServices';

import {AiOutlineDownload} from 'react-icons/ai'
//import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import cargaMasiva from '../../../files/FIBRA - Participes_Masivo.xlsx'

const auth = new authServices();
class Inversionista extends Component{
    state={
        dataBase:{
            flagCargado:false,
            data:[],
        },
        dataPreview:{
            show:false,
            data:[],
        },
        files: {
            show:false,
            data:[{index:1,file:""}]},
        //show/hide when searchbtn click
        showtable:false,
        //loading
        loadingtipoinver:true,
        loadingtipodoc:true,
        loadingpais:true,
        //btn
        showbtnsave:true,
        //idioma
        lang:2,
        //
        flaglstinversionista:false,
        lstinversionista:[],
        //data returned from child component
        data:null,
        //inputs
        IdInversionistaSeleccionado:0,
        tipoinversionista: {
            type:"select",
            options: [{id:1, descripcion:"Tipo1"},{id:2, descripcion:"Tipo2"},{id:3, descripcion:"Tipo3"},{id:4, descripcion:"Tipo4"}],
            name: "tipoinversionista",                
            label: "Tipo inversionista*",
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
        tipodocumento: {
            type:"select",
            options: [{id:1, descripcion:"Tipo1"},{id:2, descripcion:"Tipo2"},{id:3, descripcion:"Tipo3"},{id:4, descripcion:"Tipo4"}],
            name: "tipodocumento",                
            label: "Tipo documento",
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
        documentoinput: {
            type:"input",
            name: "documentoinput",                
            label: "Número documento",
            value:"",
            inputProps:{
                placeholder:"",
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
                isRuc: true
            }               
        },
        nombresinput: {
            type:"input",
            name: "nombresinput",                
            label: "Nombres",
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
        apellidopaternoinput: {
            type:"input",
            name: "apellidopaternoinput",                
            label: "Apellido Paterno",
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
        apellidomaternoinput: {
            type:"input",
            name: "apellidomaternoinput",                
            label: "Apellido Materno",
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
        razonsocial: {
            type:"input",
            name: "razonsocial",                
            label: "Razón Social*",
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
        caracterrenta: {
            type:"selectAll",
            options: [{id:1, descripcion:"Cargando.."},{id:2, descripcion:"Espere..."}],
            name: "caracterrenta",                
            label: "Carácter de Renta",
            value:"",
            inputProps:{
                type:"select",
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
        determinacioncategoria: {
            type:"selectAll",
            options: [{id:1, descripcion:"Cargando.."},{id:2, descripcion:"Espere..."}],
            name: "determinacioncategoria",                
            label: "Determinación de Categoría",
            value:"",
            inputProps:{
                type:"select",
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
        origenrenta: {
            type:"selectAll",
            options: [{id:1, descripcion:"Cargando.."},{id:2, descripcion:"Espere..."}],
            name: "origenrenta",                
            label: "Origen de Renta",
            value:"",
            inputProps:{
                type:"select",
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
        tiporentanodomiciliado: {
            type:"selectAll",
            options: [{id:1, descripcion:"Cargando.."},{id:2, descripcion:"Espere..."}],
            name: "tiporentanodomiciliado",                
            label: "Tipo de Renta No Domiciliados",
            value:"",
            inputProps:{
                type:"select",
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
        codigoISIN: {
            type:"input",
            name: "codigoISIN",                
            label: "Código ISIN",
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

        tipopais: {
            type:"select",
            options: [{id:1, descripcion:"País1"},{id:2, descripcion:"País2"},{id:3, descripcion:"País3"},{id:4, descripcion:"País4"}],
            name: "tipopais",                
            label: "País de Residencia Fiscal",
            value:"",
            inputProps:{
                type:"select",
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
        domicilioinput: {
            type:"input",
            name: "domicilioinput",                
            label: "Domicilio/Residencia Fiscal",
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
        telefonoinput: {
            type:"input",
            name: "telefonoinput",                
            label: "Telefono",
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
        correoinput: {
            type:"input",
            name: "correoinput",                
            label: "Correo",
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
                emails:true
            }               
        },
        autorizationcheck:{
            type:"checkbox",
            name:"autorizationcheck",                
            label:"Establecimiento Permanente",
            value:"",
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




    }
    changeHandlerupdate=(event,nomInput)=>{
        // CONSTANTES
        const inputsUpdated = {...this.state};        
        const inputUpdated = inputsUpdated[nomInput];
        
        // VALIDAR ERRORES DE FORMATO DE ENTRADA
        let nuevoValor = event.target.value;
        let ultimoCaracter = nuevoValor.charAt(nuevoValor.length-1);
        
        //Validacion si es emails
        if(inputUpdated.validation.emails){
            let estaborrando = (nuevoValor.length < inputUpdated.value.length);
            
            if (!( (nuevoValor==="" ||  estaborrando ) || nuevoValor.length <= 80 )){
                nuevoValor = inputUpdated.value;
            };
            
            event.target.value=nuevoValor
        }

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
        
        //asignar valor
        inputUpdated.value=event.target.value

        if(nomInput==='autorizationcheck')
        {
            //inputUpdated.value=nomInput==='autorizationcheck' && this.state.autorizationcheck.value===""?"":1
            inputUpdated.value=event.target.checked?1:0
            inputUpdated.checked=inputUpdated.value===1?true:false
            
        }
        
        
        //event.target.value;
        // Guardar cambios
        inputsUpdated[nomInput] = inputUpdated;
        this.setState({nomInput: inputsUpdated});


    }
    submitHandler=() => {
        // DATOS GENERALES      
        //el objeto request contiene las variables que son consumidas por un endpoint 
        const request = {
            
            IdTpoinversionista: this.state.tipoinversionista.value,
            IdTpodoc: this.state.tipodocumento.value,
            NroDoc:''+this.state.documentoinput.value,
            //Descripcion:this.state.razonsocial.value,
            RazonSocial:''+this.state.razonsocial.value,
            Nombres:''+this.state.nombresinput.value,
            Apellidopaterno:''+this.state.apellidopaternoinput.value,
            Apellidomaterno:''+this.state.apellidomaternoinput.value,
            IdCaracterrenta:this.state.caracterrenta.value,
            IdDetercategoria:this.state.determinacioncategoria.value,
            IdOrigenrenta:this.state.origenrenta.value,
            IdTiporentanodom:this.state.tiporentanodomiciliado.value,
            Codigoisin:this.state.codigoISIN.value,
            IdPais:this.state.tipopais.value,
            Domicilio:''+this.state.domicilioinput.value,
            Telefono:''+this.state.telefonoinput.value,
            Correo:''+this.state.correoinput.value,
            FlgEstabpermanente:this.state.autorizationcheck.value,
            UsuCreacion : ''+auth.getProfile().idusuario,
        }
        //console.log(request)
        //RESULTADO  
        //Verificar que los campos Tipo de inversionista, Nombre/Razón Social este registrados
        if(request.IdTpoinversionista===this.state.tipoinversionista.options[0].id || request.Descripcion==="" ){
            alert('No se Guardo registros. Verificar Tipo de inversionista y Nombre/Razón Social');
        }
        else{
            //Grabar Registros
            axios.post('/inversionista/grabarInversionista',request).then(resp =>{
                //console.log(resp.data)
                alert('Registro grabado');
                this.limpiarData()
    
            }).catch(resp=>{console.log(resp)})

        }
        
    }
    editHandler=() => {
        
        // DATOS GENERALES  
        //el objeto request contiene las variables que son consumidas por un endpoint 
        const request = {
            Id:this.state.IdInversionistaSeleccionado,
            IdTpoInversionista: this.state.tipoinversionista.value,
            IdTpodoc: this.state.tipodocumento.value,
            NroDoc:''+this.state.documentoinput.value,
            //Descripcion:this.state.razonsocial.value,
            RazonSocial:''+this.state.razonsocial.value,
            Nombres:''+this.state.nombresinput.value,
            Apellidopaterno:''+this.state.apellidopaternoinput.value,
            Apellidomaterno:''+this.state.apellidomaternoinput.value,
            IdCaracterrenta:this.state.caracterrenta.value,
            IdDetercategoria:this.state.determinacioncategoria.value,
            IdOrigenrenta:this.state.origenrenta.value,
            IdTiporentanodom:this.state.tiporentanodomiciliado.value,
            Codigoisin:this.state.codigoISIN.value,
            IdPais:this.state.tipopais.value,
            Domicilio:''+this.state.domicilioinput.value,
            Telefono:''+this.state.telefonoinput.value,
            Correo:''+this.state.correoinput.value,
            FlgEstabpermanente:this.state.autorizationcheck.value,
            UsuModificacion : ''+auth.getProfile().idusuario,
        }
        console.log(request)
        //RESULTADO  
        //Verificar que los campos Tipo de inversionista, Nombre/Razón Social este registrados
        if(request.IdTpoinversionista===this.state.tipoinversionista.options[0].id  ){
            alert('No se Actualizo los registros. Verificar Tipo de inversionista y Nombre/Razón Social');
        }else{
            axios.post('/inversionista/updateInversionista',request).then(resp =>{
                //console.log(resp.data);
                //this.setState({showbtnsave:!this.state.showbtnsave}) ;
                if(resp.data.flag){
                    alert('Se actualizo el registro');
                    this.setState({showbtnsave:!this.state.showbtnsave})
                    this.limpiarData()
                }
                
    
    
            }).catch(resp=>{console.log(resp)})

        }
    
    }
    searchHandler=() => {
        
        //el objeto request contiene las variables que son consumidas por un endpoint 
        const request = {
            
            
            IdTpoInversionista: this.state.tipoinversionista.value,
            IdTpodoc: this.state.tipodocumento.value,
            Ruc:this.state.documentoinput.value,
            Descripcion:this.state.razonsocial.value +'',
            IdPais:this.state.tipopais.value,
            Domicilio:this.state.domicilioinput.value,
            Telefono:this.state.telefonoinput.value,
            Correo:this.state.correoinput.value,
            FlgActivo:1,
            FlgEstabpermanente:this.state.autorizationcheck.value===null?1: this.state.autorizationcheck.value
        }
        axios.post('/inversionista/buscarInversionista',request).then(resp =>{
            //console.log(resp.data.objeto);
            if(resp.data.flag){this.setState({lstinversionista:resp.data.objeto})
            this.setState({showtable:true})
            }else{
                alert('No se encontro registros')
            }     
            

        }).catch(resp=>{console.log(resp)})
    
    }
    componentWillMount(){
        //Actualizar lista de paises
        axios.get('/mantenimiento/devolverlistapaises').then(resp =>{
            const inputsUpdated = {...this.state};
            inputsUpdated.tipopais.options=resp.data.objeto;
            inputsUpdated.tipopais.value=resp.data.objeto[0].id;
            this.setState({tipopais: inputsUpdated.tipopais});
            this.setState({loadingpais:false})

        });
        //Actualizar lista de documentos
        axios.get('/mantenimiento/devolverlistatpodoc').then(respt =>{
            
            const listtipdoc = {...this.state};
            listtipdoc.tipodocumento.options=respt.data.objeto;
            listtipdoc.tipodocumento.value=respt.data.objeto[0].id;
            this.setState({tipodocumento: listtipdoc.tipodocumento});
            this.setState({loadingtipodoc:false})
        });
        
        //Actualizar lista de tipo inversionista
        axios.get('/mantenimiento/devolverlistatpoinversionista').then(respta =>{
            const listtipdoc = {...this.state};
            listtipdoc.tipoinversionista.options=respta.data.objeto;
            listtipdoc.tipoinversionista.value=respta.data.objeto[0].id;
            this.setState({tipoinversionista: listtipdoc.tipoinversionista});
            this.setState({loadingtipoinver:false})
        });
        axios.get('/mantenimiento/devolvercaracterrenta').then(respta =>{
            const listtipdoc = {...this.state};
            listtipdoc.caracterrenta.options=respta.data.objeto;
            //listtipdoc.caracterrenta.value=respta.data.objeto[0].id;
            this.setState({caracterrenta: listtipdoc.caracterrenta});
           
            
        });
        
        axios.get('/mantenimiento/devolverdeterminacioncategoria').then(respta =>{
            const listtipdoc = {...this.state};
            listtipdoc.determinacioncategoria.options=respta.data.objeto;
            listtipdoc.determinacioncategoria.value=respta.data.objeto[3].id;
            this.setState({determinacioncategoria: listtipdoc.determinacioncategoria});
            
        });
        axios.get('/mantenimiento/devolverorigenrenta').then(respta =>{
            const listtipdoc = {...this.state};
            listtipdoc.origenrenta.options=respta.data.objeto;
            listtipdoc.origenrenta.value=respta.data.objeto[3].id;
            this.setState({origenrenta: listtipdoc.origenrenta});
            
        });
        axios.get('/mantenimiento/devolverorigenrenta').then(respta =>{
            const listtipdoc = {...this.state};
            listtipdoc.origenrenta.options=respta.data.objeto;
            listtipdoc.origenrenta.value=respta.data.objeto[0].id;
            this.setState({origenrenta: listtipdoc.origenrenta});
            
        });
        axios.get('/mantenimiento/devolvertiporentanodomiciliado').then(respta =>{
            const listtipdoc = {...this.state};
            listtipdoc.tiporentanodomiciliado.options=respta.data.objeto;
            //listtipdoc.tiporentanodomiciliado.value=respta.data.objeto[0].id;
            this.setState({tiporentanodomiciliado: listtipdoc.tiporentanodomiciliado});
           
        });

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
        //this.setState({showbtnsave:inputUpdated.valid.flag})
        
    }
    validationHandler = (input) => {
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
            if (input.validation.isNumber)
            {
                console.log(input.value)
                const valor = input.value
                valido.flag= Number.isInteger(valor*1)?true:false;
                valido.message=valido.flag?"":"No es número";
            }

        }
        //console.log(valido)

        return valido;
    }
    callbackFunction = (childData) => {
        console.log(childData)
        //call back recovery data from action in child component
        //this.setState({data: childData})
        //hide table
        this.setState({showtable:false});
        
        
        /*     
        this.setState({showbtnsave:!this.state.showbtnsave});   
        console.log('btnsave',this.state.showbtnsave);
        this.setState({showtable:false});
        console.log('btnsave',this.state.showbtnsave);
        */

        const stateupdate={...this.state}
            stateupdate.IdInversionistaSeleccionado=childData.id*1;
            stateupdate.tipoinversionista.value=childData.idTpoinversionista*1;
            stateupdate.tipodocumento.value=childData.idTpodoc*1;//childData.idTpodoc*1;
            stateupdate.documentoinput.value=childData.nroDoc;

            stateupdate.tipopais.value=childData.idPais===""?"":childData.idPais;
            stateupdate.nombresinput.value=childData.nombres===null?"":childData.nombres;
            stateupdate.apellidopaternoinput.value=childData.apellidoPaterno===null?"":childData.apellidoPaterno;
            stateupdate.apellidomaternoinput.value=childData.apellidoMaterno ===null?"":childData.apellidoMaterno;
            stateupdate.razonsocial.value=childData.razonSocial ===null?"":childData.razonSocial;
            stateupdate.caracterrenta.value=childData.idCaracterrenta===null?"":childData.idCaracterrenta;
            stateupdate.determinacioncategoria.value=childData.idDetercategoria===null?"":childData.idDetercategoria;
            stateupdate.origenrenta.value=childData.idOrigenrenta===null?"":childData.idOrigenrenta;
            stateupdate.tiporentanodomiciliado.value=childData.idTiporentanodom===null?"":childData.idTiporentanodom;
            stateupdate.codigoISIN.value=childData.codigoisin===null?"":childData.codigoisin;
            
            stateupdate.domicilioinput.value=childData.domicilio===""?"":childData.domicilio;
            stateupdate.telefonoinput.value=childData.telefono===""?"":childData.telefono;
            stateupdate.correoinput.value=childData.correo===""?"":childData.correo;
            stateupdate.autorizationcheck.value=childData.flgEstabpermanente===""?"":childData.flgEstabpermanente;
            stateupdate.showbtnsave=false;
        
        this.setState({showbtnsave:stateupdate.showbtnsave})
        this.setState({IdInversionistaSeleccionado:stateupdate.IdInversionistaSeleccionado});
        this.setState({tipoinversionista:stateupdate.tipoinversionista});
        this.setState({tipodocumento:stateupdate.tipodocumento});
        this.setState({documentoinput:stateupdate.documentoinput});
        this.setState({razonsocial:stateupdate.razonsocial});
        this.setState({tipopais:stateupdate.tipopais});
        this.setState({domicilioinput:stateupdate.domicilioinput});
        this.setState({telefonoinput:stateupdate.telefonoinput});
        this.setState({correoinput:stateupdate.correoinput});
        this.setState({autorizationcheck:stateupdate.autorizationcheck});

        this.setState({nombresinput:stateupdate.nombresinput});
        this.setState({apellidopaternoinput:stateupdate.apellidopaternoinput});
        this.setState({apellidomaternoinput:stateupdate.apellidomaternoinput});
        this.setState({caracterrenta:stateupdate.caracterrenta});
        this.setState({determinacioncategoria:stateupdate.determinacioncategoria});
        this.setState({origenrenta:stateupdate.origenrenta});
        this.setState({tiporentanodomiciliado:stateupdate.tiporentanodomiciliado});
        this.setState({codigoISIN:stateupdate.codigoISIN});
    }
    limpiarData=()=>{
        const stateupdate={...this.state}
        stateupdate.IdInversionistaSeleccionado=0
        stateupdate.tipoinversionista.value=stateupdate.tipoinversionista.options[0].id
        stateupdate.tipodocumento.value=stateupdate.tipodocumento.options[0].id
        stateupdate.documentoinput.value=""
        stateupdate.razonsocial.value=""
        stateupdate.tipopais.value=stateupdate.tipopais.options[0].id
        stateupdate.domicilioinput.value=""
        stateupdate.telefonoinput.value=""
        stateupdate.correoinput.value=""
        stateupdate.autorizationcheck.value=""

        stateupdate.nombresinput.value=""
        stateupdate.apellidopaternoinput.value=""
        stateupdate.apellidomaternoinput.value=""
        stateupdate.caracterrenta.value=""
        stateupdate.determinacioncategoria.value=""
        stateupdate.origenrenta.value=""
        stateupdate.tiporentanodomiciliado.value=""
        stateupdate.codigoISIN.value=""

        
        this.setState({IdInversionistaSeleccionado:stateupdate.IdInversionistaSeleccionado})
        this.setState({tipoinversionista:stateupdate.tipoinversionista})
        this.setState({tipodocumento:stateupdate.tipodocumento})
        this.setState({documentoinput:stateupdate.documentoinput})
        this.setState({razonsocial:stateupdate.razonsocial})
        this.setState({tipopais:stateupdate.tipopais})
        this.setState({domicilioinput:stateupdate.domicilioinput})
        this.setState({telefonoinput:stateupdate.telefonoinput})
        this.setState({correoinput:stateupdate.correoinput})
        this.setState({autorizationcheck:stateupdate.autorizationcheck})

        this.setState({nombresinput:stateupdate.nombresinput})
        this.setState({apellidopaternoinput:stateupdate.apellidopaternoinput})
        this.setState({apellidomaternoinput:stateupdate.apellidomaternoinput})
        this.setState({caracterrenta:stateupdate.caracterrenta})
        this.setState({determinacioncategoria:stateupdate.determinacioncategoria})
        this.setState({origenrenta:stateupdate.origenrenta})
        this.setState({tiporentanodomiciliado:stateupdate.tiporentanodomiciliado})
        this.setState({codigoISIN:stateupdate.codigoISIN})
    }
    
    //funcion para cargar archivo
    handleInputChange=(e)=>{   
        //Cargar data de Excel al aplicativo emplea saveDataHandler()
        
        e.preventDefault();
        var files = e.target.files, f = files[0];
        console.log(f.type)
        var nameFile=f.name
        if(f.type==="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
        
        const files={...this.state.files}
        files.data[0].file=nameFile
        //mostrar nombre del archivo
        files.show=true
        this.setState({files:files})

        const dataBase={...this.state.dataBase}
        
        var dataParserFile=null
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;
            let readedData = XLSX.read(data, {type: 'binary'});
            //Nombre de hoja
            const wsname = readedData.SheetNames[0];
            const ws = readedData.Sheets[wsname];
    
            /* Convert array to json*/
            //https://github.com/SheetJS/sheetjs/issues/482
            //Tomar como cabecera la fila:range
            const dataParse = XLSX.utils.sheet_to_json(ws, {range:0});
            dataParserFile=dataParse
            console.log('dataParse=>',dataParse)
            //console.log(XLSX.utils.sheet_to_json(ws, {range:2}))
        
            
            if(dataParse[0]['CODIGO']!=="" && dataParse[0]['CODIGO']!==undefined ){
                //pertenece al formato de carga
                
                
            for(var temp in dataParse){
                //console.log(dataParse[temp])
                //let myDate = new Date(( (dataParse[temp]['Transaction Date']) - (25567 + 1))*86400*1000)
                const tempDataBase={
                    id:temp*1,
                    //fecha:myDate.toLocaleDateString(),
                    codigo:dataParse[temp]['CODIGO']===undefined?"":dataParse[temp]['CODIGO'],//['Engagement Name/ID'],
                    apellidoPaterno:dataParse[temp]['APELLIDO PATERNO']===undefined?"":dataParse[temp]['APELLIDO PATERNO'],
                    apellidoMaterno:dataParse[temp]['APELLIDO MATERNO']===undefined?"":dataParse[temp]['APELLIDO MATERNO'],
                    nombres:dataParse[temp]['NOMBRES']===undefined?"":dataParse[temp]['NOMBRES'],
                    razonSocial:dataParse[temp]['RAZON SOCIAL']===undefined?"":dataParse[temp]['RAZON SOCIAL'],
                    saldoCavali:dataParse[temp][' SALDO CAVALI ']===undefined?"":dataParse[temp][' SALDO CAVALI '],
                    direccion:dataParse[temp]['DIRECCION']===undefined?"":dataParse[temp]['DIRECCION'],
                    distrito:dataParse[temp]['DISTRITO']===undefined?"":dataParse[temp]['DISTRITO'],
                    tipo:dataParse[temp]['TIPO']===undefined?"":dataParse[temp]['TIPO'],
                    documento:dataParse[temp]['DOCUMENTO']===undefined?"":dataParse[temp]['DOCUMENTO'],
                    residencia:dataParse[temp]['RES']===undefined?"":dataParse[temp]['RES'],
                    nacionalidad:dataParse[temp]['NAC']===undefined?"":dataParse[temp]['NAC'],
                    persona:dataParse[temp]['PER']===undefined?"":dataParse[temp]['PER'],
                    domiciliado:dataParse[temp]['DOM']===undefined?"":dataParse[temp]['DOM'],
                    nombreTitularLargo:dataParse[temp]['NOMBRE DEL TITULAR']===undefined?"":dataParse[temp]['NOMBRE DEL TITULAR'],
                }
                dataBase.data.push(tempDataBase)
            }



            }
            else{
                //No pertnece al formato de carga
                //mostrar nombre del archivo
                //files.show=false
                //this.setState({files:files})
                alert('El archivo seleccionado No pertenece al formato de carga (nombre de hoja:)')
                //return
            }

            //console.log(dataBase)

        };
        reader.readAsBinaryString(f)
        
        reader.onloadend=()=>{    
            
            if(dataParserFile[0]['CODIGO']==="" || dataParserFile[0]['CODIGO']===undefined ){
                //grabar los registros en state
                this.refreshBotonCargar()
                return
    
            }

            const dataBaseTemp={...this.state.dataPreview}
            dataBaseTemp.data=dataBase.data
            dataBaseTemp.show=true
            console.log('dataBaseTemp',dataBaseTemp)
            this.setState({dataPreview:dataBaseTemp})
            /*
            //Imputar data del excel al aplicativo
            this.getData()
            //Reoganizar la lista de opciones
            this.PlusIcon(0)
            this.MinusIcon(1)
            */
            console.log('{...dataBase.data}',{...dataBase.data})
            //Registrar Carga Masiva
            const request={
                cargaMasivas:dataBaseTemp.data
            }
            console.log('request',request)
            
            axios.post('/inversionista/cargaMasiva',request).then(resp =>{
                if(resp.data.flag){
                    alert('Registro grabado');
                    this.limpiarData()
                }                    
            });
            
            
        }
        }else{
            alert('Seleccione un archivo Excel')
        }

            

        
        
    }
    //limpiar boton de carga archivo
    refreshBotonCargar(){
        
       //this.limpiarDatos()
    }
    render(){
        
        return(
            <React.Fragment>
                <div className="b_navegation">
                    
                </div>


                <div className="tab_seccrigth">
                    
                    <div className="row">
                        <h3 className="">Datos principales</h3>
                        
                        <div className="row">
                            <div className="col-6">
                            <InputComponent className="body_tabinput"
                            {...this.state.tipoinversionista}   
                            value={this.state.tipoinversionista.value}  
                            changed={(event)=>this.changeHandlerupdate(event,"tipoinversionista")}
                            />
                            </div>
                            <div className="col-6">
                            <InputComponent className="body_tabinput"
                            {...this.state.razonsocial}   
                            value={this.state.razonsocial.value}  
                            changed={(event)=>this.changeHandlerupdate(event,"razonsocial")}
                            />
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-6">
                            <InputComponent className="body_tabinput"
                            {...this.state.apellidopaternoinput}   
                            value={this.state.apellidopaternoinput.value}  
                            changed={(event)=>this.changeHandlerupdate(event,"apellidopaternoinput")}
                            />
                            </div>
                            <div className="col-6">
                            <InputComponent className="body_tabinput"
                            {...this.state.apellidomaternoinput}   
                            value={this.state.apellidomaternoinput.value} 
                            changed={(event)=>this.changeHandlerupdate(event,"apellidomaternoinput")}
                            
                            />
                            </div>
                            

                        </div>

                        <div className="row">
                            <div className="col-6">
                            <InputComponent className="body_tabinput"
                            {...this.state.nombresinput}   
                            value={this.state.nombresinput.value}  
                            changed={(event)=>this.changeHandlerupdate(event,"nombresinput")}
                            />
                            </div>
                            <div className="col-6">
                            <InputComponent className="body_tabinput"
                            {...this.state.caracterrenta}   
                            value={this.state.caracterrenta.value} 
                            changed={(event)=>this.changeHandlerupdate(event,"caracterrenta")}
                            
                            />
                            </div>
                            

                        </div>

                        <div className="row">
                            <div className="col-6">
                            <InputComponent className="body_tabinput"
                            {...this.state.determinacioncategoria}   
                            value={this.state.determinacioncategoria.value}  
                            changed={(event)=>this.changeHandlerupdate(event,"determinacioncategoria")}
                            />
                            </div>
                            <div className="col-6">
                            <InputComponent className="body_tabinput"
                            {...this.state.origenrenta}   
                            value={this.state.origenrenta.value} 
                            changed={(event)=>this.changeHandlerupdate(event,"origenrenta")}
                            
                            />
                            </div>
                            

                        </div>

                        <div className="row">
                            <div className="col-6">
                            <InputComponent className="body_tabinput"
                            {...this.state.tiporentanodomiciliado}   
                            value={this.state.tiporentanodomiciliado.value}  
                            changed={(event)=>this.changeHandlerupdate(event,"tiporentanodomiciliado")}
                            />
                            </div>
                            <div className="col-6">
                            <InputComponent className="body_tabinput"
                            {...this.state.codigoISIN}   
                            value={this.state.codigoISIN.value} 
                            changed={(event)=>this.changeHandlerupdate(event,"codigoISIN")}                 
                            />
                            </div>
                            

                        </div>


                        <div className="row">
                            <div className="col-6">
                            <InputComponent className="body_tabinput"
                            {...this.state.tipodocumento}   
                            value={this.state.tipodocumento.value}  
                            changed={(event)=>this.changeHandlerupdate(event,"tipodocumento")}
                            />
                            </div>
                            <div className="col-6">
                            <InputComponent className="body_tabinput"
                            {...this.state.documentoinput}   
                            value={this.state.documentoinput.value} 
                            changed={(event)=>this.changeHandlerupdate(event,"documentoinput")}
                            blur={(event)=>this.blurHandler(event,"documentoinput")} 
                            />
                            </div>
                            

                        </div>
                        

                        <div className="row">
                            <div className="col-6">
                            <InputComponent className="body_tabinput"
                                {...this.state.tipopais}   
                                value={this.state.tipopais.value}  
                                changed={(event)=>this.changeHandlerupdate(event,"tipopais")}
                                />
                            </div>
                        
                            <div className="col-6">
                            <InputComponent className="body_tabinput"
                            {...this.state.domicilioinput}   
                            value={this.state.domicilioinput.value}  
                            changed={(event)=>this.changeHandlerupdate(event,"domicilioinput")}
                            />
                            </div>
                            
                        </div>
                        <div className="row">
                        <div className="col-6">
                            <InputComponent className="body_tabinput"
                                {...this.state.telefonoinput}   
                                value={this.state.telefonoinput.value}  
                                changed={(event)=>this.changeHandlerupdate(event,"telefonoinput")}
                                />
                            </div>
                            
                            <div className="col-6">
                            <InputComponent className="body_tabinput"
                            {...this.state.correoinput}   
                            value={this.state.correoinput.value}  
                            changed={(event)=>this.changeHandlerupdate(event,"correoinput")}
                            blur={(event)=>this.blurHandler(event,"correoinput")}
                            />
                            </div>
                            
                        </div>

                        {/*<div clasname="row">
                            
                            <InputComponent className="body_tabinput"
                            {...this.state.autorizationcheck}   
                            value={this.state.autorizationcheck.value}  
                            changed={(event)=>this.changeHandlerupdate(event,"autorizationcheck")}
                            />                            
                        
                        </div>*/}
                        
                    </div>
                    {/*Seleccionar La Carga Masiva de Participes */}
                    <div className="row">
                        <div className="col-6"></div>  
                        
                        <div className="col-6 ">
                            
                            
                                <div className="row margin-10">
                                    <div className="">
                                        <div className="">
                                            <label className="i_label">Seleccionar Archivo:</label>
                                            <button className="tab_botonmove"   onClick={()=>this.fileInput.click()}>Cargar Lista de Inversionistas
                                            <input
                                                required
                                                type="file"
                                                style={{display:'none', height: 70, width: 800}} 
                                                name="file"
                                                id="file"
                                                key="file"
                                                onChange={(event)=>this.handleInputChange(event)}
                                                ref={fileInput=>this.fileInput=fileInput}
                                                placeholder="Archivo Excel"
                                            />
                                            
                                            </button>
                                        </div>
                                        
                                    </div>
                                
                                    <div className="">                                                
                                        <div className="">
                                            <label className="i_label">Descargar Archivo:</label>
                                            <a href={cargaMasiva}><p href={cargaMasiva}><AiOutlineDownload size='25'></AiOutlineDownload>{'Formato Lista de Participes'}</p></a>                                                   
                                        
                                        </div>
                                        
                                    </div>
                                
                                </div>
                            
                            
                            
                            
                            
                            
                            
                            
                        </div>  
                        
                                    
                    </div>  
                                  
                                


                    <div className="row text-derecha">
                        <div className="i_contenedor">
                            <button className="tab_botonmove" onClick={()=>this.limpiarData()}>{'Limpiar'} 
                            </button>
                            <button className="tab_botonmove"
                                onClick={()=>this.searchHandler()}>{'Buscar'} 
                            </button>
                            {this.state.showbtnsave===true?
                            <button className="tab_botonmove"
                                onClick={()=>this.submitHandler()}>{'Grabar'} 
                            </button>:
                            <button className="tab_botonmove"
                                onClick={()=>this.editHandler()}>{'Editar'} 
                            </button>
                            }
                            
                        </div>
                    </div>
                    { this.state.showtable?
                    <div className="row">
                        <TableInversionista  content={this.state.lstinversionista}  parentCallback = {this.callbackFunction}></TableInversionista>
                    </div>:null
                    }
                    

                    
                </div>
            </React.Fragment>
        );
    }
}

export default Inversionista;