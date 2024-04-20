import authService from '../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from '../components//Button';
import Input from '../components/Input';
import Logo from '../components/Logo';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../store/authSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const login = async (data) => {
    setError('');
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  };

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
        <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-5'>
            <Input
              label='Email : '
              placeholder='Email Address'
              type='email'
              {...register('email', {
                required: true,
              })}
            />
            <Input
              label='Password : '
              type='password'
              placeholder='Password'
              {...register('password', { required: true })}
            />
            <Button type='submit' className='w-full'>
              Sign in{' '}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
