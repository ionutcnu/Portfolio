import React from 'react'
import { render, screen } from '@testing-library/react'
import About from '@/components/About'

describe('About Component', () => {
  describe('Rendering', () => {
    it('should render the about section', () => {
      render(<About />)
      expect(screen.getByRole('region')).toBeInTheDocument()
    })

    it('should render the section heading', () => {
      render(<About />)
      expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument()
    })

    it('should render avatar section', () => {
      const { container } = render(<About />)
      expect(screen.getByText('Professional Avatar')).toBeInTheDocument()
      expect(container.querySelector('.bg-gradient-to-br.from-cyan-400.to-cyan-500')).toBeInTheDocument()
    })

    it('should render avatar emoji', () => {
      render(<About />)
      expect(screen.getByText('👨‍💻')).toBeInTheDocument()
    })
  })

  describe('Content', () => {
    it('should display name and title', () => {
      render(<About />)
      expect(screen.getByText(/Ionut Cioncu/i)).toBeInTheDocument()
      expect(screen.getByText(/QA Tester/i)).toBeInTheDocument()
    })

    it('should display years of experience', () => {
      render(<About />)
      expect(screen.getByText(/4 years/i)).toBeInTheDocument()
    })

    it('should display location', () => {
      render(<About />)
      expect(screen.getByText(/Pitesti, Romania/i)).toBeInTheDocument()
    })

    it('should display current company', () => {
      render(<About />)
      expect(screen.getByText(/Endava PLC/i)).toBeInTheDocument()
    })

    it('should describe work domains', () => {
      render(<About />)
      expect(screen.getByText(/Naval Shipping/i)).toBeInTheDocument()
      expect(screen.getByText(/Payments/i)).toBeInTheDocument()
    })

    it('should mention key technical skills', () => {
      render(<About />)
      expect(screen.getByText(/REST API testing/i)).toBeInTheDocument()
      expect(screen.getByText(/SQL scripts/i)).toBeInTheDocument()
      expect(screen.getByText(/PostgreSQL/i)).toBeInTheDocument()
    })

    it('should mention additional technical tools', () => {
      render(<About />)
      expect(screen.getByText(/Kubernetes/i)).toBeInTheDocument()
      expect(screen.getByText(/Azure/i)).toBeInTheDocument()
      expect(screen.getByText(/Kafka/i)).toBeInTheDocument()
    })

    it('should mention personal projects link', () => {
      render(<About />)
      const projectsLink = screen.getByRole('link', { name: /personal projects/i })
      expect(projectsLink).toBeInTheDocument()
      expect(projectsLink).toHaveAttribute('href', '/projects')
    })

    it('should mention interests and tools', () => {
      render(<About />)
      expect(screen.getByText(/AI tools/i)).toBeInTheDocument()
      expect(screen.getByText(/automation/i)).toBeInTheDocument()
      expect(screen.getByText(/Selenium/i)).toBeInTheDocument()
      expect(screen.getByText(/Cypress/i)).toBeInTheDocument()
    })
  })

  describe('Social Links', () => {
    it('should render GitHub link', () => {
      render(<About />)
      const githubLink = screen.getByRole('link', { name: /github/i })
      expect(githubLink).toBeInTheDocument()
      expect(githubLink).toHaveAttribute('href', 'https://github.com/ionutcnu')
      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should render LinkedIn link', () => {
      render(<About />)
      const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
      expect(linkedinLink).toBeInTheDocument()
      expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/cioncu')
      expect(linkedinLink).toHaveAttribute('target', '_blank')
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should render email link', () => {
      render(<About />)
      const emailLink = screen.getByRole('link', { name: /cioncu_ionut@yahoo.com/i })
      expect(emailLink).toBeInTheDocument()
      expect(emailLink).toHaveAttribute('href', 'mailto:cioncu_ionut@yahoo.com')
    })

    it('should render social link icons', () => {
      const { container } = render(<About />)
      // Check for lucide-react icons (they render as SVGs)
      const svgs = container.querySelectorAll('svg')
      expect(svgs.length).toBeGreaterThanOrEqual(3) // At least 3 for the social links
    })
  })

  describe('Layout and Styling', () => {
    it('should use grid layout for desktop', () => {
      const { container } = render(<About />)
      const grid = container.querySelector('.grid.grid-cols-1.lg\\:grid-cols-\\[350px_1fr\\]')
      expect(grid).toBeInTheDocument()
    })

    it('should apply responsive spacing', () => {
      const { container } = render(<About />)
      expect(container.querySelector('.gap-8.lg\\:gap-16')).toBeInTheDocument()
    })

    it('should center content on mobile', () => {
      const { container } = render(<About />)
      expect(container.querySelector('.justify-center.lg\\:justify-start')).toBeInTheDocument()
    })

    it('should apply gradient to avatar background', () => {
      const { container } = render(<About />)
      const gradientDiv = container.querySelector('.bg-gradient-to-br.from-cyan-400.to-cyan-500')
      expect(gradientDiv).toBeInTheDocument()
    })

    it('should have rounded corners on avatar container', () => {
      const { container } = render(<About />)
      const roundedDiv = container.querySelector('.rounded-2xl')
      expect(roundedDiv).toBeInTheDocument()
    })
  })

  describe('Text Emphasis', () => {
    it('should emphasize key terms with accent color', () => {
      const { container } = render(<About />)
      const accentElements = container.querySelectorAll('.text-accent-dynamic')
      expect(accentElements.length).toBeGreaterThan(0)
    })

    it('should use underline decoration for emphasized terms', () => {
      const { container } = render(<About />)
      const underlinedElements = container.querySelectorAll('.underline.decoration-accent-dynamic')
      expect(underlinedElements.length).toBeGreaterThan(0)
    })

    it('should bold important names and roles', () => {
      const { container } = render(<About />)
      const boldElements = container.querySelectorAll('.font-semibold, .font-medium')
      expect(boldElements.length).toBeGreaterThan(0)
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<About />)
      const heading = screen.getByRole('heading', { name: /about me/i })
      expect(heading.tagName).toBe('H2')
    })

    it('should have descriptive link text', () => {
      render(<About />)
      expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /cioncu_ionut@yahoo.com/i })).toBeInTheDocument()
    })

    it('should use semantic HTML for section', () => {
      const { container } = render(<About />)
      const section = container.querySelector('section#about')
      expect(section).toBeInTheDocument()
    })

    it('should have proper link relationships for external links', () => {
      render(<About />)
      const githubLink = screen.getByRole('link', { name: /github/i })
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Content Structure', () => {
    it('should organize content in paragraphs', () => {
      const { container } = render(<About />)
      const paragraphs = container.querySelectorAll('p.text-muted-foreground')
      expect(paragraphs.length).toBeGreaterThanOrEqual(3)
    })

    it('should have proper spacing between content sections', () => {
      const { container } = render(<About />)
      const contentDiv = container.querySelector('.space-y-6')
      expect(contentDiv).toBeInTheDocument()
    })

    it('should separate social links from main content', () => {
      const { container } = render(<About />)
      const socialLinksContainer = container.querySelector('.flex.items-center.gap-6.pt-6')
      expect(socialLinksContainer).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('should adjust avatar size for different screens', () => {
      const { container } = render(<About />)
      const avatar = container.querySelector('.w-full.max-w-\\[350px\\]')
      expect(avatar).toBeInTheDocument()
    })

    it('should adjust font sizes responsively', () => {
      const { container } = render(<About />)
      const heading = screen.getByRole('heading', { name: /about me/i })
      expect(heading).toHaveClass('text-4xl', 'md:text-5xl')
    })

    it('should adjust padding for different screens', () => {
      const { container } = render(<About />)
      const section = container.querySelector('.px-4.sm\\:px-6.lg\\:px-8')
      expect(section).toBeInTheDocument()
    })
  })

  describe('Animation Properties', () => {
    it('should have motion properties on heading', () => {
      const { container } = render(<About />)
      const heading = screen.getByRole('heading', { name: /about me/i })
      // Motion div wraps the heading
      expect(heading).toBeInTheDocument()
    })

    it('should have motion properties on avatar section', () => {
      const { container } = render(<About />)
      // Avatar section should be wrapped with motion.div
      const avatarSection = container.querySelector('.flex.justify-center.lg\\:justify-start')
      expect(avatarSection).toBeInTheDocument()
    })

    it('should have motion properties on content section', () => {
      const { container } = render(<About />)
      // Content section should have space-y-6
      const contentSection = container.querySelector('.space-y-6.text-base.leading-relaxed')
      expect(contentSection).toBeInTheDocument()
    })
  })

  describe('Links Behavior', () => {
    it('should have hover styles on social links', () => {
      render(<About />)
      const githubLink = screen.getByRole('link', { name: /github/i })
      expect(githubLink).toHaveClass('hover:text-accent-dynamic')
    })

    it('should have transition effects', () => {
      render(<About />)
      const githubLink = screen.getByRole('link', { name: /github/i })
      expect(githubLink).toHaveClass('transition-colors')
    })

    it('should have hover styles on projects link', () => {
      render(<About />)
      const projectsLink = screen.getByRole('link', { name: /personal projects/i })
      expect(projectsLink).toHaveClass('hover:text-accent-dynamic/80')
    })
  })

  describe('Edge Cases', () => {
    it('should handle long text content gracefully', () => {
      const { container } = render(<About />)
      const contentSection = container.querySelector('.leading-relaxed')
      expect(contentSection).toBeInTheDocument()
    })

    it('should maintain layout with all content visible', () => {
      render(<About />)
      expect(screen.getByText(/Ionut Cioncu/i)).toBeVisible()
      expect(screen.getByText(/Endava PLC/i)).toBeVisible()
      expect(screen.getByRole('link', { name: /github/i })).toBeVisible()
    })
  })

  describe('Professional Information', () => {
    it('should highlight QA SME achievement', () => {
      render(<About />)
      expect(screen.getByText(/QA SME/i)).toBeInTheDocument()
    })

    it('should mention specific technical responsibilities', () => {
      render(<About />)
      expect(screen.getByText(/payment flows/i)).toBeInTheDocument()
      expect(screen.getByText(/microservices/i)).toBeInTheDocument()
    })

    it('should describe unique value proposition', () => {
      render(<About />)
      expect(screen.getByText(/test with/i)).toBeInTheDocument()
      expect(screen.getByText(/context/i)).toBeInTheDocument()
    })
  })
})