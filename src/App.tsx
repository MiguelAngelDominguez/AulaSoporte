import { useState } from 'react'
import { Register } from '../pages/register.tsx';
import { Login } from '../pages/login.tsx';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section>
        <Register/>
        <Login/>
      </section>
    </>
  )
}

export default App
