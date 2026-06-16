import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Introduction from './pages/Introduction'
import Sequences from './pages/Sequences'
import AudioReference from './pages/AudioReference'
import QuickStart from './pages/QuickStart'
import PlaybackControls from './pages/PlaybackControls'
import SystemRequirements from './pages/SystemRequirements'
import CompanionStatus from './pages/CompanionStatus'
import ControlViaCompanion from './pages/ControlViaCompanion'
import AssistantOverlay from './components/AssistantOverlay/AssistantOverlay'

function App() {
  const [showAiOverlay, setShowAiOverlay] = useState(false);

  return (
    <Router>
      <div className='app'>
        <Navbar onOpenAiOverlay={() => setShowAiOverlay(true)}/>
        <div className='app-body'>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Introduction />} />
            <Route path="/quickstart" element={<QuickStart />} />
            <Route path="/sequences" element={<Sequences />} />
            <Route path="/audioreference" element={<AudioReference />} />
            <Route path="/playbackcontrols" element={<PlaybackControls />} />
            <Route path="/controlviacompanion" element={<ControlViaCompanion />} />
            <Route path="/companionstatus" element={<CompanionStatus />} />
            <Route path="/systemrequirements" element={<SystemRequirements />} />
            <Route path="*" element={<div className="main-content"><h1>Not Found</h1></div>} />
          </Routes>
        </div>

        {showAiOverlay && (
          <AssistantOverlay onClose={() => setShowAiOverlay(false)}/>
        )}
      </div>
    </Router>
  )
}

export default App