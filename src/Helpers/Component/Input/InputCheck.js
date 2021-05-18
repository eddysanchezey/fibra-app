import React from 'react';
import './InputCheck.css'
const InputCheck = props =>{
    return (<div className="col-6">
        <div className="form-horizontal-check">
            <label htmlFor={props.nombre} className="checlkContainter">
                {props.children}  
                <input 
                id={props.nombre}
                name={props.nombre}
                disabled={props.desactivado}
                checked={props.valor}
                onChange={props.changed}                
                type="checkbox" 
                className="checkbox" />   
                <span className="checkmark"></span>
            </label>

        </div>
    </div>);
}
export default InputCheck;