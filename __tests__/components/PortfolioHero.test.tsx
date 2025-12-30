import React from 'react'
import { render, screen } from '@testing-library/react'
import PortfolioHero from '@/components/PortfolioHero'

describe('PortfolioHero Component', () => {
  describe('Rendering', () => {
    it('should render the hero heading', () => {
      render(<PortfolioHero />)
      expect(screen.getByRole('heading', { name: /ionut cioncu/i })).toBeInTheDocument()
    })

    it('should render the job title', () => {
      render(<PortfolioHero />)
      expect(screen.getByText(/QA Tester/i)).toBeInTheDocument()
    })

    it('should render current company information', () => {
      render(<PortfolioHero />)
      expect(screen.getByText(/Endava Romania/i)).toBeInTheDocument()
    })

    it('should render the description paragraph', () => {
      render(<PortfolioHero />)
      expect(screen.getByText(/I'm in QA, but people say I think like a Business Analyst/i)).toBeInTheDocument()
    })
  })

  describe('Links', () => {
    it('should render GitHub link', () => {
      render(<PortfolioHero />)
      const githubLink = screen.getByRole('link', { name: /github/i })
      expect(githubLink).toBeInTheDocument()
      expect(githubLink).toHaveAttribute('href', 'https://github.com/ionutcnu')
      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should render LinkedIn link', () => {
      render(<PortfolioHero />)
      const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
      expect(linkedinLink).toBeInTheDocument()
      expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/cioncu/')
      expect(linkedinLink).toHaveAttribute('target', '_blank')
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should render About link', () => {
      render(<PortfolioHero />)
      const aboutLink = screen.getByRole('link', { name: /learn more/i })
      expect(aboutLink).toBeInTheDocument()
      expect(aboutLink).toHaveAttribute('href', '/about')
    })

    it('should render Endava company link', () => {
      render(<PortfolioHero />)
      const endavaLink = screen.getByRole('link', { name: /endava romania/i })
      expect(endavaLink).toBeInTheDocument()
      expect(endavaLink).toHaveAttribute('href', 'https://www.endava.com/')
      expect(endavaLink).toHaveAttribute('target', '_blank')
      expect(endavaLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Content Styling', () => {
    it('should style company link with hover effects', () => {
      render(<PortfolioHero />)
      const endavaLink = screen.getByRole('link', { name: /endava romania/i })
      expect(endavaLink).toHaveClass('underline', 'decoration-dashed')
    })

    it('should apply responsive max-width to description', () => {
      const { container } = render(<PortfolioHero />)
      const description = container.querySelector('.max-w-prose')
      expect(description).toBeInTheDocument()
    })

    it('should use proper text colors', () => {
      const { container } = render(<PortfolioHero />)
      const description = container.querySelector('.text-gray-400')
      expect(description).toBeInTheDocument()
    })
  })

  describe('Company Display', () => {
    it('should display current company', () => {
      render(<PortfolioHero />)
      expect(screen.getByText(/Endava Romania/i)).toBeInTheDocument()
    })

    it('should not display past company in main text', () => {
      render(<PortfolioHero />)
      // Vision should not be prominently displayed in hero
      expect(screen.queryByText(/Vision/i)).not.toBeInTheDocument()
    })
  })

  describe('Description Content', () => {
    it('should describe QA approach', () => {
      render(<PortfolioHero />)
      expect(screen.getByText(/test real business scenarios/i)).toBeInTheDocument()
    })

    it('should mention testing philosophy', () => {
      render(<PortfolioHero />)
      expect(screen.getByText(/beyond the happy path/i)).toBeInTheDocument()
      expect(screen.getByText(/edge cases/i)).toBeInTheDocument()
    })

    it('should mention problem-solving mindset', () => {
      render(<PortfolioHero />)
      expect(screen.getByText(/building the right thing/i)).toBeInTheDocument()
    })
  })

  describe('Navigation Links Layout', () => {
    it('should render links in a flex container', () => {
      const { container } = render(<PortfolioHero />)
      const linksContainer = container.querySelector('.flex.flex-wrap.items-center')
      expect(linksContainer).toBeInTheDocument()
    })

    it('should separate links with dividers', () => {
      render(<PortfolioHero />)
      const dividers = screen.getAllByText('|')
      expect(dividers.length).toBeGreaterThanOrEqual(1)
    })

    it('should apply proper spacing to links', () => {
      const { container } = render(<PortfolioHero />)
      const linksContainer = container.querySelector('.gap-x-4')
      expect(linksContainer).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should use semantic heading', () => {
      render(<PortfolioHero />)
      const heading = screen.getByRole('heading', { name: /ionut cioncu/i })
      expect(heading.tagName).toBe('H1')
    })

    it('should have proper link relationships', () => {
      render(<PortfolioHero />)
      const externalLinks = [
        screen.getByRole('link', { name: /github/i }),
        screen.getByRole('link', { name: /linkedin/i }),
        screen.getByRole('link', { name: /endava romania/i }),
      ]
      
      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      })
    })

    it('should have descriptive link text', () => {
      render(<PortfolioHero />)
      expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /learn more/i })).toBeInTheDocument()
    })
  })

  describe('Icon Rendering', () => {
    it('should render social media icons', () => {
      const { container } = render(<PortfolioHero />)
      const svgs = container.querySelectorAll('svg')
      expect(svgs.length).toBeGreaterThanOrEqual(2) // At least GitHub and LinkedIn icons
    })

    it('should render arrow icon for About link', () => {
      const { container } = render(<PortfolioHero />)
      const aboutLink = screen.getByRole('link', { name: /learn more/i })
      const svg = aboutLink.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })

  describe('Hover Effects', () => {
    it('should have hover styles on social links', () => {
      render(<PortfolioHero />)
      const githubLink = screen.getByRole('link', { name: /github/i })
      expect(githubLink).toHaveClass('hover:text-[#e5a54b]')
    })

    it('should have hover styles on about link', () => {
      render(<PortfolioHero />)
      const aboutLink = screen.getByRole('link', { name: /learn more/i })
      expect(aboutLink).toHaveClass('hover:text-[#e5a54b]')
    })

    it('should have transition effects', () => {
      render(<PortfolioHero />)
      const githubLink = screen.getByRole('link', { name: /github/i })
      expect(githubLink).toHaveClass('transition-colors')
    })
  })

  describe('Text Emphasis', () => {
    it('should emphasize current working status', () => {
      render(<PortfolioHero />)
      expect(screen.getByText(/currently working/i)).toBeInTheDocument()
    })

    it('should highlight company with special styling', () => {
      render(<PortfolioHero />)
      const endavaLink = screen.getByRole('link', { name: /endava romania/i })
      expect(endavaLink).toHaveClass('text-[#e5a54b]/85')
    })
  })

  describe('Layout and Spacing', () => {
    it('should apply proper vertical spacing', () => {
      const { container } = render(<PortfolioHero />)
      // Check for spacing between elements
      expect(container.querySelector('.leading-relaxed')).toBeInTheDocument()
    })

    it('should limit description width', () => {
      const { container } = render(<PortfolioHero />)
      expect(container.querySelector('.max-w-prose')).toBeInTheDocument()
    })

    it('should apply padding to links section', () => {
      const { container } = render(<PortfolioHero />)
      expect(container.querySelector('.pt-2')).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('should wrap links on smaller screens', () => {
      const { container } = render(<PortfolioHero />)
      expect(container.querySelector('.flex-wrap')).toBeInTheDocument()
    })

    it('should apply responsive gap spacing', () => {
      const { container } = render(<PortfolioHero />)
      expect(container.querySelector('.gap-y-2')).toBeInTheDocument()
    })
  })

  describe('Visual Hierarchy', () => {
    it('should use appropriate text sizes', () => {
      render(<PortfolioHero />)
      const heading = screen.getByRole('heading', { name: /ionut cioncu/i })
      expect(heading).toHaveClass('text-5xl')
    })

    it('should differentiate link styles', () => {
      render(<PortfolioHero />)
      const dividers = screen.getAllByText('|')
      dividers.forEach(divider => {
        expect(divider).toHaveClass('text-gray-700')
      })
    })
  })

  describe('Content Integrity', () => {
    it('should display complete professional description', () => {
      render(<PortfolioHero />)
      const description = screen.getByText(/I'm in QA, but people say I think like a Business Analyst/i)
      expect(description).toBeInTheDocument()
    })

    it('should maintain consistent branding', () => {
      render(<PortfolioHero />)
      // Check for consistent color usage
      const links = screen.getAllByRole('link')
      const externalLinks = links.filter(link => 
        link.getAttribute('target') === '_blank'
      )
      expect(externalLinks.length).toBeGreaterThan(0)
    })
  })
})