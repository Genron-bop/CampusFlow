import React, { useState } from 'react'
import './Dashboard.css'

export default function Database({ onEdit }) {
  const [approved, setApproved] = useState(() => new Set())

  const sample = [
    { id: 1, submitted: '7:55 AM Aug 22 2025', meter: 'STEERHUB', kwh: '30 kwh', remarks: '"..."' },
    { id: 2, submitted: '7:55 AM Aug 21 2025', meter: 'STEERHUB', kwh: '30 kwh', remarks: '"..."' },
    { id: 3, submitted: '7:55 AM Aug 20 2025', meter: 'STEERHUB', kwh: '30 kwh', remarks: '"..."' },
    { id: 4, submitted: '7:55 AM Aug 19 2025', meter: 'STEERHUB', kwh: '30 kwh', remarks: '"..."' },
    { id: 5, submitted: '7:55 AM Aug 18 2025', meter: 'STEERHUB', kwh: '30 kwh', remarks: '"..."' },
    { id: 6, submitted: '7:55 AM Aug 17 2025', meter: 'STEERHUB', kwh: '30 kwh', remarks: '"..."' },
  ]

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
            {sample.map((r) => (
              <tr key={r.id}>
                <td>{r.submitted}</td>
                <td className="db-meter">{r.meter}</td>
                <td>{r.kwh}</td>
                <td>{r.remarks}</td>
                <td className="db-photo">📷</td>
                <td style={{display:'flex', gap:8, alignItems:'center'}}>
                  <button className="btn-edit" onClick={() => onEdit && onEdit(r)}>Edit</button>
                  <button className={approved.has(r.id) ? 'btn-approved' : 'btn-approve'} onClick={() => {
                    const next = new Set(approved)
                    if (next.has(r.id)) next.delete(r.id)
                    else next.add(r.id)
                    setApproved(next)
                  }}>{approved.has(r.id) ? 'Approved' : 'Approve'}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
