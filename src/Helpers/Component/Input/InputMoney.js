import React from 'react';
const InputMoney = props =>{
    return (<div className="im_contenedor">
        <span className="im_icono">S/</span>
        <input 
            className="im_input" 
            name={props.nombre} 
            value={props.valor}
            onBlur={props.blur}
            onChange={props.changed}/>
    </div>);
}
export default InputMoney;