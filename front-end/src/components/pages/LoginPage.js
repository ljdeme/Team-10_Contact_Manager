import React, { useState } from 'react';


export const LoginPage = (props) => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();    
        console.log(username);
    }
    
    
    return ( 

        <div className="auth-form-container">
            <h2>TEAM 10

            </h2>
            <form className= "login-form" onSubmit={handleSubmit}>
                <label for="username">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type= 'username' placeholder='Username' id='username' name='username' />
                <label for="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type= 'password' placeholder='Password' id='username' name='password' />
                <button>Log In</button>
            </form>
            <p>Dont have an account? 
                <button className='link-btn' onClick={() => props.onFormSwitch('Sign up')}>Sign up.</button>
            </p>
            
        
        </div>

    );
}
 
export default LoginPage;