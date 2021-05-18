import * as Con from './Constants';
const esp = {
    titulo: "Bienvenido, ",
    subTitulo: "Aquí podrás actualizar tus datos.",
    tab0: "0. Protección de datos",
    tab1: "1. Datos generales",
    tab2: "2. Preguntas",
    tab3: "3. Finalizar",
    check_cambios: "Si no ha realizado ningún cambio en su condición de Beneficiario Final, marque esta opción.",
    btn_siguiente: "Siguiente",
    btn_atras: "Atrás",
    btn_datpersonal:"Guardar datos personales",
    btn_buscar_datpersonal:"Buscar datos personales",
    btn_replegal:"Guardar Representante legal",
    btn_montosfibra:"Guardar montos fibra",
    btn_finalizar: "Finalizar",    
    sec1_title1:"Datos personales",
    sec1_title2:"Datos de contacto",
    sec1_title3:"Datos de estado civil",    
    sec1_title4:"Criterio de prioridad",
    sec1_title5:"Criterio de control",
    sec1_title6:"Información adicional",
    inpnombre: "Nombre",
    inpapellido: "Apellido",
    inptipodoc: "Tipo de documento",
    inpnrodocu: "Nro de documento",
    inpresidencia: "País de residencia",
    inpnacionalidad: "Nacionalidad(es)",
    inpfnacimiento: "Fecha de nacimiento",
    si: "Sí",
    no: "No",
        
    inpdireccion: "Dirección",
    inptelefono: "Teléfono",
    inpcorreo: "Correo electrónico",

    inpestadocivil: "Estado civil",
    inpregimenpatrimonial: "Régimen patrimonial",
    inpnombreconyuge: "Nombre cónyuge",
    inpapellidoconyuge: "Apellido cónyuge",
    inptipodocconyuge: "Tipo de documénto cónyuge",
    inpnrodocuconyuge: "Nro de documénto cónyuge",
    inprelacionconyuge: "Relación",
    ph_autocomplete: "Escriba 2 letras...",
    comentarios_adicionales: "Ingrese aquí de forma opcional, algún comentario que tenga que ver con las preguntas de este formulario.",
    tab3_title: "El proceso de actualización terminó.",
    tab3_resultado1_ok: "Los datos generales se guardaron correctamente.",
    tab3_resultado1_fail: "Se produjo un error al guardar los datos generales.",
    tab3_resultado2_ok: "Sus respuestas se guardaro correctamente.",
    tab3_resultado2_fail: "Se produjo un error al guardar las respuestas.",

    tab3_subtitle: "El administrador fue notificado de las actualizaciones, Ya es seguro cerrar la página",
    tab0_title:"Por favor, Lea con atención nuestras políticas de privacidad y protección de datos",
    deacuerdo: "Estoy de acuerdo, empezar...",

    eylink1: "inicio",
    eylink2: "Datos de usuario",
    benfi_x_empresa: "Beneficiarios Finales por empresa",
    bodyreport_nombreempres: "Nombre de la empresa",
    bodyreport_placeholderbuscar: "Escriba una palabra",
    bodyreport_nro_resultados: "Se encontraron x resultados",
    bodyreport_tabla_datospersonales: "Datos personales",
    bodyreport_tabla_datosdecontacto: "Datos de contacto",
    bodyreport_tabla_datosestadocivil: "Datos estado civil"

};

const eng = {
    titulo: "Welcome, ",
    subTitulo: "Here you can update your data.",
    tab0: "0. Data protection",
    tab1: "1. General information",
    tab2: "2. Questions",
    tab3: "3. End",
    check_cambios: "If you have not made any changes to your status as Final Beneficiary, check this option.",
    btn_siguiente: "Next",
    btn_atras: "Back",
    btn_datpersonal:"Save personal data",
    btn_buscar_datpersonal:"Search personal data",
    btn_replegal:"Save Legal representant",
    btn_montosfibra:"Save fibra is mount",
    btn_finalizar: "Finish",
    sec1_title1:"Personal information",
    sec1_title2:"Contact information",
    sec1_title3:"Marital status information",    
    sec1_title4:"Priority Criteria",
    sec1_title5:"Control Criteria",
    sec1_title6:"Addtional information",
    inpnombre: "Name",
    inpapellido: "Surname",
    inptipodoc: "Document type",
    inpnrodocu: "Document number",
    inpresidencia: "Residence",
    inpnacionalidad: "Nationality(ies)",
    inpfnacimiento: "Date of birth",
    si: "Yes",
    no: "No",

    inpdireccion: "Address",
    inptelefono: "Phone",
    inpcorreo: "E-mail",

    inpestadocivil: "Marital status",
    inpregimenpatrimonial: "Patrimonial regime",
    inpnombreconyuge: "Spouse's name",
    inpapellidoconyuge: "Spouse's surname",
    inptipodocconyuge: "Spouse's document type",
    inpnrodocuconyuge: "Spouse's name document number",
    inprelacionconyuge: "Relation",
    ph_autocomplete: "Type 2 letters...",
    comentarios_adicionales:"Enter here optionally, any comments that have to do with the questions on this form.",

    tab3_title: "The update process finished.",
    tab3_resultado1_ok: "The general data was saved correctly.",
    tab3_resultado1_fail: "There was an error saving general data.",
    tab3_resultado2_ok: "Your answers were saved correctly.",
    tab3_resultado2_fail: "There was an error saving your answers.",

    tab3_subtitle: "The administrator was notified of the updates, It is already safe to close this page",
    tab0_title:"Please, read carefully our privacy and data protection policies",
    deacuerdo: "I agree, start..."
};
export const  exportText = (lang,name) => {
    //console.log(name);
    let content = {};
    switch (lang) {
        case Con.ESP:
            content = {...esp};
            break;
        case Con.ENG:
            content = {...eng};
            break;
        default:
            content = {};
            break;
    }
    //console.log(content);
    return content[name];
}
const contenido = (lang) => {
    switch (lang) {
        case Con.ESP:
            return esp;
        case Con.ENG:
            return eng;
        default:
            return null
    }
}
export default contenido;