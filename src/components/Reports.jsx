import React from 'react'
import './Dashboard.css'

const sample = [
  { id: 1, tech: 'Juan Dela Cruz', electricity: 'Submitted', water: 'Submitted', waste: 'Submitted', status: 'Complete' },
  { id: 2, tech: 'John Whites', electricity: 'Submitted', water: 'Submitted', waste: 'Missing', status: 'Incomplete' },
  { id: 3, tech: 'Jose Rizal', electricity: 'Submitted', water: 'Submitted', waste: 'Submitted', status: 'Complete' },
  { id: 4, tech: 'Juan Dela Cruz', electricity: 'Pending', water: 'Submitted', waste: 'Submitted', status: 'Incomplete' },
]

function Badge({ children, type = 'info' }) {
  return <span className={`badge ${type}`}>{children}</span>
}

export default function Reports() {
  return (
    <div className="reports-page">
      <div className="reports-controls">
        <div className="reports-filter">
          <input placeholder="Sort" />
        </div>
        <div>
          <button className="btn-viewall">View All Data</button>
        </div>
      </div>

      <table className="reports-table">
        <thead>
          <tr>
            <th>Field Technician</th>
            <th>Electricity</th>
            <th>Water</th>
            <th>Waste</th>
            <th>Status</th>
            <th>Acknowledge</th>
          </tr>
        </thead>
        <tbody>
          {sample.map((r) => (
            <tr key={r.id}>
              <td>{r.tech}</td>
              <td><Badge type={r.electricity === 'Submitted' ? 'success' : r.electricity === 'Pending' ? 'warn' : 'danger'}>{r.electricity}</Badge></td>
              <td><Badge type={r.water === 'Submitted' ? 'success' : r.water === 'Pending' ? 'warn' : 'danger'}>{r.water}</Badge></td>
              <td><Badge type={r.waste === 'Submitted' ? 'success' : r.waste === 'Pending' ? 'warn' : 'danger'}>{r.waste}</Badge></td>
              <td><Badge type={r.status === 'Complete' ? 'complete' : 'incomplete'}>{r.status}</Badge></td>
              <td>
                <button className="btn-accept">Accept</button>
                <button className="btn-flag">Flag</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
