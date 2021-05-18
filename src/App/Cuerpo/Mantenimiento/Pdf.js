import './Mantenimiento.css'
import React, { Component } from 'react';
import { Document, Page,StyleSheet, PDFViewer,View,Text } from '@react-pdf/renderer';
 //https://www.npmjs.com/package/react-pdf

// Create styles
const styles = StyleSheet.create({
  
  page: {    
    flexDirection: 'row',
    backgroundColor:'#ffffff'//White ver en un color picker https://www.w3schools.com/colors/colors_picker.asp
  },
  section: {
    margin: 20,//mm
    
    padding: 10,//mm
    flexGrow: 1
  },
  encabezado:{
    margin: 10,//mm
    
    padding: 0,//mm
    flexGrow: 1
  },
  texto:{    
    display:'flex',
    fontStyle:'arial',
    fontSize:8,
    textAlign:'left',

    derecha:{
      display:'flex',
      textAlign: "right"
    },
    izquierda:{
      display:'flex',
      textAlign: "left"
    },
    centrada:{
      display:'flex',
      textAlign: "center"
    },
    
    //textAlign: "center",
  }
});

//Agregar modalidad de Tabla
//https://github.com/diegomura/react-pdf/issues/487

class MyApp extends Component {
  state = {
    numPages: 2,
    pageNumber: 1,
  }
 
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }
 
  render() {
    const { pageNumber, numPages } = this.state;
 
    return (
      <div className="row ">
        <PDFViewer className="ancho_pdf">
          <Document
            file="somefile.pdf"
            onLoadSuccess={this.onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text style={styles.texto}>
                  <Text style={styles.texto.derecha}>Page {pageNumber} of {numPages}</Text>
                  <Text style={styles.texto.centrada}>Page {pageNumber} of {numPages}</Text>
                  <Text style={styles.texto.izquierda}>Page {pageNumber} of {numPages}</Text>
                </Text> 
              </View>

              <View style={styles.encabezado}><Text style={styles.texto}>CAVALI S.A. I.C.L.V. </Text></View>
              <View style={styles.encabezado}><Text style={styles.texto}>RELACION DE TITULARES Y SALDOS EN CAVALI</Text></View>
              <View style={styles.encabezado}><Text style={styles.texto}>PRIVADA</Text></View>
              
              
            </Page>
            <Page pageNumber={pageNumber+1} size="A4" style={styles.page}>
              <View style={styles.section}>
                <Text style={styles.texto}>Page {pageNumber+1} of {numPages}</Text>
              </View>
            </Page>
          </Document>
          
        </PDFViewer>
        

        
        
      </div>
    );
  }
}
export default MyApp;