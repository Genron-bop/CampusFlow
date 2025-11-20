import React, { useMemo, useState } from 'react'
import './Dashboard.css'

export default function DatabaseEdit({ row, onSave, onCancel }) {
  if (!row) return null

  // extract numeric previous reading from row.kwh if possible
  const prev = useMemo(() => {
    const n = parseFloat(String(row.kwh).replace(/[^[0-9].\-]/g, ''))
    return Number.isFinite(n) ? n : 0
  }, [row.kwh])

  const [current, setCurrent] = useState('')
  const [notes, setNotes] = useState(row.remarks || '')
  const [resource, setResource] = useState('Electricity')
  const consumption = useMemo(() => {
    const c = parseFloat(current)
    if (!Number.isFinite(c)) return ''
    const diff = c - prev
    return diff >= 0 ? diff.toFixed(3) : diff.toFixed(3)
  }, [current, prev])

  function handleUpdate() {
    // basic validation
    const cur = parseFloat(current)
    if (!Number.isFinite(cur)) {
      alert('Please enter a valid current reading')
      return
    }

    const updated = {
      ...row,
      previousReading: prev,
      currentReading: cur,
      consumption: parseFloat((cur - prev).toFixed(3)),
      remarks: notes,
      resource
    }

    onSave && onSave(updated)
  }

  return (
    <div className="db-edit edit-ui">
      <div className="db-edit-header">
        <div className="db-edit-controls">
          <select className="resource-select" value={resource} onChange={(e) => setResource(e.target.value)}>
            <option>Electricity</option>
            <option>Water</option>
            <option>Waste</option>
          </select>
        </div>
        <div className="db-edit-title">{row.meter}</div>
      </div>

      <div className="db-edit-form">
        <div className="form-row">
          <label className="form-label">Previous Reading</label>
          <input className="form-input" type="text" value={prev} readOnly />
        </div>

        <div className="form-row">
          <label className="form-label">Current Reading</label>
          <input className="form-input" type="number" placeholder="Please input in kW-h" value={current} onChange={(e) => setCurrent(e.target.value)} />
        </div>

        <div className="form-row">
          <label className="form-label">Consumption</label>
          <input className="form-input" type="text" value={consumption} readOnly />
        </div>

        <div className="form-row" style={{gridColumn:'1 / -1'}}>
          <label className="form-label">Notes/Comment</label>
          <textarea className="form-textarea" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>

        <div className="form-actions">
          <button className="btn-update" onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  )
}
