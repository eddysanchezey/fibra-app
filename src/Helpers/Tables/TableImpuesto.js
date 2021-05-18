import './Table.css';
import React,{Component} from 'react';

class  TableImpuesto extends Component  { 
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
                    <th className="th_color1">Inversionista</th>
                    <th className="th_color2">Fecha de Inversión</th>
                    <th className="th_color2">Inversión</th>
                    <th className="th_color2">Monto Actual de Inversión</th>
                    
                </tr>
            </thead>
            <tbody>{                
                this.props.idEmpresa!==0?
                this.props.content.map(con => <tr data-item={con}  key={con.id} index={con.id} onClick={(e)=>this.handleObjectChange(e,con)}>
                    <td className="margenIzquierdo">{con.fibra}</td>
                    <td className="margenIzquierdo">{con.inversionista}</td>
                    <td>{con.fechaInversion.substr(0,10)}</td>
                    <td className="margenDerecho">{Number(con.inversion).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    <td className="margenDerecho">{Number(con.montoActualInversion).toLocaleString('en',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    
                </tr>
                ):null
                }
            </tbody>
            
            
        </table>
        </div>
    </React.Fragment>
    )
    }
}
export default TableImpuesto;