import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from '../../store/users/slice';
import type { LoginResponse } from "../../types";
import "./login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = user.length > 0 && password.length > 0;

  const onLoginClick = () => {
    setLoading(true);
    axios
      .post<LoginResponse>("https://dummyjson.com/auth/login", {
        username: user,
        password: password,
      })
      .then((response) => {
        dispatch(login(response.data));
        navigate("/post");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="login--body">
      <article className="login">
        <header>
          <h1>Soto transportes</h1>
        </header>
        <section>
          <label className="form-control">
            <span>Usuario</span>
            <InputText
              className="input-field"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </label>
          <label className="form-control">
            <span>Contraseña</span>
            <Password
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
            />
          </label>
          <Button
            onClick={onLoginClick}
            label="Login"
            disabled={!canSubmit || loading}
          />
        </section>
      </article>
      {/* <Toast ref={toast} /> */}
    </div>


  );
}
export default Login;
