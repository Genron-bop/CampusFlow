import React, { useEffect, useMemo, useState } from 'react'
import './Dashboard.css'

// Simple month calendar grid with add/edit modal. Events persisted to localStorage under 'cf_schedule'.

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}
function daysInMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}
function pad(n){return n<10?`0${n}`:String(n)}

function formatDateYMD(d){
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`
}

export default function Schedule(){
  const [current, setCurrent] = useState(() => new Date())
  const [events, setEvents] = useState(() => {
    try{ return JSON.parse(localStorage.getItem('cf_schedule')||'[]') }catch(e){return []}
  })
  const [modal, setModal] = useState({open:false, date:null, evt:null})
  const [filterQuery, setFilterQuery] = useState('')

  useEffect(()=>{ localStorage.setItem('cf_schedule', JSON.stringify(events)) }, [events])

  const monthInfo = useMemo(()=>{
    const first = startOfMonth(current)
    const days = daysInMonth(current)
    const startWeekDay = first.getDay() // 0 Sun
    return { first, days, startWeekDay }
  }, [current])

  function openAdd(dateStr){ setModal({open:true, date:dateStr, evt:null}) }
  function openEdit(evt){ setModal({open:true, date:evt.date, evt}) }
  function closeModal(){ setModal({open:false, date:null, evt:null}) }

  function saveEvent(payload){
    if(modal.evt){
      setEvents(prev => prev.map(e => e.id===modal.evt.id?{...e,...payload}:e))
    }else{
      const id = Date.now()
      setEvents(prev => [...prev, { id, ...payload}])
    }
    closeModal()
  }

  function deleteEvent(id){
    if(!confirm('Delete this event?')) return
    setEvents(prev => prev.filter(e => e.id!==id))
    closeModal()
  }

  // days array to render 6x7 grid
  const cells = []
  for(let i=0;i<42;i++){
    const dayIndex = i - monthInfo.startWeekDay + 1
    if(dayIndex<1 || dayIndex>monthInfo.days) cells.push(null)
    else cells.push(new Date(current.getFullYear(), current.getMonth(), dayIndex))
  }

  const filtered = events.filter(e => !filterQuery || e.title.toLowerCase().includes(filterQuery.toLowerCase()) || (e.location||'').toLowerCase().includes(filterQuery.toLowerCase()))

  return (
    <div className="schedule">
      <div className="schedule-controls">
        <div>
          <button className="cf-btn" onClick={()=>setCurrent(d=>new Date(d.getFullYear(), d.getMonth()-1, 1))}>◀</button>
          <button className="cf-btn" onClick={()=>setCurrent(d=>new Date(d.getFullYear(), d.getMonth()+1, 1))}>▶</button>
          <strong style={{marginLeft:12}}>{current.toLocaleString('default',{month:'long', year:'numeric'})}</strong>
        </div>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <input placeholder="Search events or location" value={filterQuery} onChange={e=>setFilterQuery(e.target.value)} />
          <button className="cf-btn" onClick={()=>openAdd(formatDateYMD(new Date()))}>Add Event</button>
        </div>
      </div>

      <div className="calendar-grid">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=> <div key={d} className="calendar-head">{d}</div>)}
        {cells.map((dt, idx)=>{
          const dateStr = dt ? formatDateYMD(dt) : null
          const dayEvents = dt ? filtered.filter(ev => ev.date === dateStr) : []
          return (
            <div key={idx} className={`day ${dt? '' : 'empty'}`} onDoubleClick={()=>dt && openAdd(dateStr)}>
              {dt && <div className="day-num">{dt.getDate()}</div>}
              <div className="day-events">
                {dayEvents.map(ev=> (
                  <div key={ev.id} className="event-badge" onClick={()=>openEdit(ev)} title={`${ev.title} — ${ev.start} to ${ev.end}`}>
                    <div className="ev-time">{ev.start}</div>
                    <div className="ev-title">{ev.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {modal.open && (
        <EventModal date={modal.date} evt={modal.evt} onClose={closeModal} onSave={saveEvent} onDelete={deleteEvent} />
      )}
    </div>
  )
}

function EventModal({date, evt, onClose, onSave, onDelete}){
  const [title, setTitle] = useState(evt?.title||'')
  const [location, setLocation] = useState(evt?.location||'')
  const [start, setStart] = useState(evt?.start||'09:00')
  const [end, setEnd] = useState(evt?.end||'10:00')
  const [notes, setNotes] = useState(evt?.notes||'')

  useEffect(()=>{
    setTitle(evt?.title||'')
    setLocation(evt?.location||'')
    setStart(evt?.start||'09:00')
    setEnd(evt?.end||'10:00')
    setNotes(evt?.notes||'')
  },[evt])

  function submit(e){
    e.preventDefault()
    if(!title.trim()) return alert('Title required')
    onSave({ title: title.trim(), location: location.trim(), date, start, end, notes })
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{evt? 'Edit Event' : 'Add Event'} — {date}</h3>
        <form onSubmit={submit} className="event-form">
          <label>Title<input value={title} onChange={e=>setTitle(e.target.value)} /></label>
          <label>Location<input value={location} onChange={e=>setLocation(e.target.value)} /></label>
          <div style={{display:'flex', gap:8}}>
            <label>Start<input type="time" value={start} onChange={e=>setStart(e.target.value)} /></label>
            <label>End<input type="time" value={end} onChange={e=>setEnd(e.target.value)} /></label>
          </div>
          <label>Notes<textarea value={notes} onChange={e=>setNotes(e.target.value)} /></label>

          <div style={{display:'flex', gap:8, justifyContent:'flex-end', marginTop:8}}>
            {evt && <button type="button" className="cf-btn danger" onClick={()=>onDelete(evt.id)}>Delete</button>}
            <button type="button" className="cf-btn" onClick={onClose}>Cancel</button>
            <button className="cf-btn primary" type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
