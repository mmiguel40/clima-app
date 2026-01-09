import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
    const mockOnSearch = vi.fn();
    const mockOnClear = vi.fn();

    it('renders search input and buttons', () => {
        render(<SearchBar onSearch={mockOnSearch} onClear={mockOnClear} isLoading={false} />);
        expect(screen.getByPlaceholderText(/Buscar ciudad/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Buscar/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Limpiar/i })).toBeInTheDocument();
    });

    it('calls onSearch with input value when form is submitted', () => {
        render(<SearchBar onSearch={mockOnSearch} onClear={mockOnClear} isLoading={false} />);
        const input = screen.getByPlaceholderText(/Buscar ciudad/i);
        const searchBtn = screen.getByRole('button', { name: /Buscar/i });

        fireEvent.change(input, { target: { value: 'New York' } });
        fireEvent.click(searchBtn);

        expect(mockOnSearch).toHaveBeenCalledWith('New York');
    });

    it('calls onClear and clears input when Clear button is clicked', () => {
        render(<SearchBar onSearch={mockOnSearch} onClear={mockOnClear} isLoading={false} />);
        const input = screen.getByPlaceholderText(/Buscar ciudad/i) as HTMLInputElement;
        const clearBtn = screen.getByRole('button', { name: /Limpiar/i });

        // Simulate typing
        fireEvent.change(input, { target: { value: 'Paris' } });
        expect(input.value).toBe('Paris');

        // Click Clear
        fireEvent.click(clearBtn);

        expect(mockOnClear).toHaveBeenCalled();
        expect(input.value).toBe('');
    });

    it('disables buttons when loading', () => {
        render(<SearchBar onSearch={mockOnSearch} onClear={mockOnClear} isLoading={true} />);
        expect(screen.getByRole('button', { name: /\.\.\./i })).toBeDisabled(); // Button text changes to '...'
        expect(screen.getByRole('button', { name: /Limpiar/i })).toBeDisabled();
    });
});
