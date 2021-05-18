import '../Body.css';
import './Mantenimiento.css'
import React, {Component} from 'react';
//http://jsfiddle.net/roimergarcia/XLqsf/
class TxtCertificado extends Component{

    state={
        contenidoTXT:{
            nombreArchivo:"CV2205R_STK_CVL80050U017.202001",
            nombreFibra:"CVL80050U017B.T. COSTANERA 1P. 1EM S-U",
            data:[{id:1,numeroInversionista:'3112201900960515',nombreInversionista:"MEDINA MENDEZ JORGE HERNANDO",domicilio:"000000001000000000000000000000000000AV. VICTOR ANDRES BELAUNDE 171 PISO 6", tpoDocumento:"DNI", numeroDocumento:"07902693" ,codigo:"SPEPEN000150131"},
            {id:2,numeroInversionista:'3112201900832107',nombreInversionista:"UNIVERSIDAD DE LIMA",domicilio:"000000000400000000000000000000000000AV JAVIER PRADO ESTE - CUADRA 46 - MONTERRICO", tpoDocumento:"RUC", numeroDocumento:"20107798049" ,codigo:"SPEPEJ000150140"},
            ]
        }
    }
downloadTxtFile = () => {
    //https://stackoverflow.com/questions/44656610/download-a-string-as-txt-file-in-react/44661948

    const element = document.createElement("a");
    //Obtener Archivos
    
    //Inserta texto desde label en el front
    //const file = new Blob([document.getElementById('myInput').value], {type: 'text/plain'});
    
    //Inserta lineas de texto desde una variable(backend)
    var texto= [];
    let j=0;
    for (var i=0;i<this.state.contenidoTXT.data.length ;i++)
    {
        j=i;
        let filaa='';
        let filab='';
        filaa.concat(this.state.contenidoTXT.nombreFibra,'\t','\t',this.state.contenidoTXT.data[j].numeroInversionista+'\t','\t',this.state.contenidoTXT.data[j].nombreInversionista+'\n')
        filab.concat(this.state.contenidoTXT.data[j].domicilio,'\t','\t',this.state.contenidoTXT.data[j].tpoDocumento,this.state.contenidoTXT.data[j].numeroDocumento,'\t','\t',this.state.contenidoTXT.data[j].codigo+'\n')

        //texto.push(this.state.contenidoTXT.nombreFibra+'\t'+'\t'+this.state.contenidoTXT.data[j].numeroInversionista+'\t'+'\t'+this.state.contenidoTXT.data[j].nombreInversionista+'\n')
        //texto.push(this.state.contenidoTXT.data[j].domicilio+'\t'+'\t'+this.state.contenidoTXT.data[j].tpoDocumento+this.state.contenidoTXT.data[j].numeroDocumento+'\t'+'\t'+this.state.contenidoTXT.data[j].codigo+'\n');
        texto.push(filaa);
        texto.push(filab);

    }
    //
    const file = new Blob(texto, {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    //Nombre de archivo de salida
    element.download = this.state.contenidoTXT.nombreArchivo+".txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    }
    
 descargarArchivo=(contenidoEnBlob, nombreArchivo)=> {
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

//Función de ayuda: reúne los datos a exportar en un solo objeto
 obtenerDatos=()=> {
    return {
        nombre: document.getElementById('textNombre').value,
        telefono: document.getElementById('textTelefono').value,
        fecha: (new Date()).toLocaleDateString()
    };
}

//Función de ayuda: "escapa" las entidades XML necesarias
//para los valores (y atributos) del archivo XML
 escaparXML=(cadena)=> {
    if (typeof cadena !== 'string') {
        return '';
    };
    cadena = cadena.replace('&', '&amp;')
        .replace('<', '&lt;')
        .replace('>', '&gt;')
        .replace('"', '&quot;');
    return cadena;
}

//Genera un objeto Blob con los datos en un archivo TXT
 generarTexto=(datos)=> {
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


//Genera un objeto Blob con los datos en un archivo XML
generarXml=(datos)=> {
    var texto = [];
    texto.push('<?xml version="1.0" encoding="UTF-8" ?>\n');
    texto.push('<datos>\n');
    texto.push('\t<nombre>');
    texto.push(this.escaparXML(datos.nombre));
    texto.push('</nombre>\n');
    texto.push('\t<telefono>');
    texto.push(this.escaparXML(datos.telefono));
    texto.push('</telefono>\n');
    texto.push('\t<fecha>');
    texto.push(this.escaparXML(datos.fecha));
    texto.push('</fecha>\n');
    texto.push('</datos>');
    //No olvidemos especificar el tipo MIME correcto :)
    return new Blob(texto, {
        type: 'application/xml'
    });
}
/*
document.getElementById('boton-xml').addEventListener('click',  () {
    var datos = obtenerDatos();
    descargarArchivo(generarXml(datos), 'archivo.xml');
}, false);

document.getElementById('boton-txt').addEventListener('click',  () {
    var datos = obtenerDatos();
    descargarArchivo(generarTexto(datos), 'archivo.txt');
}, false);
return(
            <React.Fragment>
            <h3>Datos Personales:</h3>
            <div>
                <label for="textNombre">Nombre:</label>
                <input type="text" id="textNombre" value="Pedro Pérez <Ing. & Lic.>" />
                <br/>
                <label for="textTelefono">Teléfono:</label>
                <input type="text" id="textTelefono" value="+58.212.555.5555" />
                <br/>
            </div>
            <br/>
            <input type="button" id="boton-txt" value="Descargar TXT" />
            <br/>
            <input type="button" id="boton-xml" value="Descargar XML" />
            </React.Fragment>
        );
*/


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

}
export default TxtCertificado
//ReactDOM.render(<TxtCertificado />, document.getElementById("txtCertificado"));

