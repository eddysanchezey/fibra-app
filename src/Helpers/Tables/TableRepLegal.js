import './Table.css';
import React from 'react';
import {FaBell, FaRegBell} from  "react-icons/fa";
const TableRepLegal= (props) => { 
    const bellIcon = (flag) => {
        return flag?<FaBell className="icon_bell"/>:<FaRegBell className="icon_belloff"/>;
    }
    return <React.Fragment>
        <div className="table_container">
            <table className="table">
            <thead>
                
                <tr>
                    <th className="th_color1">Tip Doc</th>
                    <th className="th_color1">Nro Doc</th>
                    <th className="th_color1">Nombre/Raz Social</th>
                    
                </tr>
            </thead>
            {
                props.content.flagdata?
                <tbody>
                    {
                        props.content.data.map(con=><tr index={con.id}>
                            <td>{con.tpoDoc}</td>
                            <td>{con.nroDoc}</td>
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
export default TableRepLegal;
