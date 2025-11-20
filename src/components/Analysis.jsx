import React, { useMemo, useState } from 'react'
import './Dashboard.css'

function LineChart({ data = [2000, 4000, 12000, 8000, 15000, 12000, 16000, 14000, 13000, 15000, 13500, 12000] }) {
  const w = 520
  const h = 160
  const max = Math.max(...data)
  const points = data.map((d, i) => `${(i / (data.length - 1)) * w},${h - (d / max) * h}`).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="160">
      <polyline points={points} fill="none" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BarChart({ filter = '' }) {
  const all = useMemo(() => ({
    items: [5000, 12000, 18000, 8000, 25000],
    labels: ['CICS', 'CET', 'FOC', 'SSC', 'ALBERT EINSTEIN']
  }), [])

  const q = filter.trim().toLowerCase()
  const filtered = useMemo(() => {
    if (!q) return all.labels.map((l, i) => ({ label: l, value: all.items[i] }))
    return all.labels
      .map((l, i) => ({ label: l, value: all.items[i] }))
      .filter(({ label }) => label.toLowerCase().includes(q))
  }, [q, all])

  const max = filtered.length ? Math.max(...filtered.map(f => f.value)) : 1
  return (
    <div>
      {filtered.map((f, i) => (
        <div key={i} style={{display:'flex', alignItems:'center', gap:12, marginBottom:8}}>
          <div style={{width:120,fontSize:13}}>{f.label}</div>
          <div style={{flex:1, height:14, background:'#eee', borderRadius:8, overflow:'hidden'}}>
            <div style={{width:`${(f.value/max)*100}%`, height:'100%', background:'#4b9be6'}}></div>
          </div>
          <div style={{width:64, textAlign:'right'}}>{f.value.toLocaleString()}</div>
        </div>
      ))}
      {filtered.length === 0 && <div style={{color:'#666', fontSize:13}}>No results</div>}
    </div>
  )
}

function DonutChart({ filter = '' }) {
  // simple donut using SVG circles
  const size = 160
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const all = useMemo(() => ({
    slices: [33.3, 20, 13.3, 6.7, 26.7],
    labels: ['CET', 'CICS', 'Albert Einstein', 'SSC', 'FDC'],
    colors: ['#6a00f4', '#2fb1ff', '#ff5c5c', '#ffd455', '#2fb16a']
  }), [])

  const q = filter.trim().toLowerCase()
  const filtered = useMemo(() => {
    return all.labels
      .map((label, i) => ({ label, slice: all.slices[i], color: all.colors[i] }))
      .filter(({ label }) => (q ? label.toLowerCase().includes(q) : true))
  }, [q, all])

  // compute offset proportionally to included slices
  const total = filtered.reduce((s, x) => s + x.slice, 0) || 100
  let offsetPct = 0
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`translate(${size/2},${size/2})`}>
        {filtered.map((f, i) => {
          const dash = (f.slice / total) * circumference
          const strokeDasharray = `${dash} ${circumference - dash}`
          const el = (
            <circle key={i} r={radius} fill="transparent" stroke={f.color} strokeWidth={24}
              strokeDasharray={strokeDasharray} strokeDashoffset={-offsetPct} strokeLinecap="butt" />
          )
          offsetPct += dash
          return el
        })}
      </g>
    </svg>
  )
}

export default function Analysis() {
  const [query, setQuery] = useState('')

  return (
    <div className="analysis-page">
      <div style={{display:'flex', justifyContent:'center', marginBottom:12}}>
        <input className="analysis-filter" placeholder="Filter" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="analysis-grid">
        <div className="panel">
          <h3>Trend Analysis</h3>
          <LineChart />
        </div>

        <div className="panel">
          <h3>Comparative Analysis</h3>
          <BarChart filter={query} />
        </div>

        <div className="panel">
          <h3>Resource Breakdown</h3>
          <div style={{display:'flex', alignItems:'center', gap:16}}>
            <DonutChart filter={query} />
            <div>
              {/* Legend filtered by query */}
              {['CET','CICS','Albert Einstein','SSC','FDC'].filter(l => l.toLowerCase().includes(query.trim().toLowerCase())).map((l, i) => (
                <div key={l} style={{display:'flex', gap:8, alignItems:'center', marginBottom:6}}>
                  <span style={{width:12,height:12,background:['#6a00f4','#2fb1ff','#ff5c5c','#ffd455','#2fb16a'][i],display:'inline-block'}}></span>
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
