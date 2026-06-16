import React from 'react'
import Space from '../components/Space'
import BulletPoint from '../components/BulletPoint'

function SystemRequirements() {
  return (
    <div className='main-content'>
      <h1>System Requirements</h1>
      <p>For an optimal experience, make sure your environment meets the following baseline requirements.</p>

      <Space direction='vertical' amount='1rem'/>

      <BulletPoint>Intel i5 11Gen | AMD Ryzen 5 5600 | Apple M1</BulletPoint>
      <BulletPoint>Chromium based browser (Helium, Google Chrome, Edge)</BulletPoint>
      <BulletPoint>Internet Connection</BulletPoint>
    </div>
  )
}

export default SystemRequirements