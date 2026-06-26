import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Map, Grid } from 'lucide-react';
import { Trail, FilterState } from '../types';
import TrailCard from './TrailCard';
import FilterPanel from './FilterPanel';

interface DiscoveryProps {
  trails: Trail[];
  onSelectTrail: (trail: Trail) => void;
}

export default function Discovery({ trails, onSelectTrail }: DiscoveryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    duration: [],
    difficulty: [],
    features: [],
    distance: null
  });

  const filteredTrails = useMemo(() => {
    return trails.filter(trail => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          trail.name.toLowerCase().includes(query) ||
          trail.location.toLowerCase().includes(query) ||
          trail.region.toLowerCase().includes(query) ||
          trail.description.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Difficulty filter
      if (filters.difficulty.length > 0 && !filters.difficulty.includes(trail.difficulty)) {
        return false;
      }

      // Duration filter
      if (filters.duration.length > 0) {
        const matchesDuration = filters.duration.some(d => {
          if (d === '1-2 days') return trail.duration.includes('1') || trail.duration.includes('2');
          if (d === '2-3 days') return trail.duration.includes('2') || trail.duration.includes('3');
          if (d === '3-4 days') return trail.duration.includes('3') || trail.duration.includes('4');
          if (d === '4+ days') return trail.duration.includes('4') || parseInt(trail.duration) >= 4;
          return false;
        });
        if (!matchesDuration) return false;
      }

      // Distance filter
      if (filters.distance) {
        if (filters.distance === 'Under 15 miles' && trail.distance >= 15) return false;
        if (filters.distance === '15-25 miles' && (trail.distance < 15 || trail.distance > 25)) return false;
        if (filters.distance === 'Over 25 miles' && trail.distance <= 25) return false;
      }

      // Features filter
      if (filters.features.length > 0) {
        if (filters.features.includes('Permit required') && !trail.permitRequired) return false;
        if (filters.features.includes('Water sources') && trail.waterSources === 0) return false;
        if (filters.features.includes('Established campsites') && trail.campsites === 0) return false;
      }

      return true;
    });
  }, [trails, searchQuery, filters]);

  const hasActiveFilters = filters.difficulty.length > 0 || 
                           filters.duration.length > 0 || 
                           filters.distance !== null ||
                           filters.features.length > 0;

  return (
    <div className="discovery">
      {/* Hero Section */}
      <div className="discovery-hero">
        <div className="discovery-hero-content">
          <h1>Find your next adventure</h1>
          <p>Discover amazing backpacking trails across the country</p>
          
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search trails, locations, or regions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              className={`filter-toggle ${isFilterOpen ? 'active' : ''}`}
              onClick={() => setIsFilterOpen(true)}
            >
              <SlidersHorizontal size={20} />
              {hasActiveFilters && <span className="filter-dot" />}
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="discovery-results">
        <div className="results-header">
          <div className="results-count">
            <span className="count">{filteredTrails.length}</span>
            <span>trail{filteredTrails.length !== 1 ? 's' : ''} found</span>
          </div>
          
          <div className="view-toggle">
            <button 
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={18} />
            </button>
            <button 
              className={viewMode === 'list' ? 'active' : ''}
              onClick={() => setViewMode('list')}
            >
              <Map size={18} />
            </button>
          </div>
        </div>

        {filteredTrails.length > 0 ? (
          <div className={`trails-grid ${viewMode}`}>
            {filteredTrails.map(trail => (
              <TrailCard 
                key={trail.id} 
                trail={trail} 
                onClick={() => onSelectTrail(trail)}
              />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🏔️</div>
            <h3>No trails found</h3>
            <p>Try adjusting your filters or search query</p>
            <button 
              className="clear-filters-btn"
              onClick={() => {
                setSearchQuery('');
                setFilters({
                  duration: [],
                  difficulty: [],
                  features: [],
                  distance: null
                });
              }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <FilterPanel
        filters={filters}
        onFilterChange={setFilters}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
}
