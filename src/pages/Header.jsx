import {useState} from 'react'
import { Link } from 'react-router-dom'
import "./css/Header.css"
import { Dashboard } from './Dashboard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Header = () => {
  const [search,setSearch]=useState("")
  const onSearch=(e)=>{
    const Lower=e.target.value.toLowerCase()
    setSearch(Lower)
  }
  const logOut = () => {
    window.localStorage.clear();
    var notifySuccess = () => toast.success("Logout successfully");
    notifySuccess()
    window.location.href = "./signin";
  };
  return (
    <> <header className='header'>
    <nav>
      <ul >
        <li><Link to="/">Home</Link></li>
               <li><input type="text" placeholder="Search..."  onClick={(e)=>onSearch(e)}/></li>
 <li><Link to="/cart">Cart</Link></li>
        <li className="dropdown">
          <Link className="dropbtn"  to="/admin">Admin</Link>
          <div className="dropdown-content">
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/products">Products</Link>
            {/* Add more admin links as needed */}
          </div>
        </li>
        <li><Link onClick={logOut}>Logout</Link></li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  </header>
  <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
  </>
  )
}
