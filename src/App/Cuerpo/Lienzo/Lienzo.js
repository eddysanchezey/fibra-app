import React from 'react';
//import WithAuth from '../../../Helpers/HoC/WithAuth';
const  Lienzo = props =>{
    return (
        <div className="lienzo">
            <div className="lienzo-header">
                {props.titulo}
            </div>
            <div className="lienzo-cuerpo">
                {props.children}
            </div>
            <div className="row lienzo-footer">
            </div>
        </div> 
    );
}
export default Lienzo;