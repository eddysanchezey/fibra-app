import React from 'react';
/*
Props:
    nombre
    valor
    changed
    keyDown
    blur
    desactivado
    error
*/
const InputPeriodo = props =>{
    let error = null;
    if (props.error && props.error.flag === true){
        error = <p className="msj_alerta">{props.error.mensaje}</p>;
    }
    return (<div className="">
        <div className="form-horizontal">
            <label className="label_tabla">{props.children}</label>
                
            <div className="d-flex">
                <input    
                onChange={props.changed}  
                onKeyDown={props.keyDown}         
                onBlur={props.blur}    
                value={props.valor}                
                disabled={props.desactivado}
                type="text"
                placeholder="yyyy - mm"
                className="claseYear"/>
                
            </div>
        </div>
        {error}
    </div>);
}
export default InputPeriodo;