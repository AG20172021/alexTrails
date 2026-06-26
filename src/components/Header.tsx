import { Map, Compass, Calendar } from 'lucide-react';
import { PageView } from '../types';

interface HeaderProps {
  currentView: PageView;
  onNavigate: (view: PageView) => void;
  tripCount: number;
}

export default function Header({ currentView, onNavigate, tripCount }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <div 
          className="logo" 
          onClick={() => onNavigate('discovery')}
          style={{ cursor: 'pointer' }}
        >
          <Compass size={32} />
          <span>TrailStack</span>
        </div>
        
        <nav className="nav">
          <button 
            className={`nav-link ${currentView === 'discovery' ? 'active' : ''}`}
            onClick={() => onNavigate('discovery')}
          >
            <Map size={18} />
            <span>Discover</span>
          </button>
          
          <button 
            className={`nav-link ${currentView === 'planner' ? 'active' : ''}`}
            onClick={() => onNavigate('planner')}
          >
            <Calendar size={18} />
            <span>My Trips</span>
            {tripCount > 0 && <span className="trip-badge">{tripCount}</span>}
          </button>
        </nav>
      </div>
    </header>
  );
}
