import React from 'react'
import './Dashboard.css'

export default function Sidebar({ onLogout, onNavigate, active = 'dashboard' }) {
  return (
    <aside className="cf-sidebar">
      <div className="cf-brand">
        <div className="cf-logo">CF</div>
        <div className="cf-title">CampusFlow</div>
      </div>

      <nav className="cf-nav">
        <button className={`cf-nav-item ${active === 'dashboard' ? 'active' : ''}`} onClick={() => onNavigate && onNavigate('dashboard')}>🏠 Dashboard</button>
        <button className={`cf-nav-item ${active === 'reports' ? 'active' : ''}`} onClick={() => onNavigate && onNavigate('reports')}>📊 Reports</button>
        <button className={`cf-nav-item ${active === 'analysis' ? 'active' : ''}`} onClick={() => onNavigate && onNavigate('analysis')}>📈 Analysis</button>
        <button className={`cf-nav-item ${active === 'database' ? 'active' : ''}`} onClick={() => onNavigate && onNavigate('database')}>🗃 Database</button>
        <button className={`cf-nav-item ${active === 'schedule' ? 'active' : ''}`} onClick={() => onNavigate && onNavigate('schedule')}>📅 Schedule</button>
        <button className={`cf-nav-item ${active === 'notification' ? 'active' : ''}`} onClick={() => onNavigate && onNavigate('notification')}>🔔 Notification</button>
      </nav>

      <div className="cf-sidebar-footer">
        <button className="cf-btn small">Settings</button>
        <button className="cf-btn small" onClick={onLogout}>Log Out</button>
      </div>
    </aside>
  )
}
