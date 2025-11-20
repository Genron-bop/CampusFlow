import React from 'react'
import './Dashboard.css'

const sample = [
  { id: 1, title: 'System Notification', body: '"The Threshold on recyclable materials have been hit. Recommended to conduct a survey..."', time: '2:50 pm' },
  { id: 2, title: 'System Notification', body: '"The Readings for today have been updated."', time: '8:43 am' },
  { id: 3, title: 'System Notification', body: '"Jose Rizal left a remarks for Deep Well 1. View the report to read it."', time: 'Yesterday' },
  { id: 4, title: 'System Notification', body: '"EMU Admin updated previously submitted data for ACES Department– Electric..."', time: 'Yesterday' },
  { id: 5, title: 'System Notification', body: '"Monthly report for June 2025 is ready for download."', time: 'Saturday' },
  { id: 6, title: 'System Notification', body: '"July\'s Waste is 50% higher than the previous record. There are many event conducted i.."', time: 'June 04, 2025' },
]

export default function Notification() {
  return (
    <div className="notification-page">
      <div className="notification-list">
        {sample.map((n) => (
          <div key={n.id} className="notification-item">
            <div className="notification-avatar">👤</div>
            <div className="notification-body">
              <div className="notification-title">{n.title}</div>
              <div className="notification-text">{n.body}</div>
            </div>
            <div className="notification-time">{n.time}</div>
          </div>
        ))}
      </div>

      <div style={{textAlign:'center', marginTop:18}}>
        <button className="btn-loadmore">Load more</button>
      </div>
    </div>
  )
}
