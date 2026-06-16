import React from 'react';
import { ChevronRight, CircleDashedIcon, SquareArrowRight } from 'lucide-react';

export default function BulletPoint({ children, icon }) {
  return (
    <div className="bullet-point">
      <span className="bullet-icon">
        {icon ? icon : <SquareArrowRight size={18} />}
      </span>
      <div className="bullet-content">
        {children}
      </div>
    </div>
  );
}
