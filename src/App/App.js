import React from 'react';
import './App.css';
import Cuerpo from './Cuerpo/Cuerpo';
import Header from './Header/Header';
import WithAuth from '../Helpers/HoC/WithAuth';

const App = props =>{
    return (        
    <React.Fragment>
      <Header {...props} />
      <Cuerpo {...props}/>
    </React.Fragment>);
}
// Agregar el usuario a las PROPs 
export default WithAuth(App);
