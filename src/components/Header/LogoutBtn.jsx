import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth.js';
import { logout } from '../../store/authSlice.js';

function LogoutBtn() {
  const dispatch = useDispatch();

  const lougoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className='px-6 py-2 text-white duration-200 bg-red-600 rounded-full inline-bock hover:bg-red-900'
      onClick={lougoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
