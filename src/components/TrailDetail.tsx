import { 
  ArrowLeft, MapPin, Star, Clock, TrendingUp, 
  Droplets, Mountain, AlertCircle, CheckCircle2,
  Tent, Shield, Flame, ChevronRight
} from 'lucide-react';
import { Trail, Campsite, Review } from '../types';
import ReviewCard from './ReviewCard';
import CampsiteCard from './CampsiteCard';

interface TrailDetailProps {
  trail: Trail;
  campsites: Campsite[];
  reviews: Review[];
  onBack: () => void;
  onPlanTrip: () => void;
}

const difficultyColors: Record<string, string> = {
  Easy: 'var(--easy)',
  Moderate: 'var(--moderate)',
  Hard: 'var(--hard)',
  Expert: 'var(--expert)'
};

export default function TrailDetail({ 
  trail, 
  campsites, 
  reviews, 
  onBack, 
  onPlanTrip 
}: TrailDetailProps) {
  return (
    <div className="trail-detail">
      {/* Hero Section */}
      <div className="trail-detail-hero">
        <div className="trail-detail-hero-image">
          <img 
            src={trail.heroImage} 
            alt={trail.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200';
            }}
          />
          <div className="trail-detail-hero-overlay">
            <button className="back-button" onClick={onBack}>
              <ArrowLeft size={20} />
              Back to trails
            </button>
            
            <div className="trail-detail-hero-content">
              <span 
                className="difficulty-badge large"
                style={{ backgroundColor: difficultyColors[trail.difficulty] }}
              >
                {trail.difficulty}
              </span>
              <h1>{trail.name}</h1>
              <div className="trail-detail-location">
                <MapPin size={20} />
                <span>{trail.location} • {trail.region}</span>
              </div>
              
              <div className="trail-detail-rating">
                <Star size={20} fill="var(--accent)" color="var(--accent)" />
                <span className="rating-value">{trail.rating}</span>
                <span className="rating-count">{trail.reviewCount} reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="trail-detail-content">
        {/* Quick Stats */}
        <div className="detail-stats-grid">
          <div className="detail-stat">
            <TrendingUp size={24} />
            <span className="stat-label">Distance</span>
            <span className="stat-value">{trail.distance} miles</span>
          </div>
          
          <div className="detail-stat">
            <Mountain size={24} />
            <span className="stat-label">Elevation</span>
            <span className="stat-value">+{trail.elevationGain.toLocaleString()} ft</span>
          </div>
          
          <div className="detail-stat">
            <Clock size={24} />
            <span className="stat-label">Duration</span>
            <span className="stat-value">{trail.duration}</span>
          </div>
          
          <div className="detail-stat">
            <Droplets size={24} />
            <span className="stat-label">Water Sources</span>
            <span className="stat-value">{trail.waterSources}</span>
          </div>
          
          <div className="detail-stat">
            <Tent size={24} />
            <span className="stat-label">Campsites</span>
            <span className="stat-value">{trail.campsites}</span>
          </div>
          
          <div className="detail-stat">
            <Shield size={24} />
            <span className="stat-label">Permit</span>
            <span className="stat-value">{trail.permitRequired ? 'Required' : 'Not required'}</span>
          </div>
        </div>

        <div className="detail-main">
          <div className="detail-left">
            {/* Description */}
            <section className="detail-section">
              <h2>About this trail</h2>
              <p>{trail.description}</p>
              
              {trail.permitRequired && (
                <div className="warning-box">
                  <AlertCircle size={20} />
                  <div>
                    <strong>Permit Required</strong>
                    <p>This trail requires a backcountry permit. Make sure to obtain one before your trip.</p>
                  </div>
                </div>
              )}
            </section>

            {/* Campsites */}
            <section className="detail-section">
              <div className="section-header">
                <h2>Campsites</h2>
                <span className="section-count">{campsites.length} available</span>
              </div>
              
              <div className="campsites-grid">
                {campsites.map(campsite => (
                  <CampsiteCard key={campsite.id} campsite={campsite} />
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="detail-section">
              <div className="section-header">
                <h2>Reviews</h2>
                <span className="section-count">{reviews.length} reviews</span>
              </div>
              
              <div className="reviews-list">
                {reviews.map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </section>
          </div>

          <div className="detail-sidebar">
            <div className="sidebar-card sticky">
              <h3>Ready to plan your trip?</h3>
              <p>Create a detailed itinerary for {trail.name} with day-by-day planning.</p>
              
              <button className="plan-trip-button" onClick={onPlanTrip}>
                <Flame size={20} />
                Plan this trip
                <ChevronRight size={16} />
              </button>
              
              <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '1px solid var(--border)' }} />
              
              <div className="quick-info">
                <div className="quick-info-item">
                  <CheckCircle2 size={16} className="icon-green" />
                  <span>Well-marked trail</span>
                </div>
                <div className="quick-info-item">
                  <CheckCircle2 size={16} className="icon-green" />
                  <span>{trail.campsites} established campsites</span>
                </div>
                <div className="quick-info-item">
                  <Droplets size={16} className="icon-blue" />
                  <span>{trail.waterSources} water sources</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
