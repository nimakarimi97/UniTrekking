import { useState, useEffect } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, logout } from './store/authSlice';
import Header from './components/Header/Header';
import Footer from './components/footer/Footer';
import authService from './appwrite/auth';
import Logo from './components/Logo';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login({ userData }));
        else dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <div className='flex flex-wrap content-between min-h-screen bg-gray-800 text-gray-200'>
      <div className='block w-full'>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
      <div className='block w-full'>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
