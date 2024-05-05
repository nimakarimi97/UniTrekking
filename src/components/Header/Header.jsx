import Container from '../container/Container';
import Logo from '../Logo';
import { Link } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MobileMenu from './MobileMenu';

export default function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      authRequired: true,
    },
    {
      name: 'All Hikes',
      slug: '/all-hikes',
      authRequired: authStatus,
    },
    {
      name: 'Add Hike',
      slug: '/add-hike',
      authRequired: authStatus,
    },
    {
      name: 'Who Are We?',
      slug: '/about',
      authRequired: true,
    },
    {
      name: 'Contact Us',
      slug: '/contact-us',
      authRequired: true,
    },

    {
      name: 'Login',
      slug: '/login',
      icon: 'login',
      authRequired: !authStatus,
    },
  ];

  return (
    <Container>
      <div className='max-w-6xl px-4 mx-auto sm:px-6'>
        <div className='flex items-center justify-between h-20'>
          <div className='mr-4 shrink-0'>
            <Link href='/' className='block'>
              <Logo />
            </Link>
          </div>

          {/* Desktop navbar */}
          <nav className='hidden md:flex md:grow'>
            <ul className='flex flex-wrap items-center justify-end grow'>
              {navItems.map(
                (item) =>
                  item.authRequired && (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className='flex items-center px-4 py-3 font-medium text-purple-600 transition duration-150 ease-in-out hover:text-gray-200'
                      >
                        {item.icon && <i className={`fa fa-${item.icon}`}></i>}
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

          {/* TODO: Mobile menu is broken */}
          <MobileMenu />
        </div>
      </div>
    </Container>
  );
}
