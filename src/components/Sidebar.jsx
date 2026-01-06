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
        <button aria-current={active === 'dashboard' ? 'page' : undefined} title="Dashboard" className={`cf-nav-item ${active === 'dashboard' ? 'active' : ''}`} onClick={() => onNavigate && onNavigate('dashboard')}>🏠 Dashboard</button>
        <button aria-current={active === 'reports' ? 'page' : undefined} title="Reports" className={`cf-nav-item ${active === 'reports' ? 'active' : ''}`} onClick={() => onNavigate && onNavigate('reports')}>📊 Reports</button>
        <button aria-current={active === 'analysis' ? 'page' : undefined} title="Analysis" className={`cf-nav-item ${active === 'analysis' ? 'active' : ''}`} onClick={() => onNavigate && onNavigate('analysis')}>📈 Analysis</button>
        <button aria-current={active === 'database' ? 'page' : undefined} title="Database" className={`cf-nav-item ${active === 'database' ? 'active' : ''}`} onClick={() => onNavigate && onNavigate('database')}>🗃 Database</button>
        <button aria-current={active === 'schedule' ? 'page' : undefined} title="Schedule" className={`cf-nav-item ${active === 'schedule' ? 'active' : ''}`} onClick={() => onNavigate && onNavigate('schedule')}>📅 Schedule</button>
        <button aria-current={active === 'notification' ? 'page' : undefined} title="Notification" className={`cf-nav-item ${active === 'notification' ? 'active' : ''}`} onClick={() => onNavigate && onNavigate('notification')}>🔔 Notification</button>
      </nav>

      <div className="cf-sidebar-footer">
        <button className="cf-btn small">Settings</button>
        <button className="cf-btn small" onClick={onLogout}>Log Out</button>
      </div>
    </aside>
  )
}
