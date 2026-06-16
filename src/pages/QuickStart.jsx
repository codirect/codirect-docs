import React from 'react';
import Space from '../components/Space';
import BulletPoint from '../components/BulletPoint';
import Section from '../components/Section';
import { useNavigate } from 'react-router-dom';

export default function QuickStart() {
  const navigate = useNavigate();

  return (
    <div className="main-content">
      <h1>Quick Start</h1>
      <p>
        Get your coDIRECT project up and running in just a few simple steps.
      </p>

      <Section title="1. Create a Project">
        <p style={{ marginBottom: '12px' }}>
          Navigate to the Projects Dashboard and click the 
          <span style={{ 
            backgroundColor: '#3f1a1a', 
            color: '#ef4444', 
            padding: '2px 6px', 
            borderRadius: '4px', 
            fontWeight: '600',
            marginLeft: '6px',
            border: '1px solid #7f1d1d'
          }}>
            Create Project
          </span> button.
        </p>

        <p style={{ marginBottom: '8px' }}>Within the project configuration wizard, complete the following:</p>
        <BulletPoint>Assign a name to your project.</BulletPoint>
        <BulletPoint>Retrieve and enter your Companion instance IP address and port from the Bitfocus Companion window.</BulletPoint>

        <img src='./createProject.png' width={800} style={{ marginTop: '16px', borderRadius: '6px' }} />
      </Section>

      <Section title='2. Add Triggers to the Timeline'>
        <p>
          Locate your Companion pages and buttons within the right-hand panel. 
          <br/>
          Simply drag and drop any action button onto your desired timeline track to create a trigger.
        </p>
      </Section>

      <Section title='3. Modify Triggers'>
        <p style={{ marginBottom: '8px' }}>Fine-tune your automation blocks directly on the timeline interface:</p>
        <BulletPoint><b>Resize:</b> Click and drag either edge of a trigger block to adjust its active duration.</BulletPoint>
        <BulletPoint><b>Reposition:</b> Drag and move a trigger block left or right to change its timing, or drop it onto a different track.</BulletPoint>
        <BulletPoint><b>Edit Labels:</b> Double-click any trigger block to update its custom description.</BulletPoint>
      </Section>

      <Section title='4. Run your show'>
        <p>
          Press the play button to start your automated sequence. 
        </p>
      </Section>
    </div>
  );
}