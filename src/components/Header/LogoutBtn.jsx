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
      className='px-6 py-2 duration-200 rounded-full inline-bock hover:bg-blue-100'
      onClick={lougoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
