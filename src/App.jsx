import { useState } from 'react'
import loginHeader from './assets/login-header.png'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please enter email and password.')
      return
    }
    // Replace with real auth call
    console.log('Sign in:', { email, password })
    alert('Signed in (demo)')
  }

  return (
    <div className="page">
      <header className="top-container">
        <img src={loginHeader} className="header-image" alt="Login header" />
        <div className="portal-bar">Portal Login</div>
      </header>

      <main className="main-content">
        <div className="login-card">
          <h2>Please Login</h2>

          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              placeholder="Email or Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <div className="note">* Password is case sensitive</div>

            {error && <div className="error">{error}</div>}

            <button type="submit" className="btn-signin">Sign In</button>
          </form>

          <div className="links">
            <a href="#">Forgot password?</a>
            <span> · </span>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App