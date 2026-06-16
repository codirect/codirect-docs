import React from 'react';
import Section from '../components/Section';
import BulletPoint from '../components/BulletPoint';

export default function Sequences() {
  return (
    <div className="main-content">
      <h1>Sequences</h1>
      <p>A sequence acts as an independent timeline container, housing a specific arrangement of tracks and automated triggers.</p>

      <img src='/sequence.png' style={{ borderRadius: '6px', marginBottom: '24px' }} />

      <Section title="Create a Sequence">
        <p>
          To initialize a new sequence, click the <strong>+</strong> (plus) button in the Sequence Selector UI and enter a descriptive name.
        </p>
      </Section>

      <Section title="Manage and Edit Sequences">
        <p style={{ marginBottom: '16px' }}>
          Click the center of the sequence selector to launch the <strong>Sequence Manager</strong> overlay.
        </p>

        <img src='/sequenceManager.png' width={450} style={{ borderRadius: '6px', marginBottom: '16px' }} />

        <BulletPoint><b>Reorder:</b> Drag the handle up or down to rearrange the execution order.</BulletPoint>
        <BulletPoint><b>Rename:</b> Click the pencil icon to modify the selected sequence name.</BulletPoint>
        <BulletPoint><b>Delete:</b> Click the trash icon to permanently remove the sequence and its associated timeline content.</BulletPoint>
      </Section>
    </div>
  );
}