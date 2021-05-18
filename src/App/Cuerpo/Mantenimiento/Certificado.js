import '../Body.css';
import './Mantenimiento.css'
import React, {Component} from 'react';

import InputComponent from '../../../Helpers/Component/Input/InputComponent';
import TableFibras from '../../../Helpers/Tables/TableFibras';
import axios from 'axios';
import authServices from '../../../Services/AuthServices';


import PdfCertificadoAnual from './FormatosCertificados/PdfCertificadoAnual668';
//import PopUpFlotante from '../Popup/Popup_flotante';
import './Certificado.css';

//import TxtFormulario1666 from './FormatosCertificados/TxtFormulario1666';
import CertificadoTrimestralExcel from './FormatosCertificados/CertificadoTrimestralExcel';
import ExcelFormulario1666 from './FormatosCertificados/ExcelFormulario1666';

const auth = new authServices();

class Certificado extends Component{
    state={
        filename:"",
        percentZipFile:"",
        numCentificadoRender:"",
        data: null,
        //idioma
        lang:2,
        //Show table when click on search-btn( if flag:true)
        showtable:false,
        //inputs
        numerofuentes:1,
        lstBeneficiarios:[],
        lstPais:[],
        lstCertificado:[],
        showPDF:null,
        showPopupFloat:false,//show popup
        positionPopup:'default',//position popup left, right , default
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
        
        fechaventa: {
            type:"select",
            options:[{id:1,descripcion:2000}],
            //type:"input",          
            name: "fechaventa",
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
                fechaventa:true
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
        

    }
    componentWillMount(){
        //Eleccion por ser el mas documentado y usado(libreria)
        //https://dev.to/finallynero/generating-pdf-documents-in-react-using-react-pdf-4ka7

        //Opcion sin libreria
        //https://www.codexworld.com/export-html-to-word-doc-docx-using-javascript/

        //https://codigofuente.io/crear-pdf-usando-javascript/
        //https://medium.com/@stupid_arnob/create-pdf-with-react-and-jspdf-e603cfe5dd97

        //ejemplo

        //https://codesandbox.io/s/n4wx3nyqkj?file=/index.js
        //Actualizar lista de tipo inversionista
        axios.get('/mantenimiento/devolverlistafibra').then(respta =>{
            const listtipdoc = {...this.state};
            listtipdoc.fibraselect.options=respta.data.objeto;
            this.setState({fibraselect: listtipdoc.fibraselect});

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
    changeHandlerupdate=(event,nomInput)=>{
        // CONSTANTES
        const inputsUpdated = {...this.state};        
        const inputUpdated = inputsUpdated[nomInput];
        //console.log(event.target.value);

        // VALIDAR ERRORES DE FORMATO DE ENTRADA
        let nuevoValor = event.target.value;
        let ultimoCaracter = nuevoValor.charAt(nuevoValor.length-1);
        if(inputUpdated.validation.fechaventa){
            inputUpdated.inputProps.disabled=true
        }
        if(inputUpdated.validation.fibraselect){
            inputUpdated.inputProps.disabled=true
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

        //asignar valor
        
        inputUpdated.value=event.target.value
        //event.target.value;
        // Guardar cambios
        inputsUpdated[nomInput] = inputUpdated;
        this.setState({nomInput: inputsUpdated});


    }
    searchHandler = () => {
        //RESULTADO     
          
        const request = {
            Id:this.state.fibraselect.value,
            //Descripcion: this.state.nombredatprincipalinput.value,
            //Ruc: this.state.rucinput.value,
            //IdPais:this.state.paisinput.value,
            //EntidadTitulizadora:this.state.entidadtitulizadorainput.value,
            //Domicilio:this.state.direcciondatprincipalinput.value,
            //ContadorGeneral:this.state.contadorgeneralinput.value,
            //fntPersona:this.state.FuentePersona,
            //
            UsuCreacion : ''+auth.getProfile().idusuario,
        }
        //console.log(request);
        // DATOS GENERALES   
        console.log(request.Id)
        axios.post('/certificado/buscarFibra',request).then(resp =>{
            if(resp.data.flag){
                this.setState({lstBeneficiarios:resp.data.objeto})
                this.setState({showtable:true})
            }                    
        });     
        
    } 
    /*Formulario SUNAT Excel*/
    formularioTrimestral1666 = () => {
        
        //el objeto request contiene las variables que son consumidas por un endpoint
        
        const request= {
            IdFibra:this.state.fibraselect.value,            
            Periodo:this.state.periodo.value,
            UsuCreacion : ''+auth.getProfile().idusuario,
        }
        if(request.IdFibra!=="" && request.Periodo.length===7 ){
            //axios.post('/certificado/generarFormulario1666',request).then((con)=>{
            axios.post('/certificado/generarFormularioTrimestral1666',request).then((con)=>{
                if(con.data.flag){
                    console.log(con.data.objeto.listFormularios)
                    var contenidoTXT={
                        RUC:con.data.objeto.rucContribuyente,//RUC fibra
                        Trimestre:request.Periodo.substr(0,4)+request.Periodo.substr(6,2),
                        data:con.data.objeto.listFormularios                  
                    }
                    //TxtFormulario1666( contenidoTXT)

                    ExcelFormulario1666(contenidoTXT.data,contenidoTXT.RUC+"GC"+contenidoTXT.Trimestre)
                }
                else{
                    alert("No se encontraron registros")
                }
                
    
            })
        }else{
            alert("Verifique la Fibra y Periodo")
        }
        
        
        
        
    }
    /*Descargar Formulario Cavali Excel usando libreria sheetjs */
    handlerCertificadoTrimestralExcel=()=>{
        const request = {
            IdFibra:this.state.fibraselect.value,            
            Periodo:this.state.periodo.value,
            UsuCreacion : ''+auth.getProfile().idusuario,          
        }
        if(request.IdFibra!=="" && request.Periodo.length===7 ){

            axios.post('/certificado/FormularioTrimestralExcel',request).then(resp =>{
                if(resp.data.flag)
                {                    
                    //this.setState({lstBeneficiarios:resp.data.objeto})
                    //this.setState({showbtnexport:true}) 
                    //csvData={this.state.lstBeneficiarios} fileName={secc}

                    //Genera Excel Tabular sin formato con la data recibida
                    CertificadoTrimestralExcel(resp.data.objeto.reporteExcels,resp.data.objeto.fibraDescripcion+"_"+request.Periodo)                    
                    
                    //Genera Excel con cabecera y Totales con Formato
                    //...


                }
                else
                alert('No se encontro registros')
                    
        
            }).catch("No se encontro registros","Digital Tax Services")
    
    
        }else{
            alert("Verifique la Fibra y Periodo")
        }
        
    }
    /*Decargar Formulario Cavali Excel usando backend */
    descargarCertificadoTrimestralExcel(){
        const request = {
            IdFibra:this.state.fibraselect.value,            
            Periodo:this.state.periodo.value,
            UsuCreacion : ''+auth.getProfile().idusuario,          
        }
        if(request.IdFibra!=="" && request.Periodo.length===7 ){
            axios.post('/reporte/excelDownload',request).then(resp =>{
                
                this.descargaExcel(resp.data)
                
                
            }).catch("Ocurrió un error inesperado. \n Por favor, intentar nuevamente.","Digital Tax Services");
            
        }else{
            alert("Verifique la Fibra y Periodo")
        }

        
    }
    descargaExcel = (fileName) => {
        //console.log(fileName)
        let file = '../excel/' + fileName
        const link = document.createElement('a');
        link.href = file;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
        console.log(valido)

        return valido;
    }
    callbackPopup=(childData)=>{
        
    }
    callbackFunction = (childData) => {
        this.setState({showbtnsave:false})
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

            inputsUpdated.FuentePersona=childData.fntPersona;
            inputsUpdated.numerofuentes=childData.fntPersona.length;
        this.setState({numerofuentes:inputsUpdated.numerofuentes})
        

        this.setState({idFibraSeleccionado:inputsUpdated.idFibraSeleccionado})
        this.setState({nombredatprincipalinput:inputsUpdated.nombredatprincipalinput})
        this.setState({rucinput:inputsUpdated.rucinput})
        this.setState({paisinput:inputsUpdated.paisinput})
        this.setState({nombrerepresentlegalinput:inputsUpdated.nombrerepresentlegalinput})
        this.setState({entidadtitulizadorainput:inputsUpdated.entidadtitulizadorainput})
        this.setState({direcciondatprincipalinput:inputsUpdated.direcciondatprincipalinput})
        this.setState({contadorgeneralinput:inputsUpdated.contadorgeneralinput})
        this.setState({FuentePersona:inputsUpdated.FuentePersona})
    
    }
    /*Generar certificado anual PDF*/
    generarFormularioAnual668 = () => {  
        
        this.executeWebworker() 
        const request = {
            Id:this.state.fibraselect.value,
            Periodo:this.state.periodo.value
        } 
        if (request.Id===null || request.Id===""){
            alert('Por favor, seleccionar una Fibra.');
        }else if (request.Periodo===null || request.Periodo===1){
            alert('Por favor, ingresar un periodo');
        }else{
            axios.post('/certificado/generarFormularioAnual668',request).then(resp =>{
                if(resp.data.flag){
                    console.log(resp.data.objeto)
                    this.setState({lstCertificado:resp.data.objeto.listCertificadoAnual}) 
                    this.setState({filename:resp.data.objeto.fibraDescripcion+"_"+request.Periodo})
                    this.setState({numCentificadoRender:"Procesando..."})

                    const periodo={...this.state.periodo}
                    periodo.inputProps.disabled=true
                    this.setState({periodo:periodo})
                    
                    this.setState({showPDF:true});
                    this.setState({showPopupFloat:true});

                }else{
                    alert('No se encontro data que mostrar')
                }                    
            });     
        }
    }    
    
    //CERAR POPUP
    togglePopupFlotante() {  
        //Cerrar PopUp
        this.setState({  
             showPopupFloat: !this.state.showPopupFloat  
        });  
    }       
    limpiar(){
        const fibraselect={...this.state.fibraselect }     
        const periodo={...this.state.periodo}  
       
        fibraselect.value=fibraselect.options[0].id
        
        fibraselect.inputProps.disabled=false;
        periodo.value=""
        this.setState({fibraselect:fibraselect})
        this.setState({periodo:periodo})
            
    }
    executeWebworker(){
        var w;
        if(typeof(Worker) !== "undefined") {
            if(typeof(w) == "undefined") {
               w = new Worker("./PdfCertificadoAnual.js");
            }
            w.onmessage = function(event) {
              //document.getElementById("result").innerHTML = event.data;
              alert("Your browser support Web Workers...")
            };
          } else {
            //document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers...";
            alert("Sorry, your browser does not support Web Workers...")
          }
    }
    handlerNumCertifcadoAnual(childData){
        console.log('handlerNumCertifcadoAnual',childData)
        this.setState({numCentificadoRender:childData})
    }
    handlerZipEstado(childData){
        //console.log('handlerZipEstado',childData)
        this.setState({percentZipFile:childData})
    }
    handlerShowBoton(){
        const showPDF={...this.state.showPDF}
        this.setState({showPDF:!showPDF})

        const periodo={...this.state.periodo}
        periodo.inputProps.disabled=false
        this.setState({periodo:periodo})
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
                                value={this.state.fibraselect.value}  
                                changed={(event)=>this.changeHandlerupdate(event,"fibraselect")}
                                />
                        </div>
                        <div className="col20">                            
                            <InputComponent  className="body_tabinput"
                            {...this.state.periodo}   
                            value={this.state.periodo.value}  
                            changed={(event)=>this.changeHandlerupdate(event,"periodo")}
                            />
                        </div>
                        <div className="col-30 i_btn ">
                            {
                            /*
                            <button className="tab_botonmove"
                                onClick={()=>this.searchHandler()}>{'Buscar'} 
                            </button>
                            */
                            }
                            <button className="tab_botonmove" disabled={this.state.showPDF}
                                onClick={()=>this.limpiar()}>{'Limpiar'} 
                            </button>
                        </div>
                            
                        </div>
                                                
                    </div>
                    
                    {
                    /*
                    <div className="row text-derecha">
                        <div className="i_contenedor">
                            <button className="tab_botonmove"
                                onClick={()=>this.searchHandler()}>{'Buscar'} 
                            </button>
                            <button className="tab_botonmove"
                                onClick={()=>this.limpiar()}>{'Limpiar'} 
                            </button>
                            
                        </div>
                    </div>
                    */
                    }
                    <div className="row">
                        <div className="row separador">
                            <div className="col-3"></div>
                            <div className="col-6">
                                
                                <button className="tab_botonmove i_contenedor" disabled={this.state.showPDF}
                                    onClick={()=>this.formularioTrimestral1666()}>{'Trimestral de retenciones Sunat'}
                                </button>
                                
                            </div>
                            

                        </div>
                        <div className="row separador">
                            <div className="col-3"></div>
                            <div className="col-6">
                                {/** handlerCertificadoTrimestralExcel*/}
                                <button className="tab_botonmove i_contenedor" disabled={this.state.showPDF}
                                    onClick={()=>this.descargarCertificadoTrimestralExcel()}>{'Trimestral de información por partícipe a CAVALI'} 
                                </button>

                            </div>
                            
                        </div>             
                        
                        
                        <div className="row separador">
                            <div className="col-3"></div>
                            <div className="col-6">
                                <button className="tab_botonmove i_contenedor" disabled={this.state.showPDF}
                                    onClick={()=>console.log('')}>{'Anual de información a la sunat de las rentas por la Titulizadora ***'} 
                                </button>
                            </div>
                            

                        </div>
                        <div className="row separador">
                            <div className="col-3"></div>
                            <div className="col-6">
                                <button className={this.state.showPDF?"btn-block i_contenedor":"tab_botonmove i_contenedor"} disabled={this.state.showPDF}
                                    onClick={()=>this.generarFormularioAnual668()}>{'Anual certificado de atribución y retención.'} 
                                </button>
                                
                            </div>
                            
                        </div>
                    </div>
                    {
                    /* botones en horizontal Trimestral / anual
                    !this.state.showPDF?
                        <div className="row">
                            <div className="row ">                        
                                <div className="col-6 separador">
                                    <button className="tab_botonmove i_contenedor"
                                        onClick={()=>this.formularioTrimestral1666()}>{'Formato 1666 Trimestral de retenciones Sunat'}
                                    </button>
                                </div>
                                <div className="col-6 separador">
                                    <button className="tab_botonmove i_contenedor"
                                        onClick={()=>this.generarFormularioAnual668()}>{'Certificado Anual 668 de atribución y retención'} 
                                    </button>
                                </div>                        
                            </div>
                            <div className="row ">                        
                                <div className="col-6 separador">
                                    <button className="tab_botonmove i_contenedor"
                                        onClick={()=>this.handlerCertificadoTrimestralExcel()}>{'Formato EXCEL Trimestral por partícipe - CAVALI'} 
                                    </button>
                                </div>
                                <div className="col-6 separador">
                                    <button className="tab_botonmove i_contenedor"
                                        onClick={()=>console.log('')}>{'Formato Anual de información a la sunat de las rentas por la Titulizadora ***'} 
                                    </button>
                                </div>                        
                            </div>                        
                        </div>
                        :null
                    */
                    }
                    <div className="row" id={"zippercent"}>
                        <p className="col-6 i_contenedor">{this.state.numCentificadoRender}</p>
                        <p className="col-6 i_contenedor">{this.state.percentZipFile}</p>
                    </div>
                    <div className="row"></div>
                    {
                        this.state.showtable?
                        <div className="row">
                        <TableFibras content={this.state.lstBeneficiarios}  parentCallback = {this.callbackFunction} />
                        </div>
                        :null
                    }
                    
                    <div className="row text-derecha">                        
                        <div className="i_contenedor">
                        </div>
                    </div>
                        {
                        /*
                        <div className="row">
                            {this.state.showPopupFloat ?
                            <PopUpFlotante contenido={null}
                            positionPopUp={this.state.positionPopup}
                            titulo={'Generando PDF'}  
                            closePopup={this.togglePopupFlotante.bind(this)} ></PopUpFlotante>
                            :null
                            }
                        </div>
                        */
                        }
                        

                        {this.state.showPDF?
                        <div id="showPDF" className="row">
                            <PdfCertificadoAnual content={this.state.lstCertificado} filename={this.state.filename} numCentificadoRender={(e)=>this.handlerNumCertifcadoAnual(e)} estadozip={(e)=>this.handlerZipEstado(e) } showPDFs={(e)=>this.handlerShowBoton()} ></PdfCertificadoAnual>
                        </div>
                        :null
                        }
                    
                    
                    
                </div>

            </React.Fragment>
        );

    }
}
export default Certificado;