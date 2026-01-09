import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import EnvironmentBanner from './EnvironmentBanner';

describe('EnvironmentBanner', () => {
    it('no renderiza cuando no hay VITE_ENV_LABEL', () => {
        vi.stubEnv('VITE_ENV_LABEL', '');
        const { container } = render(<EnvironmentBanner />);
        expect(container.firstChild).toBeNull();
    });

    it('renderiza con color rojo para DEV', () => {
        vi.stubEnv('VITE_ENV_LABEL', 'DEV ENVIRONMENT');
        render(<EnvironmentBanner />);
        const banner = screen.getByText('DEV ENVIRONMENT');
        expect(banner).toBeInTheDocument();
        expect(banner).toHaveStyle({ backgroundColor: '#e74c3c' });
    });

    it('renderiza con color naranja para QA', () => {
        vi.stubEnv('VITE_ENV_LABEL', 'QA TESTING');
        render(<EnvironmentBanner />);
        const banner = screen.getByText('QA TESTING');
        expect(banner).toBeInTheDocument();
        expect(banner).toHaveStyle({ backgroundColor: '#f39c12' });
    });

    it('renderiza con color azul para otros ambientes', () => {
        vi.stubEnv('VITE_ENV_LABEL', 'STAGING');
        render(<EnvironmentBanner />);
        const banner = screen.getByText('STAGING');
        expect(banner).toBeInTheDocument();
        expect(banner).toHaveStyle({ backgroundColor: '#3498db' });
    });
});
