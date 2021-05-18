import '../Mantenimiento.css';
import './Formato.css'
import React, { Component } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import JSZip from 'jszip';
import { saveAs } from 'file-saver'; 
import logo from '../../../../img/CredicorpLogo.png'

let newDate = new Date(); 
let newMonth = newDate.getMonth() + 1;

const id_page1 = 'page1_';
const id_page2 = 'page2_';
const id_page3 = 'page3_';
const id_page4 = 'page4_';
const certificate = 'Certificado_';
const extension = '.pdf';
//funcion global
const  updatePercent=(e)=>{
    //console.log(e)    
    return e
}

class PdfCertificado2 extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            updating:true,
            selectedObject:null,
            GetObject:null,
            
            i:null,
            day:newDate.getDate(),
            month:this.renderSwitch(newMonth),
            year:newDate.getFullYear(),
            
            show:true
        };
    }
    updatePercents=(f)=>{
        this.props.estadozip(f)
    }
    handlerShowPDF(){
        this.setState({show:false})
    }
    renderSwitch(parameter){
        switch(parameter) {
            case 1:
                return 'Enero';
            case 2:
                return 'Febrero';
            case 3:
                return 'Marzo';
            case 4:
                return 'Abril';
            case 5:
                return 'Mayo';
            case 6:
                return 'Junio';
            case 7:
                return 'Julio';
            case 8:
                return 'Agosto';
            case 9:
                return 'Septiembre';
            case 10:
                return 'Octubre';
            case 11:
                return 'Noviembre';
            default:
                return 'Diciembre';
          }
    }
    getPosts() {
        return new Promise(function(resolve, reject) {    
            resolve()
        })
    }
    generarImagen(elem){
        return new Promise(function(resolve, reject) {
            const a = html2canvas(elem).then(canvas=>{
                const image = canvas.toDataURL()
                //console.log('b')
                resolve(image)
                return image              
            })
            return a
        })        
    }    
    async generarPDF2(){    

        var zip = new JSZip();

        const arrayPDF = this.props.content; 
        const numeroTotalCertificados=this.props.content.length

        const positionEscrituraPx=1
        var time_incio = new Date(); 
        let numeroCentificadoRender=0
        //console.log(arrayPDF)
        //console.log("mes",arrayPDF[0].periodo.substr(5,2))
        for (const element of arrayPDF){
            
            var doc = new jsPDF({orientation: 'vertical',});

            var width = doc.internal.pageSize.getWidth();
            var height = doc.internal.pageSize.getHeight();// 210 mm  11 Filas(incluye la cabecera de la tabla) fijas + #filas de registros en tabla
            //console.log('width',width,'height',height)
            //width 210.0015555555555 height 297.0000833333333
            
            setTimeout(0)

            //Name filename
            const filename = certificate + element.nroDoc + extension;

            //let positionEscrituraPx=15            
            //let w=width*0.9            
            const w=width*1-positionEscrituraPx
            //let h=height*0.7   
            const h=height*1-positionEscrituraPx  
            
            //console.log('element',element)

            const page1 = document.getElementById(id_page1 + element.nroDoc);
            const page2 = document.getElementById(id_page2 + element.nroDoc);
            const page3 = document.getElementById(id_page3 + element.nroDoc);
            const page4 = document.getElementById(id_page4 + element.nroDoc);
            //var imagen1=null

            const imagen1= page1!==null? await this.generarImagen(page1).then(r=>{return r}) :null
            const imagen2= page2!==null? await this.generarImagen(page2).then(r=>{return r}) :null
            const imagen3= page3!==null? await this.generarImagen(page3).then(r=>{return r}) :null
            const imagen4= page4!==null? await this.generarImagen(page4).then(r=>{return r}) :null
            /*
            if(page1!==null){
                imagen1=await this.generarImagen(page1).then(r=>{return r})
            }
            var imagen2=null
            if(page2!==null){
                imagen2=await this.generarImagen(page2).then(r=>{return r})
            }
            var imagen3=null
            if(page3!==null){
                imagen3=await this.generarImagen(page3).then(r=>{return r})
            }
            var imagen4=null
            if(page4!==null){
                imagen4=await this.generarImagen(page4).then(r=>{return r})
            }
            */
            //const imagen1 = await ( page1!==null)?this.generarImagen(page1).then(r=>{return r}):null
            //const imagen2 = await ( page2!==null)?this.generarImagen(page2).then(r=>{return r}):null
            //const imagen3 = await ( page3!==null)?this.generarImagen(page3).then(r=>{return r}):null
            //const imagen4 = await ( page4!==null)?this.generarImagen(page4).then(r=>{return r}):null 

            doc.text('', 0, 0)
            /*
            console.log('page1',page1)
            console.log('imagen1',imagen1)
            console.log(page2)
            console.log(page3)
            console.log(page4)
            */
            //doc.addImage(imagen1, 'JPEG', 20, 20,w,h)
            var img = new Image()
            img.src = logo
            if(page1!==null){
                //doc.text('page1', 2, 2)
                
                doc.addImage(imagen1, 'JPEG', positionEscrituraPx, positionEscrituraPx, w, h)
                doc.addImage(img,'png',2,2,40,15)   
                if(element.retencion*1>0){
                    doc.addPage()
                }
                
            }
            
            //doc.addImage(imagen2, 'JPEG', 20, 20,w,h) typeof(page2) !== 'undefined' &&
            if( page2!==null){
                //doc.text('page2', 2, 2)        
                doc.addImage(imagen2, 'JPEG', positionEscrituraPx, positionEscrituraPx, w, h)  
                doc.addImage(img,'png',2,2,40,15)                
                if(element.retencion*1>0){
                    doc.addPage()
                }
            }
            
            //doc.addImage(imagen3, 'JPEG', 20, 20,w,h) typeof(page3) !== 'undefined'
            if( page3!==null){
                //doc.text('page3', 2, 2)
                doc.addImage(imagen3, 'JPEG', positionEscrituraPx, positionEscrituraPx, w, h) 
                doc.addImage(img,'png',2,2,40,15)                  
                //doc.addPage()
                
            }
            
            //doc.addImage(imagen4, 'JPEG', 20, 20,w,h) typeof(page4) !== 'undefined' && 
            if( page4!==null){                
                doc.addImage(imagen4, 'JPEG', positionEscrituraPx, positionEscrituraPx, w, h)
                doc.addImage(img,'png',2,2,40,15)    
                //doc.text('page4', 2, 2)
            }
            
            //Save File in zip
            zip.file(filename, doc.output('blob'));

            //delete pages in document
            /*
            var pageCount = doc.internal.getNumberOfPages();
            for(var page=0;page<=pageCount+1;page++){
                doc.deletePage(page)
            }
            */
            //Numero de certificado Realizado
            numeroCentificadoRender=numeroCentificadoRender+1
            console.log('Numero de certificado Realizado',numeroCentificadoRender)            
            this.props.numCentificadoRender("Número de certificados procesados: "+numeroCentificadoRender +" de " + numeroTotalCertificados)
        }
        const filename="CertificadosAnual668_"+this.props.filename+".zip"
        this.props.estadozip("Descargando Zip ...")
        //Capturar props en variable
        var abc=this.props.estadozip
        
        zip.generateAsync({type:"blob", compression:"DEFLATE"},function updateCallback(metadata) {
            console.log('metadata.percent',metadata.percent);
             //updateprocess(metadata.percent);
             //this.props.estadozip(metadata.percent+"");
             
             var msg = "Progreso : " + metadata.percent.toFixed(2) + " %";
             if (metadata.currentFile) {
               msg += ", Archivo = " + metadata.currentFile;
             }
             console.log('msg',msg);
             //usar la variable que ccontiene props, para actualizarla en un entorno de la libreria [zip]
             if(metadata.percent ===100){
                 abc("")

             }else{
                abc(msg)
             }
             
             //funcion global
             updatePercent(msg)
           }
        ).then(function(content) {
            saveAs(content, filename);
        })
        

        var time_fin = new Date(); 

        //console.log(time_fin-time_incio)

        var minutos = (time_fin-time_incio)/1000/60;
        var horas = Math.floor(minutos/60);
        minutos = minutos % 60;

        console.log('minutos trasncurridos',minutos, 'horas trasncurridos',horas)
        //
        
        this.handlerShowPDF()
        
        this.props.numCentificadoRender("")
        //show botones
        this.props.showPDFs()
        this.props.estadozip("")
    }
    
    async generarPDF(){
        // Default export is a4 paper, portrait, using milimeters for units
        // orientation default vertical  / orientation horizontal ='landscape'
        //https://ourcodeworld.com/articles/read/415/how-to-create-a-screenshot-of-your-website-with-javascript-using-html2canvas
        var doc = new jsPDF({orientation: 'vertical',})
        
        var width = doc.internal.pageSize.getWidth();
        var height = doc.internal.pageSize.getHeight();// 210 mm  11 Filas(incluye la cabecera de la tabla) fijas + #filas de registros en tabla
        
        let w=width*0.9
        let h=height*0.7    

        const page1 = document.getElementById("page1");
        const page2 = document.getElementById("page2");
        const page3 = document.getElementById("page3");
        const page4 = document.getElementById("page4");

        const imagen1= await this.generarImagen(page1).then(r=>{ 
            //console.log('devuelto') 
            return r})
        const imagen2= await this.generarImagen(page2).then(r=>{ 
            //console.log('devuelto') 
            return r})
        const imagen3= await this.generarImagen(page3).then(r=>{ 
            //console.log('devuelto') 
            return r})
        const imagen4= await this.generarImagen(page4).then(r=>{ 
            //console.log('devuelto') 
            return r})
        //console.log('c') 
        doc.text('', 1, 1)
        
        doc.addImage(imagen1, 'JPEG', 20, 20,w,h)
        doc.addPage()
        doc.addImage(imagen2, 'JPEG', 20, 20,w,h)
        doc.addPage()
        doc.addImage(imagen3, 'JPEG', 20, 20,w,h)
        doc.addPage()
        doc.addImage(imagen4, 'JPEG', 20, 20,w,h)
        
        //Grabar documento        
        //doc.save('a4.pdf')

        // PDF in Zip File
        // https://stackoverflow.com/questions/40589568/issue-while-trying-to-compress-pdf-files-into-a-zip-file-using-jszip

        // https://www.npmjs.com/package/jszip
        var zip = new JSZip();
        // Asigna el archivo a guardar y en donde se guardará (ruta del zip) 
        // https://stackoverflow.com/questions/60174037/adding-image-to-pdf-created-using-jspdf-and-then-zip-pdfs-using-jszip
        zip.file("Certificado.pdf", doc.output('blob'));
        
        //console.log(doc.output())
        // Es posible crear una sub carpeta dentro del zip
        //var ruta = "prueba";
        //var img = zip.folder(ruta);
      
        //img.file("img.txt",ruta);
        //img.file("smile.gif", imgData, {base64: true});

        //Generamos el zip.
        // Comprimir tamaño: https://github.com/Stuk/jszip/issues/406

        zip.generateAsync({type:"blob", compression:"DEFLATE"}).then(function(content) {
            // see FileSaver.js
            // Save file with file-saver 
            // https://github.com/eligrey/FileSaver.js
            saveAs(content, "certificado.zip");
        });   

        
        /*
        const printArea = document.getElementById("page1");

        html2canvas(printArea).then(canvas => {
            console.log(canvas)
            //const page1=canvas.getElementById('page1').toDataURL()
            //const page2=canvas.getElementById('page2').toDataURL()
            //const page3=canvas.getElementById('page3').toDataURL()
            //const page4=canvas.getElementById('page4').toDataURL()
            const dataURL = canvas.toDataURL();
            //console.log(dataURL)
            const pdf = new jsPDF({orientation: 'landscape',});
            var width = pdf.internal.pageSize.getWidth();
            var height = pdf.internal.pageSize.getHeight();// 210 mm  11 Filas(incluye la cabecera de la tabla) fijas + #filas de registros en tabla
            
            let w=width*0.9
            let h=height*0.7
            console.log(w)
            console.log(height)
            //Imagen,Formato,posX,posY,width, height
            //pdf.addImage(dataURL, 'JPEG', 20, 20,w,h)
            pdf.addImage(dataURL, 'JPEG', 20, 20,w,h)
            //Inicializa pagina 2
            pdf.addPage()
            pdf.addImage(dataURL, 'JPEG', 20, 20,w,h)

            //Inicializa pagina 3
            pdf.addPage()
            //pdf.addImage(page3, 'JPEG', 20, 20,w,h)

            //Inicializa pagina 4
            pdf.addPage()
            //pdf.addImage(page4, 'JPEG', 20, 20,w,h)



            pdf.save('saved.pdf')
        })
        */
    } 
    dibujar(){
        //console.log(this.props.content)
        return(<React.Fragment>
            {this.props.content.map(con=>  
            <div key={"pdfPlantilla2"+con.nroDoc} id="pdfPlantilla2" className="row text_size pdfPlantilla2">
                <div className="row text_table" >
                    {/*A4-page oculta la seccion en el navegador */ /*className="A4-page" */}
                    {con.tpoinversionista==="Personas Jurídicas Domiciliados"|| con.tpoinversionista==="Personas Naturales Domiciliadas"||con.tpoinversionista==="AFP Peruana" || con.tpoinversionista==="Compañía de Seguros peruana" ||con.tpoinversionista==="AFP Peruana-Compañia de Seguro" ||con.tpoinversionista==="Fideicomiso"?
                    <div key={id_page1 + con.nroDoc} id={id_page1 + con.nroDoc} className="A4-page">
                        {/*<img classname="imgA1" src={logo} alt="Logo"></img>*/}
                        <div id="page1_titulo1" className="row">
                            <div className="w-100 margenCentro bold_text">CERTIFICADO DE ATRIBUCION DE RENTAS DE 3RA CATEGORÍA Y FUENTE EXTRANJERA </div>
     
                            <div className="w-100 margenCentro ">(Base Legal: Ley 30532, Decreto Supremo No. 264-2017-EF, Literal c) del Artículo 18-A del Decreto Supremo No. 122-94-</div>
                            <div className="w-100 margenCentro ">EF; y, normas modificatorias)</div>
                        </div>

                        <div className="row margensuperior-60">
                            <div className=" margenIzquierdo bold_text">IDENTIFICACIÓN DEL CONTRIBUYENTE DEL IMPUESTO</div>
                        </div>                
                        
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* NOMBRES Y APELLIDOS O DENOMINACIÓN O RAZÓN SOCIAL  :"} {con.descripcion}</span></div>
                        </div>
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* RUC U OTRO NÚMERO DE DOCUMENTO DE IDENTIDAD            :"} {con.nroDoc}</span></div>
                        </div>
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* DOMICILIO FISCAL                                                                            :"} {con.domicilio}</span></div>
                        </div>

                        <div className="row bold_text margensuperior-20">
                            <div className="margenIzquierdo">DATOS DEL EMISOR DEL CERTIFICADO</div>
                        </div>
                        
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* Denominación o razón social                            : "+con.razSocial_fibra}</span></div>
                        </div>
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* RUC                                                                  : "+con.ruc_fibra}</span></div>
                        </div>
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* FONDO O PATRIMONIO ADMINISTRADO	    : "+con.nombre_fibra}</span></div>
                        </div>
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* DOMICILIO FISCAL                                          : "+con.domicilioFiscal_fibra}</span></div>
                        </div>


                        <div className="row margensuperior-20">
                            <div className="margenIzquierdo bold_text"><span>{"PERIODO TRIBUTARIO"}</span><span className="tabkey">     </span><span>:{con.periodo.substring(0,4)}</span> </div>
                        </div>
                        <div className="row margensuperior-20">
                            {/**<div className="margenIzquierdo bold_text"><span>{"FECHA DE EMISIÓN"}</span><span className="tabkey">          </span><span>:{this.state.day} / {this.state.month} / {this.state.year}</span> </div> */}
                            <div className="margenIzquierdo bold_text"><span>{"FECHA DE EMISIÓN"}</span><span className="tabkey">          </span><span>:{this.state.day} / {this.state.month} / {this.state.year}</span> </div>
                        </div>
                        <div className="row margensuperior-20">
                            <div className="margenIzquierdo bold_text">{"CATEGORÍA DE RENTA"}<span className="tabkey">    </span>{":3ra. Categoría"}</div>
                        </div>
                        {
                        /*
                        <div className="row">
                            <div className="margenIzquierdo">MONEDA: NUEVOS SOLES PERUANOS (S/.)</div>
                        </div>
                        
                        <div className="row bold_text margensuperior-20">
                            <div className="margenIzquierdo">DATOS DEL EMISOR DEL CERTIFICADO</div>
                        </div>
                        <div className="row">
                            <div className="margenIzquierdo">{"° RAZON SOCIAL: "+con.razSocial_fibra}</div>
                        </div>
                        <div className="row">
                            <div className="margenIzquierdo">{"° RUC : "+con.ruc_fibra}</div>
                        </div>
                        <div className="row">
                            <div className="margenIzquierdo">{"° DOMICILIO FISCAL : "+con.domicilioFiscal_fibra}</div>
                        </div>
                        */
                        }
                        <div className="margin-w5-left">
                            <div className="row bold_text margensuperior-20">
                                <div className=" margenIzquierdo">{"I)	RENTAS (O PÉRDIDAS) DE FUENTE PERUANA"}</div>
                            </div>
                            <div className="row bold_text margensuperior-20">
                                <div className="row margensuperior-20">
                                    <table className="data_table_renta data_table_renta-80 tg">
                                        <thead >
                                            <tr key="cabeceraTotales">
                                                <th></th>
                                                <th className="border_th unbold text_table">Concepto</th>
                                                <th className="border_th unbold text_table">Rentas brutas por arrendamiento u otra forma onerosa de cesión en uso de bienes inmuebles</th>
                                                <th className="border_th unbold text_table">Otras rentas brutas </th>
                                                <th className="border_th unbold text_table">Renta (o pérdida) Neta atribuible, de ser el caso </th>
                                            </tr>
                                        </thead>
                                        {
                                            con.periodo.substr(5,2)!=="04"? 
                                            <tbody>
                                            
                                            <tr key="Gravadas">
                                                <td class="tg-c3ow unbold text_table" rowspan="2">Gravadas</td>
                                                <td class="tg-c3ow unbold text_table">Total redención o rescate</td>
                                                <td class="margenDerecho unbold text_table">{con.tpoinversionista==="Personas Naturales Domiciliadas"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold text_table">{/*con.asignacionOtraGananciaPerdida.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})*/}</td>
                                                <td class="margenDerecho unbold text_table">{con.tpoinversionista==="Personas Jurídicas Domiciliados" || con.tpoinversionista==="Fideicomiso"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):con.asignacionOtraGananciaPerdida.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                                {/*{con.tpoinversionista==="Personas Jurídicas Domiciliados"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):(con.tpoinversionista!=="Personas Naturales Domiciliadas"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"")} */}
                                            </tr>
                                            <tr key="Devengado">
                                                <td class="tg-c3ow unbold text_table">Devengada al 31.12.{con.periodo.substring(0,4)}</td>
                                                <td class="tg-0pky"></td>
                                                <td class="tg-0pky"></td>
                                                <td class="tg-0pky"></td>
                                            </tr>
                                            
                                            <tr key="TotalRenta">
                                                <td class="tg-c3ow unbold" colspan="2">TOTAL</td>
                                                <td class="margenDerecho unbold text_table">{con.tpoinversionista==="Personas Naturales Domiciliadas"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold text_table">{/*con.asignacionOtraGananciaPerdida.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})*/}</td>
                                                <td class="margenDerecho unbold text_table">{con.tpoinversionista==="Personas Jurídicas Domiciliados" || con.tpoinversionista==="Fideicomiso"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):con.asignacionOtraGananciaPerdida.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                                {/*{con.tpoinversionista==="Personas Jurídicas Domiciliados"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):(con.tpoinversionista!=="Personas Naturales Domiciliadas"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"")} */}
                                            </tr>
                                            
                                        </tbody>
                                            :
                                            <tbody>
                                            
                                            <tr key="Gravadas">
                                                <td class="tg-c3ow unbold text_table" rowspan="2">Gravadas</td>
                                                <td class="tg-c3ow unbold text_table">Total redención o rescate</td>
                                                <td class="tg-0pky"></td>
                                                <td class="tg-0pky"></td>
                                                <td class="tg-0pky"></td>
                                            </tr>
                                            <tr key="Devengado">
                                                <td class="tg-c3ow unbold text_table">Devengada al 31.12.{con.periodo.substring(0,4)}</td>
                                                <td class="margenDerecho unbold text_table">{con.tpoinversionista==="Personas Naturales Domiciliadas"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold text_table">{/*con.asignacionOtraGananciaPerdida.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})*/}</td>
                                                <td class="margenDerecho unbold text_table">{con.tpoinversionista==="Personas Jurídicas Domiciliados" || con.tpoinversionista==="Fideicomiso"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):con.asignacionOtraGananciaPerdida.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                                {/*{con.tpoinversionista==="Personas Jurídicas Domiciliados"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):(con.tpoinversionista!=="Personas Naturales Domiciliadas"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"")} */}
                                                
                                            </tr>
                                            
                                            <tr key="TotalRenta">
                                                <td class="tg-c3ow unbold" colspan="2">TOTAL</td>
                                                <td class="margenDerecho unbold text_table">{con.tpoinversionista==="Personas Naturales Domiciliadas"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold text_table">{/*con.asignacionOtraGananciaPerdida.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})*/}</td>
                                                <td class="margenDerecho unbold text_table">{con.tpoinversionista==="Personas Jurídicas Domiciliados" || con.tpoinversionista==="Fideicomiso"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):con.asignacionOtraGananciaPerdida.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                                {/*{con.tpoinversionista==="Personas Jurídicas Domiciliados"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):(con.tpoinversionista!=="Personas Naturales Domiciliadas"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"")} */}
                                            </tr>
                                            
                                        </tbody>
                                        }
                                        
                                    </table>
                                </div> 
                            </div>
                            <div className="margin-w15-left">
                                <div className="row margensuperior-20">
                                    <table className="data_table_renta tg">
                                        <thead >
                                            <tr key="cabecera_renta">
                                                <th></th>
                                                <th className="border_th text_table">Renta neta/Pérdida</th>                            
                                            </tr>
                                        </thead>
                                        <tbody>                                            
                                            <tr key="Exoneradas">
                                                <td classname="bold">Exoneradas</td>
                                                <td></td>                                
                                            </tr>
                                            <tr key="Inafectas">
                                                <td classname="bold">Inafectas</td>
                                                <td class="margenDerecho unbold text_table">{con.tpoinversionista==="Personas Jurídicas Domiciliados"|| con.tpoinversionista==="Personas Naturales Domiciliadas" || con.tpoinversionista==="Fideicomiso"?"0.00":con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>                                
                                            </tr>
                                        </tbody>
                                    </table>
                                </div> 
                            </div>                            
                        </div>
                        <div className="margin-w5-left">
                            <div className="row bold_text margensuperior-20">
                                <div className=" margenIzquierdo">{"II)	  RENTAS (O PÉRDIDAS) NETAS DE FUENTE EXTRANJERA"}</div>
                            </div>
                            <div className="row bold_text margensuperior-20">
                                <div className="row margensuperior-20">
                                    <table className="data_table_renta tg">
                                        <thead >
                                            <tr key="cabecera">
                                                <th className="border_th text_table">Renta neta atribuible</th> 
                                                <th className="border_th text_table">Pérdida neta atribuible</th>                            
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr key="tabla">
                                                <td></td>
                                                <td></td>
                                            </tr>
                                           
                                            
                                        </tbody>
                                    </table>
                                </div> 
                            </div>
                        </div>
                        {
                        /*
                        <div className="row bold_text margensuperior-20">
                            <div className=" margenIzquierdo">{"A.	ATRIBUCIÓN DE RENTAS DE ALQUILERES EN EL FIBRA AL 31 DE DICIEMBRE DE "+ con.periodo.substring(0,4)}</div>
                        </div>
                        <div className="row bold_text margensuperior-20">
                            <div className=" margenIzquierdo">I)	RENTAS (O PÉRDIDAS) DE FUENTE PERUANA</div>
                            <div className="row margensuperior-20">
                                <table className="data_table_renta data_table_renta-80">
                                    <thead >
                                        <tr>
                                            <th></th>
                                            <th className="border_th">Renta Bruta</th>
                                            <th className="border_th">Gastos</th>
                                            <th className="border_th">Perdida</th>
                                            <th className="border_th">Renta Neta</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Gravadas</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Exoneradas</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Inafectas</td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> 
                        </div>
                        <div className="row bold_text margensuperior-20">
                            <div className=" margenIzquierdo">II)	  RENTAS (O PÉRDIDAS) NETAS DE FUENTE EXTRANJERA                        </div>
                            <div className="row margensuperior-20">
                                <table className="data_table_renta">
                                    <thead >
                                        <tr>
                                            <th></th>
                                            <th className="border_th">Renta neta/Pérdida</th>                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Gravadas</td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Exoneradas</td>
                                            <td></td>                                
                                        </tr>
                                        <tr>
                                            <td>Inafectas</td>
                                            <td></td>                                
                                        </tr>
                                    </tbody>
                                </table>
                            </div> 
                        </div>
                        <div className="row margensuperior-60">Lima, {this.state.day} de {this.state.month} del {this.state.year}</div>
                        
                        */
                        }
                        
                        
                        <div className="row margensuperior-60 ">
                            <div className=" margenCentro col-6 ">
                                <div className="margenCentro ">__________________</div> 
                                <div className="margenCentro bold_text">Juana Cossio Cavero </div>
                                <div className="margenCentro bold_text">Representante Legal</div>
                                <div className="margenCentro bold_text">DNI 07831871</div>           
                            </div>
                            {/*
                            <div className=" margenCentro col-6 ">
                                <div className="margenCentro">__________________</div> 
                                <div className="margenCentro bold_text">Ricardo Salazar Otárola</div>
                                <div className="margenCentro bold_text">Contador General</div>
                                <div className="margenCentro bold_text">DNI 06794549</div>                                  
                            </div>
                            */
                            }
                        </div>
                    </div>
                    :null
                    }
                    {/*A4-page oculta la seccion en el navegador */ /*className="A4-page" */}
                    {con.tpoinversionista==="Personas Naturales No Domiciliadas" || con.tpoinversionista==="Personas Jurídicas No Domiciliados"?
                    <div key={id_page2 + con.nroDoc} id={id_page2 + con.nroDoc} className="A4-page">
                        {/*<img classname="imgA1" src={logo} alt="Logo"></img>*/}
                        <div id="page1_titulo2" className="row">
                            <div className="w-100 margenCentro bold_text">CERTIFICADO DE ATRIBUCION DE RENTAS DE NO DOMICILIADOS DE 3RA CATEGORÍA </div>
                            
                            <div className="w-100 margenCentro ">(Base Legal: Ley 30532, Decreto Supremo No. 264-2017-EF, Literal c) del Artículo 18-A del Decreto Supremo No. 122-94-</div>
                            <div className="w-100 margenCentro ">EF; y, normas modificatorias)</div>
                        </div>
                    
                        
                        <div className="row margensuperior-60">
                            <div className=" margenIzquierdo bold_text">IDENTIFICACIÓN DEL CONTRIBUYENTE DEL IMPUESTO</div>
                        </div>
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* NOMBRES Y APELLIDOS O DENOMINACIÓN O RAZÓN SOCIAL  :"} {con.descripcion}</span></div>
                        </div>
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* TIPO Y NÚMERO DE DOCUMENTO DE IDENTIDAD            :"} {con.nroDoc}</span></div>
                        </div>

                        <div className="row bold_text margensuperior-20">
                            <div className="margenIzquierdo">DATOS DEL EMISOR DEL CERTIFICADO</div>
                        </div>                
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* Denominación o razón social                            : "+con.razSocial_fibra}</span></div>
                        </div>
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* RUC                                                                  : "+con.ruc_fibra}</span></div>
                        </div>
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* FONDO O PATRIMONIO ADMINISTRADO	    : "+con.nombre_fibra}</span></div>
                        </div>
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* DOMICILIO FISCAL                                          : "+con.domicilioFiscal_fibra}</span></div>
                        </div>
                        
                        

                        <div className="row margensuperior-20">
                            <div className="margenIzquierdo bold_text"><span>{"PERIODO TRIBUTARIO"}</span><span className="tabkey">     </span><span>:{con.periodo.substring(0,4)}</span> </div>
                        </div>
                        <div className="row margensuperior-20">
                            {/**<div className="margenIzquierdo bold_text"><span>{"FECHA DE EMISIÓN"}</span><span className="tabkey">          </span><span>:{this.state.day} / {this.state.month} / {this.state.year}</span> </div> */}
                            <div className="margenIzquierdo bold_text"><span>{"FECHA DE EMISIÓN"}</span><span className="tabkey">          </span><span>:{this.state.day} / {this.state.month} / {this.state.year}</span> </div>
                        </div>
                        <div className="row margensuperior-20">
                            <div className="margenIzquierdo bold_text">{"CATEGORÍA DE RENTA"}<span className="tabkey">    </span>{":3ra. Categoría"}</div>
                        </div>

                        <div className="margin-w5-left">
                            <div className="row bold_text margensuperior-20">
                                <div className=" margenIzquierdo">{"I)	RENTAS (O PÉRDIDAS) DE FUENTE PERUANA"}</div>
                            </div>
                            <div className="row bold_text margensuperior-20">
                                <div className="row margensuperior-20">
                                    <table className="data_table_renta data_table_renta-80 tg">
                                        <thead >
                                            <tr key="cabeceraTotales">
                                                <th></th>
                                                <th className="border_th unbold">Concepto</th>
                                                <th className="border_th unbold">Rentas brutas por arrendamiento u otra forma onerosa de cesión en uso de bienes inmuebles</th>
                                                <th className="border_th unbold">Otras Rentas brutas</th>
                                                <th className="border_th unbold">Renta (o pérdida) Neta atribuible</th>
                                            </tr>
                                        </thead>
                                        {
                                            con.periodo.substr(5,2)!=="04"?
                                            <tbody>
                                            <tr key="Gravadas">
                                                <td class="tg-c3ow unbold">Gravadas</td>
                                                <td class="tg-c3ow unbold">Rentas de tercera categoría</td>
                                                {/*Para No domicialiados se considera el tipo de inversionista segun las tablas */}
                                                {/*<td class="margenDerecho unbold">{con.monto_eerr.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td> */}
                                                {/*<td class="margenDerecho unbold">{con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td> */}
                                                <td class="margenDerecho unbold">{con.tpoinversionista==="Personas Jurídicas No Domiciliados" || con.tpoinversionista==="Personas Naturales No Domiciliadas"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="tg-c3ow unbold"></td>
                                                <td class="margenDerecho unbold">{/*con.tpoinversionista!=="Personas Jurídicas No Domiciliados"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"*/}</td>
                                                
                                            </tr>
                                            
                                            
                                            <tr key="TotalRenta">
                                                <td class="tg-c3ow unbold" colspan="2">TOTAL</td>
                                                {/*<td class="margenDerecho unbold">{con.monto_eerr.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td> */}
                                                {/*<td class="margenDerecho unbold">{con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td> */}
                                                <td class="margenDerecho unbold">{con.tpoinversionista==="Personas Jurídicas No Domiciliados" || con.tpoinversionista==="Personas Naturales No Domiciliadas"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="tg-c3ow unbold"></td>
                                                <td class="margenDerecho unbold">{/*con.tpoinversionista!=="Personas Jurídicas No Domiciliados"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"*/}</td>
                                                
                                            </tr>
                                            
                                            </tbody>
                                            :
                                            <tbody>
                                            <tr key="Gravadas">
                                                <td class="tg-c3ow unbold">Gravadas</td>
                                                <td class="tg-c3ow unbold">Rentas de tercera categoría</td>
                                                {/*Para No domicialiados se considera el tipo de inversionista segun las tablas */}
                                                {/*<td class="margenDerecho unbold">{con.monto_eerr.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td> */}
                                                {/*<td class="margenDerecho unbold">{con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td> */}
                                                <td class="margenDerecho unbold">{con.tpoinversionista==="Personas Jurídicas No Domiciliados" || con.tpoinversionista==="Personas Naturales No Domiciliadas"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="tg-c3ow unbold"></td>
                                                <td class="margenDerecho unbold">{/*con.tpoinversionista!=="Personas Jurídicas No Domiciliados"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"*/}</td>
                                                
                                            </tr>
                                            
                                            
                                            <tr key="TotalRenta">
                                                <td class="tg-c3ow unbold" colspan="2">TOTAL</td>
                                                {/*<td class="margenDerecho unbold">{con.monto_eerr.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td> */}
                                                {/*<td class="margenDerecho unbold">{con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td> */}
                                                <td class="margenDerecho unbold">{con.tpoinversionista==="Personas Jurídicas No Domiciliados" || con.tpoinversionista==="Personas Naturales No Domiciliadas"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="tg-c3ow unbold"></td>
                                                <td class="margenDerecho unbold">{/*con.tpoinversionista!=="Personas Jurídicas No Domiciliados"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"*/}</td>
                                                
                                            </tr>
                                            
                                        </tbody>
                                        }
                                        
                                    </table>
                                </div> 
                            </div>
                            <div className="margin-w15-left">
                                <div className="row margensuperior-20">
                                    <table className="data_table_renta tg">
                                        <thead >
                                            <tr key="cabecera_renta">
                                                <th></th>
                                                <th className="border_th">Importe Neto</th>                            
                                            </tr>
                                        </thead>
                                        <tbody>                                            
                                            <tr key="Exoneradas">
                                                <td classname="bold">Exoneradas</td>
                                                <td></td>                                
                                            </tr>
                                            <tr key="Inafectas">
                                                <td classname="bold">Inafectas</td>
                                                <td></td>                                
                                            </tr>
                                        </tbody>
                                    </table>
                                </div> 
                            </div>                            
                        </div>
                        
                        


                        <div className="row margensuperior-60">
                            <div className=" margenCentro col-6 ">
                                <div className="margenCentro ">__________________</div> 
                                <div className="margenCentro bold_text">Juana Cossio Cavero </div>
                                <div className="margenCentro bold_text">Representante Legal</div>
                                <div className="margenCentro bold_text">DNI 07831871</div>           
                            </div>
                            {/*
                            <div className=" margenCentro col-6 ">
                                <div className="margenCentro">__________________</div> 
                                <div className="margenCentro bold_text">Ricardo Salazar Otárola</div>
                                <div className="margenCentro bold_text">Contador General</div>
                                <div className="margenCentro bold_text">DNI 06794549</div>                                  
                            </div>
                            */}
                        </div>
                    </div>
                    :null
                    }
                    {(con.retencion*1>0) && (con.tpoinversionista==="Personas Jurídicas Domiciliados"|| con.tpoinversionista==="Personas Naturales Domiciliadas"||con.tpoinversionista==="AFP Peruana" || con.tpoinversionista==="Compañía de Seguros peruana" ||con.tpoinversionista==="AFP Peruana-Compañia de Seguro" ||con.tpoinversionista==="Fideicomiso")?
                    <div key={id_page3 + con.nroDoc} id={id_page3 + con.nroDoc} className="A4-page">
                        {/*<img classname="imgA1" src={logo} alt="Logo"></img>*/}
                        <div className="row">
                            <div className="w-100 margenCentro bold_text">CERTIFICADO DE RETENCIONES DE RENTAS DE 3RA CATEGORÍA </div>
                            <div className="w-100 margenCentro ">(Base Legal: Ley 30532, Decreto Supremo No. 264-2017-EF, Literal c) del Artículo 18-A del Decreto Supremo No. 122-94-</div>
                            <div className="w-100 margenCentro ">EF; y, normas modificatorias)</div>
                        </div>

                        <div className="row margensuperior-60">
                            <div className=" margenIzquierdo bold_text">IDENTIFICACIÓN DEL CONTRIBUYENTE DEL IMPUESTO</div>
                        </div>                
                        
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* NOMBRES Y APELLIDOS O DENOMINACIÓN O RAZÓN SOCIAL  :"} {con.descripcion}</span></div>
                        </div>
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* RUC U OTRO NÚMERO DE DOCUMENTO DE IDENTIDAD            :"} {con.nroDoc}</span></div>
                        </div>
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* DOMICILIO FISCAL                                                                            :"} {con.domicilio}</span></div>
                        </div>

                        <div className="row bold_text margensuperior-20">
                            <div className="margenIzquierdo">DATOS DEL AGENTE DE RETENCIÓN</div>
                        </div>
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* Denominación o razón social                            : "+con.razSocial_fibra}</span></div>
                        </div>
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* RUC                                                                  : "+con.ruc_fibra}</span></div>
                        </div>
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* FONDO O PATRIMONIO ADMINISTRADO	    : "+con.nombre_fibra}</span></div>
                        </div>
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* DOMICILIO FISCAL                                          : "+con.domicilioFiscal_fibra}</span></div>
                        </div>

                        

                        <div className="row margensuperior-20">
                            <div className="margenIzquierdo bold_text"><span>{"PERIODO TRIBUTARIO"}</span><span className="tabkey">     </span><span>:{con.periodo.substring(0,4)}</span> </div>
                        </div>
                        <div className="row margensuperior-20">
                            {/**<div className="margenIzquierdo bold_text"><span>{"FECHA DE EMISIÓN"}</span><span className="tabkey">          </span><span>:{this.state.day} / {this.state.month} / {this.state.year}</span> </div> */}
                            <div className="margenIzquierdo bold_text"><span>{"FECHA DE EMISIÓN"}</span><span className="tabkey">          </span><span>:{this.state.day} / {this.state.month} / {this.state.year}</span> </div>
                        </div>
                        <div className="row margensuperior-20">
                            <div className="margenIzquierdo bold_text">{"CATEGORÍA DE RENTA"}<span className="tabkey">    </span>{":3ra. Categoría"}</div>
                        </div>



                        
                        <div className="margin-w5-left">
                            <div className="row bold_text margensuperior-20">
                                <div className=" margenIzquierdo">{"I)	RENTAS (O PÉRDIDAS) DE FUENTE PERUANA"}</div>
                            </div>
                            <div className="row bold_text margensuperior-20">
                                <div className="row margensuperior-20">
                                    <table className="data_table_renta data_table_renta-80 tg">
                                        <thead >
                                            <tr key="cabeceraTotales">
                                                <th></th>
                                                <th className="border_th unbold">Concepto</th>
                                                <th className="border_th unbold">Rentas brutas por arrendamiento u otra forma onerosa de cesión en uso de bienes inmuebles</th>
                                                <th className="border_th unbold">Otras rentas brutas </th>
                                                <th className="border_th unbold">Renta Neta atribuible</th>
                                                <th className="border_th unbold">Tasa </th>
                                                <th className="border_th unbold">Retención </th>
                                            </tr>
                                        </thead>
                                        {
                                            con.periodo.substr(5,2)!=="04"? 
                                            <tbody>
                                            <tr key="Gravadas">
                                                <td class="tg-c3ow unbold" rowspan="2">Gravadas</td>
                                                <td class="tg-c3ow unbold">Total redención o rescate</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista!=="Personas Jurídicas Domiciliados"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold">{/*con.asignacionOtraGananciaPerdida.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})*/}</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista==="Personas Jurídicas Domiciliados"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold">{(con.tasa*100).toFixed(2)+'%'}</td>
                                                <td class="margenDerecho unbold">{con.retencion*1<0?"0.00":con.retencion.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>

                                                
                                                
                                                
                                                
                                            </tr>
                                            <tr key="Devengado">
                                                <td class="tg-c3ow unbold">Devengada al 31.12.{con.periodo.substring(0,4)}</td>
                                                <td class="tg-0pky"></td>
                                                <td class="tg-0pky"></td>
                                                <td class="tg-0pky"></td>
                                                <td class="tg-0pky"></td>
                                                <td class="tg-0pky"></td>
                                            </tr>
                                            
                                            <tr key="TotalRenta">
                                                <td class="tg-c3ow unbold" colspan="2">TOTAL</td>
                                                {/*<td class="margenDerecho unbold">{con.tpoinversionista!=="Personas Jurídicas Domiciliados"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td> */}
                                                <td class="margenDerecho unbold">{con.tpoinversionista!=="Personas Jurídicas Domiciliados"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold">{/*con.asignacionOtraGananciaPerdida.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})*/}</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista==="Personas Jurídicas Domiciliados"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold">{(con.tasa*100).toFixed(2)+'%'}</td>
                                                <td class="margenDerecho unbold">{con.retencion.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                            </tr>
                                            
                                        </tbody>
                                            :
                                            <tbody>
                                            <tr key="Gravadas">
                                                <td class="tg-c3ow unbold" rowspan="2">Gravadas</td>
                                                <td class="tg-c3ow unbold">Total redención o rescate</td>
                                                <td class="tg-0pky"></td>
                                                <td class="tg-0pky"></td>
                                                <td class="tg-0pky"></td>
                                                <td class="tg-0pky"></td>
                                                <td class="tg-0pky"></td>
                                            </tr>
                                            <tr key="Devengado">
                                                <td class="tg-c3ow unbold">Devengada al 31.12.{con.periodo.substring(0,4)}</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista!=="Personas Jurídicas Domiciliados"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold">{/*con.asignacionOtraGananciaPerdida.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})*/}</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista==="Personas Jurídicas Domiciliados"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold">{(con.tasa*100).toFixed(2)+'%'}</td>
                                                <td class="margenDerecho unbold">{con.retencion*1<0?"0.00":con.retencion.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>

                                            </tr>
                                            
                                            <tr key="TotalRenta">
                                                <td class="tg-c3ow unbold" colspan="2">TOTAL</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista!=="Personas Jurídicas Domiciliados"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold">{/*con.asignacionOtraGananciaPerdida.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})*/}</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista==="Personas Jurídicas Domiciliados"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold">{(con.tasa*100).toFixed(2)+'%'}</td>
                                                <td class="margenDerecho unbold">{con.retencion*1<0?"0.00":con.retencion.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                            </tr>
                                            
                                        </tbody>
                                        }
                                        
                                    </table>
                                </div> 
                            </div>
                                                     
                        </div>
                                              
                        <div className="row margensuperior-60">
                            <div className=" margenCentro col-6 ">
                                <div className="margenCentro ">__________________</div> 
                                <div className="margenCentro bold_text">Juana Cossio Cavero </div>
                                <div className="margenCentro bold_text">Representante Legal</div>
                                <div className="margenCentro bold_text">DNI 07831871</div>           
                            </div>
                            {
                            /*
                            <div className=" margenCentro col-6 ">
                                <div className="margenCentro">__________________</div> 
                                <div className="margenCentro bold_text">Ricardo Salazar Otárola</div>
                                <div className="margenCentro bold_text">Contador General</div>
                                <div className="margenCentro bold_text">DNI 06794549</div>                                  
                            </div>
                            */}
                        </div>

                    </div>
                    :null
                    }
                    {(con.retencion*1>0) && (con.tpoinversionista==="Personas Naturales No Domiciliadas" || con.tpoinversionista==="Personas Jurídicas No Domiciliados")?
                    <div key={id_page4 + con.nroDoc} id={id_page4 + con.nroDoc} className="A4-page">
                        {/*<img classname="imgA1" src={logo} alt="Logo"></img>*/}
                        <div className="row">
                            <div className="w-100 margenCentro bold_text">CERTIFICADO DE RETENCIONES DE RENTAS DE NO DOMICILIADOS DE 3RA CATEGORÍA </div>
                            <div className="w-100 margenCentro ">(Base Legal: Ley 30532, Decreto Supremo No. 264-2017-EF, Literal c) del Artículo 18-A del Decreto Supremo No. 122-94-</div>
                            <div className="w-100 margenCentro ">EF; y, normas modificatorias)</div>
                        </div>
                        <div className="row margensuperior-60">
                            <div className=" margenIzquierdo bold_text">IDENTIFICACIÓN DEL CONTRIBUYENTE DEL IMPUESTO</div>
                        </div>                
                        
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* NOMBRES Y APELLIDOS O DENOMINACIÓN O RAZÓN SOCIAL  :"} {con.descripcion}</span></div>
                        </div>
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* RUC U OTRO NÚMERO DE DOCUMENTO DE IDENTIDAD            :"} {con.nroDoc}</span></div>
                        </div>
                        

                        <div className="row bold_text margensuperior-20">
                            <div className="margenIzquierdo">DATOS DEL AGENTE DE RETENCIÓN</div>
                        </div>
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* Denominación o razón social                            : "+con.razSocial_fibra}</span></div>
                        </div>
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* RUC                                                                  : "+con.ruc_fibra}</span></div>
                        </div>
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* FONDO O PATRIMONIO ADMINISTRADO	    : "+con.nombre_fibra}</span></div>
                        </div>
                        <div className="row margin-w2-left">
                            <div className="margenIzquierdo"><span className="tabkey">{"* DOMICILIO FISCAL                                          : "+con.domicilioFiscal_fibra}</span></div>
                        </div>

                        

                        <div className="row margensuperior-20">
                            <div className="margenIzquierdo bold_text"><span>{"PERIODO TRIBUTARIO"}</span><span className="tabkey">     </span><span>:{con.periodo.substring(0,4)}</span> </div>
                        </div>
                        <div className="row margensuperior-20">
                            {/**<div className="margenIzquierdo bold_text"><span>{"FECHA DE EMISIÓN"}</span><span className="tabkey">          </span><span>:{this.state.day} / {this.state.month} / {this.state.year}</span> </div> */}
                            <div className="margenIzquierdo bold_text"><span>{"FECHA DE EMISIÓN"}</span><span className="tabkey">          </span><span>:{this.state.day} / {this.state.month} / {this.state.year}</span> </div>
                        </div>
                        <div className="row margensuperior-20">
                            <div className="margenIzquierdo bold_text">{"CATEGORÍA DE RENTA"}<span className="tabkey">    </span>{":3ra. Categoría"}</div>
                        </div>
                        
                        <div className="margin-w5-left">
                            <div className="row bold_text margensuperior-20">
                                <div className=" margenIzquierdo">{"I)	RENTAS (O PÉRDIDAS) DE FUENTE PERUANA"}</div>
                            </div>
                            <div className="row bold_text margensuperior-20">
                                <div className="row margensuperior-20">
                                <table className="data_table_renta data_table_renta-80 tg">
                                        <thead >
                                            <tr key="cabeceraTotales">
                                                <th></th>
                                                <th className="border_th unbold">Concepto</th>
                                                <th className="border_th unbold">Rentas brutas por arrendamiento u otra forma onerosa de cesión en uso de bienes inmuebles</th>
                                                <th className="border_th unbold">Otras rentas brutas </th>
                                                <th className="border_th unbold">Renta Neta atribuible</th>
                                                <th className="border_th unbold">Tasa </th>
                                                <th className="border_th unbold">Retención </th>
                                            </tr>
                                        </thead>
                                        {
                                            con.periodo.substr(5,2)!=="04"?
                                            <tbody>
                                            <tr key="Gravadas">
                                                {/*Para No domicialiados se considera el tipo de inversionista segun las tablas */}
                                                <td class="tg-c3ow unbold" rowspan="1">Gravadas</td>
                                                <td class="tg-c3ow unbold">Total redención o rescate</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista!=="Personas Jurídicas No Domiciliados" ?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold">{/*con.asignacionOtraGananciaPerdida.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})*/}</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista==="Personas Jurídicas No Domiciliados"?(con.asignacionParticipe*0.8).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista==="Personas Jurídicas No Domiciliados"?"30.00%":(con.tasa*100).toFixed(2)+'%'}</td>
                                                <td class="margenDerecho unbold">{con.retencion*1<0?"0.00":con.retencion.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                            </tr>                                            
                                            
                                            <tr key="TotalRenta">
                                                <td class="tg-c3ow unbold" colspan="2">TOTAL</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista!=="Personas Jurídicas No Domiciliados" ?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold">{/*con.asignacionOtraGananciaPerdida.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})*/}</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista==="Personas Jurídicas No Domiciliados"?(con.asignacionParticipe*0.8).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista==="Personas Jurídicas No Domiciliados"?"30.00%":(con.tasa*100).toFixed(2)+'%'}</td>
                                                <td class="margenDerecho unbold">{con.retencion*1<0?"0.00":con.retencion.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                            </tr>
                                            
                                            </tbody>
                                            :
                                            <tbody>
                                            <tr key="Gravadas">
                                                {/*Para No domicialiados se considera el tipo de inversionista segun las tablas */}
                                                <td class="tg-c3ow unbold" rowspan="1">Gravadas</td>
                                                <td class="tg-c3ow unbold">Total redención o rescate</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista!=="Personas Jurídicas No Domiciliados" ?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold">{/*con.asignacionOtraGananciaPerdida.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})*/}</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista==="Personas Jurídicas No Domiciliados"?(con.asignacionParticipe*0.8).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista==="Personas Jurídicas No Domiciliados"?"30.00%":(con.tasa*100).toFixed(2)+'%'}</td>
                                                <td class="margenDerecho unbold">{con.retencion*1<0?"0.00":con.retencion.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                            </tr>                                            
                                            
                                            <tr key="TotalRenta">
                                                <td class="tg-c3ow unbold" colspan="2">TOTAL</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista!=="Personas Jurídicas No Domiciliados" ?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold">{/*con.asignacionOtraGananciaPerdida.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})*/}</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista==="Personas Jurídicas No Domiciliados"?(con.asignacionParticipe*0.8).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista==="Personas Jurídicas No Domiciliados"?"30.00%":(con.tasa*100).toFixed(2)+'%'}</td>
                                                <td class="margenDerecho unbold">{con.retencion*1<0?"0.00":con.retencion.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                            </tr>
                                            
                                            </tbody>
                                        }
                                        
                                    </table>
                                    {
                                    /*
                                    <table className="data_table_renta data_table_renta-80 tg">
                                        <thead >
                                            <tr key="cabeceraTotales">
                                                <th></th>
                                                <th className="border_th unbold">Concepto</th>
                                                <th className="border_th unbold">Renta bruta</th>
                                                <th className="border_th unbold">Renta Neta atribuible</th>
                                                <th className="border_th unbold">Tasa </th>
                                                <th className="border_th unbold">Retención </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr key="Gravadas">
                                                <td class="tg-c3ow unbold" rowspan="2">Gravadas</td>
                                                <td class="tg-c3ow unbold">Total redención o rescate</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista!=="Personas Jurídicas No Domiciliados"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista==="Personas Jurídicas No Domiciliados"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold">{(con.tasa*100).toFixed(2)+'%'}</td>
                                                <td class="margenDerecho unbold">{con.retencion.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                            </tr>
                                            <tr key="Devengado">
                                                <td class="tg-c3ow unbold">Devengada al 31.12.{con.periodo.substring(0,4)}</td>
                                                <td class="tg-0pky"></td>
                                                <td class="tg-0pky"></td>
                                                <td class="tg-0pky"></td>
                                                <td class="tg-0pky"></td>
                                            </tr>
                                            
                                            <tr key="TotalRenta">
                                                <td class="tg-c3ow unbold" colspan="2">TOTAL</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista!=="Personas Jurídicas No Domiciliados"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold">{con.tpoinversionista==="Personas Jurídicas No Domiciliados"?con.asignacionParticipe.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2}):"0.00"}</td>
                                                <td class="margenDerecho unbold">{(con.tasa*100).toFixed(2)+'%'}</td>
                                                <td class="margenDerecho unbold">{con.retencion.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                    */
                                    }
                                </div> 
                            </div>
                                                     
                        </div>
                        
                        
                        <div className="row margensuperior-60">
                            <div className=" margenCentro col-6 ">
                                <div className="margenCentro ">__________________</div> 
                                <div className="margenCentro bold_text">Juana Cossio Cavero </div>
                                <div className="margenCentro bold_text">Representante Legal</div>
                                <div className="margenCentro bold_text">DNI 07831871</div>           
                            </div>
                            {/*
                            <div className=" margenCentro col-6 ">
                                <div className="margenCentro">__________________</div> 
                                <div className="margenCentro bold_text">Ricardo Salazar Otárola</div>
                                <div className="margenCentro bold_text">Contador General</div>
                                <div className="margenCentro bold_text">DNI 06794549</div>                                  
                            </div>
                            */
                            }
                        </div>

                    </div>
                    :null
                    }
                </div>
            </div>                      
            )}

        </React.Fragment>)
    }
    componentDidMount(){
        //
        
        this.generarPDF2()
        this.setState({show:true})
    }
    
    render(){ 
        
        const newPDF = this.dibujar()
        
        return(
            <React.Fragment>
                   
                {this.state.show?newPDF:null}
                                    
            </React.Fragment>
        );
    }
}
export default PdfCertificado2;

