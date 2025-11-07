import { Outlet, useNavigate } from 'react-router-dom';
import './authLayout.css';

function AuthLayout() {
  const navigate = useNavigate();
  const logout = () => {
    navigate('/login');
  }
  return (
    <>
      <header>Accediste Jesús Sierra <button onClick={logout}>Logout</button></header>
      <Outlet />
    </>
  );
}

export default AuthLayout;
