import authService from '../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../components//Button';
import Logo from '../components/Logo';

import { useDispatch } from 'react-redux';
import { login as authLogin } from '../store/authSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  async function login(data) {
    setError('');

    try {
      const session = await authService.loginWithGoogle(data);

      if (session) {
        const userData = await authService.getCurrentUser();

        if (userData) dispatch(authLogin({ userData }));
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className='flex justify-center mb-2'>
          <span className='inline-block w-full max-w-[100px]'>
            <Logo width='100%' />
          </span>
        </div>

        <h2 className='text-2xl font-bold leading-tight text-center'>Sign in to your account</h2>

        {error && <p className='mt-8 text-center text-red-600'>{error}</p>}

        <Button onClick={login} className='w-full'>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
