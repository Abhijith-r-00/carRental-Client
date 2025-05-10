import React, { useState } from 'react';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';
import { FaCar } from 'react-icons/fa';
import './AuthPages.css'
import { logibnUser } from '../services/allApi';
import { toast } from 'react-toastify';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle login logic
    try {
        if(email&&password){
            const req={
                email,password
            }
            const apiResponse= await logibnUser(req)
            console.log(apiResponse);
            
            if(apiResponse.status==200){
                toast.success('Logined successfully!');
                 sessionStorage.setItem("user",apiResponse?.data?.user.fullName)
            sessionStorage.setItem("token",apiResponse?.data?.token)
            }else{
                toast.error("Invalid Credintials")
            }
        }
    } catch (error) {
        console.log(error);
        
    }
  };

  return (
    <div className="auth-page">
     
      
      <main className="auth-container">
        <div className="auth-glass">
          <div className="auth-header">
            <FaCar className="auth-icon" />
            <h2>Welcome Back</h2>
            <p>Sign in to access your LETRIDE account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <FiMail className="input-icon" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="input-group">
              <FiLock className="input-icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="auth-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
                <span>Remember me</span>
              </label>
              
              <a href="/forgot-password" className="forgot-password">
                Forgot password?
              </a>
            </div>
            
            <button type="submit" className="auth-button">
              <FiLogIn className="button-icon" />
              Login
            </button>
          </form>
          
          <div className="auth-footer">
            <p>Don't have an account? <a href="/register">Create one</a></p>
          </div>
        </div>
        
        <div className="auth-decoration">
          <div className="neon-circle"></div>
          <div className="neon-circle"></div>
          <div className="neon-circle"></div>
        </div>
      </main>
      

    </div>
  );
};

export default LoginPage;