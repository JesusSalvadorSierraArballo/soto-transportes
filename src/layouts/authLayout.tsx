import { Button } from 'primereact/button';
import { Outlet, useNavigate } from 'react-router-dom';
import './authLayout.css';

function AuthLayout() {
  const navigate = useNavigate();
  const logout = () => {
    navigate('/login');
  }
  return (
    <>
      <header><span>Accediste Jesús Sierra </span><Button onClick={logout} label='Logout'/></header>
      <Outlet />
    </>
  );
}

export default AuthLayout;
