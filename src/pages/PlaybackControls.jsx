import React from 'react'
import BulletPoint from '../components/BulletPoint'
import Section from '../components/Section'
import Kbd from '../components/Kbd'

function PlaybackControls() {
  return (
    <div className='main-content'>
      <h1>Playback Controls</h1>
      <p>
        Quickly manage your session timeline and trigger behaviors using standard playback commands.
      </p>

      <Section title="Play / Pause">
        <BulletPoint> Toggle between playing and pausing active playback.</BulletPoint>
        <BulletPoint><Kbd>SPACE</Kbd></BulletPoint>
      </Section>

      <Section title="Reset">
        <BulletPoint> Stop playback instantly and return the playhead to the beginning of the timeline.</BulletPoint>
        <BulletPoint><Kbd>R</Kbd></BulletPoint>
      </Section>

      <Section title="Hold Triggers">
        <BulletPoint> Keep the timeline running normally while temporarily blocking all triggers from firing.</BulletPoint>
        <BulletPoint><Kbd>H</Kbd></BulletPoint>
      </Section>
    </div>
  )
}

export default PlaybackControls