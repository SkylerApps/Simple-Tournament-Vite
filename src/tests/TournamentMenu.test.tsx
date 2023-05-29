import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TournamentMenu from '../components/TournamentMenu';

describe('TournamentMenu', () => {
  it('renders component', () => {
    render(<TournamentMenu />);
    expect(screen.getByText('Tournament Menu')).toBeInTheDocument();
  });

  it('updates group range', () => {
    render(<TournamentMenu />);
    fireEvent.change(screen.getAllByRole('slider')[0], { target: { value: '3' } });
    expect(screen.getByTestId('group-range')).toHaveValue('3');
  });

  it('updates individual range', () => {
    render(<TournamentMenu />);
    fireEvent.change(screen.getAllByRole('slider')[1], { target: { value: '10' } });
    expect(screen.getByTestId('individualRange')).toHaveValue('10');
  });

  it('initializes tournament and distributes individuals evenly among groups', () => {
    render(<TournamentMenu />);
    fireEvent.change(screen.getAllByRole('slider')[0], { target: { value: '3' } });
    fireEvent.change(screen.getAllByRole('slider')[1], { target: { value: '10' } });
    fireEvent.click(screen.getByText('Initialize Tournament'));

    // Verify tournament initialized message
    expect(screen.getByText('Tournament Initialized!')).toBeInTheDocument();

    // Verify group distribution
    expect(screen.getByText('Group 1')).toBeInTheDocument();
    expect(screen.getByText('Group 2')).toBeInTheDocument();
    expect(screen.getByText('Group 3')).toBeInTheDocument();

    // Verify individual distribution
    expect(screen.getByText('Individual 1')).toBeInTheDocument();
    expect(screen.getByText('Individual 2')).toBeInTheDocument();
    expect(screen.getByText('Individual 3')).toBeInTheDocument();
    expect(screen.getByText('Individual 4')).toBeInTheDocument();
    expect(screen.getByText('Individual 5')).toBeInTheDocument();
    expect(screen.getByText('Individual 6')).toBeInTheDocument();
    expect(screen.getByText('Individual 7')).toBeInTheDocument();
    expect(screen.getByText('Individual 8')).toBeInTheDocument();
    expect(screen.getByText('Individual 9')).toBeInTheDocument();
    expect(screen.getByText('Individual 10')).toBeInTheDocument();
  });
});
