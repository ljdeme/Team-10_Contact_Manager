import React, { useState } from 'react';


export const RegisterPage = (props) => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');


    const handleSubmit = (e) =>{
        e.preventDefault();    
        console.log(username);
    }
    
    
    return (  
        <div className="auth-form-container">
            <h2>Sign up</h2>
            <form className= "signup-form"onSubmit={handleSubmit}>
                <label for="username">Username:</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type= 'username' placeholder='Username' id='username' name='username' />
                <label for="password">Password:</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type= 'password' placeholder='Password' id='username' name='password' />
                <label for="firstName">First Name:</label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type= 'firstName' placeholder='FirstName' id='firstName' name='firstName' />
                <label for="lastName">Last Name:</label>
                <input value={lastName} onChange={(e) => setLastname(e.target.value)} type= 'lastName' placeholder='lastName' id='lastName' name='lastName' />
                <label for="email">Email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type= 'email' placeholder='email' id='email' name='email' />
                <label for="phoneNumber">Phone Number:</label>
                <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type= 'phoneNumber' placeholder='phoneNumber' id='phoneNumber' name='phoneNumber' />
                <button type='submit'>Create Account</button>
            </form>
            <p> Already have an account?
                <button className='link-btn' onClick={() => props.onFormSwitch('Log in')}>Log in.</button>
            </p>
        </div>
    );
}
 
export default RegisterPage;