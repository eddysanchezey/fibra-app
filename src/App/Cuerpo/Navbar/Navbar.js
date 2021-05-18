import React from 'react';
import {NavLink} from 'react-router-dom';
import {IoIosSearch, IoMdFastforward, IoIosPaper, IoIosAlbums, IoMdCash,IoIosFiling, IoMdStats , IoIosArrowForward, IoIosArrowDown,IoIosCash, IoIosCreate } from "react-icons/io";

const Navbar = porps =>{   
    const icono = (icono)=>{
        switch (icono) {
            case "IoIosCreate":
                return <IoIosCreate className="iconNavbar" />
            case "IoIosSearch":
                return <IoIosSearch className="iconNavbar" />
            case "IoMdFastforward":
                return <IoMdFastforward className="iconNavbar" />
            case "IoIosPaper":
                return <IoIosPaper className="iconNavbar" />
            case "IoIosAlbums":
                return <IoIosAlbums className="iconNavbar" />
            case "IoMdCash":
                return <IoMdCash className="iconNavbar" />
            case "IoIosFiling":
                return <IoIosFiling className="iconNavbar"/>
            case "IoMdStats":
                return <IoMdStats className="iconNavbar"/>
            case "IoIosCash":
                return <IoIosCash className="iconNavbar"/>
            default:
                return null;
        }
    } 
    //console.log(porps.opciones);
    return (
        
        <div className="navbar">
            {porps.opciones.map( (opcion,idx) => {
                return <React.Fragment key={opcion.id}>
                    { opcion.submenu?
                    <div 
                        onClick={() => porps.clickSwitch(idx)}
                        className="nav_button"> 
                        {icono(opcion.icono)}                   
                        {opcion.texto}
                        {opcion.submenuShow? <IoIosArrowDown className="float-right"/>:<IoIosArrowForward className="float-right"/>}
                    </div>
                    :
                    <NavLink to={opcion.to}   
                        className="nav_button"
                        activeClassName="nav_button_seleccionado"> 
                        {icono(opcion.icono)}                   
                        {opcion.texto}
                    </NavLink>
                    }
                    {
                        opcion.submenuShow?opcion.submenu.map(subopcion => {
                            return <NavLink key={subopcion.id} to={subopcion.to}    
                                        className="subnav_button"
                                        activeClassName="subnav_button_seleccionado">                  
                                        {subopcion.texto}
                                    </NavLink>
                        }):null
                    }
                </React.Fragment> 
            })}
        </div>
    );
}

export default Navbar;