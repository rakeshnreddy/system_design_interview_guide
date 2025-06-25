import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from './Modal';

describe('Modal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    // Reset the mock before each test
    mockOnClose.mockClear();
  });

  test('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('renders with title', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="My Modal Title">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText('My Modal Title')).toBeInTheDocument();
  });

  test('renders with footer', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} footer={<button>OK</button>}>
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByRole('button', {name: /OK/i})).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked (with header)', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when close button is clicked (no header)', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Modal Content</div>
      </Modal>
    );
    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when overlay is clicked', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    // eslint-disable-next-line testing-library/no-node-access
    fireEvent.click(screen.getByRole('dialog').parentElement as HTMLElement); // Click the overlay
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when modal content is clicked', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Modal">
        <div>Modal Content</div>
      </Modal>
    );
    fireEvent.click(screen.getByText('Modal Content'));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('applies custom className to modal content', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} className="custom-modal-class">
        <div>Modal Content</div>
      </Modal>
    );
    expect(screen.getByText('Modal Content').parentElement?.parentElement).toHaveClass('modal-content custom-modal-class');
  });
});
