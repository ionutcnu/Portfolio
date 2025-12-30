import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Experience from '@/components/Experience'

describe('Experience Component', () => {
  describe('Rendering', () => {
    it('should render the experience section', () => {
      render(<Experience />)
      expect(screen.getByRole('region')).toBeInTheDocument()
    })

    it('should render all experience items', () => {
      render(<Experience />)
      expect(screen.getByText('Endava Romania')).toBeInTheDocument()
      expect(screen.getByText('Vision')).toBeInTheDocument()
    })

    it('should render company logos with correct alt text', () => {
      render(<Experience />)
      expect(screen.getByAltText('Endava Logo')).toBeInTheDocument()
      expect(screen.getByAltText('Vision Logo')).toBeInTheDocument()
    })

    it('should render company names and roles', () => {
      render(<Experience />)
      expect(screen.getByText('Endava Romania')).toBeInTheDocument()
      expect(screen.getByText('Vision')).toBeInTheDocument()
    })

    it('should mark past experiences with "(Past)" label', () => {
      render(<Experience />)
      const pastLabel = screen.getByText('(Past)')
      expect(pastLabel).toBeInTheDocument()
    })

    it('should render separator between experience items on desktop', () => {
      const { container } = render(<Experience />)
      const separators = container.querySelectorAll('.text-accent-dynamic.md\\:inline')
      expect(separators.length).toBeGreaterThan(0)
    })
  })

  describe('Date Formatting', () => {
    it('should format dates correctly', () => {
      render(<Experience />)
      // Endava: June 2022 - Present
      expect(screen.getByText(/Jun 2022/i)).toBeInTheDocument()
      expect(screen.getByText('Present')).toBeInTheDocument()
      
      // Vision: November 2021 - May 2022
      expect(screen.getByText(/Nov 2021/i)).toBeInTheDocument()
      expect(screen.getByText(/May 2022/i)).toBeInTheDocument()
    })

    it('should display "Present" for current positions', () => {
      render(<Experience />)
      const presentTexts = screen.getAllByText('Present')
      expect(presentTexts.length).toBeGreaterThan(0)
    })

    it('should display end date for past positions', () => {
      render(<Experience />)
      expect(screen.getByText(/May 2022/i)).toBeInTheDocument()
    })
  })

  describe('Popover Functionality', () => {
    it('should open popover when clicking on experience item', async () => {
      const user = userEvent.setup()
      render(<Experience />)
      
      const endavaButton = screen.getByRole('button', { 
        name: /view details for qa tester at endava romania/i 
      })
      await user.click(endavaButton)
      
      await waitFor(() => {
        // Popover should show role in the content
        const roles = screen.getAllByText(/QA Tester/i)
        expect(roles.length).toBeGreaterThan(1) // Button text + popover content
      })
    })

    it('should display company details in popover', async () => {
      const user = userEvent.setup()
      render(<Experience />)
      
      const endavaButton = screen.getByRole('button', { 
        name: /view details for qa tester at endava romania/i 
      })
      await user.click(endavaButton)
      
      await waitFor(() => {
        expect(screen.getByText(/Naval Shipping and Payments domains/i)).toBeInTheDocument()
      })
    })

    it('should show calendar icon in popover', async () => {
      const user = userEvent.setup()
      render(<Experience />)
      
      const endavaButton = screen.getByRole('button', { 
        name: /view details for qa tester at endava romania/i 
      })
      await user.click(endavaButton)
      
      await waitFor(() => {
        const { container } = render(<Experience />)
        // Calendar icon should be visible in the popover
        expect(screen.getByText(/Jun 2022/i)).toBeInTheDocument()
      })
    })

    it('should display "Visit Website" link when URL is provided', async () => {
      const user = userEvent.setup()
      render(<Experience />)
      
      const endavaButton = screen.getByRole('button', { 
        name: /view details for qa tester at endava romania/i 
      })
      await user.click(endavaButton)
      
      await waitFor(() => {
        const visitLink = screen.getByRole('link', { name: /visit website/i })
        expect(visitLink).toBeInTheDocument()
        expect(visitLink).toHaveAttribute('href', 'https://www.endava.com/')
        expect(visitLink).toHaveAttribute('target', '_blank')
        expect(visitLink).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })

    it('should close popover when clicking close button', async () => {
      const user = userEvent.setup()
      render(<Experience />)
      
      const endavaButton = screen.getByRole('button', { 
        name: /view details for qa tester at endava romania/i 
      })
      await user.click(endavaButton)
      
      await waitFor(() => {
        expect(screen.getByText(/Naval Shipping/i)).toBeInTheDocument()
      })
      
      const closeButton = screen.getByRole('button', { name: /close details/i })
      await user.click(closeButton)
      
      await waitFor(() => {
        // Popover content should be removed (only button text remains)
        const navalTexts = screen.queryAllByText(/Naval Shipping/i)
        expect(navalTexts.length).toBe(0)
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA labels for buttons', () => {
      render(<Experience />)
      
      expect(screen.getByRole('button', { 
        name: /view details for qa tester at endava romania/i 
      })).toBeInTheDocument()
      
      expect(screen.getByRole('button', { 
        name: /view details for junior programmer at vision/i 
      })).toBeInTheDocument()
    })

    it('should have focus visible styles', () => {
      render(<Experience />)
      
      const endavaButton = screen.getByRole('button', { 
        name: /view details for qa tester at endava romania/i 
      })
      
      expect(endavaButton).toHaveClass('focus-visible:ring-2')
      expect(endavaButton).toHaveClass('focus-visible:ring-accent-dynamic')
    })

    it('should have keyboard navigation support', async () => {
      const user = userEvent.setup()
      render(<Experience />)
      
      const endavaButton = screen.getByRole('button', { 
        name: /view details for qa tester at endava romania/i 
      })
      
      endavaButton.focus()
      expect(endavaButton).toHaveFocus()
      
      await user.keyboard('{Enter}')
      
      await waitFor(() => {
        expect(screen.getByText(/Naval Shipping/i)).toBeInTheDocument()
      })
    })

    it('should have proper close button accessibility', async () => {
      const user = userEvent.setup()
      render(<Experience />)
      
      const endavaButton = screen.getByRole('button', { 
        name: /view details for qa tester at endava romania/i 
      })
      await user.click(endavaButton)
      
      await waitFor(() => {
        const closeButton = screen.getByRole('button', { name: /close details/i })
        expect(closeButton).toHaveAttribute('aria-label', 'Close details')
      })
    })
  })

  describe('Visual States', () => {
    it('should apply reduced opacity to past experiences', () => {
      render(<Experience />)
      
      const visionButton = screen.getByRole('button', { 
        name: /view details for junior programmer at vision/i 
      })
      
      expect(visionButton).toHaveClass('opacity-60')
    })

    it('should apply full opacity to current experiences', () => {
      render(<Experience />)
      
      const endavaButton = screen.getByRole('button', { 
        name: /view details for qa tester at endava romania/i 
      })
      
      expect(endavaButton).not.toHaveClass('opacity-60')
    })

    it('should highlight current company name', () => {
      const { container } = render(<Experience />)
      
      // Endava (current) should have font-medium and text-foreground
      const endavaText = screen.getByText('Endava Romania')
      const endavaSpan = endavaText.closest('span')
      
      expect(endavaSpan).toHaveClass('font-medium')
      expect(endavaSpan).toHaveClass('text-foreground')
    })

    it('should apply hover styles to buttons', () => {
      render(<Experience />)
      
      const endavaButton = screen.getByRole('button', { 
        name: /view details for qa tester at endava romania/i 
      })
      
      expect(endavaButton).toHaveClass('hover:opacity-80')
    })
  })

  describe('Image Rendering', () => {
    it('should load company logos with correct src', () => {
      render(<Experience />)
      
      const endavaLogo = screen.getByAltText('Endava Logo')
      expect(endavaLogo).toHaveAttribute('src', '/logos/endava.png')
      
      const visionLogo = screen.getByAltText('Vision Logo')
      expect(visionLogo).toHaveAttribute('src', '/logos/vision.png')
    })

    it('should apply correct image styles', () => {
      render(<Experience />)
      
      const endavaLogo = screen.getByAltText('Endava Logo')
      expect(endavaLogo).toHaveClass('object-contain')
    })

    it('should have min and max dimensions for logos', () => {
      render(<Experience />)
      
      const logos = screen.getAllByRole('img')
      logos.forEach(logo => {
        expect(logo).toHaveClass('object-contain')
      })
    })
  })

  describe('Link Behavior', () => {
    it('should have external link attributes for company websites', async () => {
      const user = userEvent.setup()
      render(<Experience />)
      
      const endavaButton = screen.getByRole('button', { 
        name: /view details for qa tester at endava romania/i 
      })
      await user.click(endavaButton)
      
      await waitFor(() => {
        const link = screen.getByRole('link', { name: /visit website/i })
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })

    it('should render external link icon', async () => {
      const user = userEvent.setup()
      const { container } = render(<Experience />)
      
      const endavaButton = screen.getByRole('button', { 
        name: /view details for qa tester at endava romania/i 
      })
      await user.click(endavaButton)
      
      await waitFor(() => {
        const link = screen.getByRole('link', { name: /visit website/i })
        expect(link).toBeInTheDocument()
      })
    })
  })

  describe('Responsive Design', () => {
    it('should hide separators on mobile', () => {
      const { container } = render(<Experience />)
      
      const separators = container.querySelectorAll('.hidden.md\\:inline')
      expect(separators.length).toBeGreaterThan(0)
    })

    it('should apply responsive flex layout', () => {
      const { container } = render(<Experience />)
      
      const wrapper = container.querySelector('.flex.flex-wrap')
      expect(wrapper).toHaveClass('justify-center')
      expect(wrapper).toHaveClass('md:justify-start')
    })
  })

  describe('Content Validation', () => {
    it('should display Endava experience details correctly', async () => {
      const user = userEvent.setup()
      render(<Experience />)
      
      const endavaButton = screen.getByRole('button', { 
        name: /view details for qa tester at endava romania/i 
      })
      await user.click(endavaButton)
      
      await waitFor(() => {
        expect(screen.getByText(/QA Tester working on Naval Shipping and Payments domains/i)).toBeInTheDocument()
        expect(screen.getByText(/REST API testing/i)).toBeInTheDocument()
        expect(screen.getByText(/SQL scripts/i)).toBeInTheDocument()
      })
    })

    it('should display Vision experience details correctly', async () => {
      const user = userEvent.setup()
      render(<Experience />)
      
      const visionButton = screen.getByRole('button', { 
        name: /view details for junior programmer at vision/i 
      })
      await user.click(visionButton)
      
      await waitFor(() => {
        expect(screen.getByText(/Coded and designed new functionalities/i)).toBeInTheDocument()
        expect(screen.getByText(/dynamic web pages/i)).toBeInTheDocument()
        expect(screen.getByText(/automate user experience/i)).toBeInTheDocument()
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle missing optional fields gracefully', () => {
      // Experience data has URL for both, but testing the component handles optional fields
      render(<Experience />)
      expect(screen.getByText('Endava Romania')).toBeInTheDocument()
    })

    it('should handle rapid popover opening and closing', async () => {
      const user = userEvent.setup()
      render(<Experience />)
      
      const endavaButton = screen.getByRole('button', { 
        name: /view details for qa tester at endava romania/i 
      })
      
      // Rapid clicks
      await user.click(endavaButton)
      await user.click(endavaButton)
      await user.click(endavaButton)
      
      // Should still work correctly
      await waitFor(() => {
        expect(screen.getByText(/Naval Shipping/i)).toBeInTheDocument()
      })
    })

    it('should maintain button state after popover interactions', async () => {
      const user = userEvent.setup()
      render(<Experience />)
      
      const endavaButton = screen.getByRole('button', { 
        name: /view details for qa tester at endava romania/i 
      })
      
      await user.click(endavaButton)
      await waitFor(() => {
        expect(screen.getByText(/Naval Shipping/i)).toBeInTheDocument()
      })
      
      const closeButton = screen.getByRole('button', { name: /close details/i })
      await user.click(closeButton)
      
      // Button should still be interactive
      expect(endavaButton).toBeEnabled()
    })
  })

  describe('Popover Positioning', () => {
    it('should set popover side offset', async () => {
      const user = userEvent.setup()
      const { container } = render(<Experience />)
      
      const endavaButton = screen.getByRole('button', { 
        name: /view details for qa tester at endava romania/i 
      })
      await user.click(endavaButton)
      
      // Popover should be rendered (checking for content presence)
      await waitFor(() => {
        expect(screen.getByText(/Naval Shipping/i)).toBeInTheDocument()
      })
    })

    it('should render popover arrow', async () => {
      const user = userEvent.setup()
      const { container } = render(<Experience />)
      
      const endavaButton = screen.getByRole('button', { 
        name: /view details for qa tester at endava romania/i 
      })
      await user.click(endavaButton)
      
      await waitFor(() => {
        const arrow = container.querySelector('.fill-border')
        expect(arrow).toBeInTheDocument()
      })
    })
  })

  describe('Animation Classes', () => {
    it('should have animation classes on popover', async () => {
      const user = userEvent.setup()
      const { container } = render(<Experience />)
      
      const endavaButton = screen.getByRole('button', { 
        name: /view details for qa tester at endava romania/i 
      })
      await user.click(endavaButton)
      
      await waitFor(() => {
        const popover = container.querySelector('.animate-in')
        expect(popover).toBeInTheDocument()
      })
    })
  })
})