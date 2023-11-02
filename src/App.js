
 import NavBar from './Navbar';
 import Cart from './Cart';
import { Routes,Route } from 'react-router-dom';

import './App.css';
import Products from './Products';
import Footer from './Footer';
import Dashboard from './Dashboard';
import Add from './Add';
import LoginForm from './Login';

function App() {
  return (
    <>
    

    <Routes>
    <Route exact path="/" element={<Dashboard/>} />
<Route exact path="cart" element={<Cart/>} /> 
<Route exact path="/add" element={<Add/>} />
<Route exact path="/login" element={<LoginForm/>} />
    </Routes>
    </>
  );
}

export default App;
