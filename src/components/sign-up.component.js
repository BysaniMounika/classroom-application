import React, { Component, useState } from "react";
import {Card} from "react-bootstrap";

export default function SignUp (props) {
        const name = useFormInput('');
        const gender = useFormInput('');
        const role = useFormInput('');
        const email = useFormInput('');
        const password = useFormInput('');
    
    const handleLogin = async () => {
        const body = JSON.stringify({
            name: name.value,
            email: email.value,
            gender: gender.value,
            role: role.value,
            password: password.value
        });
        console.log(body);
        await fetch("https://v2dwxcy9k1.execute-api.us-east-2.amazonaws.com/dev", {
                method: 'POST', 
                mode: 'cors', 
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.value,
                    email: email.value,
                    gender: gender.value,
                    role: role.value,
                    password: password.value
                }) 
            })
            .then(res => res)
            .then(res => {
                console.log("Sign Up response", res);
                props.history.push('/login');
            }
        ).catch(error => {
           console.log(error);
          });;
    }
    return (
        <Card style={{ width: '18rem', marginLeft: 'auto', marginRight: 'auto', textAlign: 'left'}}>
            <Card.Body>
                <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" {...name} placeholder="Enter Name" />
                </div>

                <br/> 

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" {...email} placeholder="Enter email" />
                </div>

                <br/> 
                
                <div className="form-group">
                    <label>Gender</label>
                    <div className="form-check">
                        <input className="form-check-input" id="gender-male" type="radio" {...gender} name="gender" value="Male" /> 
                        <label className="form-check-label" for="gender-male"> Male </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" id="gender-female" type="radio" {...gender} name="gender" value="Female" /> 
                        <label className="form-check-label" for="gender-female"> Female </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" id="gender-other" type="radio" {...gender} name="gender" value="Other" /> 
                        <label className="form-check-label" for="gender-other"> Other </label>
                    </div>
                </div>

                <br/> 

                <div className="form-group">
                    <label>Role</label>
                    <div className="form-check">
                        <input className="form-check-input" id="role-instructor" type="radio" {...role} name="role" value="Instructor" /> 
                        <label className="form-check-label" for="role-instructor"> Instructor </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" id="role-student" type="radio" {...role} name="role" value="Student" /> 
                        <label className="form-check-label" for="role-student"> Student </label>
                    </div>
                </div>

                <br/> 
                
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" {...password} placeholder="Enter password" />
                </div>

                <br/> 

                <button type="button" className="btn btn-primary btn-block" onClick={handleLogin} >Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered ? <a href="/login">Login</a>
                </p>
            </form>
        </Card.Body>
    </Card>
    );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
   
    const handleChange = e => {
        setValue(e.target.value);
    }

    return {
        value,
        onChange: handleChange
    }
}