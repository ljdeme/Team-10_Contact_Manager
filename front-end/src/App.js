import React, { useState } from 'react';
import './App.css';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';

function App() {
  const [currentForm,setCurrentForm] = useState('login');
  
  const toggleForm = (formName) =>{
    setCurrentForm(formName);
  }

  return (
    <div className="App">
      <div className="content">
        {currentForm === "Log in" ?  <LoginPage onFormSwitch={toggleForm} /> : <RegisterPage onFormSwitch={toggleForm} />}
      </div>
    </div>
  );
}

export default App;
