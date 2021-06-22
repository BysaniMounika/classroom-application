import React, { useState } from 'react';
 
function Login(props) {
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
 
  // handle button click of login form
  const handleLogin = async () => {
    await fetch("https://xc5r8648w5.execute-api.us-east-2.amazonaws.com/prod/auth", {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({username: username.value, password: password.value}) // body data type must match "Content-Type" header
          })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if(res.authenticated) {
              setError('');
              sessionStorage.setItem('userDetails', JSON.stringify(res.userDetails));
              props.history.push('/home');
            } else {
              setError('Username/Password is invalid');
            }
        });
  }
 
  return (
    // <div className="login-block">
    //   <div className="title">Login</div>
    //   <br /><br />
    //   <div>
    //     Username<br />
    //     <input type="text" {...username} autoComplete="new-password" />
    //   </div>
    //   <div style={{ marginTop: 10 }}>
    //     Password<br />
    //     <input type="password" {...password} autoComplete="new-password" />
    //   </div>
    //   {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
    //   <button type="button" onClick={handleLogin}>Submit</button>
    //   <br />
    // </div>
    <div class="row mt-5">
  <div class="col-md-6 m-auto">
    <div class="card card-body">
      <h1 class="text-center mb-3"><i class="fas fa-sign-in-alt"></i>  Login</h1>
      <form action="/users/login" method="POST">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            class="form-control"
            placeholder="Enter Email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            class="form-control"
            placeholder="Enter Password"
          />
        </div>
        <button type="submit" class="btn btn-primary btn-block">Login</button>
      </form>
      <p class="lead mt-4">
        No Account? <a href="/users/register">Register</a>
      </p>
    </div>
  </div>
</div>
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
 
export default Login;