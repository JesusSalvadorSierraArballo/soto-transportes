import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const onLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate('/post');
  }
  return (
    <div className="login--body">
      <article className="login">
        <header>
          <h1>Soto transportes Login</h1>
        </header>
        <section>
          <label className='form-control'>
            <span>User name</span>
            <InputText className='input-field' value={user} onChange={(e) => setUser(e.target.value)} />
          </label>
          <label className='form-control'>
            <span>Password</span>
            <Password
              className='input-field'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              tabIndex={1}
            />
          </label>
          <Button onClick={onLoginClick} label='Login' />
        </section>
      </article>
    </div>
  );
}
export default Login
