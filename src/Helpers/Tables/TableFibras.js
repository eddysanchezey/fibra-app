import './Table.css';
import React,{Component} from 'react';
class  TableFibras extends Component  { 
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
        return (<React.Fragment>        
            <div className="table_container">
            <span className="spn_tabresult">Se encontraron {this.props.content.length} resultados</span>
            <table className="table">
                <thead>
                    <tr>
                        <th colSpan="3" className="th_color1">Datos principales</th>
                        <th colSpan="1" className="th_color2">Datos representante legal</th>                        
                    </tr>
                    <tr>
                        <th className="th_color1">Nombre</th>
                        <th className="th_color1">Ruc</th>
                        <th className="th_color1">País</th>
                        <th className="th_color2">Entidad Titulizadora</th>
                    </tr>
                </thead>                
                {
                    this.props.content.length!==0?
                    <tbody>    
                        {
                            this.props.content.map(con => <tr key={con.id} data-item={con} onClick={(e)=>this.handleObjectChange(e,con)} >
                                <td className="margenIzquierdo">{con.descripcion}</td>
                                <td >{con.ruc}</td>
                                <td className="margenIzquierdo">{con.pais}</td>
                                <td className="margenIzquierdo">{con.entidadTitulizadora}</td>
                                
                            </tr>
                            )
                        }
                </tbody>
                    :null
                }
                
            </table>
            </div>
        </React.Fragment>)
    }
}
export default TableFibras;