import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Calendar, Users, MapPin, Clock, Plus, 
  Trash2, Edit3, ChevronRight, Mountain, TrendingUp,
  Download, X
} from 'lucide-react';
import { Trail, Trip, TripDay, Campsite } from '../types';

interface TripPlannerProps {
  trail: Trail | null;
  campsites: Campsite[];
  savedTrips: Trip[];
  onSaveTrip: (trip: Trip) => void;
  onDeleteTrip: (tripId: string) => void;
  onBack: () => void;
  onSelectTrail: () => void;
}

export default function TripPlanner({ 
  trail, 
  campsites,
  savedTrips,
  onSaveTrip, 
  onDeleteTrip,
  onBack,
  onSelectTrail
}: TripPlannerProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [showTripDetail, setShowTripDetail] = useState<Trip | null>(null);

  // Form state
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [groupSize, setGroupSize] = useState(2);
  const [tripDays, setTripDays] = useState<TripDay[]>([]);

  useEffect(() => {
    if (trail && isCreating && tripDays.length === 0) {
      // Initialize with default day
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0];
      setStartDate(dateStr);
      
      const defaultDay: TripDay = {
        day: 1,
        date: dateStr,
        startPoint: 'Trailhead',
        endPoint: campsites[0]?.name || 'Camp',
        campsiteId: campsites[0]?.id || '',
        miles: Math.round((trail.distance / 2) * 10) / 10,
        elevationGain: Math.round(trail.elevationGain / 2),
        elevationLoss: Math.round((trail.elevationLoss || trail.elevationGain) / 2),
        startTime: '08:00',
        notes: ''
      };
      setTripDays([defaultDay]);
    }
  }, [trail, isCreating, campsites, tripDays.length]);

  const handleAddDay = () => {
    const lastDay = tripDays[tripDays.length - 1];
    const nextDate = lastDay 
      ? new Date(new Date(lastDay.date).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      : startDate;
    
    const nextCampsite = campsites[tripDays.length] || campsites[campsites.length - 1];
    
    const newDay: TripDay = {
      day: tripDays.length + 1,
      date: nextDate,
      startPoint: lastDay?.endPoint || 'Camp',
      endPoint: nextCampsite?.name || 'Trail end',
      campsiteId: nextCampsite?.id || '',
      miles: Math.round((trail?.distance || 0) / (tripDays.length + 2) * 10) / 10,
      elevationGain: Math.round((trail?.elevationGain || 0) / (tripDays.length + 2)),
      elevationLoss: Math.round(((trail?.elevationLoss || trail?.elevationGain || 0)) / (tripDays.length + 2)),
      startTime: '08:00',
      notes: ''
    };
    
    setTripDays([...tripDays, newDay]);
  };

  const handleRemoveDay = (dayIndex: number) => {
    const newDays = tripDays.filter((_, i) => i !== dayIndex).map((day, i) => ({
      ...day,
      day: i + 1
    }));
    setTripDays(newDays);
  };

  const handleUpdateDay = (index: number, updates: Partial<TripDay>) => {
    const newDays = [...tripDays];
    newDays[index] = { ...newDays[index], ...updates };
    setTripDays(newDays);
  };

  const handleSaveTrip = () => {
    if (!trail || !tripName || !startDate) return;
    
    const endDate = tripDays.length > 0 
      ? tripDays[tripDays.length - 1].date 
      : startDate;
    
    const trip: Trip = {
      id: editingTrip?.id || Date.now().toString(),
      name: tripName,
      trailId: trail.id,
      trailName: trail.name,
      startDate,
      endDate,
      groupSize,
      days: tripDays
    };
    
    onSaveTrip(trip);
    resetForm();
  };

  const resetForm = () => {
    setIsCreating(false);
    setEditingTrip(null);
    setTripName('');
    setStartDate('');
    setGroupSize(2);
    setTripDays([]);
  };

  const handleEditTrip = (trip: Trip) => {
    setEditingTrip(trip);
    setTripName(trip.name);
    setStartDate(trip.startDate);
    setGroupSize(trip.groupSize);
    setTripDays(trip.days);
    setIsCreating(true);
  };

  const handleDeleteTrip = (tripId: string) => {
    if (confirm('Are you sure you want to delete this trip?')) {
      onDeleteTrip(tripId);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Show trip detail view
  if (showTripDetail) {
    const trip = showTripDetail;
    const totalMiles = trip.days.reduce((sum, d) => sum + d.miles, 0);
    const totalGain = trip.days.reduce((sum, d) => sum + d.elevationGain, 0);
    const totalLoss = trip.days.reduce((sum, d) => sum + d.elevationLoss, 0);

    return (
      <div className="trip-planner">
        <div className="planner-header">
          <button className="back-button" onClick={() => setShowTripDetail(null)}>
            <ArrowLeft size={20} />
            Back to trips
          </button>
          <h1>{trip.name}</h1>
        </div>

        <div className="planner-content">
          <div className="trip-detail-card">
            <div className="trip-detail-header">
              <div>
                <h2>{trip.trailName}</h2>
                <div className="trip-dates">
                  <Calendar size={16} />
                  <span>{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                </div>
              </div>
              <div className="trip-meta">
                <span><Users size={14} /> {trip.groupSize} people</span>
                <span><Clock size={14} /> {trip.days.length} days</span>
              </div>
            </div>

            <div className="trip-stats-grid">
              <div className="stat-card">
                <TrendingUp size={20} />
                <span className="stat-label">Total Distance</span>
                <span className="stat-value">{totalMiles.toFixed(1)} mi</span>
              </div>
              <div className="stat-card">
                <Mountain size={20} />
                <span className="stat-label">Elevation Gain</span>
                <span className="stat-value">{totalGain.toLocaleString()} ft</span>
              </div>
              <div className="stat-card">
                <Mountain size={20} style={{ transform: 'rotate(180deg)' }} />
                <span className="stat-label">Elevation Loss</span>
                <span className="stat-value">{totalLoss.toLocaleString()} ft</span>
              </div>
            </div>

            <h3>Itinerary</h3>
            <div className="itinerary-list">
              {trip.days.map((day, index) => (
                <div key={day.day} className="itinerary-item">
                  <div className="day-marker">
                    <span>Day {day.day}</span>
                    <small>{formatDate(day.date)}</small>
                  </div>
                  <div className="day-details">
                    <div className="day-route">
                      <MapPin size={14} />
                      <span>{day.startPoint} → {day.endPoint}</span>
                    </div>
                    <div className="day-stats">
                      <span><TrendingUp size={12} /> {day.miles} mi</span>
                      <span><Mountain size={12} /> +{day.elevationGain} ft</span>
                      <span>⏰ {day.startTime}</span>
                    </div>
                    {day.notes && <p className="day-notes">{day.notes}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="trip-actions">
              <button className="secondary" onClick={() => setShowTripDetail(null)}>
                <X size={18} />
                Close
              </button>
              <button className="secondary" onClick={() => handleEditTrip(trip)}>
                <Edit3 size={18} />
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Create/Edit form
  if (isCreating && trail) {
    const endDate = tripDays.length > 0 
      ? formatDate(tripDays[tripDays.length - 1].date)
      : 'TBD';

    return (
      <div className="trip-planner">
        <div className="planner-header">
          <button className="back-button" onClick={resetForm}>
            <ArrowLeft size={20} />
            Cancel
          </button>
          <h1>{editingTrip ? 'Edit Trip' : 'Plan New Trip'}</h1>
        </div>

        <div className="planner-content">
          <div className="planner-form">
            <div className="form-section">
              <h2>Trip Details</h2>
              
              <div className="form-row">
                <div className="form-field">
                  <label>Trail</label>
                  <div className="trail-display">
                    <MapPin size={16} />
                    <span>{trail.name}</span>
                    <button className="change-trail" onClick={onSelectTrail}>
                      Change
                    </button>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="trip-name">Trip Name</label>
                  <input
                    id="trip-name"
                    type="text"
                    value={tripName}
                    onChange={(e) => setTripName(e.target.value)}
                    placeholder="My Awesome Backpacking Trip"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="start-date">Start Date</label>
                  <input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="group-size">Group Size</label>
                  <input
                    id="group-size"
                    type="number"
                    min={1}
                    max={20}
                    value={groupSize}
                    onChange={(e) => setGroupSize(parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-header-with-action">
                <h2>Daily Itinerary</h2>
                <span className="trip-summary">
                  {formatDate(startDate)} - {endDate} • {tripDays.length} days
                </span>
              </div>
              
              <div className="days-list">
                {tripDays.map((day, index) => (
                  <div key={day.day} className="day-form-card">
                    <div className="day-form-header">
                      <span className="day-number">Day {day.day}</span>
                      <button 
                        className="remove-day-btn"
                        onClick={() => handleRemoveDay(index)}
                        disabled={tripDays.length <= 1}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    
                    <div className="day-form-fields">
                      <div className="form-row">
                        <div className="form-field small">
                          <label>Date</label>
                          <input
                            type="date"
                            value={day.date}
                            onChange={(e) => handleUpdateDay(index, { date: e.target.value })}
                          />
                        </div>
                        
                        <div className="form-field small">
                          <label>Start Time</label>
                          <input
                            type="time"
                            value={day.startTime}
                            onChange={(e) => handleUpdateDay(index, { startTime: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-field">
                          <label>Start Point</label>
                          <input
                            type="text"
                            value={day.startPoint}
                            onChange={(e) => handleUpdateDay(index, { startPoint: e.target.value })}
                          />
                        </div>
                        
                        <div className="form-field">
                          <label>End Point</label>
                          <input
                            type="text"
                            value={day.endPoint}
                            onChange={(e) => handleUpdateDay(index, { endPoint: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-field small">
                          <label>Miles</label>
                          <input
                            type="number"
                            step="0.1"
                            value={day.miles}
                            onChange={(e) => handleUpdateDay(index, { miles: parseFloat(e.target.value) || 0 })}
                          />
                        </div>
                        
                        <div className="form-field small">
                          <label>Elev Gain</label>
                          <input
                            type="number"
                            value={day.elevationGain}
                            onChange={(e) => handleUpdateDay(index, { elevationGain: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                        
                        <div className="form-field small">
                          <label>Elev Loss</label>
                          <input
                            type="number"
                            value={day.elevationLoss}
                            onChange={(e) => handleUpdateDay(index, { elevationLoss: parseInt(e.target.value) || 0 })}
                          />
                        </div>
                      </div>

                      <div className="form-field">
                        <label>Notes</label>
                        <textarea
                          value={day.notes}
                          onChange={(e) => handleUpdateDay(index, { notes: e.target.value })}
                          placeholder="Add notes about this day..."
                          rows={2}
                        />
                      </div>

                      <div className="form-field">
                        <label>Campsite</label>
                        <select
                          value={day.campsiteId}
                          onChange={(e) => {
                            const site = campsites.find(c => c.id === e.target.value);
                            handleUpdateDay(index, { 
                              campsiteId: e.target.value,
                              endPoint: site?.name || day.endPoint
                            });
                          }}
                        >
                          <option value="">Select a campsite...</option>
                          {campsites.map(site => (
                            <option key={site.id} value={site.id}>
                              {site.name} (Mile {site.mileMarker})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="add-day-btn" onClick={handleAddDay}>
                <Plus size={16} />
                Add Day
              </button>
            </div>

            <div className="form-actions">
              <button className="secondary" onClick={resetForm}>
                Cancel
              </button>
              <button 
                className="primary"
                onClick={handleSaveTrip}
                disabled={!tripName || !startDate}
              >
                <Download size={18} />
                {editingTrip ? 'Update Trip' : 'Save Trip'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // List view of saved trips
  return (
    <div className="trip-planner">
      <div className="planner-header">
        <button className="back-button" onClick={onBack}>
          <ArrowLeft size={20} />
          Back
        </button>
        <h1>My Trips</h1>
      </div>

      <div className="planner-content">
        {savedTrips.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎒</div>
            <h2>No trips planned yet</h2>
            <p>Start planning your next backpacking adventure. Select a trail and create a detailed itinerary.</p>
            <button className="primary" onClick={onSelectTrail}>
              <MapPin size={18} />
              Browse Trails
            </button>
          </div>
        ) : (
          <>
            <div className="trips-header">
              <span className="trips-count">{savedTrips.length} trip{savedTrips.length !== 1 ? 's' : ''}</span>
              <button className="new-trip-btn" onClick={onSelectTrail}>
                <Plus size={16} />
                New Trip
              </button>
            </div>

            <div className="trips-grid">
              {savedTrips.map(trip => (
                <div key={trip.id} className="trip-card" onClick={() => setShowTripDetail(trip)}>
                  <div className="trip-card-header">
                    <h3>{trip.name}</h3>
                    <div className="trip-card-actions" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => handleEditTrip(trip)}>
                        <Edit3 size={16} />
                      </button>
                      <button onClick={() => handleDeleteTrip(trip.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <p className="trip-card-trail">
                    <MapPin size={14} />
                    {trip.trailName}
                  </p>
                  
                  <div className="trip-card-meta">
                    <span>
                      <Calendar size={14} />
                      {formatDate(trip.startDate)}
                    </span>
                    <span>
                      <Clock size={14} />
                      {trip.days.length} days
                    </span>
                    <span>
                      <Users size={14} />
                      {trip.groupSize} people
                    </span>
                  </div>
                  
                  <button className="view-trip-btn">
                    View Trip
                    <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
