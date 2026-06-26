import { MapPin, Star, Clock, TrendingUp, Users } from 'lucide-react';
import { Trail } from '../types';

interface TrailCardProps {
  trail: Trail;
  onClick: () => void;
}

const difficultyColors: Record<string, string> = {
  Easy: 'var(--easy)',
  Moderate: 'var(--moderate)',
  Hard: 'var(--hard)',
  Expert: 'var(--expert)'
};

export default function TrailCard({ trail, onClick }: TrailCardProps) {
  return (
    <article className="trail-card" onClick={onClick}>
      <div className="trail-card-image">
        <img 
          src={trail.heroImage} 
          alt={trail.name}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=600';
          }}
        />
        <span 
          className="trail-card-difficulty"
          style={{ backgroundColor: difficultyColors[trail.difficulty] }}
        >
          {trail.difficulty}
        </span>
        
        {trail.permitRequired && (
          <span className="trail-card-badge">
            Permit Required
          </span>
        )}
      </div>
      
      <div className="trail-card-content">
        <div className="trail-card-header">
          <h3>{trail.name}</h3>
          <div className="trail-card-rating">
            <Star size={16} fill="var(--accent)" color="var(--accent)" />
            <span>{trail.rating}</span>
            <small>({trail.reviewCount})</small>
          </div>
        </div>
        
        <div className="trail-card-location">
          <MapPin size={14} />
          <span>{trail.location}</span>
        </div>
        
        <p className="trail-card-description">{trail.description}</p>
        
        <div className="trail-card-stats">
          <div className="stat">
            <TrendingUp size={16} />
            <span>{trail.distance} mi</span>
          </div>
          <div className="stat">
            <Clock size={16} />
            <span>{trail.duration}</span>
          </div>
          <div className="stat">
            <Users size={16} />
            <span>{trail.campsites} campsites</span>
          </div>
        </div>
      </div>
    </article>
  );
}
