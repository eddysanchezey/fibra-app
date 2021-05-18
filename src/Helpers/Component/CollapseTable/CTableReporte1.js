import './CollapseTable.css';
import React from 'react';
import {TiPlus, TiMinus} from "react-icons/ti";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";

const CollapseTable = props =>{
    const generarArrow= (flag, dato) =>{
        if (!flag){
            return <div className="ct_datoclosed"><FiChevronRight/> {dato}</div>;
        }else{
            return <div className="ct_datoopen"><FiChevronDown/> {dato}</div>
        }
    }    
    const generarBtnCollapse= (flag, nivel, index1, index2, index3, index4 = null) =>{
        if (!flag){
            return <button onClick={() => props.click(nivel,index1,index2,index3)} className="ct_btnplus"><TiPlus/></button>;
        }else{
            return <button onClick={() => props.click(nivel,index1,index2,index3)} className="ct_btnminum"><TiMinus/></button>
        }
    }
    const generarDivEstado = (estado) => {
        const clase = estado==="Concluido"?"ct_estadoverde":"ct_estadoazul";
        return <div className={clase}>{estado}</div>
    }
    const generarFechaPlazo = (fecha) => {
        const fechaInicio = new Date(fecha).getTime() + (1000*60*60*24*30*9);
        const fechaFin    = new Date().getTime();
        if (!isNaN(fechaInicio)){
            const diff = (fechaInicio - fechaFin)/(1000*60*60*24);
            let clase = "";
            let mensaje = "";
            if (diff < 3){
                clase = "ct_rojo";
                mensaje = "¡Quedan 3 o menos días!";
            }else if (diff < 10){
                clase = "ct_amarillo";
                mensaje = "¡Quedan 10 o menos días!";
            }else{
                clase = "ct_verde";
                mensaje = "Quedan más de 10 días";
            }
        return <div title={mensaje} className={clase}> {fecha}</div>
        }
    }
    return (
        <div className="ct_container">
            <h4 style={{marginTop: "10px"}}>Reporte:</h4>
            <p className="ct_mensajeResultado">{props.mensaje}</p>
             <table className="ct_table">
                <thead>
                    <tr>
                        <th colSpan="3">Periodo|Tributo - Expediente</th>                       
                        <th style={{width: "128px"}}>Etapa/Instancia</th>
                        <th style={{width: "128px"}}>Estado</th>
                        <th style={{width: "110px"}}>Plazo legal</th>
                        <th style={{width: "100px"}}>Deuda</th>
                        <th style={{width: "40px"}}></th>
                    </tr>
                </thead>                    
                <tbody>
                    {
                        props.data.map( (tr1,index1)=>{
                            return (<React.Fragment key={index1}>
                                <tr className="ct_trnivel1">
                                    <td colSpan="5">{generarArrow(tr1.showData,tr1.periodo + " | " + tr1.tributo)}</td>                                    
                                    <td colSpan="2"></td>
                                    <td> {generarBtnCollapse(tr1.showData,1,index1)} </td>
                                </tr>
                                {
                                    tr1.showData?tr1.data.map( (tr2, index2) => {
                                        return (<React.Fragment key={index2}>
                                            <tr className="ct_trnivel2">
                                                {console.log(tr1)}
                                                <td colSpan="2" className="pd-nv1">{generarArrow(tr2.showData,tr2.expediente)} </td>  
                                                <td colSpan="2">{tr2.etapa} </td>
                                                <td>{generarDivEstado(tr2.estado)}</td>  
                                                <td>{generarFechaPlazo(tr2.fecha)}</td>       
                                                <td></td>                                 
                                                <td> {generarBtnCollapse(tr2.showData,2,index1,index2)}</td>
                                            </tr>  
                                            {
                                                tr2.showData?tr2.data.map( (tr3, index3) => {return <React.Fragment key={index3}>
                                                    
                                                    <tr className="ct_trnivel3">
                                                        <td colSpan="2" className="pd-nv2">{generarArrow(tr3.showData,tr3.valor)} </td>  
                                                        <td colSpan="4"></td>  
                                                        <td>{"S/ " + tr3.deuda.toFixed(2)}</td>                              
                                                        <td> {generarBtnCollapse(tr3.showData,3,index1,index2,index3)}</td>
                                                    </tr>   
                                                    {
                                                        tr3.showData?tr3.data.map( (tr4, index4) => {return <React.Fragment key={index4}>
                                                            
                                                            <tr className="ct_trnivel4">
                                                                <td colSpan="5" className="pd-nv3">{tr4.reparo} </td>  
                                                                <td colSpan="1"></td>  
                                                                <td>{"S/ " + tr4.deuda}</td>                              
                                                                <td></td>
                                                            </tr>
                                                        </React.Fragment> }):null
                                                    }
                                                    {
                                                        tr3.showData?<tr className="ct_trseparador3"></tr>:null
                                                    } 
                                                </React.Fragment> }):null
                                            }                                       
                                            {
                                                tr2.showData?<tr className="ct_trseparador2"></tr>:null
                                            }                                      
                                        </React.Fragment>)
                                    })
                                    :null
                                }
                                {
                                    tr1.showData?<tr className="ct_trseparador1"></tr>:null
                                }
                            </React.Fragment>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CollapseTable;