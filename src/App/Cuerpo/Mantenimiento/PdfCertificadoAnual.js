import './Mantenimiento.css';
import React, { Component } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
import JSZip from 'jszip';
import { saveAs } from 'file-saver'; 


let newDate = new Date(); 
let newMonth = newDate.getMonth() + 1;

const id_page1 = 'page1_';
const id_page2 = 'page2_';
const id_page3 = 'page3_';
const id_page4 = 'page4_';
const certificate = 'Certificado_';
const extension = '.pdf';

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

        const positionEscrituraPx=15
        var time_incio = new Date(); 
        
        
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
            
            const page1 = document.getElementById(id_page1 + element.nroDoc);
            const page2 = document.getElementById(id_page2 + element.nroDoc);
            const page3 = document.getElementById(id_page3 + element.nroDoc);
            const page4 = document.getElementById(id_page4 + element.nroDoc);
             
            const imagen1 = await this.generarImagen(page1).then(r=>{return r})
            const imagen2 = await this.generarImagen(page2).then(r=>{return r})
            const imagen3 = await this.generarImagen(page3).then(r=>{return r})
            const imagen4 = await this.generarImagen(page4).then(r=>{return r}) 

            doc.text('', 0, 0)
            //doc.addImage(imagen1, 'JPEG', 20, 20,w,h)
            doc.addImage(imagen1, 'JPEG', positionEscrituraPx, positionEscrituraPx, w, h)
            doc.addPage()
            //doc.addImage(imagen2, 'JPEG', 20, 20,w,h)
            doc.addImage(imagen2, 'JPEG', positionEscrituraPx, positionEscrituraPx, w, h)
            doc.addPage()
            //doc.addImage(imagen3, 'JPEG', 20, 20,w,h)
            doc.addImage(imagen3, 'JPEG', positionEscrituraPx, positionEscrituraPx, w, h)
            doc.addPage()
            //doc.addImage(imagen4, 'JPEG', 20, 20,w,h)
            doc.addImage(imagen4, 'JPEG', positionEscrituraPx, positionEscrituraPx, w, h)
        
            //Save File in zip
            zip.file(filename, doc.output('blob'));

            //delete pages in document
            /*
            var pageCount = doc.internal.getNumberOfPages();
            for(var page=0;page<=pageCount+1;page++){
                doc.deletePage(page)
            }
            */
        }

        zip.generateAsync({type:"blob", compression:"DEFLATE"}).then(function(content) {
            saveAs(content, "CertificadosAnual.zip");
        });

        var time_fin = new Date(); 

        console.log(time_fin-time_incio)

        var minutos = (time_fin-time_incio)/1000/60;
        var horas = Math.floor(minutos/60);
        minutos = minutos % 60;

        console.log('minutos trasncurridos',minutos, 'horas trasncurridos',horas)
        //
        //this.handlerShowPDF()
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
        return(<React.Fragment>
            {this.props.content.map(con=>  
            <div id="pdfPlantilla2" className="row text_size pdfPlantilla2">
                <div className="row" >
                    <div id={id_page1 + con.nroDoc} className="A4-page" >
                        <div id="page1_titulo1" className="row">
                            <div className="w-100 margenCentro bold_text">CERTIFICADO DE ATRIBUCION DE RENTAS</div>
                            <div className="w-100 margenCentro bold_text">PROVENIENTES DEL PATRIMONIO EN FIDEICOMISO – </div>
                            <div className="w-100 margenCentro ">(Base Legal: Ley 30532, Decreto Supremo No. 264-2017-EF, Literal c) del Artículo 18°-A del Decreto Supremo </div>
                            <div className="w-100 margenCentro ">N° 122-94-EF y normas modificatorias)</div>
                        </div>

                        <div className="row margensuperior-60">
                            <div className=" margenIzquierdo bold_text">CONTRIBUYENTE DE LOS IMPUESTOS</div>
                        </div>                
                        <div className="row margensuperior-20">
                            <div className="margenIzquierdo">RAZON SOCIAL: {con.descripcion}</div>
                        </div>
                        <div className="row">
                            <div className="margenIzquierdo">RUC / OTROS: {con.nroDoc}</div>
                        </div>
                        <div className="row">
                            <div className="margenIzquierdo">PERIODO TRIBUTARIO: {con.periodo}</div>
                        </div>
                        <div className="row">
                            <div className="margenIzquierdo">MONEDA: NUEVOS SOLES PERUANOS (S/.)</div>
                        </div>
                        <div className="row">
                            <div className="margenIzquierdo">DOMICILIO FISCAL: {con.domicilio} </div>
                        </div>
                        <div className="row bold_text margensuperior-20">
                            <div className="margenIzquierdo">DATOS DEL EMISOR DEL CERTIFICADO</div>
                        </div>
                        <div className="row">
                            <div className="margenIzquierdo">° RAZON SOCIAL: CREDICORP CAPITAL SOCIEDAD TITULIZADORA S.A</div>
                        </div>
                        <div className="row">
                            <div className="margenIzquierdo">° RUC : 20375887763</div>
                        </div>
                        <div className="row">
                            <div className="margenIzquierdo">° DOMICILIO FISCAL : AV. EL DEBY N° 055 URB. EDIFICIO CRONOS PISO 9 T4 – SANTIAGO DE SURCO</div>
                        </div>
                        <div className="row bold_text margensuperior-20">
                            <div className=" margenIzquierdo">A.	ATRIBUCIÓN DE RENTAS DE ALQUILERES EN EL FIBRA AL 31 DE DICIEMBRE DE 2019</div>
                        </div>
                        <div className="row bold_text margensuperior-20">
                            <div className=" margenIzquierdo">I)	RENTAS (O PÉRDIDAS) DE FUENTE PERUANA</div>
                        </div>
                        <div className="row bold_text margensuperior-20">
                            <div className=" margenIzquierdo">II)	  RENTAS (O PÉRDIDAS) NETAS DE FUENTE EXTRANJERA                        </div>
                        </div>
                        <div className="row margensuperior-60">Lima, {this.state.day} de {this.state.month} del {this.state.year}</div>
                        
                        <div className="row margensuperior-60 ">
                            <div className=" margenCentro col-6 ">
                                <div className="margenCentro ">__________________</div> 
                                <div className="margenCentro bold_text">Juana Cossio Cavero </div>
                                <div className="margenCentro bold_text">Representante Legal</div>
                                <div className="margenCentro bold_text">DNI</div>           
                            </div>
                            <div className=" margenCentro col-6 ">
                                <div className="margenCentro">__________________</div> 
                                <div className="margenCentro bold_text">Ricardo Salazar Otárola</div>
                                <div className="margenCentro bold_text">Contador General</div>
                                <div className="margenCentro bold_text">DNI</div>                                  
                            </div>
                        </div>
                    </div>
            
                    <div id={id_page2 + con.nroDoc} className="A4-page" >
                        <div className="row bold_text">Anexo de detalle de rentas extranjeras</div>
                        <div className="row bold_text margensuperior-20">i.	COLOMBIA:</div>
                        
                        <div className="row margensuperior-20">
                            <table className="data_table_renta">
                                <thead >
                                    <tr>
                                        <th></th>
                                        <th className="border_th">Perdida</th>
                                        <th className="border_th">Renta Neta</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr index={1}>
                                        <td>Gravadas</td>
                                        <td></td>
                                        <td></td>                            
                                    </tr>
                                    <tr>
                                        <td>Exoneradas</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Inafectas</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="row bold_text margensuperior-20">ii.	MEXICO:</div>
                        <div className="row margensuperior-20">
                            <table className="data_table_renta">
                                <thead >
                                    <tr>
                                        <th></th>
                                        <th className="border_th">Perdida</th>
                                        <th className="border_th">Renta Neta</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Gravadas</td>
                                        <td></td>
                                        <td></td>                            
                                    </tr>
                                    <tr>
                                        <td>Exoneradas</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Inafectas</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>                            
                        <div className="row bold_text margensuperior-20">iii. COSTA RICA:</div>
                        <div className="row margensuperior-20">
                            <table className="data_table_renta">
                                <thead >
                                    <tr>
                                        <th></th>
                                        <th className="border_th">Perdida</th>
                                        <th className="border_th">Renta Neta</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Gravadas</td>
                                        <td></td>
                                        <td></td>                            
                                    </tr>
                                    <tr>
                                        <td>Exoneradas</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Inafectas</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div> 
                        <div className="row bold_text margensuperior-20">iv.	CHILE:</div>
                        <div className="row margensuperior-20">
                            <table className="data_table_renta">
                                <thead >
                                    <tr>
                                        <th></th>
                                        <th className="border_th">Perdida</th>
                                        <th className="border_th">Renta Neta</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Gravadas</td>
                                        <td></td>
                                        <td></td>                            
                                    </tr>
                                    <tr>
                                        <td>Exoneradas</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Inafectas</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="row margensuperior-60">Lima, {this.state.day} de {this.state.month} del {this.state.year}</div>

                        <div className="row margensuperior-60">
                            <div className=" margenCentro col-6 ">
                                <div className="margenCentro ">__________________</div> 
                                <div className="margenCentro bold_text">Juana Cossio Cavero </div>
                                <div className="margenCentro bold_text">Representante Legal</div>
                                <div className="margenCentro bold_text">DNI</div>           
                            </div>
                            <div className=" margenCentro col-6 ">
                                <div className="margenCentro">__________________</div> 
                                <div className="margenCentro bold_text">Ricardo Salazar Otárola</div>
                                <div className="margenCentro bold_text">Contador General</div>
                                <div className="margenCentro bold_text">DNI</div>                                  
                            </div>
                        </div>
                    </div>

                    <div id={id_page3 + con.nroDoc} className="A4-page">
                        <div className="row">
                            <div className="w-100 margenCentro bold_text">CERTIFICADO DE RETENCIONES DE RENTA Y ATRIBUCIÓN DE CRÉDITOS POR IMPUESTOS ABONADOS EN EL </div>
                            <div className="w-100 margenCentro bold_text">EXTERIOR PROVENIENTES DEL PATRIMONIO EN FIDEICOMISO – </div>
                            <div className="w-100 margenCentro">(Base Legal: Literal c) del Artículo 18°-A del Decreto Supremo N° 122-94-EF y normas modificatorias)</div>
                        </div>

                        <div className="row bold_text margensuperior-60">
                            <div className=" margenIzquierdo">CONTRIBUYENTE DE LOS IMPUESTOS</div>
                        </div>
                        <div className="row">
                            <div className=" margenIzquierdo">* RAZON SOCIAL: {con.descripcion}</div>
                        </div>
                        <div className="row">
                            <div className=" margenIzquierdo">* RUC / OTROS: {con.nroDoc}</div>
                        </div>
                        <div className="row">
                            <div className=" margenIzquierdo">* DOMICILIO FISCAL: {con.domicilio}</div>
                        </div>
                        <div className="row bold_text margensuperior-20">
                            <div className=" margenIzquierdo">AGENTE DE RETENCION</div>
                        </div>
                        <div className="row">
                            <div className=" margenIzquierdo">* RAZON SOCIAL: CREDICORP CAPITAL SOCIEDAD TITULIZADORA S.A</div>
                        </div>
                        <div className="row">
                            <div className=" margenIzquierdo">* RUC: 20375887763</div>
                        </div>
                        <div className="row">
                            <div className=" margenIzquierdo">* DOMICILIO FISCAL: </div>
                        </div>
                        <div className="row">
                            <div className="row">RANGO DE FECHAS                         DEL __/__/2019 AL __/__/2019</div>
                            <div className="row">PERIODO TRIBUTARIO                   2019</div>
                            <div className="row">MONEDA                                            SOLES</div>
                            <div className="row">IMPORTE INVERTIDO</div>
                        </div>

                        <div className="row bold_text margensuperior-20">
                            <div className=" margenIzquierdo">A.	RETENCIONES POR CONCEPTO DE RENTAS DE FUENTE PERUANA EN EL FIBRA AL 31 _____ DE ____ 2019</div>
                            <div className="row margensuperior-20">
                                <table className="data_table_renta">
                                    <thead >
                                        <tr>
                                            <th></th>
                                            <th className="border_th">Renta</th>
                                            <th className="border_th">Bruta	Gastos</th>
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
                            <div className=" margenIzquierdo">B.	IMPUESTOS A LA RENTA ABONADOS EN EL EXTERIOR AL ___ DE _____ DE 2019</div>
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

                        <div className="row margensuperior-60">
                            <div className=" margenCentro col-6 ">
                                <div className="margenCentro ">__________________</div> 
                                <div className="margenCentro bold_text">Juana Cossio Cavero </div>
                                <div className="margenCentro bold_text">Representante Legal</div>
                                <div className="margenCentro bold_text">DNI</div>           
                            </div>
                            <div className=" margenCentro col-6 ">
                                <div className="margenCentro">__________________</div> 
                                <div className="margenCentro bold_text">Ricardo Salazar Otárola</div>
                                <div className="margenCentro bold_text">Contador General</div>
                                <div className="margenCentro bold_text">DNI</div>                                  
                            </div>
                        </div>

                    </div>
                    
                    <div id={id_page4 + con.nroDoc} className="A4-page">

                        <div className="row bold_text">Anexo de detalle de Impuesto a la Renta extranjero</div>
                        <div className="row bold_text margensuperior-20">i.	COLOMBIA:</div>
                        <div className="row margensuperior-20">
                            <table className="data_table_renta w_250px">
                                <thead >
                                    <tr>
                                        <th className="border_th">Monto Pagado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>                            
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="row bold_text margensuperior-20">ii.	MEXICO:</div>
                        <div className="row margensuperior-20">
                            <table className="data_table_renta w_250px">
                                <thead >
                                    <tr>
                                        <th className="border_th" >Monto Pagado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>                            
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="row bold_text margensuperior-20">iii. COSTA RICA:</div>
                        <div className="row margensuperior-20">
                            <table className="data_table_renta w_250px">
                                <thead >
                                    <tr>
                                        <th className="border_th" >Monto Pagado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>                            
                                    </tr>
                                </tbody>
                            </table>
                        </div>                            
                        <div className="row bold_text margensuperior-20">iv.	CHILE:</div>
                        <div className="row margensuperior-20">
                            <table className="data_table_renta w_250px">
                                <thead >
                                    <tr>
                                        <th className="border_th" >Monto Pagado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>                            
                                    </tr>
                                </tbody>
                            </table>
                        </div>                            

                        <div className="row margensuperior-60">Lima, {this.state.day} de {this.state.month} del {this.state.year}</div>

                        <div className="row margensuperior-60">
                            <div className=" margenCentro col-6 ">
                                <div className="margenCentro ">__________________</div> 
                                <div className="margenCentro bold_text">Juana Cossio Cavero </div>
                                <div className="margenCentro bold_text">Representante Legal</div>
                                <div className="margenCentro bold_text">DNI</div>           
                            </div>
                            <div className=" margenCentro col-6 ">
                                <div className="margenCentro">__________________</div> 
                                <div className="margenCentro bold_text">Ricardo Salazar Otárola</div>
                                <div className="margenCentro bold_text">Contador General</div>
                                <div className="margenCentro bold_text">DNI</div>                                  
                            </div>
                        </div>

                    </div>

                </div>
            </div>                      
            )}

        </React.Fragment>)
    }
    componentDidMount(){
        this.generarPDF2()
        this.setState({show:true})
    }
    
    render(){ 
        console.log('render',this.props.content)
        const newPDF = this.dibujar()
        
        return(
            <React.Fragment>
                   
                {this.state.show?newPDF:null}
                                    
            </React.Fragment>
        );
    }
}
export default PdfCertificado2;
