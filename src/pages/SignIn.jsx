// SignIn.js
import  { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation=useNavigate()
  function handleSignIn(e) {
    e.preventDefault();

    console.log(email, password);
    fetch("http://localhost:3001/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        var notifySuccess = () => toast.success("Logged In success");
         if (data.status === "Login Success") {
          notifySuccess()
          window.location.href = "./";
          window.localStorage.setItem("loggedIn", true);
          window.localStorage.setItem("token", data.data);
         // window.localStorage.setItem("loggedIn", true);

         
        }
        else{
        var notifyError = () => toast.success("Logged In success");
     notifyError()
        }
        navigation("/") 
      });
  }

  return (<>
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
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
  </>);
};

export default SignIn;
