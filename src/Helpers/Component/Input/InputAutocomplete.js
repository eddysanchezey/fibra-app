import React, { useRef, useEffect } from "react";
import './Input.css';

const InputAutocomplete = props =>{

    let error = null;
    if (props.error && props.error.flag === true){
        error = <p className="msj_alerta">{props.error.mensaje}</p>;
    }

    return (
       
    <div className="i_contenedor">
        <label className="label_tabla">{props.children}</label>
        <OutsideAlerter blur={props.blur}>
            <input className="i_input"
                onChange={(e) => props.change(e)}
                onKeyDown={(e) => props.keyPress(e)}
                value = {props.value}
                />
            {
                props.resultados.length > 0?<div className="i_cont_resultlist">
                    {props.resultados.map((objeto,idx) => <div className={idx===props.resSelected?'i_result_selected':null} 
                        onClick={()=>props.seleccionar(idx)}
                        key={idx}>
                        {objeto}</div>
                    )}
                </div>:null
            }
            
        </OutsideAlerter>
        {error}
    </div>)
}

function useOutsideAlerter(ref,props) {
    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            props.blur();
        }
    }
  
    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
}
  
  /**
   * Component that alerts if you click outside of it
   */
const OutsideAlerter = (props)=> {
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef,props);
  
    return <div ref={wrapperRef}>{props.children}</div>;
  }
  
export default InputAutocomplete;