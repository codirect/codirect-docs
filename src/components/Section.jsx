import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function Section({ title, defaultOpen = true, children }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="collapsible-section">
      <div 
        className="section-header" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="section-icon">
          {isOpen ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
        </span>
        <h3>{title}</h3>
      </div>
      
      {isOpen && (
        <div className="section-content">
          {children}
        </div>
      )}
    </div>
  );
}
