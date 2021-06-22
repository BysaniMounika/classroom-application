import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
function Login(props) {
    const [user, setUser] = useState({});
    const email = useFormInput('');
    const password = useFormInput('');
    const role = useFormInput('');
    const [error, setError] = useState(null);

    useEffect(() => {
        async function init() {
            const data = await sessionStorage.getItem('userDetails');
            setUser(JSON.parse(data));
            if (user.id) {
                props.history.push('/home');
            }
        }
        init();
    }, []);

    const handleLogin = async () => {
        const body = JSON.stringify({
            email: email.value,
            role: role.value,
            password: password.value
        });
        console.log("Login request", body);
        await fetch("https://v2dwxcy9k1.execute-api.us-east-2.amazonaws.com/dev/login", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(res => res.json())
            .then(res => {
                var response = JSON.parse(res.body);
                console.log(response);
                if (response["user"] !== null) {
                    setError('');
                    setUser(response["user"]);
                    sessionStorage.setItem('userDetails', JSON.stringify(response["user"]));
                    props.history.push('/home');
                } else {
                    setError('Username/Password is invalid');
                }
            });
    };

    return (
        <Card style={{ width: '50%', marginLeft: 'auto', marginRight: 'auto', textAlign: 'left' }}>
            <Card.Body>
                <form>
                    <h3>Login</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" {...email} placeholder="Enter email" />
                    </div>

                    <br />

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

                    <br />

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" {...password} placeholder="Enter password" />
                    </div>

                    <br />
                    {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
                    <button type="button" className="btn btn-primary btn-block" onClick={handleLogin} >Login</button>
                    <p className="forgot-password text-right">
                        Don't have an account ? <a href="/sign-up">Sign Up</a>
                    </p>
                </form>
            </Card.Body>
        </Card>
    )
};

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

export default Login;