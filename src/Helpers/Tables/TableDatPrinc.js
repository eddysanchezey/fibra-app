import './Table.css';
import React from 'react';
import {FaBell, FaRegBell} from  "react-icons/fa";
const TableDatPrinc= (props) => { 
    const bellIcon = (flag) => {
        return flag?<FaBell className="icon_bell"/>:<FaRegBell className="icon_belloff"/>;
    }
    
    return <React.Fragment>
        <div className="table_container">
            <table className="table">
            <thead>
                
                <tr>
                    <th className="th_color1">RUC</th>
                    <th className="th_color1">Nombre/Raz Social</th>
                    <th className="th_color1">Dirección</th>
                    
                </tr>
            </thead>
            {
                props.content.flagdata?
                <tbody>
                    {
                        props.content.data.map(con=><tr index={con.id}>
                            <td>{con.ruc}</td>
                            <td>{con.direccion}</td>
                            <td>{con.descripcion}</td>
                            </tr>)
                    }

                </tbody>
                :null
            }

            </table>
        </div>
    </React.Fragment>
}
export default TableDatPrinc;
