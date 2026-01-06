import React, { useState } from 'react'
import './Dashboard.css'

export default function Database({ rows = [], loading = false, onEdit, onDelete }) {
  const [approved, setApproved] = useState(() => new Set())
  const [uploading, setUploading] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [message, setMessage] = useState('')
  const fileInputRef = React.createRef()

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
        {loading ? <div style={{padding:20}}>Loading...</div> : (<>
        <div style={{display:'flex', gap:8, alignItems:'center', padding:'12px 0'}}>
          <button className="btn-export" onClick={() => {
            // client-side export
            const headers = ['id','date','category','label','value','source','createdAt']
            const csv = [headers.join(',')]
            for (const r of rows) {
              const row = [r.id, r.date, r.category, r.label, r.value, r.source, r.createdAt]
              csv.push(row.map(v => {
                if (v === null || v === undefined) return ''
                const s = String(v)
                if (s.includes('"')) return `"${s.replace(/"/g,'""')}"`
                if (s.includes(',') || s.includes('\n')) return `"${s}"`
                return s
              }).join(','))
            }
            const blob = new Blob([csv.join('\n')], { type: 'text/csv' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'measurements.csv'
            document.body.appendChild(a)
            a.click()
            a.remove()
            URL.revokeObjectURL(url)
          }}>Export CSV (client)</button>

          <button className="btn-export" onClick={async () => {
            setExporting(true)
            try {
              const res = await fetch('http://localhost:4000/api/measurements/export')
              if (!res.ok) throw new Error('Export failed')
              const blob = await res.blob()
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = 'measurements-server.csv'
              document.body.appendChild(a)
              a.click()
              a.remove()
              URL.revokeObjectURL(url)
            } catch (e) { console.error(e); alert('Server export failed') }
            setExporting(false)
          }}>{exporting ? 'Downloading...' : 'Download CSV (server)'}</button>

          <input ref={fileInputRef} style={{display:'none'}} type="file" accept=".csv,text/csv" onChange={async (ev) => {
            const f = ev.target.files && ev.target.files[0]
            if (!f) return
            setUploading(true)
            setMessage('Uploading...')
            try {
              const text = await f.text()
              const res = await fetch('http://localhost:4000/api/measurements/upload', { method: 'POST', headers: { 'Content-Type': 'text/csv' }, body: text })
              if (!res.ok) throw new Error(await res.text())
              const data = await res.json()
              setMessage(`Imported ${data.inserted} rows`)
              // call parent reload if provided via a custom event
              const event = new CustomEvent('db:imported')
              window.dispatchEvent(event)
            } catch (e) { console.error(e); setMessage('Upload failed') }
            setUploading(false)
            // reset input
            ev.target.value = ''
          }} />

          <button className="btn-import" onClick={() => fileInputRef.current && fileInputRef.current.click()}>{uploading ? 'Uploading...' : 'Import CSV'}</button>

          <button className="btn-export" onClick={async () => {
            setExporting(true)
            try {
              const res = await fetch('http://localhost:4000/api/measurements/export-to-csv', { method: 'POST' })
              if (!res.ok) throw new Error('Server write failed')
              const json = await res.json()
              setMessage(`Wrote to ${json.path}`)
            } catch (e) { console.error(e); setMessage('Write failed') }
            setExporting(false)
          }}>Save CSV to server</button>

          {message && <div style={{marginLeft:12}}><small>{message}</small></div>}
        </div>
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
        </table></>) }
      </div>
    </div>
  )
}
