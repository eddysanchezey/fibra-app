import './Table.css';
import React,{Component} from 'react';

class  TableImpuestoV2 extends Component  { 
    constructor(props) {
        super(props);
        this.state = {
            updating:true,
            selectedObject:null,
            GetObject:null
          
        };
    }
    handleObjectChange = (e,data) => {
        //const GetObject = e.target.getAttribute('data-item')
        //console.log(e,data)
        
        const GetObject = data;
        this.setState({
          selectedObject : GetObject
        });
        const updateprops={...this.props};
        updateprops.onGetOject=GetObject;
        this.props=updateprops;
        this.sendData(data);
        
    }
    
    sendData = (data) => {
        //https://towardsdatascience.com/passing-data-between-react-components-parent-children-siblings-a64f89e24ecf
        this.props.parentCallback(data);
    }
    
    render(){
        
    return( 
    <React.Fragment>        
        <div className="table_container">        
        <span className="spn_tabresult">Se encontraron {this.props.content.length} resultados</span>
        <table className="table">
            <thead>
                <tr>
                    <th colSpan="2" className="th_color1">Datos Principales</th>
                    <th colSpan="3" className="th_color2">Datos Contratos</th>
                    
                    
                </tr>
                <tr>
                    <th className="th_color1">Fibra</th>
                    <th className="th_color1">Periodo</th>
                    
                    <th className="th_color2">Ingreso Alquiler</th>
                    <th className="th_color2">Resultado Ejercicio</th>
                    <th className="th_color2">Otras Ganancias/Perdidas **</th>
                    
                </tr>
            </thead>
            <tbody>{                
                this.props.content.length>0?
                this.props.content.map(con => <tr data-item={con}  key={con.id} index={con.id} onClick={(e)=>this.handleObjectChange(e,con)}>
                    <td className="margenIzquierdo">{con.fibra}</td>
                    <td className="margenIzquierdo">{con.periodo}</td>
                    
                    <td className="margenDerecho">{Number(con.ingresoAlquiler).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    <td className="margenDerecho">{Number(con.resultadoEjercicio).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    <td className="margenDerecho">{Number(con.otraGananciaPerdida).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    
                </tr>
                ):null
                }
            </tbody>
            
            
        </table>
        <label className="spn_tabresult">**Aplica a Personas Naturales Domiciliados</label>
        </div>
    </React.Fragment>
    )
    }
}
export default TableImpuestoV2;