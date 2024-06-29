/* eslint-disable no-mixed-spaces-and-tabs */
// SignUp.js
import  { useState } from 'react';
import './css/Signup.css'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const handleSignUp = (e) => {
    if (userType == "Admin" && secretKey != "afrinj") {
      e.preventDefault();
      alert("Invalid Admin");
    } else {
      e.preventDefault();

      console.log(name, email, password);
      fetch(`https://crud-backend-nbzn.onrender.com/register`, {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name,
          email,
          
          password,
          userType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          if (data.status  === "User Register") {
            var notifySuccess = () => toast.success("Registration success");
            notifySuccess()
            window.location.href = "./";
           // alert("Registration Successful");
          } else {
            var notifyError = () => toast.error("Registration Error");
            notifyError()
          //  alert("Something went wrong");
          }
        });
    }
  };

  return (<>
    <div className='signup'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}> 

        <div>
           <input
           type="radio"
           name="UserType"
           value="User"
           onChange={(e) => setUserType(e.target.value)}
         />
         User
         <input
           type="radio"
           name="UserType"
           value="Admin"
           onChange={(e) => setUserType(e.target.value)}
         />
         Admin
       
       {userType == "Admin" ? (
         <div className="mb-3">
           <label className="col-form-label col-form-label-sm">Secret Key</label>
           <input
             type="text"
             className="form-control form-control-sm"
             placeholder="Secret Key"
             onChange={(e) => setSecretKey(e.target.value)}
           />
         </div>
       ) : null}

       </div>
      <div className="input-container"> <label>Full Name</label> <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /></div> 
      <div className="input-container"> <label>Email</label>	 <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required="gg"
        />
       	</div>
        <button type="submit">Sign Up</button>
        <p>Already Register? <Link to="/signin"  >SingIn</Link></p>
      </form>
    </div>
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
 </> );
};

export default SignUp;
