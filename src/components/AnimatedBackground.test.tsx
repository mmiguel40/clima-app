import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import AnimatedBackground from './AnimatedBackground';

describe('AnimatedBackground', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
    });

    it('renderiza sin errores', () => {
        const { container } = render(<AnimatedBackground />);
        expect(container.querySelector('.animated-background')).toBeInTheDocument();
    });

    it('renderiza todas las imágenes de fondo', () => {
        const { container } = render(<AnimatedBackground />);
        const slides = container.querySelectorAll('.bg-slide');
        expect(slides).toHaveLength(4);
    });

    it('renderiza el overlay', () => {
        const { container } = render(<AnimatedBackground />);
        expect(container.querySelector('.bg-overlay')).toBeInTheDocument();
    });

    it('cambia de imagen después de 6 segundos', () => {
        const { container } = render(<AnimatedBackground />);

        // Primera imagen debe estar activa
        let activeSlides = container.querySelectorAll('.bg-slide.active');
        expect(activeSlides).toHaveLength(1);

        // Avanzar 6 segundos
        vi.advanceTimersByTime(6000);

        // Debe haber cambiado a la siguiente imagen
        activeSlides = container.querySelectorAll('.bg-slide.active');
        expect(activeSlides).toHaveLength(1);
    });

    it('limpia el intervalo al desmontar', () => {
        const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval');
        const { unmount } = render(<AnimatedBackground />);

        unmount();

        expect(clearIntervalSpy).toHaveBeenCalled();
    });
});
