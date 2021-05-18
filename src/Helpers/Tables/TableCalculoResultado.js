import './Table.css';
import React,{Component} from 'react';


class  TableCalculoResultado extends Component  { 
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
        console.log('holi',fila)
        console.log(this.props.content[fila*1-1].showData)
        const listaDatos = {...this.props.content};
        console.log(listaDatos[fila*1-1])
        listaDatos[fila*1-1].showData=!listaDatos[fila*1-1].showData;
        this.props.content[fila*1-1].showData=true
    }
    render(){
        console.log(this.props.content)        
        return(
            <React.Fragment>
                <div className="table_container">
        <span className="spn_tabresult">Se encontraron {this.props.content.listBuscarCalculo.length} resultados</span>
        <table className="table">
            <thead>
                <tr>
                    <th colSpan="1" className="th_color1">Tipo de Inversionista</th>
                    <th colSpan="1" className="th_color1">Valor Nominal de Cp</th>
                    <th colSpan="1" className="th_color1">Total Inversión</th>
                    <th colSpan="1" className="th_color1">Renta de la Fibra</th>
                    <th colSpan="1" className="th_color1">Utilidad Neta Fuente Persona</th>
                    <th colSpan="1" className="th_color1">Utilidad Neta Fuente Trimestral</th>
                    <th colSpan="1" className="th_color1">Utilidad Neta Anual</th>
                    <th colSpan="1" className="th_color1">Utilidad Neta Proyección Trimestral</th>
                </tr>
                <tr>
                    <th colSpan="3" className="th_color1"></th>
                    <th colSpan="1" className="th_color1"></th>
                    <th colSpan="1" className="th_color1 margenDerecho">{Number(this.props.content.totales.totalUtilidadNetaFuente).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</th>
                    <th colSpan="1" className="th_color1 margenDerecho">{Number(this.props.content.totales.totalUtilidadNetaFuente/4).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</th>{/**TotalUtilidadNetaFuenteTrimestral */}
                    <th colSpan="1" className="th_color1 margenDerecho">{Number(this.props.content.totales.utilidadAnual).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</th>
                    <th colSpan="1" className="th_color1 margenDerecho">{Number(this.props.content.totales.utilidadAnual/4).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</th>

                </tr>
                
                
            </thead>
            <tbody>
                {this.props.content.listBuscarCalculo.map(con => {
                return(<React.Fragment key={'tpoinversionista'.concat(con.id)} >
                    <tr className="color_fila" onClick={(e)=>this.handleObjectChange(e,con)} >
                        <td className="margenIzquierdo">{con.descripcion}</td>
                        <td >{con.numeroContratos}</td>
                        <td className="margenDerecho">{Number(con.montoActualInversion.toFixed(2)).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className="margenDerecho">{(con.rentaFibra*100).toFixed(2)+'%'}</td>
                        <td className="margenDerecho">{Number( ((con.montoActualInversion*this.props.content.totales.totalUtilidadNetaFuente )/this.props.content.totales.totalCertificado).toFixed(2) ).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className="margenDerecho">{Number( ((((con.montoActualInversion)*this.props.content.totales.totalUtilidadNetaFuente )/this.props.content.totales.totalCertificado)/4).toFixed(2) ).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className="margenDerecho">{Number( ((con.montoActualInversion*this.props.content.totales.utilidadAnual)/this.props.content.totales.totalCertificado).toFixed(2) ).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                        <td className="margenDerecho">{Number( (((con.montoActualInversion*this.props.content.totales.utilidadAnual)/this.props.content.totales.totalCertificado)/4).toFixed(2) ).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    </tr>
                    {console.log(con)}
                    {con.showData?con.listCalculoInversions.map(persona=>{
                        return(
                            <React.Fragment>
                                <tr key={'persona'.concat(persona.id)}>
                                <td className="margenIzquierdo">{persona.nombreInversionista}</td>
                                <td>1</td>
                                <td className="margenDerecho">{Number( (persona.montoActualInversion).toFixed(2) ).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                <td className="margenDerecho">{(con.rentaFibra*100).toFixed(2)+'%'}</td>
                                <td className="margenDerecho">{Number( (((con.montoActualInversion*this.props.content.totales.totalUtilidadNetaFuente )/this.props.content.totales.totalCertificado)*(persona.montoActualInversion/con.montoActualInversion)).toFixed(2) ).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                                <td className="margenDerecho">{Number( (((con.montoActualInversion*this.props.content.totales.totalUtilidadNetaFuente )/this.props.content.totales.totalCertificado)*(persona.montoActualInversion/con.montoActualInversion)/4).toFixed(2) ).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>                                
                                <td className="margenDerecho">{Number( ((persona.montoActualInversion/con.montoActualInversion)*((con.montoActualInversion*this.props.content.totales.utilidadAnual)/this.props.content.totales.totalCertificado)).toFixed(2) ).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>        
                                <td className="margenDerecho">{Number( (((persona.montoActualInversion/con.montoActualInversion)*((con.montoActualInversion*this.props.content.totales.utilidadAnual)/this.props.content.totales.totalCertificado))/4).toFixed(2) ).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>                            
                                </tr>                                
                            </React.Fragment>
                        );
                    })
                    :null}                        
                </React.Fragment>);
                }
                )}
                <tr>                    
                    <th colSpan="7" className="th_color1">Total Certificados de Participación</th>
                    <th colSpan="1" className="th_color1 margenDerecho">{Number( (this.props.content.totales.totalCertificado).toFixed(2) ).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</th>
                </tr>
            </tbody>
        </table>
        </div>
    </React.Fragment>
        );
    }
}
export default TableCalculoResultado;