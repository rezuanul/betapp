import { Image } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../../../assets/pictures/GambleBoard.png'

export default function Navbar(connectMetamaskHandler) {
  const location = useLocation();

  const getActiveRouteClass = (path) => (location.pathname === path ? 'active' : '');

  const primaryRoutes = [
    {
      key: 1,
      text: 'Events',
      route: '/'
    },
  ];

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div className="container">
        <a className="navbar-brand" href="/">
          <img
          width="300"
          height="40" 
          className="img-fluid"
          src={logo}/>
        </a>
 
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
    </nav>
  );
}
