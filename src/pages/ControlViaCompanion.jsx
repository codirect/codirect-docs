import React from 'react'
import BulletPoint from '../components/BulletPoint'
import Section from '../components/Section'

function ControlViaCompanion() {
  return (
    <div className='main-content'>
      <h1>Controlling via Companion</h1>
      <p>
        You can remotely orchestrate and control coDIRECT directly from within the Bitfocus Companion ecosystem.
      </p>

      <p>
        Since Bitfocus has still to approve the module, you can manually <a 
          className='link'
          href='/downloads/companion-module-codirect-0.1.0.tgz'
          download='companion-module-codirect-0.1.0.tgz'
        > download it </a>
      </p>

      <Section title='Configuration'>
        <BulletPoint>Install the official coDIRECT module within your Bitfocus Companion instance.</BulletPoint>
        <BulletPoint>Locate your unique coDIRECT Connection ID in the Companion panel under WebSockets, then paste it into the Connection ID field within the Companion module settings.</BulletPoint>
        <BulletPoint>Use the provided button templates or map your own custom actions to match your workflow.</BulletPoint>
      </Section>

      <Section title='Available Commands'>
        <BulletPoint>Toggle playback state (Play / Pause) on the active sequence.</BulletPoint>
        <BulletPoint>Reset the current timeline playhead back to the beginning.</BulletPoint>
        <BulletPoint>Toggle the Trigger Hold state to block or allow automated actions.</BulletPoint>
        <BulletPoint>Navigate between timelines by switching to the previous, next, or a specific sequence index.</BulletPoint>
      </Section>
    </div>
  )
}

export default ControlViaCompanion