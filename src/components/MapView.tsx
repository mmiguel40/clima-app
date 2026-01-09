import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { LatLngExpression } from 'leaflet';
import './MapView.css';

// Fix for default marker icon in leaflet with webpack/vite
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
    lat: number;
    lon: number;
    city: string;
}

// Component helper to connect React state with Leaflet map instance
const FlyToLocation = ({ lat, lon }: { lat: number, lon: number }) => {
    const map = useMap();
    useEffect(() => {
        map.invalidateSize(); // Force map to recognize new container dimensions
        map.flyTo([lat, lon], 6, { // Zoom 5: Closer view (Contextual: Country/Region)
            duration: 1.5
        });
    }, [lat, lon, map]);
    return null;
};

const MapView: React.FC<MapViewProps> = ({ lat, lon, city }) => {
    const position: LatLngExpression = [lat, lon];
    // Restrict bounds to the world: [[-90, -180], [90, 180]]
    const maxBounds: L.LatLngBoundsExpression = [[-90, -180], [90, 180]];

    return (
        <div className="map-container-wrapper" data-testid="map-view">
            <MapContainer
                center={position}
                zoom={5}
                minZoom={2}
                maxBounds={maxBounds}
                maxBoundsViscosity={1.0}
                scrollWheelZoom={true}
                className="leaflet-map"
            >
                <LayersControl position="topright">
                    <LayersControl.BaseLayer name="Mapa (Calles)">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            noWrap={true}
                        />
                    </LayersControl.BaseLayer>

                    <LayersControl.BaseLayer checked name="Satélite (Tierra)">
                        <TileLayer
                            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            noWrap={true}
                        />
                    </LayersControl.BaseLayer>
                </LayersControl>

                <Marker position={position}>
                    <Popup>
                        {city}
                    </Popup>
                </Marker>
                <FlyToLocation lat={lat} lon={lon} />
            </MapContainer>
        </div>
    );
};

export default MapView;
