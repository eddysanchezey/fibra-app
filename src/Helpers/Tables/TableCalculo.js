import './Table.css';
import React,{Component} from 'react';


class  TableCalculo extends Component  { 
    constructor(props) {
        super(props);
        this.state = {
            iteracion:0,
            updating:true,
            selectedObject:null,
            TotalUtilidadNetaFuente:this.sumaInversion(),
            TotalUtilidadNetaFuenteTrimestral:this.sumaInversionTrimestral(),
            TotalCertificado:this.sumaCertificado(),
            GetObject:null
          
        };
    }
    handleObjectChange = (e,data) => {
        //const GetObject = e.target.getAttribute('data-item')
        //console.log(e,data)

        //Fila Selecionada
        //console.log(data.id)
        /*
        const GetObject = data;
        this.setState({
          selectedObject : GetObject
        });
        const updateprops={...this.props};
        updateprops.onGetOject=GetObject;
        this.props=updateprops;
        */
        this.sendData(data);
        
    }
    componentWillMount(){
        if(this.state.iteracion===2){
            this.setState({iteracion:this.state.iteracion+1});
        this.setState({TotalUtilidadNetaFuente:this.sumaInversion()})
        this.setState({TotalUtilidadNetaFuenteTrimestral:this.sumaInversionTrimestral()})
        this.setState({TotalCertificado:this.sumaCertificado()})

        }
        
        
    }
    
    sumaCertificado=()=>{
        let suma=0.0;
        console.log(this.props.content);
        this.props.content.forEach(element => suma+=(element.numeroContratos*element.montoActualInversion));
        console.log(suma);
        return suma
    }
    sumaInversion=()=>{
        let suma=0.0;
        
        this.props.content.forEach(element => suma+=(element.montoActualInversion));
        return suma
    }
    sumaInversionTrimestral=()=>{
        let suma=0.0;
        
        this.props.content.forEach(element => suma+=(element.montoActualInversion));
        return suma/3
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
        
        return(
            <React.Fragment>
                <div className="table_container">
        <span className="spn_tabresult">Se encontraron {this.props.content.length} resultados</span>
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
                
            </thead>
            <tbody>
                <th colSpan="3" className="th_color1"></th>
                <th colSpan="1" className="th_color1"></th>
                <th colSpan="1" className="th_color1">{this.state.TotalUtilidadNetaFuente}</th>
                <th colSpan="1" className="th_color1">{this.state.TotalUtilidadNetaFuenteTrimestral}</th>
                { this.props.content.map(con => {
                return(<React.Fragment key={con.id} >
                    <tr onClick={(e)=>this.handleObjectChange(e,con)}  /* onClick={() => this.click(con.id)}*/ >
                        <td>{con.descripcion}</td>{/**tpoInversionista */}
                        <td>{con.numeroContratos}</td>{/** ValorNominal*/}
                        <td>{con.montoActualInversion.toFixed(2)}</td>
                        <td>{(con.rentaFibra*100).toFixed(2)+'%'}</td>{/**rentaFibra */}
                        <td>{((con.montoActualInversion*this.state.TotalUtilidadNetaFuente )/this.state.TotalCertificado).toFixed(2)}</td>{/**utilidadFntPersona */}
                        <td>{(((con.montoActualInversion*this.state.TotalUtilidadNetaFuente )/this.state.TotalCertificado)/4).toFixed(2)}</td>{/**utilidadFntTrimestre */}
                        <td>{1}</td>{/**utilidadAnual */}
                        <td>{2}</td>{/**utilidadProyTrimestre */}
                    </tr>

                        {con.showData?
                        con.data.map( (data) => {
                            return (<React.Fragment className="ct_nivel2" key={data.id}>
                                <tr>
                                    <td>{data.nombreInversionista}</td>
                                    <td>{data.valorNominal}</td>
                                    <td>{data.totalInversion}</td>
                                    <td>{data.rentaFibra}</td>
                                    <td>{data.utilidadFntPersona}</td>
                                    <td>{data.utilidadFntTrimestre}</td>
                                    <td>{data.utilidadAnual}</td>
                                    <td>{data.utilidadProyTrimestre}</td>
                                </tr>
                            </React.Fragment>)
                        })
                        :null}
                                               

                </React.Fragment>);
                }
                )}
                <tr>                    
                    <th colSpan="7" className="th_color1">Total Certificados de Participación</th>
                    <th colSpan="1" className="th_color1">{this.state.TotalCertificado}</th>
                </tr>
                    
                    
                
            </tbody>
                
            
        </table>
        </div>
    </React.Fragment>
        );
    }
}
export default TableCalculo;