import * as FileSaver from 'file-saver';
//import { connectAdvanced } from 'react-redux';
import * as XLSX from 'xlsx';


//import authServices from '../../../services/AuthServices'
//const auth = new authServices();
const CertificadoTrimestralExcel=(csvData,fileName)=>{
    const descargarExcelParticipe=(csvData, fileName)=>{
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        
        //utf-8 caracteres especiales o 1252 ASCI en SQL    
        //formato csv, excel cae en redunancia al separar los campos por espacios

        //Asignar nombre a cabeceras
        //console.log(csvData)
        var CSVDataList=[]
        const numeroRegistro=csvData.length*1
        for(var temp of csvData){
                console.log(temp)
                /*
                codigo_Residencia: "codigo residencia"
                codigo_Titular: "312312321"
                direccion: "Calle Marisal Castilla 4123"
                dividendo_Bruto: 0
                dividendo_Neto: 0
                factor_Impuesto: "0.295"
                impuesto_Retenido: 0
                indicador_Residencia: "indicador de residencia"
                nacionalidad: ""
                nombre_Titular: ""
                nro_Documento: "20983240983"
                saldo_Contable: 0
                tipo_Documento: ""
                tipo_Persona: ""
                total_Impuestos_Retenidos: 0
                ubicacion_Geografica: "ubicacion geografica"
                */
                const v={
                    //" ":"", se aplico inicalmente para dar espacio entre columnas, se reemplazo por origin:"B9"
                    "Código de Titular":temp.codigo_Titular,
                    "Tipo de Persona":temp.tipo_Persona,
                    "Nombre de Titular":temp.nombre_Titular,
                    "Nacionalidad":temp.nacionalidad,
                    "Ubicación Geográfica":temp.ubicacion_Geografica,
                    "Dirección" :temp.direccion,                   
                    "Tipo Documento":temp.tipo_Documento,
                    "Nº de Documento":temp.nro_Documento,
                    "Indicador de Residencia":temp.indicador_Residencia,
                    "Código de Residencia":temp.codigo_Residencia,
                    "Saldo Contable":temp.saldo_Contable,
                    "Factor de Impuesto":temp.factor_Impuesto,
                    "Total de Impuestos Retenidos":temp.total_Impuestos_Retenidos,
                    "Dividendo Bruto":temp.dividendo_Bruto,
                    "Impuesto Retenido":temp.impuesto_Retenido,
                    "Dividendo Neto":temp.dividendo_Neto
                    
                }
                CSVDataList.push(v)
            
            
            

        }
        //console.log(CSVDataList)
        //const ws = XLSX.utils.json_to_sheet(CSVDataList);//csvData
        //Agregar nueva fila
        
        const ws = XLSX.utils.json_to_sheet(CSVDataList,{origin:"B9"});//,blankrows:true
       
        //Insertar o escribir texto en celda Especifica
        const valor1=''
        const valor2=''
        const moneda='USD'
        const matriz=[
            [['Descripción de Valor'],['Valor Nominal'],['Moneda'],['Factor de Entrega'],['Fecha Acuerdo'],['Fecha de Corte'],['Fecha de Registro'],['Fecha Entrega']],
            [[valor1],[valor2],[moneda],[valor2],[valor1],[valor2],[valor1],[valor2]]
        ]
        /*
        Moneda
        Factor de Entrega
        Fecha Acuerdo
        Fecha de Corte
        Fecha de Registro
        Fecha Entrega

         
        */
        const ws_new=XLSX.utils.sheet_add_aoa(ws,matriz,{origin:"D3"})
       
        
        //https://stackoverflow.com/questions/24395693/how-to-set-cell-width-when-export-xlsx-files-with-js-xlsx
        var wscols = [
            {wch:6},
            {wch:15},
            {wch:15},
            {wch:20},
            {wch:20},
            {wch:20},
            {wch:20},
            {wch:20},
            {wch:20},
            {wch:20},
            {wch:20},
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:15},
            {wch:15},
        ];
        
        ws_new['!cols'] = wscols;
        /*
        var cells={
            "!ref": "A1:A3",
            A1: { t:'n', v:1 },
            A2: { t:'n', v:2 },
            A3: { t:'n', v:3, f:'A1+A2' }
        }
        */
        //ws_new['!ref']=cells
        //Escribir valor
        ws_new['A1']={t:'n', v:"" }
        /*
        TOTAL CANTIDAD DE CERTIFICADOS
        VALOR NOMINAL UNITARIO
        TOTAL IMPORTE DE INVERSION

        TOTAL PARTICIPES SIN SALDO CAVALI
        TOTAL PARTICIPES CON SALDO CAVALI
        TOTAL PARTICIPES
        */
       console.log(numeroRegistro)
       var num=839
       const a=num+10*1
       const b=num+11*1
       const c=num+12*1
       const d=num+14*1
       const e=num+15*1
       const f=num+16*1
        ws_new['D'+a]={t:'n', v:"TOTAL CANTIDAD DE CERTIFICADOS" }
        ws_new['D'+b]={t:'n', v:"VALOR NOMINAL UNITARIO" }
        ws_new['D'+(c)]={t:'n', v:"TOTAL IMPORTE DE INVERSION" }

        ws_new['D'+(d)]={t:'n', v:"TOTAL PARTICIPES SIN SALDO CAVALI" }
        ws_new['D'+(e)]={t:'n', v:"TOTAL PARTICIPES CON SALDO CAVALI" }
        ws_new['D'+(f)]={t:'n', v:"TOTAL PARTICIPES" }

        //ws_new['D'+(1)]={t:'n', v:"TOTAL PARTICIPES" }
        //nombre por default en Hoja
        const wb = { Sheets: { 'TITULARES Y SALDOS': ws_new }, SheetNames: ['TITULARES Y SALDOS'] };
        //Tamaño de buffer en promedio de navegadores "2Gb"
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        //Save como csv
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    
    descargarExcelParticipe(csvData,fileName)
    
    
}
export default CertificadoTrimestralExcel;