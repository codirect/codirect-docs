import React from 'react'

function Space({ amount = '5rem', direction = 'horizontal' }) {
  const size = typeof amount === 'number' ? `${amount}px` : amount;

  const style = {
    display: direction === 'horizontal' ? 'inline-block' : 'block',
    margin: direction === 'horizontal' ? `0 ${size}` : `${size} 0`
  };

  return <div style={style} aria-hidden="true" />
}

export default Space