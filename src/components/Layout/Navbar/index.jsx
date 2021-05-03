import classnames from 'classnames';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const getActiveRouteClass = (path) => (location.pathname === path ? 'active' : '');

  const primaryRoutes = [
    {
      key: 1,
      text: 'Home',
      route: '/',
      showForLoggedIn: true,
      showForLoggedOut: true,
    },
    {
      key: 3,
      text: 'Login',
      route: '/auth/login',
      showForLoggedIn: false,
      showForLoggedOut: true,
    },
  ];

  return (
    <nav className={classnames('navbar navbar-expand-lg navbar-dark bg-primary')}>
      <div className="container">
        <a className="navbar-brand" href="/">
          Logo
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
            {primaryRoutes.map((routes) => (
              <li key={routes.key} className="nav-item">
                <Link to={routes.route} className={`nav-link ${getActiveRouteClass(routes.route)}`}>
                  {routes.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
