import React, { useState } from 'react'
import Sidebar from './Sidebar'
import StatCard from './StatCard'
import BuildingOverview from './BuildingOverview'
import './Dashboard.css'
import Analysis from './Analysis'
import Database from './Database'
import DatabaseEdit from './DatabaseEdit'
import Notification from './Notification'
import Reports from './Reports'
import Schedule from './Schedule'

const sampleBuildings = [
  { name: 'Albert Einstein', electricity: '746 kWh', water: '110 m³', updated: '08/22/2025' },
  { name: 'CICS', electricity: '156 kWh', water: '91 m³', updated: '08/18/2025' },
  { name: 'CET', electricity: '67 kWh', water: '75 m³', updated: '08/17/2025' },
]

function MiniLineChart({ data = [4000, 3600, 3200, 2800, 2000, 2400] }) {
  // Render a simple SVG polyline
  const w = 300
  const h = 100
  const max = Math.max(...data)
  const points = data.map((d, i) => `${(i / (data.length - 1)) * w},${h - (d / max) * h}`).join(' ')
  return (
    <svg width={w} height={h} className="mini-chart" viewBox={`0 0 ${w} ${h}`}>
      <polyline points={points} fill="none" stroke="#6c9bd1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Dashboard({ onLogout }) {
  const [view, setView] = useState('dashboard')
  const [menuOpen, setMenuOpen] = useState(false)

  // Current user is read from localStorage demo auth; fallback to default
  const stored = (() => {
    try {
      return JSON.parse(localStorage.getItem('cf_auth'))
    } catch (e) {
      return null
    }
  })()
  const [currentUser, setCurrentUser] = useState(stored?.email ? { email: stored.email, name: stored.email } : { email: 'hazel@emu.edu', name: 'Hazel May Ann M. Ruiz' })

  const demoUsers = [
    { email: 'hazel@emu.edu', name: 'Hazel May Ann M. Ruiz' },
    { email: 'john.doe@campus.edu', name: 'John Doe' },
    { email: 'jane.smith@campus.edu', name: 'Jane Smith' },
  ]

  function switchUser(u) {
    localStorage.setItem('cf_auth', JSON.stringify({ email: u.email }))
    setCurrentUser(u)
    setMenuOpen(false)
  }
  const [selectedRow, setSelectedRow] = useState(null)

  return (
    <div className="cf-app">
      <Sidebar onLogout={onLogout} onNavigate={setView} active={view} />

      <div className="cf-main">
        <header className="cf-header">
          <h1>{view === 'dashboard' ? 'Dashboard' : view === 'analysis' ? 'Analysis' : view}</h1>
          <div style={{display:'flex', alignItems:'center', gap:12, position:'relative'}}>
            <div className="cf-user">
              {currentUser.name}<br /><span>Head of EMU</span>
            </div>

            <button className="avatar-btn" onClick={() => setMenuOpen(!menuOpen)} aria-haspopup="true" aria-expanded={menuOpen}>
              <span className="avatar-circle">{currentUser.name.charAt(0)}</span>
            </button>

            {menuOpen && (
              <div className="profile-menu">
                <div className="profile-title">Switch User</div>
                {demoUsers.map((u) => (
                  <button key={u.email} className="profile-item" onClick={() => switchUser(u)}>
                    <span className="profile-name">{u.name}</span>
                    <span className="profile-email">{u.email}</span>
                  </button>
                ))}
                <div style={{borderTop:'1px solid #eee', marginTop:8, paddingTop:8}}>
                  <button className="profile-item" onClick={onLogout}>Log out</button>
                </div>
              </div>
            )}
          </div>
        </header>

        {view === 'dashboard' && (
          <>
            <section className="cf-stats">
              <StatCard icon="⚡" label="Electricity Usage" value="1,420 kwh" sub="+2% from last month" />
              <StatCard icon="💧" label="Water Consumption" value="3,145 m³" sub="-9% from last month" />
              <StatCard icon="🗑" label="Waste Generate" value="5,124 kg" sub="+14% from last month" />
            </section>

            <section className="cf-panels">
              <div className="panel trend-panel">
                <h3>Monthly Trends</h3>
                <MiniLineChart />
                <div className="trend-legend">
                  <span className="dot e">Electricity</span>
                  <span className="dot w">Water</span>
                  <span className="dot s">Waste</span>
                </div>
              </div>

              <div className="panel bar-panel">
                <h3>Electricity Usage per Building</h3>
                <div className="bar-list">
                  <div className="bar-row"><div className="bar-label">FDC</div><div className="bar"><div style={{width:'60%'}}/></div><div className="bar-value">12,000</div></div>
                  <div className="bar-row"><div className="bar-label">STEERHUB</div><div className="bar"><div style={{width:'85%'}}/></div><div className="bar-value">22,000</div></div>
                  <div className="bar-row"><div className="bar-label">ALBERT EINSTEIN</div><div className="bar"><div style={{width:'100%'}}/></div><div className="bar-value">25,000</div></div>
                </div>
              </div>
            </section>

            <section className="cf-bottom">
              <BuildingOverview items={sampleBuildings} />

              <div className="upcoming panel">
                <h3>Upcoming Events</h3>
                <div className="event">Fitness Development Center<br/><small>Aug 22, 2:00 PM - 4:00 PM</small></div>
                <div className="event">Orientation<br/><small>Type of Event: Orientation</small></div>
              </div>
            </section>
          </>
        )}

        {view === 'analysis' && (
          <section>
            <Analysis />
          </section>
        )}

        {view === 'reports' && (
          <section>
            <Reports />
          </section>
        )}

        {view === 'database' && (
          <section>
            <Database onEdit={(row) => {
              setSelectedRow(row)
              setView('database-edit')
            }} />
          </section>
        )}

        {view === 'schedule' && (
          <section>
            <Schedule />
          </section>
        )}

        {view === 'database-edit' && (
          <section>
            <DatabaseEdit row={selectedRow} onSave={(r) => {
              // Save placeholder: in real app we'd persist changes
              alert(`Saved (demo) for row id=${r.id}`)
              setView('database')
            }} onCancel={() => setView('database')} />
          </section>
        )}
        {view === 'notification' && (
          <section>
            <Notification />
          </section>
        )}
      </div>
    </div>
  )
}
