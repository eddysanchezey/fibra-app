import '../../Body.css';
import '../Mantenimiento.css'
//To zip txt
//import JSZip from 'jszip';
import { saveAs } from 'file-saver'; 
const TxtFormulario1666=(contenidoTXT)=> {
    /*
    state={
        contenidoTXT:{
            nombreArchivo:"CV2205R_STK_CVL80050U017.202001",
            nombreFibra:"CVL80050U017B.T. COSTANERA 1P. 1EM S-U",
            data:[{id:1,numeroInversionista:'3112201900960515',nombreInversionista:"MEDINA MENDEZ JORGE HERNANDO",domicilio:"000000001000000000000000000000000000AV. VICTOR ANDRES BELAUNDE 171 PISO 6", tpoDocumento:"DNI", numeroDocumento:"07902693" ,codigo:"SPEPEN000150131"},
            {id:2,numeroInversionista:'3112201900832107',nombreInversionista:"UNIVERSIDAD DE LIMA",domicilio:"000000000400000000000000000000000000AV JAVIER PRADO ESTE - CUADRA 46 - MONTERRICO", tpoDocumento:"RUC", numeroDocumento:"20107798049" ,codigo:"SPEPEJ000150140"},
            ]
        }
    }

    const downloadTxtFile=(contenidoTXT)=> {
//https://stackoverflow.com/questions/44656610/download-a-string-as-txt-file-in-react/44661948

const element = document.createElement("a");
//Obtener Archivos

//Inserta texto desde label en el front
//const file = new Blob([document.getElementById('myInput').value], {type: 'text/plain'});

//Inserta lineas de texto desde una variable(backend)
var texto= [];
let j=0;
let fila=""
for (var i=0;i<contenidoTXT.data.length ;i++)
{
    j=i;

    fila=contenidoTXT.data[j].tpoDocumento+'|'+contenidoTXT.data[j].numeroDocumento+ '|'+contenidoTXT.data[j].apellPaterno+'|'+
    contenidoTXT.data[j].apellMaterno +'|'+contenidoTXT.data[j].nombres+ '|'+contenidoTXT.data[j].razSocial +'|'+
    contenidoTXT.data[j].caracterRenta +'|'+contenidoTXT.data[j].determinacionRenta + '|'+contenidoTXT.data[j].origenRenta +'|'+
    contenidoTXT.data[j].tipoRentaNoDom +'|'+contenidoTXT.data[j].tipoEnajenacion + '|'+contenidoTXT.data[j].codPaisCategFntExtranjera +'|'+
    contenidoTXT.data[j].codPaisResidencia +'|'+contenidoTXT.data[j].direccionResidencia + '|'+contenidoTXT.data[j].montoEnajenacion +'|'+    
    contenidoTXT.data[j].costo +'|'+contenidoTXT.data[j].origenCostoRegICLV + '|'+contenidoTXT.data[j].ganancia +'|'+
    contenidoTXT.data[j].perdida +'|'+contenidoTXT.data[j].perdidaNoCompensadaMesesAnt + '|'+contenidoTXT.data[j].cantidadValoresEnajenados +'|'+
    contenidoTXT.data[j].tasa +'|'+contenidoTXT.data[j].montoRetencion + '|'+contenidoTXT.data[j].codigoISIN +'|'+
    contenidoTXT.data[j].tipoFondo +'|'+contenidoTXT.data[j].codigoFondo
    
    
    
    texto.push(fila);
    

}
//
const file = new Blob(texto, {type: 'text/plain'});
element.href = URL.createObjectURL(file);
//Nombre de archivo de salida
element.download = contenidoTXT.nombreArchivo+".txt";
document.body.appendChild(element); // Required for this to work in FireFox
element.click();


}


const descargarArchivo=(contenidoEnBlob, nombreArchivo) =>{
    var reader = new FileReader();
    reader.onload =  (event)=> {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
            'view': window,
                'bubbles': true,
                'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
}


//Genera un objeto Blob con los datos en un archivo TXT
const generarTexto=(datos)=> {
    var texto = [];
    texto.push('Datos Personales:\n');
    texto.push('Nombre: ');
    texto.push(datos.nombre);
    texto.push('\n');
    texto.push('Teléfono: ');
    texto.push(datos.telefono);
    texto.push('\n');
    texto.push('Fecha: ');
    texto.push(datos.fecha);
    texto.push('\n');
    //El contructor de Blob requiere un Array en el primer parámetro
    //así que no es necesario usar toString. el segundo parámetro
    //es el tipo MIME del archivo
    return new Blob(texto, {
        type: 'text/plain'
    });
}



    */



    
   function kmpSearch(pattern, text) {
    if (pattern.length === 0)
      return 0; // Immediate match
  
    // Compute longest suffix-prefix table
    var lsp = [0]; // Base case
    for (var h = 1; h < pattern.length; h++) {
      var k = lsp[h - 1]; // Start by assuming we're extending the previous LSP
      while (k > 0 && pattern.charAt(h) !== pattern.charAt(k))
        k = lsp[k - 1];
      if (pattern.charAt(h) === pattern.charAt(k))
        k++;
      lsp.push(k);
    }
  
    // Walk through text string
    //var k = 0; // Number of chars matched in pattern
    k = 0;
    //for (var h = 0; h < text.length; h++) {
    for ( h = 0; h < text.length; h++) {
      while (k > 0 && text.charAt(h) !== pattern.charAt(k))
        k = lsp[k - 1]; // Fall back in the pattern
      if (text.charAt(h) === pattern.charAt(k)) {
        k++; // Next char matched, increment position
        if (k === pattern.length)
          return h - (k - 1);
        } 
    }  
    }

    /*
    const downloadTxtZip= (contenidoTXT)=> {
    //https://stackoverflow.com/questions/44656610/download-a-string-as-txt-file-in-react/44661948
    var zip = new JSZip();

      
    
    //Obtener Archivos
    
    //Inserta texto desde label en el front
    //const file = new Blob([document.getElementById('myInput').value], {type: 'text/plain'});
    
    //Inserta lineas de texto desde una variable(backend)
    var texto= [];
    let j=0;
    let fila=""
    //var dataTxt=contenidoTXT.data
    
    for (var i=0;i<contenidoTXT.data.length ;i++)
    {
        j=i;
        
    
        fila=(contenidoTXT.data[j].tipoDocumento===null?"":contenidoTXT.data[j].tipoDocumento)+'|'+
        (contenidoTXT.data[j].numeroDocumento===null?"":contenidoTXT.data[j].numeroDocumento)+ '|'+
        (contenidoTXT.data[j].apellidoPaterno===null?"":contenidoTXT.data[j].apellidoPaterno)+'|'+
        (contenidoTXT.data[j].apellidoMaterno===null?"":contenidoTXT.data[j].apellidoMaterno) +'|'+
        (contenidoTXT.data[j].nombres===null?"":contenidoTXT.data[j].nombres)+ '|'+
        (contenidoTXT.data[j].razonSocial===null?"":contenidoTXT.data[j].razonSocial) +'|'+
        (contenidoTXT.data[j].caracterRenta===null?"":contenidoTXT.data[j].caracterRenta) +'|'+
        (contenidoTXT.data[j].determinacionCategoria===null?"":contenidoTXT.data[j].determinacionCategoria) + '|'+
        (contenidoTXT.data[j].origenRenta===null?"":contenidoTXT.data[j].origenRenta) +'|'+
        (contenidoTXT.data[j].tipoRentaNoDomiciliado===null?"":contenidoTXT.data[j].tipoRentaNoDomiciliado)+'|'+
        (contenidoTXT.data[j].tipoEnajenacion===null?"":contenidoTXT.data[j].tipoEnajenacion) + '|'+
        (contenidoTXT.data[j].codigoPaisCategFntExtrajera===null?"":contenidoTXT.data[j].codigoPaisCategFntExtrajera) +'|'+
        (contenidoTXT.data[j].codigoPaisResidencia===null?"":contenidoTXT.data[j].codigoPaisResidencia)+'|'+
        (contenidoTXT.data[j].direccionResidencia===null?"":contenidoTXT.data[j].direccionResidencia) + '|'+
        (contenidoTXT.data[j].montoenajenacion===null?"":contenidoTXT.data[j].montoenajenacion) +'|'+    
        (contenidoTXT.data[j].costo===null?"":contenidoTXT.data[j].costo) +'|'+
        (contenidoTXT.data[j].origenCostoRegistradoICLV===null?"":contenidoTXT.data[j].origenCostoRegistradoICLV) + '|'+
        (contenidoTXT.data[j].ganancia===null?"":contenidoTXT.data[j].ganancia) +'|'+
        (contenidoTXT.data[j].perdida===null?"":contenidoTXT.data[j].perdida) +'|'+
        (contenidoTXT.data[j].perdidaNoCompensadaMesesAntes===null?"":contenidoTXT.data[j].perdidaNoCompensadaMesesAntes) + '|'+
        (contenidoTXT.data[j].cantidadValoresEnajenados===null?"":contenidoTXT.data[j].cantidadValoresEnajenados) +'|'+
        //contenidoTXT.data[j].tasa +"|"+
        (contenidoTXT.data[j].tasa===null?"":( (kmpSearch('.',contenidoTXT.data[j].tasa)===-1?contenidoTXT.data[j].tasa.split('.')[0]+'.'+contenidoTXT.data[j].tasa.split('.')[1].substring(0,2):contenidoTXT.data[j].tasa )))+"|"+
        //(contenidoTXT.data[j].tasa===null?"":((contenidoTXT.data[j].tasa).contains('.')?contenidoTXT.data[j].tasa.split('.')[0]+'.'+contenidoTXT.data[j].tasa.split('.')[1].subtring(0,2):contenidoTXT.data[j].tasa)) +'|'+
        (contenidoTXT.data[j].montoRetencion===null?"":contenidoTXT.data[j].montoRetencion) + '|'+
        (contenidoTXT.data[j].codigoISIN===null?"":contenidoTXT.data[j].codigoISIN) +'|'+
        (contenidoTXT.data[j].tipoFondo===null?"":contenidoTXT.data[j].tipoFondo) +'|'+
        (contenidoTXT.data[j].codigoFondo===null?"":contenidoTXT.data[j].codigoFondo)+ "\n"
        
        
        
        texto.push(fila);
        
    
    }
    //
    const file = new Blob(texto, {type: 'text/plain'});
    
    
    zip.file(contenidoTXT.RUC+"GC"+contenidoTXT.Trimestre+".txt", file);
    zip.generateAsync({type:"blob", compression:"DEFLATE"}).then(function(content) {
        
        saveAs(content, "Formulario1666"+contenidoTXT.Trimestre+".zip");
    });
    
    
    }
    */
    
    const descargarTxt=(contenidoTXT)=>{
    var texto= [];
    let j=0;
    let fila=""
    //var dataTxt=contenidoTXT.data
    
    for (var i=0;i<contenidoTXT.data.length ;i++)
    {
        j=i;        
    
        fila=(contenidoTXT.data[j].tipoDocumento===null?"":contenidoTXT.data[j].tipoDocumento)+'|'+
        (contenidoTXT.data[j].numeroDocumento===null?"":contenidoTXT.data[j].numeroDocumento)+ '|'+
        (contenidoTXT.data[j].apellidoPaterno===null?"":contenidoTXT.data[j].apellidoPaterno)+'|'+
        (contenidoTXT.data[j].apellidoMaterno===null?"":contenidoTXT.data[j].apellidoMaterno) +'|'+
        (contenidoTXT.data[j].nombres===null?"":contenidoTXT.data[j].nombres)+ '|'+
        (contenidoTXT.data[j].razonSocial===null?"":contenidoTXT.data[j].razonSocial) +'|'+
        (contenidoTXT.data[j].caracterRenta===null?"":contenidoTXT.data[j].caracterRenta) +'|'+
        (contenidoTXT.data[j].determinacionCategoria===null?"":contenidoTXT.data[j].determinacionCategoria) + '|'+
        (contenidoTXT.data[j].origenRenta===null?"":contenidoTXT.data[j].origenRenta) +'|'+
        (contenidoTXT.data[j].tipoRentaNoDomiciliado===null?"":contenidoTXT.data[j].tipoRentaNoDomiciliado)+'|'+
        (contenidoTXT.data[j].tipoEnajenacion===null?"":contenidoTXT.data[j].tipoEnajenacion) + '|'+
        (contenidoTXT.data[j].codigoPaisCategFntExtrajera===null?"":contenidoTXT.data[j].codigoPaisCategFntExtrajera) +'|'+
        (contenidoTXT.data[j].codigoPaisResidencia===null?"":contenidoTXT.data[j].codigoPaisResidencia)+'|'+
        (contenidoTXT.data[j].direccionResidencia===null?"":contenidoTXT.data[j].direccionResidencia) + '|'+
        (contenidoTXT.data[j].montoenajenacion===null?"":contenidoTXT.data[j].montoenajenacion) +'|'+    
        (contenidoTXT.data[j].costo===null?"":contenidoTXT.data[j].costo) +'|'+
        (contenidoTXT.data[j].origenCostoRegistradoICLV===null?"":contenidoTXT.data[j].origenCostoRegistradoICLV) + '|'+
        (contenidoTXT.data[j].ganancia===null?"":contenidoTXT.data[j].ganancia) +'|'+
        (contenidoTXT.data[j].perdida===null?"":contenidoTXT.data[j].perdida) +'|'+
        (contenidoTXT.data[j].perdidaNoCompensadaMesesAntes===null?"":contenidoTXT.data[j].perdidaNoCompensadaMesesAntes) + '|'+
        (contenidoTXT.data[j].cantidadValoresEnajenados===null?"":contenidoTXT.data[j].cantidadValoresEnajenados) +'|'+
        //contenidoTXT.data[j].tasa +"|"+
        (contenidoTXT.data[j].tasa===null?"":( (kmpSearch('.',contenidoTXT.data[j].tasa)===-1?contenidoTXT.data[j].tasa.split('.')[0]+'.'+contenidoTXT.data[j].tasa.split('.')[1].substring(0,2):contenidoTXT.data[j].tasa )))+"|"+
        //(contenidoTXT.data[j].tasa===null?"":((contenidoTXT.data[j].tasa).contains('.')?contenidoTXT.data[j].tasa.split('.')[0]+'.'+contenidoTXT.data[j].tasa.split('.')[1].subtring(0,2):contenidoTXT.data[j].tasa)) +'|'+        
        (contenidoTXT.data[j].montoRetencion===null?"":contenidoTXT.data[j].montoRetencion.toFixed(2) ) + '|'+
        (contenidoTXT.data[j].codigoISIN===null?"":contenidoTXT.data[j].codigoISIN) +'|'+
        (contenidoTXT.data[j].tipoFondo===null?"":contenidoTXT.data[j].tipoFondo) +'|'+
        (contenidoTXT.data[j].codigoFondo===null?"":contenidoTXT.data[j].codigoFondo)+ "\n"
        
        texto.push(fila);
        
    
    }
    //var blob = new Blob([texto], { type: "text/plain;charset=utf-8" });
    var blob = new Blob(texto, { type: "text/plain;charset=utf-8" });
            saveAs(blob, contenidoTXT.RUC+"GC"+contenidoTXT.Trimestre+".txt");

    }






//Funcion que se ejecuta
descargarTxt(contenidoTXT)


/*
render(){
    return(
        <React.Fragment>
            <div className="row">
                <div className="row text-derecha"> 
                    <div className="i_contenedor">
                    <button className="tab_botonmove" onClick={this.downloadTxtFile}>Descargar TXT</button>

                    </div>
                </div>
            </div>
            
        </React.Fragment>
    );

    
}
*/
}
export default TxtFormulario1666 
