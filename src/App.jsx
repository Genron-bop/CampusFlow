import React, { useState } from 'react'
import loginHeader from './assets/login-header.png'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  // Always start at the login screen on app start.
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please enter email and password.')
      return
    }
    // Demo auth: accept any non-empty credentials (no persistence)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    // Clear any in-memory auth (no persistent storage used)
    setIsAuthenticated(false)
    setEmail('')
    setPassword('')
  }

  if (isAuthenticated) {
    return <Dashboard onLogout={handleLogout} />
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