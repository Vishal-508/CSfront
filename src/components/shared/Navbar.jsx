import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authActions';

const NavContainer = styled.nav`
  background-color: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavLogo = styled(Link)`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #3498db;
  }
`;

const NavButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c0392b;
  }
`;

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

const handleLogout = async () => {
  await dispatch(logout());   // thunk returns a promise
  navigate('/auth');
};
  return (
    <NavContainer>
      <NavLogo to="/">CivicSync</NavLogo>
      <NavLinks>
        {user ? (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/issues">Issues</NavLink>
            <NavLink to="/map">Map</NavLink>
            <NavLink to="/analytics">Analytics</NavLink>
            <NavButton onClick={handleLogout}>Logout</NavButton>
          </>
        ) : (
          <NavLink to="/auth">Login</NavLink>
        )}
      </NavLinks>
    </NavContainer>
  );
};

export default Navbar;