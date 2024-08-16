import React, { useContext, useEffect, useState } from 'react';
import logs from '../apis/logs';
import { useNavigate } from 'react-router-dom';
import { Context } from './ContextProvider';

const SignUpForm = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const {registrationState, setRegistrationState} = useContext(Context);

  const navigate = useNavigate();

  const insertUser = async (e) => {
    e.preventDefault();
    try {
      await logs.post('/register', {
        first_name: firstName,
        last_name: lastName,
        uname: username,
        pw: password
      })
    } catch (err) {
      console.log(err);
    } finally {
      navigate('/login');
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-3xl font-bold text-center">Sign Up</h2>
        <form className="space-y-4" onSubmit={insertUser}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block mb-1 text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                id="firstName"
                name="first_name"
                type="text"
                placeholder="John"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                onChange={(e) => {setFirstName(e.target.value)}}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-1 text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                id="lastName"
                name='last_name'
                type="text"
                placeholder="Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                onChange={(e) => {setLastName(e.target.value)}}
              />
            </div>
          </div>
          <div>
            <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              name='uname'
              type="text"
              placeholder="johndoe"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              onChange={(e) => {setUsername(e.target.value)}}
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name='pw'
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
              onChange={(e) => {setPassword(e.target.value)}}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUpForm