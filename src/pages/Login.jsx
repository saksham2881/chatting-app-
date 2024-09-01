import React,{useState,useEffect} from 'react'
import { Link,useNavigate} from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import {ToastContainer,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {loginRoute} from "../utils/APIRoutes";

function Login() {
 const navigate= useNavigate();
 const [values,setValues]=useState({
    username:"",
    password:"",
 });
 const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          "chat-app-user",
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };
const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
        toast.error(
            "Email and Password is required.",
            toastOptions
          );
      return false;
    } else if (username.length==="") {
      toast.error(
        "Email and Password is required.",
        toastOptions
      );
      return false;
    } 
    return true;
  };

  const handleChange=(event)=>{
    setValues({...values,[event.target.name]:event.target.value});
  };
  return (
    <>
    <FormContainer>
        <form onSubmit={(event)=> handleSubmit(event)}>
            <div className="brand">
                <img src={Logo}alt="Logo"/>
                <h1>chatup</h1>
            </div>
            <input 
            type="text" 
            placeholder="Username" 
            name="username" 
            onChange={(e)=> handleChange(e)}
            min
            />
            <input 
            type="password" 
            placeholder="Password" 
            name="password" 
            onChange={(e)=> handleChange(e)}
            />
            <button type="submit">Login</button>
            <span>
                Don't have an account ? <Link to="/register">Register</Link>
            </span>
        </form>
    </FormContainer>
    <ToastContainer/>
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  @media screen and (min-width: 330px) and (max-width: 720px) {
    padding: 0.5rem;
  }

  @media screen and (min-width: 270px) and (max-width: 330px) {
    padding: 0.25rem;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;

      @media screen and (min-width: 330px) and (max-width: 720px) {
        height: 4rem;
      }

      @media screen and (min-width: 270px) and (max-width: 330px) {
        height: 3rem;
      }
    }

    h1 {
      color: white;
      text-transform: uppercase;
      font-size: 2rem;

      @media screen and (min-width: 330px) and (max-width: 720px) {
        font-size: 1.5rem;
      }

      @media screen and (min-width: 270px) and (max-width: 330px) {
        font-size: 1.2rem;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 2rem 3rem;

    @media screen and (min-width: 330px) and (max-width: 720px) {
      padding: 1.5rem 2.5rem;
    }

    @media screen and (min-width: 270px) and (max-width: 330px) {
      padding: 1rem 2rem;
    }
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;

    @media screen and (min-width: 330px) and (max-width: 720px) {
      padding: 0.8rem;
      font-size: 0.9rem;
    }

    @media screen and (min-width: 270px) and (max-width: 330px) {
      padding: 0.6rem;
      font-size: 0.8rem;
    }

    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }

  button {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.3s ease-in-out;

    @media screen and (min-width: 330px) and (max-width: 720px) {
      padding: 0.8rem 1.5rem;
      font-size: 0.9rem;
    }

    @media screen and (min-width: 270px) and (max-width: 330px) {
      padding: 0.6rem 1rem;
      font-size: 0.8rem;
    }

    &:hover {
      background-color: #4e0eff;
    }
  }

  span {
    color: white;
    text-transform: uppercase;
    font-size: 1rem;

    @media screen and (min-width: 330px) and (max-width: 720px) {
      font-size: 0.9rem;
    }

    @media screen and (min-width: 270px) and (max-width: 330px) {
      font-size: 0.8rem;
    }

    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default Login;