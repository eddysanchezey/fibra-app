import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';


//import authServices from '../../../services/AuthServices'
//const auth = new authServices();
const ExcelFormulario1666=(csvData,fileName)=>{
    const descargarExcelParticipe=(csvData, fileName)=>{
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        
        //utf-8 caracteres especiales o 1252 ASCI en SQL    
        //formato csv, excel cae en redunancia al separar los campos por espacios

        //Asignar nombre a cabeceras
        //console.log(csvData)
        var CSVDataList=[]
        
        for(var temp of csvData){
                console.log(temp)
                /*
                public long IdParticipe { get; set; }
                public string TipoDocumento  {get;set;} 
                public string NumeroDocumento { get; set; }
                public string ApellidoPaterno { get; set; }
                public string ApellidoMaterno { get; set; }
                public string Nombres { get; set; }
                public string RazonSocial { get; set; }
                public string CaracterRenta { get; set; }
                public string DeterminacionCategoria { get; set; }
                public string OrigenRenta { get; set; }
                public string TipoRentaNoDomiciliado { get; set; }
                public string TipoEnajenacion { get; set; }
                public string CodigoPaisCategFntExtrajera { get; set; }
                public string CodigoPaisResidencia { get; set; }
                public string DireccionResidencia { get; set; }
                public string Montoenajenacion { get; set; }
                public string Costo { get; set; }
                public string OrigenCostoRegistradoICLV { get; set; }
                public double Ganancia { get; set; }
                public double Perdida { get; set; }
                public string PerdidaNoCompensadaMesesAntes { get; set; }
                public string CantidadValoresEnajenados { get; set; }
                public string Tasa { get; set; }
                public double MontoRetencion { get; set; }
                public string CodigoISIN { get; set; }
                public string TipoFondo { get; set; }
                public string CodigoFondo { get; set; }
                */
                const v={
                    //" ":"", se aplico inicalmente para dar espacio entre columnas, se reemplazo por origin:"B9"
                    "Tipo de Documento":temp.tipoDocumento,
                    "Número de documento":temp.numeroDocumento,
                    "Apellido Paterno":temp.apellidoPaterno,
                    "Apellido Materno":temp.apellidoMaterno,
                    "Nombres":temp.nombres,
                    "Razón Social " :temp.razonSocial,                   
                    "Carácter Renta":temp.caracterRenta,
                    "Determinación de Categoría  ":temp.determinacionCategoria,
                    "Origen de Renta  ":temp.origenRenta,
                    "Tipo de Renta No Domiciliados  ":temp.tipoRentaNoDomiciliado,
                    "Tipo de enajenación":temp.tipoEnajenacion,
                    "Código de País  de categoría fuente extranjera":temp.codigoPaisCategFntExtrajera,
                    "Código de País  de residencia":temp.codigoPaisResidencia,
                    "Dirección de  residencia":temp.direccionResidencia,
                    "Monto de la enajenación":temp.montoenajenacion,
                    "Costo":temp.costo,
                    "Origen del costo registrado en ICLV":temp.origenCostoRegistradoICLV,
                    "Ganancia":temp.ganancia,
                    "Pérdida":temp.perdida,
                    "Pérdida no compensada de meses anteriores":temp.perdidaNoCompensadaMesesAntes,
                    "Cantidad de Valores enajenados":temp.cantidadValoresEnajenados,
                    "Tasa":temp.tasa,
                    "Monto de Retención":temp.montoRetencion,
                    "Código ISIN":temp.codigoISIN,
                    "Tipo de Fondo ":temp.tipoFondo,
                    "Código del Fondo":temp.codigoFondo,
                    
                }
                CSVDataList.push(v)
            
            
            

        }
        //console.log(CSVDataList)
        //const ws = XLSX.utils.json_to_sheet(CSVDataList);//csvData
        //Agregar nueva fila
        
        const ws = XLSX.utils.json_to_sheet(CSVDataList,{origin:"B1"});//,blankrows:true
       
        
       
       
        
        
        
        //nombre por default en Hoja
        const wb = { Sheets: { 'Formulario1666': ws }, SheetNames: ['Formulario1666'] };
        //Tamaño de buffer en promedio de navegadores "2Gb"
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        //Save como csv
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    
    descargarExcelParticipe(csvData,fileName)
    
    
}
export default ExcelFormulario1666;