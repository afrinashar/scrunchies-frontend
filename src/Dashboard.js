import NavBar from './Navbar';
import Cart from './Cart';
import { Routes,Route } from 'react-router-dom';

import './App.css';
import Products from './Products';
import Footer from './Footer';

function Dashboard() {
    return (
      <>
      <NavBar></NavBar>
      <Products></Products>
       
      <Footer></Footer>
 </> )}
 export default Dashboard
