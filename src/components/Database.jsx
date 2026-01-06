import React, { useState } from 'react'
import './Dashboard.css'

export default function Database({ rows = [], loading = false, onEdit, onDelete }) {
  const [approved, setApproved] = useState(() => new Set())

  return (
    <div className="db-page">
      <div className="db-controls">
        <div className="db-control-item">
          <label>Select Date</label>
          <input type="date" />
        </div>

        <div className="db-control-item">
          <label>&nbsp;</label>
          <select>
            <option>Electricity</option>
            <option>Water</option>
            <option>Waste</option>
          </select>
        </div>
      </div>

      <div className="db-table-wrap">
        {loading ? <div style={{padding:20}}>Loading...</div> : (
        <table className="db-table">
          <thead>
            <tr>
              <th>Submitted at</th>
              <th>METER</th>
              <th>kwh</th>
              <th>Remarks</th>
              <th>Photo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((m) => {
              const submitted = new Date(m.date || m.createdAt).toLocaleString()
              const meter = m.label || `#${m.id}`
              const unit = m.category === 'water' ? 'm³' : m.category === 'waste' ? 'kg' : 'kWh'
              const kwh = m.value !== undefined && m.value !== null ? `${m.value} ${unit}` : ''
              return (
                <tr key={m.id}>
                  <td>{submitted}</td>
                  <td className="db-meter">{meter}</td>
                  <td>{kwh}</td>
                  <td>{m.source || ''}</td>
                  <td className="db-photo">📷</td>
                  <td style={{display:'flex', gap:8, alignItems:'center'}}>
                    <button className="btn-edit" onClick={() => onEdit && onEdit(m)}>Edit</button>
                    <button className={approved.has(m.id) ? 'btn-approved' : 'btn-approve'} onClick={() => {
                      const next = new Set(approved)
                      if (next.has(m.id)) next.delete(m.id)
                      else next.add(m.id)
                      setApproved(next)
                    }}>{approved.has(m.id) ? 'Approved' : 'Approve'}</button>
                    <button className="btn-delete" onClick={() => onDelete && onDelete(m.id)} style={{background:'#ff4d4d'}}>Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>) }
      </div>
    </div>
  )
}
