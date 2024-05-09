import React from 'react';
import { useState } from 'react';
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/actions';


export default function Login() {

const history = useNavigate();
const dispatch = useDispatch();

const[inpValue, setInpValue] = useState({
    email:"",
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
    
const confirmData = (e) => {
    e.preventDefault();

    const getuserArr = localStorage.getItem("cooking-users");
    const userdata = JSON.parse(getuserArr);

    const{email, password} = inpValue;

    if( email === ""){
        alert("email is required")
    }
    else if( !email.includes("@")){
        alert("enter valid email")
    }
    else if( password === ""){
        alert("password is required")
    }
    else if( password.length <= 6){
        alert("more than 5 symbols")
    }
    else {
        if(getuserArr && getuserArr.length){

            const userlogin = userdata.filter((el) => {
                return el.email === email && el.password === password
            });
            if(userlogin.length === 0){
                alert("invalid details");
            }
            else{
                const existingUser = userdata.find(user => user.email === email && user.password === password);

                if (existingUser) {
                    dispatch(setCurrentUser(existingUser));
                    history("/meals");
                } else {
                    alert("Користувач не знайдений.");
                }
            }
        }
    }
}
    
    return (
    <>
        <div className="container mt-3">
        <section className="d-flex justify-content-between">
            <div className="left-data mt-5 p-3" style={{width:"100%"}}>
            <h3 className="text-center mb-5 col-lg-4">Sing In</h3>
            <Form className="formcontainer" >
                    <div className="entryarea">
                        <input className="inputarea" type="email" onChange={getdata} name="email" required/>
                        <div className="labelline">
                        Enter your email
                        </div>
                    </div>
                    <div className="entryarea">
                        <input className="inputarea" type="password" onChange={getdata} name="password"  required/>
                        <div className="labelline">
                        Enter your password
                        </div>
                    </div>
                    <div className="btncontainer">
                        <button onClick={confirmData} type="submit"><span>Submit</span></button>
                    </div>
            </Form>
            </div>
        </section>
    </div>
    </>
    )
}
