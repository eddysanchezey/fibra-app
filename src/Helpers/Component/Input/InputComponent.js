import React from 'react';
import './Input.css';
import { TiChevronRightOutline, TiLink } from "react-icons/ti";
import { GoCalendar, GoKey } from "react-icons/go";

const InputComponent = props =>{
    let inputClassName = "i_input";
    let mensajeError = "";
   // console.log(props);
    if (!props.valid.flag && props.valid.touched){
        inputClassName = "i_input i_error";
        mensajeError = props.valid.message;
    }
    
    // TIPO DE INPUT
    let inputElement = null;
    switch (props.type) {
        case 'input':
            inputElement = <input
                className={inputClassName}
                {...props.inputProps}
                onChange={props.changed}
                onBlur={props.blur}
                value = {props.value}/>;
            break;
        case 'inputyBtn':
                inputElement = <div className="d-flex"><input
                    className={inputClassName}
                    {...props.inputProps}
                    onChange={props.changed}
                    onBlur={props.blur}
                    value = {props.value}/>
                    <button        
                    disabled = {props.inputProps.disabled}
                    onClick={props.btnClick}               
                    className="claseBtnCheckLine">
                        <TiChevronRightOutline/>
                    </button></div> ;
                break;
        case 'inputIcon':
                inputElement = <div className="i_contdivicon">
                    <div  className="i_icon">
                    {generarIconos(props.icon)}</div>
                    <input
                    className={inputClassName}
                    {...props.inputProps}
                    onChange={props.changed}
                    onBlur={props.blur}
                    value = {props.value}/>
                    </div> ;
                break;
        case 'inputLink':
                inputElement = <div className="d-flex" title="Ir">                    
                    <input
                    className={inputClassName}
                    {...props.inputProps}
                    onChange={props.changed}
                    onBlur={props.blur}
                    value = {props.value}/>
                    <div  onClick={props.btnClick} className="i_iconLink">
                    {<TiLink/>}</div>
                    </div> ;
                break;
        case 'textarea':
            inputElement = <textarea rows="3" 
                className={inputClassName}
                {...props.inputProps}
                onChange={props.changed}
                onBlur={props.blur}
                value = {props.value} />;
            break;
        case 'checkbox':
                inputElement = <label 
                    className="checlkContainter"
                    {...props.inputProps}                    
                    value = {props.value}>
                        {props.textlabel}
                        <input type="checkbox" 
                            checked={props.value}
                            className="checkbox" 
                            onChange={props.changed}></input>
                        <span className="checkmark"></span>
                    </label>;
                break;
        case 'select':
            inputElement = <select 
                className={inputClassName} 
                {...props.inputProps}
                value={props.value}
                onChange={props.changed}
                onBlur={props.blur}>
                    <option disabled value={0}>-- Seleccionar --</option>
                    {generarOpciones(props.options)}
                </select>;
            break;
        case 'selectAll':
            inputElement = <select 
                className={inputClassName} 
                {...props.inputProps}
                value={props.value}
                onChange={props.changed}
                onBlur={props.blur}>
                    <option value={0}> </option>
                    {/**--TODOS--*/}
                    {generarOpciones(props.options)}
                </select>;
            break;
        default:
            inputElement = <input
                className={inputClassName} 
                {...props.inputProps} 
                onChange={props.changed}
                onBlur={props.blur}
                value = {props.value}/>;
            break;
    }

    return <div className="i_contenedor">
        <label className="i_label">{props.label}</label>
        {inputElement}
        <div className="i_alerta">{mensajeError}</div>
    </div>
} 

const generarOpciones = (items)=>{
    if (items!= null){
        return items.map(op=>{
            return <option key={op.id} value={op.id}>{op.descripcion}</option>
        });
    }
}
const generarIconos = (icono)=>{
    switch (icono) {
        case "GoKey":
            return <GoKey/>;
        case "GoCalendar":
            return <GoCalendar/>
        default:
            return null;
    }
}
export default InputComponent;