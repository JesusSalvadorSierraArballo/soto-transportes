import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let canSubmit = user.length > 0 && password.length > 0;

  const onLoginClick = () => {
    setLoading(true);
    axios
      .post("https://dummyjson.com/auth/login", {
        username: user,
        password: password,
      })
      .then((response: any) => {
        console.log({ response });
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
          <h1>Soto transportes Login</h1>
        </header>
        <section>
          <label className="form-control">
            <span>User name</span>
            <InputText
              className="input-field"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </label>
          <label className="form-control">
            <span>Password</span>
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
