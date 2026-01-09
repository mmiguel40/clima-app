import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MapView from './MapView';

// Mock react-leaflet components
vi.mock('react-leaflet', () => ({
    MapContainer: ({ children, ...props }: any) => (
        <div data-testid="map-container" {...props}>{children}</div>
    ),
    TileLayer: () => <div data-testid="tile-layer" />,
    Marker: ({ children }: any) => <div data-testid="marker">{children}</div>,
    Popup: ({ children }: any) => <div data-testid="popup">{children}</div>,
    useMap: () => ({
        invalidateSize: vi.fn(),
        flyTo: vi.fn()
    }),
    LayersControl: ({ children }: any) => <div data-testid="layers-control">{children}</div>,
}));

// Add BaseLayer to LayersControl mock
vi.mock('react-leaflet', async () => {
    const actual = await vi.importActual('react-leaflet');
    return {
        ...actual,
        MapContainer: ({ children, ...props }: any) => (
            <div data-testid="map-container" {...props}>{children}</div>
        ),
        TileLayer: () => <div data-testid="tile-layer" />,
        Marker: ({ children }: any) => <div data-testid="marker">{children}</div>,
        Popup: ({ children }: any) => <div data-testid="popup">{children}</div>,
        useMap: () => ({
            invalidateSize: vi.fn(),
            flyTo: vi.fn()
        }),
        LayersControl: Object.assign(
            ({ children }: any) => <div data-testid="layers-control">{children}</div>,
            {
                BaseLayer: ({ children }: any) => <div data-testid="base-layer">{children}</div>
            }
        ),
    };
});

describe('MapView', () => {
    const defaultProps = {
        lat: 40.4168,
        lon: -3.7038,
        city: 'Madrid, España'
    };

    it('renderiza el contenedor del mapa', () => {
        render(<MapView {...defaultProps} />);
        expect(screen.getByTestId('map-view')).toBeInTheDocument();
    });

    it('renderiza el MapContainer', () => {
        render(<MapView {...defaultProps} />);
        expect(screen.getByTestId('map-container')).toBeInTheDocument();
    });

    it('renderiza el marker con la ciudad', () => {
        render(<MapView {...defaultProps} />);
        expect(screen.getByTestId('marker')).toBeInTheDocument();
        expect(screen.getByText('Madrid, España')).toBeInTheDocument();
    });

    it('renderiza con coordenadas correctas', () => {
        render(<MapView lat={10} lon={20} city="Test City" />);
        expect(screen.getByTestId('map-view')).toBeInTheDocument();
        expect(screen.getByText('Test City')).toBeInTheDocument();
    });
});
