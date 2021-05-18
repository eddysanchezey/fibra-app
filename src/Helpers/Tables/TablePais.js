import './Table.css';
import React,{Component} from 'react';

class  TablePais extends Component  { 
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
                    <th colSpan="1" className="th_color1">País</th>
                    <th colSpan="1" className="th_color2">Monto</th>
                    <th colSpan="1" className="th_color1">Impuesto Pagado %</th>
                    
                    
                    

                </tr>
                
            </thead>
            <tbody>
                { this.props.content.map(con => <tr data-item={con}  key={con.id} onClick={(e)=>this.handleObjectChange(e,con)}>
                        <td className="margenIzquierdo">{con.pais}</td>
                        <td>{con.monto}</td>
                        <td>{con.impuestoPagado}</td>                       
                                               
                    </tr>)
                }
            </tbody>
                
            
        </table>
        </div>
    </React.Fragment>
        );
    }
}
export default TablePais;