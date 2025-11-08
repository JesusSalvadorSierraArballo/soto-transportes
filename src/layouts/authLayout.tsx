import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hook/store';
import { logout } from '../store/users/slice';
import './authLayout.css';

function AuthLayout() {
  const currentUser = useAppSelector((state) => state.authUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login');
  }
  
  if(!currentUser.id) {
    return(<Navigate to="/login"></Navigate>)
  }

  return (
    <>
      <header><span>Accediste {currentUser.firstName} {currentUser.lastName} </span><Button onClick={handleLogout} icon="pi pi-sign-out" title='Logout'/></header>
      <Outlet />
    </>
  );
}

export default AuthLayout;
