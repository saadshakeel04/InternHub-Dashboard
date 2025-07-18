import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, User, LogIn } from 'lucide-react';
import Button from '../components/Button.jsx'; // Ensure this path is correct

import { useAuth } from '../contexts/AuthContext.jsx'; // Ensure this path is correct
import logo from '../assets/logo.png'; // Ensure this path is correct
import backgroundImage from '../assets/bg.jpg'; // Ensure this path is correct

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setErrors({ email: 'Invalid credentials' });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Mobile Layout - Full Screen Background with Dark Transparent Form */}
      <div className="md:hidden min-h-screen relative flex items-center justify-center p-4">
        {/* Full Screen Background Image (now the direct background of the container) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        ></div>

        {/* Dark Transparent Form Overlay - Centered */}
        {/* This div itself will be the blurry element, sitting on top of the background image */}
        <div className="relative z-10 p-6 w-full max-w-sm">
          <div className="bg-white-700 bg-opacity-70 backdrop-blur-md rounded-2xl p-8 w-full shadow-lg flex flex-col items-center"> {/* Changed to gray-700 with opacity */}
            {/* Logo and Text */}
            <div className="text-center mb-8">
              <img
                src={logo}
                alt="SuaLogo#"
                className="h-32 w-auto mx-auto mb-4" // Bigger logo for mobile
              />
              <h2 className="text-2xl font-bold text-black mb-2">Greetings User</h2> 
              <p className="text-black-200 text-sm">Join in and explore more of us</p> 
            </div>

            <form className="space-y-6 w-full" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div>
                <div className="relative">
                  <input
                    id="email-mobile"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full py-3 border-b border-black-300 focus:outline-none focus:border-black text-black placeholder-black-500 pr-10 bg-transparent ${ // Text/placeholder/focus color changed to black/gray-500
                      errors.email ? 'border-red-400' : ''
                    }`}
                    placeholder="Email"
                    aria-label="Email address"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-black-500" /> {/* Icon color adjusted */}
                  </div>
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <div className="relative">
                  <input
                    id="password-mobile"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full py-3 border-b border-black-300 focus:outline-none focus:border-black text-black placeholder-black-500 pr-10 bg-transparent ${ // Text/placeholder/focus color changed to black/gray-500
                      errors.password ? 'border-red-400' : ''
                    }`}
                    placeholder="Password"
                    aria-label="Password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-black-500" /> 
                    ) : (
                      <Eye className="h-5 w-5 text-black-500" /> 
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                variant="dark"
                size="md"
              >
                {/* Conditional rendering for LogIn icon */}
                {!isLoading && <LogIn className="h-5 w-5 mr-2" />}
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Split Screen with Form and Image */}
      <div className="hidden md:flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-amber-50 p-4 sm:p-6 lg:p-8">
        {/* The main login card container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row w-full max-w-7xl h-[600px]">
          {/* Desktop Layout - Left Panel Login Form */}
          <div className="w-1/2 p-10 lg:p-16 xl:p-20 flex items-center justify-center">
            <div className="w-full max-w-sm">
              {/* Logo and Text - Centered and Bigger for Desktop */}
              <div className="text-center mb-12">
                <img
                  src={logo}
                  alt="SuaLogo#"
                  className="h-32 w-auto mx-auto mb-4" // Increased logo size for desktop
                />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Greetings User</h2>
                <p className="text-gray-600 text-base">Join in and explore more of us</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email Input */}
                <div>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`block w-full py-3 border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-900 placeholder-gray-500 pr-10 bg-transparent ${
                        errors.email ? 'border-red-400' : ''
                      }`}
                      placeholder="Username"
                      aria-label="Email address"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password Input */}
                <div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`block w-full py-3 border-b border-gray-300 focus:outline-none focus:border-indigo-500 text-gray-900 placeholder-gray-500 pr-10 bg-transparent ${
                        errors.password ? 'border-red-400' : ''
                      }`}
                      placeholder="Password"
                      aria-label="Password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed mt-8 hover-scale-105"
                  variant="dark"
                  size="md"
                >
                  {/* Conditional rendering for LogIn icon */}
                  {!isLoading && <LogIn className="h-5 w-5 mr-2" />}
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    'Sign in'
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Desktop Layout - Right Panel Background Image */}
          <div
            className="w-1/2 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
