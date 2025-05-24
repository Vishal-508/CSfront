import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ user, redirectPath = '/auth', children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  redirectPath: PropTypes.string,
  children: PropTypes.node,
};

export default ProtectedRoute;