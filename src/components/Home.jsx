import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SingUpImg from './SingUpImg';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { registerUserSuccess } from '../redux/actions';
import { useDispatch } from 'react-redux';


export default function Home() {

const history = useNavigate();
const dispatch = useDispatch();

const[inpValue, setInpValue] = useState({
    name:"",
    email:"",
    date:"",
    password:"",
});

const getdata = (e) => {
    const { value, name } = e.target;

    setInpValue(() => {
        return { ...inpValue,
                [name]:value,
            }
    })
}

const addData = (e) => {
    e.preventDefault();

    const{name, email, date, password} = inpValue;

    if( name === ""){
        alert("name is required")
    }
    else if( email === ""){
        alert("email is required")
    }
    else if( !email.includes("@")){
        alert("enter valid email")
    }
    else if( date === ""){
        alert("date  is required")
    }
    else if( password === ""){
        alert("password is required")
    }
    else if( password.length <= 6){
        alert("more than 5 symbols")
    }
    else {
        const existingUsers = JSON.parse(localStorage.getItem("cooking-users")) || [];

        const newUser = { name, email, date, password };
        const updatedUsers = [...existingUsers, newUser];

        localStorage.setItem("cooking-users", JSON.stringify(updatedUsers));

        dispatch(registerUserSuccess(newUser));

        history("/meals");
    }
}

return (
<>
    <div className="container mt-3">
        <section className="d-flex justify-content-center align-items-center">
            <div className="left-data p-3" style={{width:"100%"}}>
            <h3 className="text-center mb-3 col-lg-4">Sing Up</h3>
            <Form className="formcontainer">
                    <div className="entryarea">
                        <input className="inputarea" type="text" onChange={getdata} name="name" required/>
                        <div className="labelline">
                        Enter your name
                        </div>
                    </div>
                    <div className="entryarea">
                        <input className="inputarea" type="email" onChange={getdata} name="email" required/>
                        <div className="labelline">
                        Enter your email
                        </div>
                    </div>
                    <div className="entryarea">
                        <input className="inputarea" type="date" onChange={getdata} name="date" required />
                    </div>
                    <div className="entryarea">
                        <input className="inputarea" type="password" onChange={getdata} name="password"  required/>
                        <div className="labelline">
                        Enter your password
                        </div>
                    </div>

                    <div className="btncontainer">
                        <button onClick={addData} type="submit"><span>Submit</span></button>
                    </div>
            </Form>
            <p className="mt-1">Already Have an Account <span><NavLink to="/login">Sing In</NavLink></span> </p>
            </div>
        </section>
    </div>
</>
);
}
