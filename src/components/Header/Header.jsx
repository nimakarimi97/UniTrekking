import Container from '../container/Container';
import Logo from '../Logo';
import { Link } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      authRequired: true,
    },
    {
      name: 'Login',
      slug: '/login',
      authRequired: !authStatus,
    },

    {
      name: 'All Posts',
      slug: '/all-posts',
      authRequired: authStatus,
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      authRequired: authStatus,
    },
  ];

  return (
    <header className='py-3 bg-gray-500 shadow'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo />
            </Link>
          </div>

          <ul className='flex ml-auto'>
            {navItems.map(
              (item) =>
                item.authRequired && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className='px-6 py-2 duration-200 rounded-full inline-bock hover:bg-blue-100'
                    >
                      {item.name}
                    </button>
                  </li>
                ),
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
