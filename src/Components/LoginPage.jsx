// src/components/LoginPage.jsx
import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AuthLayout from '../Components/AuthLayout';


// Component for the Login Form
function LoginForm() {
  const navigate = useNavigate();
  const handleLogin = () => {
    // Simulating successful login:
    alert("Simulating Login and redirecting to Dashboard!");
    // Navigate to the default dashboard route
    navigate('/dashboard'); 
  };

  return (
    <div className="space-y-4">
      <input 
        type="email" 
        placeholder="Email" 
        className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring-green-500 focus:border-green-500" 
      />
      <input 
        type="password" 
        placeholder="Password" 
        className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring-green-500 focus:border-green-500" 
      />
      <button 
        type="submit"
        className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold transition duration-200"
        onClick={handleLogin}
      >
        Log In
      </button>
      <Link 
        to="/forgot-password"
        className="block text-sm text-center text-green-400 hover:text-green-300 pt-2"
      >
        Forgot Password?
      </Link>
    </div>
  );
}

// Component for the Forgot Password Form
function ForgotPasswordForm() {
  return (
    <div className="space-y-4">
      <input 
        type="email" 
        placeholder="Enter your email" 
        className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring-green-500 focus:border-green-500" 
      />
      <Link 
        to="/reset-password"
        className="block text-center w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold transition duration-200"
      >
        Send Reset Code
      </Link>
      <Link 
        to="/login"
        className="block text-sm text-center text-gray-400 hover:text-white pt-2"
      >
        Back to Login
      </Link>
    </div>
  );
}

// Component for the OTP and Reset Password Form
function OTPResetForm() {
  const navigate = useNavigate();
  const handleReset = () => {
    alert("Password successfully reset. Redirecting to Login.");
    navigate('/login');
  };

  return (
    <div className="space-y-4">
      <input 
        type="text" 
        placeholder="Enter OTP (6 digits)" 
        className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring-green-500 focus:border-green-500" 
        maxLength="6"
      />
      <input 
        type="password" 
        placeholder="New Password" 
        className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring-green-500 focus:border-green-500" 
      />
      <input 
        type="password" 
        placeholder="Confirm New Password" 
        className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring-green-500 focus:border-green-500" 
      />
      <button 
        className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold transition duration-200"
        onClick={handleReset}
      >
        Reset Password
      </button>
    </div>
  );
}

export default function LoginPageRouter() {
  const location = useLocation();
  const currentPath = location.pathname;

  let title, subtitle, content;

  if (currentPath === '/login') {
    title = "Welcome Back";
    subtitle = "Sign in to access your dashboard.";
    content = <LoginForm />;
  } else if (currentPath === '/forgot-password') {
    title = "Forgot Password";
    subtitle = "Enter your email to receive a reset code.";
    content = <ForgotPasswordForm />;
  } else if (currentPath === '/reset-password') {
    title = "Reset Password";
    subtitle = "Enter the code sent to your email and set a new password.";
    content = <OTPResetForm />;
  }

  return (
    <AuthLayout title={title} subtitle={subtitle}>
      {content}
    </AuthLayout>
  );
}