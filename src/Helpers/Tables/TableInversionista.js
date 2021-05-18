import './Table.css';
import React,{Component} from 'react';

class  TableInversionista extends Component  { 
    constructor(props) {
        super(props);
        this.state = {
            updating:true,
            selectedObject:null,
            GetObject:null
          
        };
    }
    handleObjectChange = (e,data) => {
        
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
                    <th colSpan="1" className="th_color1">Tipo de Inversionista</th>
                    <th colSpan="1" className="th_color2">Nombre/Razón Social</th>
                    <th colSpan="1" className="th_color1">Tipo documento</th>
                    <th colSpan="1" className="th_color2">Número de documento</th>
                    
                    
                    

                </tr>
                
            </thead>
            <tbody>

                { this.props.content.map(con => <tr data-item={con}  key={con.id} onClick={(e)=>this.handleObjectChange(e,con)}>
                        <td className="margenIzquierdo">{con.tpoinversionista}</td>
                        <td className="margenIzquierdo">{con.descripcion}</td>
                        <td className="margenIzquierdo">{con.tpoinversionista}</td>
                        <td className="margenDerecho">{con.nroDoc}</td>
                                               
                    </tr>)
                }
            </tbody>
                
            
        </table>
        </div>
    </React.Fragment>
        );
    }
}
export default TableInversionista;