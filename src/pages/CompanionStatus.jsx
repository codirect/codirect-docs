import React from 'react'
import Section from '../components/Section'
import BulletPoint from '../components/BulletPoint'

function CompanionStatus() {
  return (
    <div className='main-content'>
      <h1>Companion Status</h1>
      <p>
        If the connection indicator shows a red status dot, coDIRECT is unable to communicate with Bitfocus Companion.
        <br />
        Follow this troubleshooting guide to diagnose and resolve the issue.
      </p>

      <Section title={'Bad IP Address'}>
        <BulletPoint>Verify that the IP address and port configuration match your active Bitfocus Companion instance.</BulletPoint>
      </Section>

      <Section title={'Bad Config'}>
        <BulletPoint>This indicates that the automated retrieval of your Companion button and page database has failed.</BulletPoint>
        <BulletPoint>
          Switch to manual mode and upload your Companion configuration file in JSON format.
          <br />
          <i>Note: In manual mode, you must re-import the updated JSON file whenever you modify buttons or pages within Companion.</i>
        </BulletPoint>
      </Section>

      <Section title={'Websocket Error'}>
        <BulletPoint>The real-time connection pipeline has encountered an issue.</BulletPoint>
        <BulletPoint>Refresh the interface or retry in a few moments.</BulletPoint>
      </Section>

      <Section title={'Connected'}>
        <BulletPoint>The connection is active and coDIRECT is running normally.</BulletPoint>
      </Section>
    </div>
  )
}

export default CompanionStatus