import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-group">
        <h3>Getting Started</h3>
        <nav>
          <NavLink to="/" end>Introduction</NavLink>
          <NavLink to="/quickstart">Quick Start</NavLink>
        </nav>
      </div>
      <div className="sidebar-group">
        <h3>Core Concepts</h3>
        <nav>
          <NavLink to="/sequences">Sequences</NavLink>
          <NavLink to="/playbackcontrols">Playback Controls</NavLink>
          <NavLink to="/audioreference">Audio Reference</NavLink>
          <NavLink to="/controlviacompanion">Control via Companion</NavLink>
        </nav>
      </div>

      <div className="sidebar-group">
        <h3>Troubleshooting</h3>
        <nav>
          <NavLink to="/companionstatus">Companion Status</NavLink>
          <NavLink to="/reportabug">Report a bug</NavLink>
        </nav>
      </div>

      <div className="sidebar-group">
        <h3>Performance</h3>
        <nav>
          <NavLink to="/systemrequirements">System Requirements</NavLink>
        </nav>
      </div>
    </aside>
  )
}
