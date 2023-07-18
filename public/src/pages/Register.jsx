import React , {useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import styled from "styled-components"
import Logo from "../assets/logo3.png"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { registerRoute } from '../utilities/APIRoutes';

function Register() {
    const [values,setValues]= useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    });
    const navigate= useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('chat-app-user')){
          navigate('/')
        }
      },[])
    const handleSubmit =async (e)=>{
        e.preventDefault();
        if(handleValidation()){
            const {password, email, username}= values;
            const {data}= await axios.post(registerRoute, {
                username,email,password,
            })
            if(data.status===false){
                toast.error(data.msg,toastOptions)
            }
            if(data.status===true){
                localStorage.setItem('chat-app-user',JSON.stringify(data.user))
                navigate("/")
            }
        };
    }
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };
    const handleValidation =()=>{
        const {password, confirmPassword, email, username}= values;
        if(password!=confirmPassword){
            toast.error("password and confirm password should be same",toastOptions);
            return false;
        }
        else if(username.length<3){
            toast.error("Username should be atleast 8 characters",toastOptions);
            return false;
        }else if(password.length<8){
            toast.error("Password should be atleast 8 characters long",toastOptions)
            return false;
        }else if(email===""){
            toast.error("Email Can't be empty",toastOptions)
            return false;
        }
        return true;
    }
    const handleChange=(e)=>{
        
       setValues(x=>{
        return {...x,[e.target.name]:e.target.value}
       })
    }
  return (
    <>
      <FormContainer>
        <form onSubmit ={(e)=> handleSubmit(e)}>
        <div className= "brand">
            <img src={Logo} alt="Logo"/>
            <h1>Chatty</h1>
        </div>
        <input type="text" placeholder="Username" name="username" onChange={(e)=>handleChange(e)}></input>
        <input type="email" placeholder="Email" name="email" onChange={(e)=>handleChange(e)}></input>
        <input type="password" placeholder="Password" name="password" onChange={(e)=>handleChange(e)}></input>
        <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={(e)=>handleChange(e)}></input>
        <button type= "submit"> Create User</button>
        <span> Already have an account ? <Link to="/login">Login </Link></span>
        </form>
      </FormContainer>
      <ToastContainer/>
    </>
  )
}
const FormContainer = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
gap:1rem;
align-items:center;
background-color:#131324;
.brand{
    display:flex;
    align-items:center;
    gap:1rem;
    justify-content:center;
    img{
        height:5rem;
    }
    h1{
        color:white;
        text-transform:uppercase;
    }
}
form{
    display:flex;
    flex-direction:column;
    gap:2rem;
    background-color:#00000076;
    border-radius:2rem;
    padding:3rem 5rem;
    input{
        background-color:transparent;
        padding:1rem;
        border:0.1rem solid #4e0eff;
        border-radius:0.4rem;
        color:white;
        width:100%;
        font-size:1rem;
        &:focus{
            border:0.1rem solid #997af0;
            outline:none;
        }
    }
}
button{
    background-color:#997af0;
    color:white;
    padding:1rem 2rem;
    border:none;
    font-weight:bold;
    cursor:pointer;
    border-radius: 0.4rem;
    font-size:1rem;
    text-transform:uppercase;
    transition:0.5s ease-in-out;
    &:hover{
       background-color:#4e0eff; 
    }
}
span{
    color:white;
    text-transform:uppercase;
    a{
        color:#4e0eff;
        text-decoration:none;
        font-weight:bold;
    }
}


`;
export default Register;