import { observer } from "mobx-react-lite";
import React, { useState } from "react";

import "./login.css";

export const Login = observer(({ userStore }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    setFailed(!userStore.login(login, password));
  }

  return (
    <>
      {failed && <p>Wrong username or password</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <p>
          <label className="login-form__label">Login</label>
          <input type="text" onChange={(e) => setLogin(e.target.value)}/>
        </p>
        <p>
          <label className="login-form__label">Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)}/>
        </p>
        <p>
          <input type="submit" value="Login" />
        </p>
      </form>
    </>
  );
});