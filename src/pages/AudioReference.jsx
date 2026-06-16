import React from 'react';
import Section from '../components/Section';
import BulletPoint from '../components/BulletPoint';
import { UploadIcon } from 'lucide-react';
import Space from '../components/Space';

export default function AudioReference() {
  return (
    <div className="main-content">
      <h1>Audio Reference</h1>
      <p> Import an audio reference track to visually align and synchronize your timeline triggers with precision cues.</p>

      <Section title="Configure Audio Reference">
        <BulletPoint>
          <b>Import Track:</b> Click the <UploadIcon size={14} style={{ display: 'inline', verticalAlign: 'middle', margin: '0 2px' }} /> icon on the bottom track header to upload your audio file.
        </BulletPoint>
        <BulletPoint>
          <b>Volume Control:</b> Fine-tune audio playback levels using the inline volume slider.
        </BulletPoint>
        <BulletPoint>
          <b>Waveform Visualization:</b> Utilize the generated timeline waveform overlay to identify precise transient spikes and beat drops.
        </BulletPoint>
        <BulletPoint>
          <b>Clear Reference:</b> Click the trash bin icon to permanently remove the reference track from your current timeline view.
        </BulletPoint>
      </Section>

      <Space direction='vertical' amount='2rem'/>

      <img src='/audioRef.png' style={{borderRadius: '8px'}}/>
    </div>
  );
}