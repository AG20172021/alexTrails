import { useState, useMemo, useCallback } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  ReferenceLine
} from 'recharts';
import { Trail, Campsite } from '../types';

interface ElevationProfileProps {
  trail: Trail;
  campsites: Campsite[];
  height?: number;
  className?: string;
}

interface DataPoint {
  distance: number;
  elevation: number;
  isCampsite?: boolean;
  campsiteName?: string;
  campsiteId?: string;
}

export default function ElevationProfile({ 
  trail, 
  campsites, 
  height = 250,
  className = '' 
}: ElevationProfileProps) {
  const [hoveredCampsite, setHoveredCampsite] = useState<string | null>(null);

  // Prepare elevation data
  const elevationData = useMemo(() => {
    if (!trail.trailPath || trail.trailPath.length === 0) return [];
    
    const data: DataPoint[] = trail.trailPath.map(point => ({
      distance: point.distance,
      elevation: point.elevation
    }));
    
    // Mark campsite positions
    campsites.forEach(campsite => {
      const nearestPoint = data.reduce((closest, point) => {
        const pointDiff = Math.abs(point.distance - campsite.mileMarker);
        const closestDiff = Math.abs(closest.distance - campsite.mileMarker);
        return pointDiff < closestDiff ? point : closest;
      });
      
      // Find or create a data point for this campsite
      const existingIndex = data.findIndex(p => Math.abs(p.distance - nearestPoint.distance) < 0.1);
      if (existingIndex >= 0) {
        data[existingIndex] = {
          ...data[existingIndex],
          isCampsite: true,
          campsiteName: campsite.name,
          campsiteId: campsite.id
        };
      }
    });
    
    return data;
  }, [trail.trailPath, campsites]);

  // Calculate stats
  const stats = useMemo(() => {
    if (elevationData.length === 0) return null;
    
    const elevations = elevationData.map(d => d.elevation);
    const minElevation = Math.min(...elevations);
    const maxElevation = Math.max(...elevations);
    const totalDistance = elevationData[elevationData.length - 1]?.distance || 0;
    
    return { minElevation, maxElevation, totalDistance };
  }, [elevationData]);

  const handleCampsiteHover = useCallback((campsiteId: string | null) => {
    setHoveredCampsite(campsiteId);
  }, []);

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: DataPoint }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="elevation-tooltip">
          <p className="tooltip-distance">{data.distance.toFixed(1)} mi</p>
          <p className="tooltip-elevation">{data.elevation.toLocaleString()} ft</p>
          {data.isCampsite && (
            <p className="tooltip-campsite">🏕️ {data.campsiteName}</p>
          )}
        </div>
      );
    }
    return null;
  };

  if (elevationData.length === 0) {
    return (
      <div className={`elevation-profile ${className}`} style={{ height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>No elevation data available</p>
      </div>
    );
  }

  return (
    <div className={`elevation-profile ${className}`}>
      {/* Header with stats */}
      <div className="elevation-header">
        <div className="elevation-stats">
          <div className="stat-item">
            <span className="stat-label">Min Elevation</span>
            <span className="stat-value">{stats?.minElevation.toLocaleString()} ft</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Max Elevation</span>
            <span className="stat-value">{stats?.maxElevation.toLocaleString()} ft</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Elevation Gain</span>
            <span className="stat-value">+{trail.elevationGain.toLocaleString()} ft</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="elevation-chart" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={elevationData} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
            <defs>
              <linearGradient id="elevationGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2D6A4F" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#2D6A4F" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            
            <XAxis 
              dataKey="distance" 
              tickFormatter={(value) => `${value.toFixed(0)}`}
              label={{ value: 'Distance (miles)', position: 'insideBottom', offset: -15, fill: '#6B7280', fontSize: 12 }}
              stroke="#6B7280"
              tick={{ fill: '#6B7280', fontSize: 11 }}
              tickLine={false}
            />
            
            <YAxis 
              tickFormatter={(value) => `${value.toLocaleString()}`}
              label={{ value: 'Elevation (ft)', angle: -90, position: 'insideLeft', fill: '#6B7280', fontSize: 12 }}
              stroke="#6B7280"
              tick={{ fill: '#6B7280', fontSize: 11 }}
              tickLine={false}
              domain={['dataMin - 200', 'dataMax + 200']}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Area 
              type="monotone" 
              dataKey="elevation" 
              stroke="#2D6A4F" 
              strokeWidth={2}
              fill="url(#elevationGradient)" 
              dot={false}
              activeDot={{ r: 4, fill: '#2D6A4F', stroke: '#fff', strokeWidth: 2 }}
            />
            
            {/* Campsite markers */}
            {campsites.map((campsite, index) => {
              // Find closest point on trail to campsite
              const closestPoint = elevationData.reduce((closest, point) => {
                const pointDiff = Math.abs(point.distance - campsite.mileMarker);
                const closestDiff = Math.abs(closest.distance - campsite.mileMarker);
                return pointDiff < closestDiff ? point : closest;
              }, elevationData[0]);
              
              const isHovered = hoveredCampsite === campsite.id;
              
              return (
                <ReferenceDot
                  key={campsite.id}
                  x={closestPoint.distance}
                  y={closestPoint.elevation}
                  r={isHovered ? 10 : 7}
                  fill="#F4A261"
                  stroke="#fff"
                  strokeWidth={2}
                  label={{ 
                    value: '🏕️', 
                    position: 'top', 
                    fill: '#F4A261',
                    fontSize: isHovered ? 16 : 12,
                    dy: -5
                  }}
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Campsite legend */}
      <div className="elevation-legend">
        <div className="legend-item">
          <span className="legend-color trail"></span>
          <span className="legend-label">Trail</span>
        </div>
        <div className="legend-item">
          <span className="legend-color campsite">🏕️</span>
          <span className="legend-label">Campsite</span>
        </div>
      </div>
    </div>
  );
}
