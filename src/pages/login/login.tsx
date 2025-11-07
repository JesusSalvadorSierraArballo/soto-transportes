import { useNavigate } from 'react-router-dom';
import './login.css';



function Login() {
  const navigate = useNavigate();

  const onLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate('/post');
  }
  return (
    <article className='login'>
      <header>
        <h1>Soto transportes Post</h1>
      </header>
      <section>
        <label>
          Username
          <input type="text" />
        </label>
        <label>
          Password
          <input type="password" />
        </label>
        <button onClick={onLoginClick}>
          Login
        </button>
      </section>
    </article>
  );
}
export default Login
