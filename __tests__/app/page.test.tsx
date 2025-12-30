import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// Mock all child components
jest.mock('@/components/PortfolioHero', () => {
  return function MockPortfolioHero() {
    return <div data-testid="mock-portfolio-hero">Portfolio Hero</div>
  }
})

jest.mock('@/components/PortfolioProjects', () => {
  return function MockPortfolioProjects() {
    return <div data-testid="mock-portfolio-projects">Portfolio Projects</div>
  }
})

jest.mock('@/components/bento/BentoGrid', () => {
  return function MockBentoGrid({ children }: { children: React.ReactNode }) {
    return <div data-testid="mock-bento-grid">{children}</div>
  }
})

jest.mock('@/components/bento/ContactWidget', () => {
  return function MockContactWidget() {
    return <div data-testid="mock-contact-widget">Contact Widget</div>
  }
})

jest.mock('@/components/bento/StatsWidget', () => {
  return function MockStatsWidget() {
    return <div data-testid="mock-stats-widget">Stats Widget</div>
  }
})

jest.mock('@/components/bento/ClickCounterWidget', () => {
  return function MockClickCounterWidget() {
    return <div data-testid="mock-click-counter-widget">Click Counter Widget</div>
  }
})

jest.mock('@/components/bento/LocationMapWidget', () => {
  return function MockLocationMapWidget() {
    return <div data-testid="mock-location-map-widget">Location Map Widget</div>
  }
})

jest.mock('@/components/bento/RecentCommitsWidget', () => {
  return function MockRecentCommitsWidget() {
    return <div data-testid="mock-recent-commits-widget">Recent Commits Widget</div>
  }
})

jest.mock('@/components/Experience', () => {
  return function MockExperience() {
    return <div data-testid="mock-experience">Experience</div>
  }
})

describe('Home Page', () => {
  describe('Rendering', () => {
    it('should render the home page', () => {
      render(<Home />)
      expect(screen.getByRole('main')).toBeInTheDocument()
    })

    it('should render PortfolioHero component', () => {
      render(<Home />)
      expect(screen.getByTestId('mock-portfolio-hero')).toBeInTheDocument()
    })

    it('should render Experience component', () => {
      render(<Home />)
      expect(screen.getByTestId('mock-experience')).toBeInTheDocument()
    })

    it('should render PortfolioProjects component', () => {
      render(<Home />)
      expect(screen.getByTestId('mock-portfolio-projects')).toBeInTheDocument()
    })

    it('should render BentoGrid component', () => {
      render(<Home />)
      expect(screen.getByTestId('mock-bento-grid')).toBeInTheDocument()
    })
  })

  describe('Widget Rendering', () => {
    it('should render ContactWidget', () => {
      render(<Home />)
      expect(screen.getByTestId('mock-contact-widget')).toBeInTheDocument()
    })

    it('should render StatsWidget', () => {
      render(<Home />)
      expect(screen.getByTestId('mock-stats-widget')).toBeInTheDocument()
    })

    it('should render ClickCounterWidget', () => {
      render(<Home />)
      expect(screen.getByTestId('mock-click-counter-widget')).toBeInTheDocument()
    })

    it('should render LocationMapWidget', () => {
      render(<Home />)
      expect(screen.getByTestId('mock-location-map-widget')).toBeInTheDocument()
    })

    it('should render RecentCommitsWidget', () => {
      render(<Home />)
      expect(screen.getByTestId('mock-recent-commits-widget')).toBeInTheDocument()
    })
  })

  describe('Layout Structure', () => {
    it('should have main element as container', () => {
      const { container } = render(<Home />)
      const main = container.querySelector('main')
      expect(main).toBeInTheDocument()
      expect(main).toHaveClass('flex-1')
    })

    it('should apply proper padding to main', () => {
      const { container } = render(<Home />)
      const main = container.querySelector('main')
      expect(main).toHaveClass('px-0', 'py-8', 'md:px-5')
    })

    it('should have inner container with max-width', () => {
      const { container } = render(<Home />)
      const innerContainer = container.querySelector('.max-w-6xl')
      expect(innerContainer).toBeInTheDocument()
    })

    it('should center content', () => {
      const { container } = render(<Home />)
      const innerContainer = container.querySelector('.mx-auto')
      expect(innerContainer).toBeInTheDocument()
    })

    it('should have proper vertical spacing', () => {
      const { container } = render(<Home />)
      const innerContainer = container.querySelector('.space-y-12.md\\:space-y-16')
      expect(innerContainer).toBeInTheDocument()
    })
  })

  describe('Section Structure', () => {
    it('should have Experience section', () => {
      const { container } = render(<Home />)
      const sections = container.querySelectorAll('section')
      expect(sections.length).toBeGreaterThanOrEqual(2)
    })

    it('should have Projects section', () => {
      render(<Home />)
      expect(screen.getByTestId('mock-portfolio-projects')).toBeInTheDocument()
    })

    it('should have Bento Grid section', () => {
      render(<Home />)
      expect(screen.getByTestId('mock-bento-grid')).toBeInTheDocument()
    })
  })

  describe('Component Order', () => {
    it('should render PortfolioHero first', () => {
      const { container } = render(<Home />)
      const hero = screen.getByTestId('mock-portfolio-hero')
      const experience = screen.getByTestId('mock-experience')
      
      const heroPosition = Array.from(container.querySelectorAll('*')).indexOf(hero)
      const expPosition = Array.from(container.querySelectorAll('*')).indexOf(experience)
      
      expect(heroPosition).toBeLessThan(expPosition)
    })

    it('should render Experience before Projects', () => {
      const { container } = render(<Home />)
      const experience = screen.getByTestId('mock-experience')
      const projects = screen.getByTestId('mock-portfolio-projects')
      
      const expPosition = Array.from(container.querySelectorAll('*')).indexOf(experience)
      const projPosition = Array.from(container.querySelectorAll('*')).indexOf(projects)
      
      expect(expPosition).toBeLessThan(projPosition)
    })

    it('should render Projects before Bento Grid', () => {
      const { container } = render(<Home />)
      const projects = screen.getByTestId('mock-portfolio-projects')
      const bentoGrid = screen.getByTestId('mock-bento-grid')
      
      const projPosition = Array.from(container.querySelectorAll('*')).indexOf(projects)
      const gridPosition = Array.from(container.querySelectorAll('*')).indexOf(bentoGrid)
      
      expect(projPosition).toBeLessThan(gridPosition)
    })
  })

  describe('Bento Grid Widgets Order', () => {
    it('should contain all widgets within BentoGrid', () => {
      render(<Home />)
      const bentoGrid = screen.getByTestId('mock-bento-grid')
      
      expect(bentoGrid).toContainElement(screen.getByTestId('mock-contact-widget'))
      expect(bentoGrid).toContainElement(screen.getByTestId('mock-stats-widget'))
      expect(bentoGrid).toContainElement(screen.getByTestId('mock-click-counter-widget'))
      expect(bentoGrid).toContainElement(screen.getByTestId('mock-location-map-widget'))
      expect(bentoGrid).toContainElement(screen.getByTestId('mock-recent-commits-widget'))
    })
  })

  describe('Responsive Design', () => {
    it('should have responsive padding', () => {
      const { container } = render(<Home />)
      const main = container.querySelector('main')
      expect(main).toHaveClass('px-0', 'md:px-5')
    })

    it('should have responsive spacing between sections', () => {
      const { container } = render(<Home />)
      const innerContainer = container.querySelector('.space-y-12')
      expect(innerContainer).toHaveClass('md:space-y-16')
    })

    it('should have responsive inner padding', () => {
      const { container } = render(<Home />)
      const innerContainer = container.querySelector('.px-0.md\\:px-4')
      expect(innerContainer).toBeInTheDocument()
    })

    it('should have responsive vertical padding', () => {
      const { container } = render(<Home />)
      const innerContainer = container.querySelector('.py-8.md\\:py-12')
      expect(innerContainer).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should use semantic main element', () => {
      render(<Home />)
      const main = screen.getByRole('main')
      expect(main).toBeInTheDocument()
    })

    it('should use semantic section elements', () => {
      const { container } = render(<Home />)
      const sections = container.querySelectorAll('section')
      expect(sections.length).toBeGreaterThan(0)
    })
  })

  describe('Content Structure', () => {
    it('should have all major sections present', () => {
      render(<Home />)
      
      // Hero section
      expect(screen.getByTestId('mock-portfolio-hero')).toBeInTheDocument()
      
      // Experience section
      expect(screen.getByTestId('mock-experience')).toBeInTheDocument()
      
      // Projects section
      expect(screen.getByTestId('mock-portfolio-projects')).toBeInTheDocument()
      
      // Interactive widgets section
      expect(screen.getByTestId('mock-bento-grid')).toBeInTheDocument()
    })

    it('should render all interactive widgets', () => {
      render(<Home />)
      
      expect(screen.getByTestId('mock-contact-widget')).toBeInTheDocument()
      expect(screen.getByTestId('mock-stats-widget')).toBeInTheDocument()
      expect(screen.getByTestId('mock-click-counter-widget')).toBeInTheDocument()
      expect(screen.getByTestId('mock-location-map-widget')).toBeInTheDocument()
      expect(screen.getByTestId('mock-recent-commits-widget')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle rendering without errors', () => {
      expect(() => render(<Home />)).not.toThrow()
    })

    it('should maintain layout with all components', () => {
      const { container } = render(<Home />)
      const main = container.querySelector('main')
      expect(main?.children.length).toBeGreaterThan(0)
    })
  })

  describe('Client-side Rendering', () => {
    it('should be marked as client component', () => {
      // The component uses "use client" directive
      // This test verifies the component renders correctly
      const { container } = render(<Home />)
      expect(container.querySelector('main')).toBeInTheDocument()
    })
  })
})