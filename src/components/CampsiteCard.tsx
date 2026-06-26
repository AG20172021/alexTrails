import { MapPin, Droplets, Flame, Package, CheckCircle, Users, Star } from 'lucide-react';
import { Campsite } from '../types';

interface CampsiteCardProps {
  campsite: Campsite;
}

export default function CampsiteCard({ campsite }: CampsiteCardProps) {
  return (
    <article className="campsite-card">
      <div className="campsite-header">
        <h4>{campsite.name}</h4>
        <div className="campsite-rating">
          <Star size={14} fill="var(--accent)" color="var(--accent)" />
          <span>{campsite.rating}</span>
        </div>
      </div>
      
      <div className="campsite-mile">
        <MapPin size={14} />
        <span>Mile {campsite.mileMarker}</span>
      </div>
      
      <div className="campsite-features">
        <div className={`feature ${campsite.water ? 'available' : 'unavailable'}`}>
          <Droplets size={14} />
          <span>Water</span>
        </div>
        
        <div className={`feature ${campsite.fire ? 'available' : 'unavailable'}`}>
          <Flame size={14} />
          <span>Fire</span>
        </div>
        
        <div className={`feature ${campsite.bearBox ? 'available' : 'unavailable'}`}>
          <Package size={14} />
          <span>Bear box</span>
        </div>
        
        <div className={`feature ${campsite.toilet ? 'available' : 'unavailable'}`}>
          <CheckCircle size={14} />
          <span>Toilet</span>
        </div>
      </div>
      
      <div className="campsite-capacity">
        <Users size={14} />
        <span>Capacity: {campsite.capacity} people</span>
      </div>
    </article>
  );
}
