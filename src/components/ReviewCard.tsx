import { Star, ThumbsUp, Calendar } from 'lucide-react';
import { Review } from '../types';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="review-card">
      <div className="review-header">
        <div className="reviewer-info">
          <div className="reviewer-avatar">
            {review.avatar}
          </div>
          <div className="reviewer-details">
            <span className="reviewer-name">{review.user}</span>
            <div className="review-meta">
              <Calendar size={12} />
              <span>{review.tripDates}</span>
            </div>
          </div>
        </div>
        
        <div className="review-rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              fill={i < Math.floor(review.rating) ? 'var(--accent)' : 'transparent'}
              color={i < Math.floor(review.rating) ? 'var(--accent)' : 'var(--border)'}
            />
          ))}
        </div>
      </div>
      
      <p className="review-text">{review.text}</p>
      
      <div className="review-tags">
        {review.tags.map(tag => (
          <span key={tag} className="review-tag">{tag}</span>
        ))}
      </div>
      
      <div className="review-footer">
        <button className="helpful-button">
          <ThumbsUp size={14} />
          <span>Helpful ({review.helpful})</span>
        </button>
        <span className="review-date">{review.date}</span>
      </div>
    </article>
  );
}
