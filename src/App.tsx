import { useState } from 'react'
import { Login } from '../pages/register.tsx';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section>
        <Login/>
      </section>
    </>
  )
}

export default App
