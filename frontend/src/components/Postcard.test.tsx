import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import PostCard from './PostCard';

// Mock external dependencies
jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn(),
  useQueryClient: jest.fn(() => ({
    invalidateQueries: jest.fn(),
  })),
}));

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

jest.mock('api/posts', () => ({
  PostsApi: {
    deletePost: jest.fn(),
  },
}));

jest.mock('assets/delete-icon.svg', () => 'mock-delete-icon');

describe('PostCard', () => {
  const mockDeletePost = jest.fn();
  const mockInvalidateQueries = jest.fn();

  beforeEach(() => {
    (useMutation as jest.Mock).mockImplementation(() => ({
      mutate: mockDeletePost,
      isPending: false,
    }));
    (useQueryClient as jest.Mock).mockReturnValue({
      invalidateQueries: mockInvalidateQueries,
    });
  });

  it('renders the component correctly', () => {
    render(<PostCard title='Test Title' body='Test Body' id='123' />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Body')).toBeInTheDocument();
    expect(screen.getByAltText('Delete post')).toBeInTheDocument();
  });

  it('calls deletePost when the delete icon is clicked', async () => {
    render(<PostCard title='Test Title' body='Test Body' id='123' />);
    const deleteIcon = screen.getByAltText('Delete post');

    // Mock confirm dialog to always return true
    window.confirm = jest.fn().mockImplementation(() => true);

    fireEvent.click(deleteIcon);

    await waitFor(() => {
      expect(mockDeletePost).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockInvalidateQueries).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith('Post deleted successfully');
    });
  });

  it('shows an error toast when the deletion fails', async () => {
    (useMutation as jest.Mock).mockImplementation(() => ({
      mutate: () => {
        throw new Error('Delete failed');
      },
      isPending: false,
    }));

    render(<PostCard title='Test Title' body='Test Body' id='123' />);
    const deleteIcon = screen.getByAltText('Delete post');

    // Mock confirm dialog to always return true
    window.confirm = jest.fn().mockImplementation(() => true);

    fireEvent.click(deleteIcon);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Failed to delete post. Please try again.'
      );
    });
  });

  it('does nothing if the user cancels the confirm dialog', () => {
    render(<PostCard title='Test Title' body='Test Body' id='123' />);
    const deleteIcon = screen.getByAltText('Delete post');

    // Mock confirm dialog to return false
    window.confirm = jest.fn().mockImplementation(() => false);

    fireEvent.click(deleteIcon);

    expect(mockDeletePost).not.toHaveBeenCalled();
  });
});
