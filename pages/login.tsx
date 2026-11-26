import React from 'react';
import { AuthProvider,AuthContext } from '../auth/AuthProvider';
import "./auth.css";

export const Login = () => {
  return (
    <>
        <div id="auth">
        <h3 id = "auth-title">Ingresar</h3>
        <form action="" method="post" id = "auth-form">
          <span id="correo">Ingrese su correo: </span>
          <input type="text" />
          <span id="pass">Ingrese su contraseña: </span>
          <input type="text" />
          <button type="submit">Registrar</button>
        </form>
      </div>
    </>
  )
}

export default Login