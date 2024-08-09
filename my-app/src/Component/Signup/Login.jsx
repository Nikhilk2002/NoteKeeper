import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import loginImage from '../../Asset/backround3.jpeg';
import { login } from '../../Services/UserApi';

function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await login(values);
        console.log('Login successful:', response);
        // After successful login, store the token in local storage
        localStorage.setItem("JWT", response.data.token);
        console.log("Stored token:", localStorage.getItem("JWT")); // Verify the token is stored correctly

        navigate('/');
      } catch (error) {
        console.error('Login failed:', error);
        setErrorMessage(error.response?.data?.message || 'An error occurred during login.');
      }
    },
  });

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div
      className='flex justify-center items-center font-serif min-h-screen bg-cover bg-center'
      style={{
        backgroundImage: `url(${loginImage})`,
      }}
    >
      <div
        className='w-80 h-auto overflow-hidden rounded-lg shadow-lg bg-white'
        style={{
          backgroundImage: `url(${loginImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="w-full h-full p-5 bg-white bg-opacity-80 relative">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <label className='flex text-gray-700 m-10 cursor-pointer font-bold'>
              Login
            </label>
            <input
              type="email"
              name="email"
              placeholder='Email'
              className='w-full p-2 rounded border border-gray-300'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
            <input
              type="password"
              name="password"
              placeholder='Password'
              className='w-full p-2 rounded border border-gray-300'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            ) : null}
            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}
            <button
              type="submit"
              className='w-full p-2 bg-blue-500 text-white rounded font-bold hover:bg-blue-700'
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className='text-gray-700'>Don't have an account?</p>
            <button
              onClick={handleSignup}
              className='text-blue-500 font-bold hover:underline'
            >
              Create new account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
