import React from 'react'

export default function BuildingOverview({ items }) {
  return (
    <div className="building-overview">
      <h3>Building Resource Overview</h3>
      <table>
        <thead>
          <tr>
            <th>Building Name</th>
            <th>Electricity</th>
            <th>Water</th>
            <th>Last Update</th>
          </tr>
        </thead>
        <tbody>
          {items.map((b) => (
            <tr key={b.name}>
              <td>{b.name}</td>
              <td>{b.electricity}</td>
              <td>{b.water}</td>
              <td>{b.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
