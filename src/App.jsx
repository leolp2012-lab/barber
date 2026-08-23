

import React, {useState} from 'react';
import bi from './assets/barberIMG.svg';
import './style.css'

function App() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  return (
    <div className="container">
      <div className="container-login">
                <div className="wrap-login">
          <form className="login-form">

            <span className="login-form-title">Bem vindos ao </span>

            <span className="login-form-title"><img src={bi} alt="logo barbearia" /></span>

            <div className="wrap-input">
              <input 
              className={email != "" ? 'has-val input' : 'input'} 
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              
              />
              <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input">
              <input 
              className={password != "" ? 'has-val input' : 'input'}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="password"></span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn">Login</button>
            </div>

           <div className="text-center">
           <span className="text1">Não possui conta?
           </span>
           <a className='text2' href="#">Criar conta</a>
           </div>



          </form>
        </div>
      </div>
    </div>

  );
}

export default App;
