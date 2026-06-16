import { ArrowRight } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Introduction() {
  const navigate = useNavigate()

  return (
    <div className="main-content">
      <h1>Introduction</h1>
      <p>
        Welcome to the official
        <span style={{
          backgroundColor: '#3f1a1a',
          color: '#ef4444',
          padding: '2px 6px',
          borderRadius: '4px',
          fontWeight: '600',
          marginLeft: '6px',
          border: '1px solid #7f1d1d'
        }}>coDIRECT</span> developer and user documentation.
      </p>

      <p>
        coDIRECT is an advanced timeline automation engine purpose-built for Bitfocus Companion.
        <br />
        It empowers technical directors and broadcast engineers to synchronize, schedule, and orchestrate complex production workflows using precise, time-coded triggers.
      </p>

      <p>Engineered for flexibility, coDIRECT scales seamlessly from small local streams to enterprise broadcast environments.</p>

      <button
        className="btn-primary"
        onClick={() => navigate('/quickstart')}
      >
        Quick Start <ArrowRight size={18} />
      </button>
    </div>
  )
}

export default Introduction