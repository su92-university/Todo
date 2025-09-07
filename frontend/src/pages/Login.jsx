import { useState } from "react";
import "../style/SignUpForm.css"
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../context/authcontext";
export default function Login() {
  const {login}= useAuth()
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login({
        email:formData.email,
        password:formData.password
      })
      console.log(res)
      if (res.success) {
        navigate("/")
      }else{
      toast(res.message || "Userll does not exist or wrong password");
      setFormData({ email: '', password: '' });
      }
      
    } catch (error) {
    toast("User does not exist or wrong password");
    setFormData({ email: '', password: '' });
    } finally {
    setIsSubmitting(false);
  }
  };

  return (
    <div className="signsignup-container">
      <ToastContainer />
      <div className="signsignup-card">
        <div className="signsignup-header">
          <h2>Create Account</h2>
          <p>Join us today and get started</p>
        </div>


        {errors.submit && (
          <div className="signalert signalert-error">
            <div className="signalert-icon">⚠</div>
            <div className="signalert-content">
              <p>{errors.submit}</p>
            </div>
          </div>
        )}

        <form className="signsignup-form" onSubmit={handleSubmit}>

          <div className="signform-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'signerror' : ''}
              placeholder="Enter your email"
            />
            {errors.email && <span className="signerror-message">{errors.email}</span>}
          </div>

          <div className="signform-group">
            <label htmlFor="password">Password</label>
            <div className="signpassword-input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={errors.password ? 'signerror' : ''}
                placeholder="Create a password"
                style={{width:"100%"}}
              />
              <button
                type="button"
                className="signpassword-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <span className="signerror-message">{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            className={`signsignup-btn ${isSubmitting ? 'signloading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="signspinner"></span>
                Login...
              </>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="signsignup-footer">
          <p>
            Donot have an account? 
            <Link to="/signup" className="signsignin-link"> Sign in</Link>
          </p>
        </div>
      </div>


    </div>
  );
}