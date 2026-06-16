import React from 'react'

function Kbd({ children }) {
  return (
    <kbd style={{
      backgroundColor: '#2d2d30',
      border: '1px solid #454545',
      borderRadius: '4px',
      boxShadow: 'none',
      color: '#9ca3af',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: '0.75em',
      fontWeight: '500',
      padding: '2px 6px',
      marginLeft: '8px',
      textShadow: 'none',
      verticalAlign: 'middle'
    }}>
      {children}
    </kbd>
  )
}

export default Kbd