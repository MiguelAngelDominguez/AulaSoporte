import React from 'react'
import "./register.css"

async function validarAutenficacion() {
  await console.log("algo hace xd ");
};

export const Login = () => {
  return (
    <>
      <div id="auth">
        <h3 id = "auth-title">Registro de Usuarios</h3>
        <form action="" method="post" id = "auth-form">
          <span id="name">Ingrese su nombre: </span>
          <input type="text" name="" id="name" />
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