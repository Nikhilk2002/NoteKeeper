import React, { useState } from 'react'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import signupImage from '../../Asset/sign1.jpeg';
import mainBgImage from '../../Asset/backround3.jpeg'; 
import { signup } from '../../Services/UserApi';

function SignIn() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(''); 

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await signup(values);
        console.log('Signup successful:', response);
        navigate('/login'); 
      } catch (error) {
        console.error('Signup failed:', error);
        setErrorMessage(error.response?.data?.message || 'An error occurred during signup.');
      }
    },
  });

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div 
      className='flex justify-center items-center font-serif min-h-screen bg-cover bg-center'
      style={{
        backgroundImage: `url(${mainBgImage})`,
      }}
    >
      <div 
        className='w-80 h-auto overflow-hidden rounded-lg shadow-lg bg-white'
        style={{ 
          backgroundImage: `url(${signupImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="w-full h-full p-5 bg-white bg-opacity-80  reletive top-0 left-0 right-0">
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <label className='flex text-gray-700 m-10 cursor-pointer font-bold text-center justify-center'>
              Sign Up
            </label>
            <input
              type="text"
              name="name"
              placeholder='Name'
              className='w-full p-2 rounded border border-gray-300'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
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
            <input
              type="password"
              name="confirmPassword"
              placeholder='Confirm Password'
              className='w-full p-2 rounded border border-gray-300'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
            ) : null}
            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}
            <button
              type="submit"
              className='w-full p-2 bg-blue-500 text-white rounded font-bold hover:bg-blue-700'
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className='text-gray-700'>Already have an account?</p>
            <button
              onClick={handleLogin}
              className='text-blue-500 font-bold hover:underline'
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
