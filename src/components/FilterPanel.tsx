import { X, Clock, Mountain, MapPin, Footprints } from 'lucide-react';
import { FilterState, Difficulty } from '../types';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
}

const difficultyColors: Record<Difficulty, string> = {
  Easy: 'var(--easy)',
  Moderate: 'var(--moderate)',
  Hard: 'var(--hard)',
  Expert: 'var(--expert)'
};

export default function FilterPanel({ filters, onFilterChange, isOpen, onClose }: FilterPanelProps) {
  const toggleDifficulty = (diff: Difficulty) => {
    const newDifficulties = filters.difficulty.includes(diff)
      ? filters.difficulty.filter(d => d !== diff)
      : [...filters.difficulty, diff];
    onFilterChange({ ...filters, difficulty: newDifficulties });
  };

  const toggleDuration = (duration: string) => {
    const newDurations = filters.duration.includes(duration)
      ? filters.duration.filter(d => d !== duration)
      : [...filters.duration, duration];
    onFilterChange({ ...filters, duration: newDurations });
  };

  const setDistance = (distance: string | null) => {
    onFilterChange({ ...filters, distance: filters.distance === distance ? null : distance });
  };

  const clearFilters = () => {
    onFilterChange({
      duration: [],
      difficulty: [],
      features: [],
      distance: null
    });
  };

  const hasActiveFilters = filters.difficulty.length > 0 || 
                           filters.duration.length > 0 || 
                           filters.distance !== null;

  return (
    <>
      {isOpen && <div className="filter-overlay" onClick={onClose} />}
      
      <aside className={`filter-panel ${isOpen ? 'open' : ''}`}>
        <div className="filter-header">
          <h2>
            <Mountain size={20} />
            Filters
          </h2>
          <button className="filter-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="filter-content">
          {hasActiveFilters && (
            <div className="filter-section">
              <button className="clear-filters" onClick={clearFilters}>
                Clear all filters
              </button>
            </div>
          )}

          <div className="filter-section">
            <h3>
              <Clock size={16} />
              Duration
            </h3>
            <div className="filter-options">
              {['1-2 days', '2-3 days', '3-4 days', '4+ days'].map(duration => (
                <button
                  key={duration}
                  className={`filter-chip ${filters.duration.includes(duration) ? 'active' : ''}`}
                  onClick={() => toggleDuration(duration)}
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>
              <Mountain size={16} />
              Difficulty
            </h3>
            <div className="filter-options">
              {(['Easy', 'Moderate', 'Hard', 'Expert'] as Difficulty[]).map(diff => (
                <button
                  key={diff}
                  className={`filter-chip difficulty ${filters.difficulty.includes(diff) ? 'active' : ''}`}
                  onClick={() => toggleDifficulty(diff)}
                  style={{ 
                    '--diff-color': difficultyColors[diff] } as React.CSSProperties
                  }
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>
              <MapPin size={16} />
              Distance
            </h3>
            <div className="filter-options">
              {['Under 15 miles', '15-25 miles', 'Over 25 miles'].map(dist => (
                <button
                  key={dist}
                  className={`filter-chip ${filters.distance === dist ? 'active' : ''}`}
                  onClick={() => setDistance(dist)}
                >
                  {dist}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>
              <Footprints size={16} />
              Features
            </h3>
            <div className="filter-options">
              {['Permit required', 'Water sources', 'Established campsites', 'Views'].map(feature => (
                <label key={feature} className="filter-checkbox">
                  <input 
                    type="checkbox"
                    checked={filters.features.includes(feature)}
                    onChange={() => {
                      const newFeatures = filters.features.includes(feature)
                        ? filters.features.filter(f => f !== feature)
                        : [...filters.features, feature];
                      onFilterChange({ ...filters, features: newFeatures });
                    }}
                  />
                  <span>{feature}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
