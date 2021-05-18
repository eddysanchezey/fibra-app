import './Table.css';
import React,{Component} from 'react';


class  TableCalculoResultadoV2 extends Component  { 
    constructor(props) {
        super(props);
        this.state = {
            iteracion:0,
            updating:true,
            selectedObject:null,
            
            GetObject:null
          
        };
    }
    handleObjectChange = (e,data) => {
        
        this.sendData(data);
        
    }
    
    sendData = (data) => {
        //https://towardsdatascience.com/passing-data-between-react-components-parent-children-siblings-a64f89e24ecf
        this.props.parentCallback(data);
    }
    click=(fila)=>{
        //console.log('holi',fila)
        //console.log(this.props.content[fila*1-1].showData)
        const listaDatos = {...this.props.content};
        //console.log(listaDatos[fila*1-1])
        listaDatos[fila*1-1].showData=!listaDatos[fila*1-1].showData;
        this.props.content[fila*1-1].showData=true
    }
    render(){
        //console.log(this.props.content)        
        return(
            <React.Fragment>
                <div className="table_container">
        <span className="spn_tabresult">Se encontraron {this.props.content.listBuscarCalculo.length} resultados</span>
        <table className="table">
            <thead>
                <tr index={'head1'}>
                    <th colSpan="1" className="th_color1">Categoría</th>
                    {/*
                    <th colSpan="" className="th_color1">Fibra</th>
                    <th colSpan="" className="th_color1">Año</th>
                    
                    */}
                    <th colSpan="1" className="th_color1">Número de participes</th>
                    <th colSpan="1" className="th_color1">Cantidad de CP</th>

                    <th colSpan="1" className="th_color1">Tasa según Inversionista</th>
                    <th colSpan="1" className="th_color1">Base cálculo</th>
                    <th colSpan="1" className="th_color1">Monto según EERR</th>

                    <th colSpan="1" className="th_color1">Asignación de EERR </th>
                    <th colSpan="1" className="th_color1">Asignación por Número de participes </th>
                    <th colSpan="1" className="th_color1">Retención Impuesto a la Renta</th>
                    <th colSpan="1" className="th_color1">Otra Ganancia / Perdida</th>
                    
                    {/*
                    <th colSpan="1" className="th_color1">% Cantidad de CP</th>
                    <th colSpan="1" className="th_color1">Retención Impuesto de inversionista</th>

                    */}
                </tr>
                {/*
                <tr index={'head2'}>
                    <th colSpan="4" className="th_color1"></th>
                    
                    <th colSpan="1" className="th_color1 margenDerecho">00000</th>
                    <th colSpan="1" className="th_color1"></th>
                    <th colSpan="1" className="th_color1 margenDerecho">99999</th>
                    
                </tr>
                */}
                
            </thead>
            <tbody>
                {this.props.content.listBuscarCalculo.map(con => {
                let totalCantCP=this.props.content.totales.totalUtilidadNetaFuente;
                return(<React.Fragment key={'tpoinversionista'.concat(con.id)} >
                    <tr className="color_fila" onClick={(e)=>this.handleObjectChange(e,con)} >
                        <td colSpan="1"  className="margenIzquierdo">{con.descripcion}</td>
                        {/*
                        <td >{}</td>
                        <td >{}</td>
                        */}
                        <td >{con.numeroContratos}</td>
                        <td className="margenDerecho">{Number(con.inversionTrim1.toFixed(2)).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        
                        <td >{(con.percentTpoInversion*100).toFixed(2)+'%'}</td>
                        <td className="margenIzquierdo">{con.baseCalculo}</td>
                        
                        <td className="margenDerecho">{con.percentTpoInversion*1===0?'':(con.eerrTrim1).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className="margenDerecho">{con.percentTpoInversion*1===0?'':(con.eerrTrim1*(con.inversionTrim1/totalCantCP)).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className="margenDerecho">{con.percentTpoInversion*1===0?'':((con.eerrTrim1*(con.inversionTrim1/totalCantCP)) /1).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className="margenDerecho">{con.eerrTrim1*1<=0?'0.00':(((con.eerrTrim1*(con.inversionTrim1/totalCantCP)) /1)*con.percentTpoInversion).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        {/*
                        <td >{'100%'}</td>
                        <td >{Number((con.percentTpoInversion*con.inversionTrim1).toFixed(2)).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>

                        */}
                        <td className="margenDerecho">{con.otraGananciaPerdida*1===0?'':(con.otraGananciaPerdida).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    </tr>
                    
                    {
                    
                    con.showData?con.listCalculoInversions.map(persona=>{
                        let asignacionEERRxCat=con.eerrTrim1*(con.inversionTrim1/totalCantCP)
                        let aporteInversionistaxCat=(persona.inversionTrim1/con.inversionTrim1)
                        return(
                            <React.Fragment>
                                <tr key={'persona'.concat(persona.id)}>
                                    <td colSpan="2" className="margenIzquierdo">{persona.nombreInversionista}</td>
                                    {/*<td >{persona.fibra}</td>
                                    <td >{persona.año}</td>
                                    <td>1</td>*/}
                                    <td className="margenDerecho">{Number( (persona.inversionTrim1).toFixed(2) ).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                    <td >{(con.percentTpoInversion*100).toFixed(2)+'%'}</td>
                                    <td className="margenIzquierdo" >{con.baseCalculo}</td>
                                    <td className="margenDerecho">{(con.eerrTrim1*1).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>                                    
                                    
                                    <td className="margenDerecho">{((aporteInversionistaxCat)*100).toFixed(2) +'%'}</td>
                                    <td className="margenDerecho">{(asignacionEERRxCat*(persona.inversionTrim1/con.inversionTrim1)).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}  </td>
                                    <td className="margenDerecho">{(asignacionEERRxCat*(persona.inversionTrim1/con.inversionTrim1)*con.percentTpoInversion)<0?0:(asignacionEERRxCat*(persona.inversionTrim1/con.inversionTrim1)*con.percentTpoInversion).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}  </td>

                                    <td className="margenDerecho">{persona.otraGananciaPerdida*1===0?"":(persona.otraGananciaPerdida).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>   
                                </tr>                                
                            </React.Fragment>
                        );
                    })
                    :null
                    
                    }                        
                </React.Fragment>);
                }
                )}
                {/*<tr key={'total'}>                    
                    <th colSpan="7" className="th_color1">Total Certificados de Participación</th>
                    <th colSpan="1" className="th_color1 margenDerecho"></th>
                </tr>*/}
            </tbody>
        </table>
        </div>
    </React.Fragment>
        );
    }
}
export default TableCalculoResultadoV2;