import React, { useState } from 'react'
import api, { setAuthToken } from '../api/api';
import {useNavigate} from 'react-router-dom';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async(e) => {
        e.preventDefault();

        try{
            const response = await api.post('token/', {
                username,
                password,
            });

            const {access, refresh} = response.data;
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshtoken',refresh);

            setAuthToken(access);

            navigate('/todos/');
        }catch{
            setError('invalid credentials');
        }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="UserName"
          className="w-full px-4 py-2 mb-4 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
