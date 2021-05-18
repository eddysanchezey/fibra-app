import './Mantenimiento.css';
import React, { Component } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas'
class PdfCertificado extends Component {
    state={

    }
    generarPDF=()=>{
        // Default export is a4 paper, portrait, using milimeters for units
        // orientation default vertical  / orientation horizontal ='landscape'
        //var doc = new jsPDF({
        //    orientation: 'landscape',})        
        //doc.text('Hello world!', 10, 10)
        //var elem = document.getElementById('pdfPlantilla');        
        //doc.fromHTML((elem),20,20)
        //Agregar pagina
        //doc.addPage();
        //doc.text('Hello world!', 10, 10)
        //Grabar documento
        //doc.save('a4.pdf')


        
        const printArea = document.getElementById("pdfPlantilla");

        html2canvas(printArea).then(canvas => {
            const dataURL = canvas.toDataURL();
            console.log(dataURL)
            const pdf = new jsPDF({orientation: 'landscape',});

            var width = pdf.internal.pageSize.getWidth();
            var height = pdf.internal.pageSize.getHeight();// 210 mm  11 Filas(incluye la cabecera de la tabla) fijas + #filas de registros en tabla
            
            let w=width*0.9
            let h=height*0.7
            console.log(w)
            console.log(height)
            //Imagen,Formato,posX,posY,width, height
            pdf.addImage(dataURL, 'JPEG', 20, 20,w,h)

            pdf.save('saved.pdf')
        })

        

    }
    render(){
        return(
            <React.Fragment>
                <div id="pdfPlantilla" className="row text_size">
                    <div className="row">
                        <div className="col-cabecera-der margenIzquierdo">CAVALI S.A. I.C.L.V</div>
                        <div className="col-cabecera-cen margenCentro">RELACION DE TITULARES Y SALDOS EN CAVALI</div>
                        <div className="col-cabecera-izq margenDerecho">PRIVADA</div>
                    </div>
                    <div className="row">
                        <div className="w_45 margenIzquierdo">CV2205R</div>
                        <div className="w_40 margenIzquierdo">FECHA DE CORTE    : 31/12/2019</div>
                        <div className="col-cabecera-izq margenIzquierdo">HORA   :09:49:41</div>
                    </div>
                    <div className="row">
                        <div className="w_45 margenIzquierdo">IOPE$HBN</div>
                        <div className="w_40 margenIzquierdo">VALOR  :CVL80050U017 B.T. COSTANERA 1P. 1EM S-U</div>
                        <div className="col-cabecera-izq margenIzquierdo">PAGINA :1 DE 2</div>
                    </div>
                    <div className="row">
                        <div className="w_45 margenIzquierdo"> </div>
                        <div className="w_40 margenIzquierdo">FECHA DE REGISTRO : 03/01/2020</div>
                        <div className="col-cabecera-izq margenIzquierdo">FECHA  :06/01/2020</div>
                    </div>
                    <div className="row">
                        <table className="table">
                            <thead className="table-cabecera">
                                <tr>
                                <th colSpan="1">CODIGO</th>
                                <th colSpan="1">NOMBRE DEL TITULAR</th>
                                <th colSpan="1">SALDO CAVALI</th>
                                <th colSpan="1">DIRECCION</th>
                                <th colSpan="1">DISTRITO</th>
                                <th colSpan="1">TIPO</th>
                                <th colSpan="1">RES</th>
                                <th colSpan="1">NAC</th>
                                <th colSpan="1">PER</th>
                                <th colSpan="1">DOM</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>1</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>1</td>
                                </tr>

                            </tbody>
                        </table>
                        
                    </div>

                    <div className="row margensuperior">
                        <div className="col-cabecera-der margenIzquierdo"> </div>
                        <div className="w_40 margenIzquierdo">TOTAL SALDO CONTABLE POR VALOR    :</div>
                        <div className="col-cabecera-der margenIzquierdo">14,000</div>
                    </div>
                    <div className="row">
                        <div className="col-cabecera-der margenIzquierdo"> </div>
                        <div className="w_40 margenIzquierdo">TOTAL SALDO REPORTE POR VALOR     :</div>
                        <div className="col-cabecera-der margenIzquierdo">0</div>
                    </div>
                    <div className="row">
                        <div className="col-cabecera-der margenIzquierdo"> </div>
                        <div className="w_40 margenIzquierdo">TOTAL SALDO PRESTAMO POR VALOR    :</div>
                        <div className="col-cabecera-der margenIzquierdo">0</div>
                    </div>
                    <div className="row">
                        <div className="col-cabecera-der margenIzquierdo"> </div>
                        <div className="w_40 margenIzquierdo">TOTAL SALDO GAR. PRINC POR VALOR  :</div>
                        <div className="col-cabecera-der margenIzquierdo">0</div>
                    </div>
                    <div className="row">
                        <div className="col-cabecera-der margenIzquierdo"> </div>
                        <div className="w_40 margenIzquierdo">TOTAL DE TITULARES POR VALOR      :</div>
                        <div className="col-cabecera-der margenIzquierdo">2</div>
                    </div>

                    <div className="row margensuperior">
                        <div className="row">.</div>
                        <div className="row">LEYENDA:</div>
                        <div className="row">.</div>
                        <div className="row">TIPO DE PERSONA</div>
                        <div className="row">.</div>
                        <div className="row">NA - NATURAL              JU - JURIDICA</div>
                        <div className="row">.</div>
                        <div className="row">PAIS DE RESIDENCIA / NACIONALIDAD</div>
                         
                    </div>


                </div>
                <div className="row">
                <div className="row text-derecha">                        
                        <div className="i_contenedor">
                        <button className="tab_botonmove" onClick={()=>this.generarPDF()}> Descargar PDF</button>
                        </div>
                    </div>
                
                </div>
            </React.Fragment>
        );
    }

}
export default PdfCertificado;
