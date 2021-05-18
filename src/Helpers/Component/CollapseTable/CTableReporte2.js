import './CollapseTable.css';
import React from 'react';
//import {TiPlus, TiMinus} from "react-icons/ti";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";

const CollapseTable = props =>{
    const generarArrow= (flag, dato) =>{
        if (!flag){
            return <div className="ct_datoclosed"><FiChevronRight/>{dato}</div>;
        }else{
            return <div className="ct_datoopen"><FiChevronDown/>{dato}</div>
        }
    }    
    const generarDivEstado = (estado) => {
        const clase = estado==="Concluido"?"ct_estadoverde":"ct_estadoazul";
        return <div className={clase}>{estado}</div>
    }
    const generarFechaPlazo = (fecha, estado) => {
        if (estado !== 'Concluido'){
            const fechaInicio = new Date(fecha).getTime();
            const hoy    = new Date().getTime();
            if (!isNaN(fechaInicio)){
                const diff = (fechaInicio - hoy)/(1000*60*60*24);
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
            return <div title={mensaje} className={clase}> {fecha.split("-")[2]+"/"
                + (  fecha.split("-")[1].length>1?fecha.split("-")[1]:("0"+fecha.split("-")[1])  ) +
                "/"+fecha.split("-")[0]}</div>
            }
        }else{
            return <div>-</div>
        }
        
    }
    const determinarNroExpediente = (tipo,codigo)=>{
        //Quitar el '-1' de expedientes:
        let flag = false;
        if (codigo.split("-").length > 1){
            codigo = codigo.split("-")[0];
            flag = true;
        }
        //Separar año en caso aplique      
        if (tipo==='Apelación'&& codigo.length !== 13) {
            return codigo.substr(0,codigo.length-4) + "-" + codigo.substr(codigo.length-4,4) + (flag?"-1":"");
        }else{
            return codigo + (flag?"-1":"");
        }       
    }
    const formatoDecimal = (num) =>{
        if (!num || num === 'NaN') return '-';
        const numero = Number(num).toFixed(2);
        //const decimal =Math.trunc((numero%1)*100);
        let entero = Math.trunc(numero).toString();

        let it = Math.trunc(entero.toString().length/3);
        const sobrante = entero.length - it*3;
        
        console.log(sobrante, it);
        let strnum = "";
        let j = 0;
        for (let i = it; i > 0; i-- ){
            
            if (j%2 === 0){
                strnum = "," + entero.substr(sobrante + (i-1)*3,3) +strnum ;  
            }else{
                strnum = "'" + entero.substr(sobrante + (i-1)*3,3) +strnum ;  
            }
            j++;
        }
        if (sobrante===0){
            strnum = strnum.substr(1,strnum.length-1);
        }
        strnum = entero.substr(0,sobrante)+ strnum;
        return <div className="dispflex"> <span>S/</span> <div className="trmonto">{strnum}</div></div>;
    }
    
    return (
        <div className="ct_container">
            <h4 style={{marginTop: "10px"}}>Reporte:</h4>
            <p className="ct_mensajeResultado">{props.mensaje}</p>
            <div className="barracarga">
            
            </div> 
             <table className="ct_table">
                <thead>
                    <tr>
                        <th colSpan="3">Tributo/Periodo - Expediente</th>                                            
                        <th style={{width: "140px"}}>Etapa/Instancia</th>
                        <th style={{width: "80px"}}>Tipo</th>   
                        <th style={{width: "128px"}}>Estado</th>
                        <th style={{width: "110px"}}>Plazo legal</th>
                        <th style={{width: "144px", textAlign: "center"}}>Deuda</th>
                        <th style={{width: "144px", textAlign: "center"}}>Devolución</th>
                    </tr>
                    <tr>
                        <td colSpan="9" style={{padding:0}} >
                        {props.cargando?
                        <div className="progress">
                            <div className="indeterminate"></div>
                        </div>:null
                        }
                        </td>
                    </tr>
                </thead>                             
                <tbody>
                    {
                        props.data.map( (tr1,index1)=>{
                            return (<React.Fragment key={index1}>
                                <tr className="ct_trnivel1" onClick={() => props.click(1,index1)}>
                                    <td colSpan="6">{generarArrow(tr1.showData,tr1.tributo + " | " + tr1.periodo)}</td>   
                                    <td colSpan="3"></td>
                                </tr>
                                {
                                    tr1.showData?tr1.data.map( (tr2, index2) => {
                                        return (<React.Fragment key={index2}>
                                            <tr className="ct_trnivel2" onClick={() => props.click(2,index1,index2)}>
                                                <td colSpan="3" className="pd-nv1">{generarArrow(tr2.showData,"Exp: " + determinarNroExpediente(tr2.tipo,tr2.expediente))} </td>  
                                                <td colSpan="1">{tr2.etapa} </td>
                                                <td>{tr2.fondo} </td>                                                
                                                <td>{generarDivEstado(tr2.estado)}</td>  
                                                <td>{generarFechaPlazo(tr2.plazo, tr2.estado)}</td>       
                                                <td colSpan="2"></td>                       
                                            </tr>  
                                            {
                                                tr2.showData?tr2.data.map( (tr3, index3) => {return <React.Fragment key={index3}>
                                                    
                                                    <tr className="ct_trnivel3" onClick={() => props.click(3,index1,index2,index3)}>
                                                        <td colSpan="4" className="pd-nv2">{generarArrow(tr3.showData,tr3.valor)} </td>  
                                                        <td colSpan="3"> {tr3.tipoValor}</td>  
                                                        <td>{formatoDecimal(tr3.deuda.toFixed(2))}</td>     
                                                        <td>{formatoDecimal(tr3.devolucion.toFixed(2))}</td>
                                                    </tr>   
                                                    {
                                                        tr3.showData?tr3.data.map( (tr4, index4) => {return <React.Fragment key={index4}>
                                                            
                                                            <tr className="ct_trnivel4">
                                                                <td colSpan="6" className="pd-nv3">{"Reparo: " + tr4.reparo} </td>  
                                                                <td colSpan="1"></td>  
                                                                <td>{formatoDecimal(tr4.deuda)}</td>                              
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