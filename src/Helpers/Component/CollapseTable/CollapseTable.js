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
    
    const generarBtnCollapse= (flag, nivel, index, index1 = null) =>{
        if (!flag){
            return <button onClick={() => props.click(nivel,index,index1)} className="ct_btnplus"><TiPlus/></button>;
        }else{
            return <button onClick={() => props.click(nivel,index,index1)} className="ct_btnminum"><TiMinus/></button>
        }
    }
    const generarDivEstado = (estado) => {
        const clase = estado==="Terminado"?"ct_estadoverde":"ct_estadoazul";
        return <div className={clase}>{estado}</div>
    }
    const generarDivCemaforo = () => {
        const clase = "ct_cemaforo";
        return <div className="d-flex"><div className="ct_fechavencimiento">14-01-2019</div><div className={clase}/></div>
    }
    return (
        <div className="ct_container">
            <h4 style={{marginTop: "10px"}}>Reporte:</h4>
             <table className="ct_table">
                <thead>
                    <tr>
                        <th>Expediente</th>
                        <th>F. Presentación</th>
                        <th>Responsable</th>
                        <th>Socio</th>
                        <th>Estado</th>
                        <th>Monto total</th>
                        <th>Vencimiento</th>
                        <th></th>
                    </tr>
                </thead>                    
                <tbody>
                    {
                        props.data.map( (tr1,index1)=>{
                            return (<React.Fragment key={index1}>
                                <tr className="ct_trnivel1">
                                    <td>{generarArrow(tr1.showData,tr1.expediente)}</td>
                                    <td>{tr1.fpresentacion}</td>
                                    <td>{tr1.responsable} </td>
                                    <td>{tr1.socio}</td>
                                    <td>{generarDivEstado(tr1.estado)}</td>
                                    <td>S/ {tr1.monto.toFixed(2)}</td>
                                    <td>{generarDivCemaforo()}</td>
                                    <td className="ta-r"> {generarBtnCollapse(tr1.showData,1,index1)} </td>
                                </tr>
                                {
                                    tr1.showData?tr1.data.map( (tr2, index2) => {
                                        return (<React.Fragment key={index2}>
                                            <tr className="ct_trnivel2">
                                                <td colSpan="4" className="pd-nv1">{generarArrow(tr2.showData, tr2.periodo +" | " + tr2.tributo)} </td>
                                                <td className="pd0">{generarDivEstado(tr2.estado)}</td>
                                                <td>S/ {tr2.monto.toFixed(2)}</td>
                                                <td>{generarDivCemaforo()}</td>
                                                <td className="ta-r"> {generarBtnCollapse(tr2.showData,2,index2,index1)} </td>
                                            </tr>
                                            {
                                                tr2.showData?tr2.data.map( (tr3,index) => {
                                                    return (<React.Fragment key={index}>
                                                        <tr className="ct_trnivel3">
                                                            <td colSpan="4" className="pd-nv2">{tr3.reparo}</td>
                                                            <td>{generarDivEstado(tr3.estado)}</td>
                                                            <td>S/ {tr3.monto.toFixed(2)}</td>
                                                            <td>{generarDivCemaforo()}</td>
                                                            <td></td>
                                                        </tr>
                                                        </React.Fragment>
                                                    )
                                                })
                                                :null
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