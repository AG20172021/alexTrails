import { useState, useEffect, useCallback } from 'react';
import { Trail, Trip, PageView } from './types';
import { sampleTrails, sampleCampsites, sampleReviews } from './data/sampleData';
import Header from './components/Header';
import Discovery from './components/Discovery';
import TrailDetail from './components/TrailDetail';
import TripPlanner from './components/TripPlanner';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState<PageView>('discovery');
  const [selectedTrail, setSelectedTrail] = useState<Trail | null>(null);
  const [savedTrips, setSavedTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved trips from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('trailstack_trips');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSavedTrips(parsed);
      } catch (e) {
        console.error('Failed to parse saved trips:', e);
      }
    }
    setIsLoading(false);
  }, []);

  // Save trips to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('trailstack_trips', JSON.stringify(savedTrips));
    }
  }, [savedTrips, isLoading]);

  const handleSelectTrail = useCallback((trail: Trail) => {
    setSelectedTrail(trail);
    setCurrentView('detail');
  }, []);

  const handleBackToDiscovery = useCallback(() => {
    setSelectedTrail(null);
    setCurrentView('discovery');
  }, []);

  const handleNavigate = useCallback((view: PageView) => {
    setCurrentView(view);
    if (view === 'discovery') {
      setSelectedTrail(null);
    }
  }, []);

  const handleSaveTrip = useCallback((trip: Trip) => {
    setSavedTrips(prev => {
      const exists = prev.find(t => t.id === trip.id);
      if (exists) {
        return prev.map(t => t.id === trip.id ? trip : t);
      }
      return [...prev, trip];
    });
  }, []);

  const handleDeleteTrip = useCallback((tripId: string) => {
    setSavedTrips(prev => prev.filter(t => t.id !== tripId));
  }, []);

  const handlePlanTrip = useCallback(() => {
    setCurrentView('planner');
  }, []);

  const handleCreateNewTrip = useCallback(() => {
    setSelectedTrail(null);
    setCurrentView('discovery');
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading TrailStack...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Header 
        currentView={currentView}
        onNavigate={handleNavigate}
        tripCount={savedTrips.length}
      />
      
      <main className="main-content">
        {currentView === 'discovery' && (
          <Discovery 
            trails={sampleTrails}
            onSelectTrail={handleSelectTrail}
          />
        )}
        
        {currentView === 'detail' && selectedTrail && (
          <TrailDetail
            trail={selectedTrail}
            campsites={sampleCampsites[selectedTrail.id] || []}
            reviews={sampleReviews[selectedTrail.id] || []}
            onBack={handleBackToDiscovery}
            onPlanTrip={handlePlanTrip}
          />
        )}
        
        {currentView === 'planner' && (
          <TripPlanner
            trail={selectedTrail}
            campsites={selectedTrail ? (sampleCampsites[selectedTrail.id] || []) : []}
            savedTrips={savedTrips}
            onSaveTrip={handleSaveTrip}
            onDeleteTrip={handleDeleteTrip}
            onBack={handleBackToDiscovery}
            onSelectTrail={handleCreateNewTrip}
          />
        )}
      </main>
    </div>
  );
}

export default App;
