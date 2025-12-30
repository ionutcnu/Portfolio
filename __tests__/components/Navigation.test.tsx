import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { usePathname, useRouter } from 'next/navigation'
import Navigation from '@/components/Navigation'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}))

describe('Navigation Component', () => {
  const mockPush = jest.fn()
  const mockRouter = {
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(usePathname as jest.Mock).mockReturnValue('/')
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
  })

  describe('Rendering', () => {
    it('should render the navigation component', () => {
      render(<Navigation />)
      expect(screen.getByRole('navigation', { name: /breadcrumbs/i })).toBeInTheDocument()
    })

    it('should render home link with ~/', () => {
      render(<Navigation />)
      const homeLink = screen.getByRole('link', { name: /~\//i })
      expect(homeLink).toBeInTheDocument()
      expect(homeLink).toHaveAttribute('href', '/')
    })

    it('should render all navigation items on desktop', () => {
      render(<Navigation />)
      expect(screen.getByText('About')).toBeInTheDocument()
      expect(screen.getByText('Posts')).toBeInTheDocument()
      expect(screen.getByText('Projects')).toBeInTheDocument()
      expect(screen.getByText('Resume')).toBeInTheDocument()
    })

    it('should render mobile menu button', () => {
      render(<Navigation />)
      const menuButton = screen.getByRole('button', { name: /open navigation menu/i })
      expect(menuButton).toBeInTheDocument()
    })

    it('should render "More..." button on desktop', () => {
      render(<Navigation />)
      const moreButton = screen.getByRole('button', { name: /open more navigation items/i })
      expect(moreButton).toBeInTheDocument()
    })
  })

  describe('Breadcrumb Display', () => {
    it('should display empty breadcrumb for root path', () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      render(<Navigation />)
      
      const homeLink = screen.getByRole('link', { name: /~\//i })
      expect(homeLink).toBeInTheDocument()
    })

    it('should display single-level breadcrumb', async () => {
      ;(usePathname as jest.Mock).mockReturnValue('/about')
      render(<Navigation />)
      
      jest.runAllTimers()
      await waitFor(() => {
        expect(screen.getByText(/about/i)).toBeInTheDocument()
      })
    })

    it('should display multi-level breadcrumb', async () => {
      ;(usePathname as jest.Mock).mockReturnValue('/blog/post/123')
      render(<Navigation />)
      
      jest.runAllTimers()
      await waitFor(() => {
        const breadcrumbText = screen.getByText(/blog \/ post \/ 123/i)
        expect(breadcrumbText).toBeInTheDocument()
      })
    })

    it('should limit breadcrumbs to 4 levels', async () => {
      ;(usePathname as jest.Mock).mockReturnValue('/level1/level2/level3/level4/level5')
      render(<Navigation />)
      
      jest.runAllTimers()
      await waitFor(() => {
        // Should only show first 4 levels
        expect(screen.queryByText(/level5/i)).not.toBeInTheDocument()
      })
    })
  })

  describe('Typing Animation', () => {
    it('should animate breadcrumb text character by character', async () => {
      ;(usePathname as jest.Mock).mockReturnValue('/projects')
      const { container } = render(<Navigation />)
      
      // Initially empty or partially typed
      const pathSpan = container.querySelector('.text-\\[\\#e5a54b\\].cursor-text')
      expect(pathSpan).toBeInTheDocument()
      
      // After animation completes
      jest.runAllTimers()
      await waitFor(() => {
        expect(screen.getByText(/projects/i)).toBeInTheDocument()
      })
    })

    it('should show typing cursor during animation', async () => {
      ;(usePathname as jest.Mock).mockReturnValue('/about')
      const { container } = render(<Navigation />)
      
      const cursor = container.querySelector('.cursor-typing')
      expect(cursor).toBeInTheDocument()
      
      jest.runAllTimers()
      await waitFor(() => {
        const blinkCursor = container.querySelector('.cursor-blink')
        expect(blinkCursor).toBeInTheDocument()
      })
    })

    it('should restart animation when pathname changes', async () => {
      const { rerender } = render(<Navigation />)
      ;(usePathname as jest.Mock).mockReturnValue('/about')
      
      jest.runAllTimers()
      
      ;(usePathname as jest.Mock).mockReturnValue('/projects')
      rerender(<Navigation />)
      
      jest.runAllTimers()
      await waitFor(() => {
        expect(screen.getByText(/projects/i)).toBeInTheDocument()
      })
    })
  })

  describe('Path Editing', () => {
    it('should enter edit mode when clicking on path', async () => {
      ;(usePathname as jest.Mock).mockReturnValue('/about')
      const user = userEvent.setup({ delay: null })
      render(<Navigation />)
      
      jest.runAllTimers()
      await waitFor(() => {
        expect(screen.getByText(/about/i)).toBeInTheDocument()
      })
      
      const pathSpan = screen.getByText(/about/i)
      await user.click(pathSpan)
      
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(input).toHaveFocus()
    })

    it('should navigate when pressing Enter in edit mode', async () => {
      ;(usePathname as jest.Mock).mockReturnValue('/about')
      const user = userEvent.setup({ delay: null })
      render(<Navigation />)
      
      jest.runAllTimers()
      const pathSpan = screen.getByText(/about/i)
      await user.click(pathSpan)
      
      const input = screen.getByRole('textbox')
      await user.clear(input)
      await user.type(input, 'projects')
      await user.keyboard('{Enter}')
      
      expect(mockPush).toHaveBeenCalledWith('/projects')
    })

    it('should add leading slash if missing when navigating', async () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      const user = userEvent.setup({ delay: null })
      render(<Navigation />)
      
      jest.runAllTimers()
      const pathSpan = screen.getByTitle('Click to edit path')
      await user.click(pathSpan)
      
      const input = screen.getByRole('textbox')
      await user.type(input, 'about')
      await user.keyboard('{Enter}')
      
      expect(mockPush).toHaveBeenCalledWith('/about')
    })

    it('should preserve leading slash if already present', async () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      const user = userEvent.setup({ delay: null })
      render(<Navigation />)
      
      jest.runAllTimers()
      const pathSpan = screen.getByTitle('Click to edit path')
      await user.click(pathSpan)
      
      const input = screen.getByRole('textbox')
      await user.type(input, '/projects')
      await user.keyboard('{Enter}')
      
      expect(mockPush).toHaveBeenCalledWith('/projects')
    })

    it('should exit edit mode when pressing Escape', async () => {
      ;(usePathname as jest.Mock).mockReturnValue('/about')
      const user = userEvent.setup({ delay: null })
      render(<Navigation />)
      
      jest.runAllTimers()
      const pathSpan = screen.getByText(/about/i)
      await user.click(pathSpan)
      
      const input = screen.getByRole('textbox')
      await user.keyboard('{Escape}')
      
      await waitFor(() => {
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
      })
    })

    it('should exit edit mode on blur', async () => {
      ;(usePathname as jest.Mock).mockReturnValue('/about')
      const user = userEvent.setup({ delay: null })
      render(<Navigation />)
      
      jest.runAllTimers()
      const pathSpan = screen.getByText(/about/i)
      await user.click(pathSpan)
      
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      
      fireEvent.blur(input)
      
      await waitFor(() => {
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
      })
    })

    it('should adjust input width based on content length', async () => {
      ;(usePathname as jest.Mock).mockReturnValue('/')
      const user = userEvent.setup({ delay: null })
      render(<Navigation />)
      
      jest.runAllTimers()
      const pathSpan = screen.getByTitle('Click to edit path')
      await user.click(pathSpan)
      
      const input = screen.getByRole('textbox') as HTMLInputElement
      await user.type(input, 'very-long-path-name')
      
      expect(input.style.width).toBeTruthy()
    })
  })

  describe('Mobile Menu', () => {
    it('should toggle menu state when clicking mobile button', async () => {
      const user = userEvent.setup({ delay: null })
      render(<Navigation />)
      
      const menuButton = screen.getByRole('button', { name: /open navigation menu/i })
      
      await user.click(menuButton)
      expect(menuButton).toHaveAttribute('aria-expanded', 'true')
      
      await user.click(menuButton)
      expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    })

    it('should toggle menu state when clicking "More..." button', async () => {
      const user = userEvent.setup({ delay: null })
      render(<Navigation />)
      
      const moreButton = screen.getByRole('button', { name: /open more navigation items/i })
      await user.click(moreButton)
      
      // Menu state should be toggled
      const menuButton = screen.getByRole('button', { name: /open navigation menu/i })
      expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    })
  })

  describe('Navigation Links', () => {
    it('should render correct href for each navigation item', () => {
      render(<Navigation />)
      
      expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about')
      expect(screen.getByRole('link', { name: /posts/i })).toHaveAttribute('href', '/blog')
      expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute('href', '/projects')
      expect(screen.getByRole('link', { name: /resume/i })).toHaveAttribute('href', '/contact')
    })

    it('should apply hover styles to navigation links', () => {
      render(<Navigation />)
      
      const aboutLink = screen.getByRole('link', { name: /about/i })
      expect(aboutLink).toHaveClass('hover:text-[#e5a54b]')
    })

    it('should have proper accessibility attributes', () => {
      render(<Navigation />)
      
      const nav = screen.getByRole('navigation', { name: /breadcrumbs/i })
      expect(nav).toHaveAttribute('aria-label', 'Breadcrumbs')
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels for interactive elements', () => {
      render(<Navigation />)
      
      expect(screen.getByRole('button', { name: /open navigation menu/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /open more navigation items/i })).toBeInTheDocument()
    })

    it('should update aria-expanded when menu state changes', async () => {
      const user = userEvent.setup({ delay: null })
      render(<Navigation />)
      
      const menuButton = screen.getByRole('button', { name: /open navigation menu/i })
      expect(menuButton).toHaveAttribute('aria-expanded', 'false')
      
      await user.click(menuButton)
      expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    })

    it('should mark cursor as aria-hidden', () => {
      const { container } = render(<Navigation />)
      
      const cursor = container.querySelector('[aria-hidden="true"]')
      expect(cursor).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty pathname gracefully', () => {
      ;(usePathname as jest.Mock).mockReturnValue('')
      render(<Navigation />)
      
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('should handle pathname with trailing slash', async () => {
      ;(usePathname as jest.Mock).mockReturnValue('/about/')
      render(<Navigation />)
      
      jest.runAllTimers()
      await waitFor(() => {
        expect(screen.getByText(/about/i)).toBeInTheDocument()
      })
    })

    it('should handle pathname with special characters', async () => {
      ;(usePathname as jest.Mock).mockReturnValue('/posts/hello-world')
      render(<Navigation />)
      
      jest.runAllTimers()
      await waitFor(() => {
        expect(screen.getByText(/posts \/ hello-world/i)).toBeInTheDocument()
      })
    })

    it('should handle rapid pathname changes', async () => {
      const { rerender } = render(<Navigation />)
      
      ;(usePathname as jest.Mock).mockReturnValue('/about')
      rerender(<Navigation />)
      
      ;(usePathname as jest.Mock).mockReturnValue('/projects')
      rerender(<Navigation />)
      
      ;(usePathname as jest.Mock).mockReturnValue('/blog')
      rerender(<Navigation />)
      
      jest.runAllTimers()
      
      await waitFor(() => {
        expect(screen.getByText(/blog/i)).toBeInTheDocument()
      })
    })
  })

  describe('Styling', () => {
    it('should apply correct CSS classes to header', () => {
      const { container } = render(<Navigation />)
      
      const header = container.querySelector('.header')
      expect(header).toHaveClass('sticky', 'top-0', 'z-10')
    })

    it('should apply transition classes to links', () => {
      render(<Navigation />)
      
      const homeLink = screen.getByRole('link', { name: /~\//i })
      expect(homeLink).toHaveClass('transition-colors')
    })

    it('should hide cursor when in edit mode', async () => {
      ;(usePathname as jest.Mock).mockReturnValue('/about')
      const user = userEvent.setup({ delay: null })
      const { container } = render(<Navigation />)
      
      jest.runAllTimers()
      const pathSpan = screen.getByText(/about/i)
      await user.click(pathSpan)
      
      const cursor = container.querySelector('.cursor-blink, .cursor-typing')
      expect(cursor).not.toBeInTheDocument()
    })
  })
})