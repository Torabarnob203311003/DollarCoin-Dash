// src/components/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AuthLayout from '../Components/AuthLayout';
import toast, { Toaster } from 'react-hot-toast';


// Component for the Login Form
function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://neighbor-sleeping-information-duck.trycloudflare.com/api/v1/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();
      console.log(data)

      if (data.success) {
        // Login successful
        toast.success('Login successful! Redirecting...');

        // Store token if available
        if (data.data.accessToken) {
          localStorage.setItem('authToken', data.data.accessToken);
        }

        // Navigate after a short delay to show the success message
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        // Login failed
        toast.error(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring-green-500 focus:border-green-500"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring-green-500 focus:border-green-500"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
      >
        {loading ? 'Logging in...' : 'Log In'}
      </button>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      <Link
        to="/forgot-password"
        className="block text-sm text-center text-green-400 hover:text-green-300 pt-2"
      >
        Forgot Password?
      </Link>
    </form>
  );
}


// Component for the Forgot Password Form
function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://neighbor-sleeping-information-duck.trycloudflare.com/api/v1/admin/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        })
      });

      const data = await response.json();

      console.log(data)

      if (response.ok && data.success) {
        // Password reset email sent successfully
        toast.success(data.message || 'Password reset email sent successfully!');

        // Optionally navigate to reset password page or stay on same page
        // You can also pass the email to the reset password page if needed
        setTimeout(() => {
          navigate('/reset-password', { state: { email } });
        }, 2000);
      } else {
        // Request failed
        toast.error(data.message || 'Failed to send reset email. Please try again.');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring-green-500 focus:border-green-500"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
      >
        {loading ? 'Sending Reset Code...' : 'Send Reset Code'}
      </button>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      <Link
        to="/login"
        className="block text-sm text-center text-gray-400 hover:text-white pt-2"
      >
        Back to Login
      </Link>
    </form>
  );
}


// Component for the OTP and Reset Password Form
function OTPResetForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    otp: '',
    newPassword: ''
  
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = async () => {
    // Validation
    if (formData.otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    const resetToast = toast.loading('Resetting password...');

    try {
      const response = await fetch('https://neighbor-sleeping-information-duck.trycloudflare.com/api/v1/admin/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          password: formData.newPassword,
          code: formData.otp
        })
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Password successfully reset. Redirecting to Login.", { id: resetToast });
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        toast.error(data.message || "Password reset failed. Please try again.", { id: resetToast });
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error("Network error. Please check your connection and try again.", { id: resetToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        name="otp"
        placeholder="Enter OTP (6 digits)"
        className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring-green-500 focus:border-green-500"
        maxLength="6"
        value={formData.otp}
        onChange={handleChange}
      />
      {/* <input
        type="password"
        name="currentPassword"
        placeholder="currentPassword"
        className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring-green-500 focus:border-green-500"
        value={formData.currentPassword}
        onChange={handleChange}
      /> */}
      <input
        type="password"
        name="newPassword"
        placeholder="New Password"
        className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring-green-500 focus:border-green-500"
        value={formData.newPassword}
        onChange={handleChange}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm New Password"
        className="w-full p-3 bg-gray-700 rounded-lg text-white border border-gray-600 focus:ring-green-500 focus:border-green-500"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <button
        className="w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleReset}
        disabled={loading}
      >
        {loading ? 'Resetting...' : 'Reset Password'}
      </button>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
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