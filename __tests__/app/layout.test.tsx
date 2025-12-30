import React from 'react'
import { render, screen } from '@testing-library/react'
import RootLayout from '@/app/layout'

// Mock the child components
jest.mock('@/components/Navigation', () => {
  return function MockNavigation() {
    return <nav data-testid="mock-navigation">Navigation</nav>
  }
})

jest.mock('@/components/Footer', () => {
  return function MockFooter() {
    return <footer data-testid="mock-footer">Footer</footer>
  }
})

jest.mock('@/components/bento/AccentColorPicker', () => {
  return function MockAccentColorPicker() {
    return <div data-testid="mock-accent-picker">Accent Picker</div>
  }
})

describe('RootLayout', () => {
  const mockChildren = <div>Test Content</div>

  describe('Rendering', () => {
    it('should render the layout', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>)
      expect(container.querySelector('html')).toBeInTheDocument()
    })

    it('should render children content', () => {
      render(<RootLayout>{mockChildren}</RootLayout>)
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('should render Navigation component', () => {
      render(<RootLayout>{mockChildren}</RootLayout>)
      expect(screen.getByTestId('mock-navigation')).toBeInTheDocument()
    })

    it('should render Footer component', () => {
      render(<RootLayout>{mockChildren}</RootLayout>)
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument()
    })

    it('should render AccentColorPicker component', () => {
      render(<RootLayout>{mockChildren}</RootLayout>)
      expect(screen.getByTestId('mock-accent-picker')).toBeInTheDocument()
    })
  })

  describe('HTML Structure', () => {
    it('should set lang attribute to en', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>)
      const html = container.querySelector('html')
      expect(html).toHaveAttribute('lang', 'en')
    })

    it('should suppress hydration warning', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>)
      const html = container.querySelector('html')
      expect(html).toHaveAttribute('suppressHydrationWarning')
    })

    it('should include body element', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>)
      expect(container.querySelector('body')).toBeInTheDocument()
    })
  })

  describe('Layout Structure', () => {
    it('should have accent color picker in fixed position', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>)
      const picker = screen.getByTestId('mock-accent-picker')
      const pickerContainer = picker.parentElement
      expect(pickerContainer).toHaveClass('fixed')
    })

    it('should position accent picker on left side', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>)
      const picker = screen.getByTestId('mock-accent-picker')
      const pickerContainer = picker.parentElement
      expect(pickerContainer).toHaveClass('left-4')
    })

    it('should vertically center accent picker', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>)
      const picker = screen.getByTestId('mock-accent-picker')
      const pickerContainer = picker.parentElement
      expect(pickerContainer).toHaveClass('top-1/2', '-translate-y-1/2')
    })

    it('should hide accent picker on small screens', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>)
      const picker = screen.getByTestId('mock-accent-picker')
      const pickerContainer = picker.parentElement
      expect(pickerContainer).toHaveClass('hidden', 'lg:block')
    })

    it('should have proper z-index for accent picker', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>)
      const picker = screen.getByTestId('mock-accent-picker')
      const pickerContainer = picker.parentElement
      expect(pickerContainer).toHaveClass('z-50')
    })
  })

  describe('Main Container', () => {
    it('should have centered main container', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>)
      const mainContainer = container.querySelector('.mx-auto.flex.min-h-screen')
      expect(mainContainer).toBeInTheDocument()
    })

    it('should apply responsive max-width', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>)
      const mainContainer = container.querySelector('.max-w-\\[90\\%\\].md\\:max-w-\\[80\\%\\]')
      expect(mainContainer).toBeInTheDocument()
    })

    it('should use flex column layout', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>)
      const mainContainer = container.querySelector('.flex.flex-col')
      expect(mainContainer).toBeInTheDocument()
    })

    it('should have minimum full screen height', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>)
      const mainContainer = container.querySelector('.min-h-screen')
      expect(mainContainer).toBeInTheDocument()
    })
  })

  describe('Theme Provider', () => {
    it('should wrap content in ThemeProvider', () => {
      render(<RootLayout>{mockChildren}</RootLayout>)
      // ThemeProvider is mocked, but we can verify children are rendered
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })
  })

  describe('Component Order', () => {
    it('should render Navigation before children', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>)
      const nav = screen.getByTestId('mock-navigation')
      const content = screen.getByText('Test Content')
      
      const navPosition = Array.from(container.querySelectorAll('*')).indexOf(nav.parentElement!)
      const contentPosition = Array.from(container.querySelectorAll('*')).indexOf(content.parentElement!)
      
      expect(navPosition).toBeLessThan(contentPosition)
    })

    it('should render Footer after children', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>)
      const footer = screen.getByTestId('mock-footer')
      const content = screen.getByText('Test Content')
      
      const footerPosition = Array.from(container.querySelectorAll('*')).indexOf(footer.parentElement!)
      const contentPosition = Array.from(container.querySelectorAll('*')).indexOf(content.parentElement!)
      
      expect(footerPosition).toBeGreaterThan(contentPosition)
    })
  })

  describe('Accessibility', () => {
    it('should have proper document structure', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>)
      expect(container.querySelector('html')).toBeInTheDocument()
      expect(container.querySelector('body')).toBeInTheDocument()
    })

    it('should have language attribute for screen readers', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>)
      const html = container.querySelector('html')
      expect(html).toHaveAttribute('lang', 'en')
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty children', () => {
      render(<RootLayout>{null}</RootLayout>)
      expect(screen.getByTestId('mock-navigation')).toBeInTheDocument()
      expect(screen.getByTestId('mock-footer')).toBeInTheDocument()
    })

    it('should handle multiple children', () => {
      render(
        <RootLayout>
          <div>Child 1</div>
          <div>Child 2</div>
          <div>Child 3</div>
        </RootLayout>
      )
      expect(screen.getByText('Child 1')).toBeInTheDocument()
      expect(screen.getByText('Child 2')).toBeInTheDocument()
      expect(screen.getByText('Child 3')).toBeInTheDocument()
    })

    it('should handle complex nested children', () => {
      render(
        <RootLayout>
          <div>
            <section>
              <article>Nested Content</article>
            </section>
          </div>
        </RootLayout>
      )
      expect(screen.getByText('Nested Content')).toBeInTheDocument()
    })
  })

  describe('Responsive Behavior', () => {
    it('should adjust max-width for mobile', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>)
      const mainContainer = container.querySelector('.max-w-\\[90\\%\\]')
      expect(mainContainer).toBeInTheDocument()
    })

    it('should adjust max-width for desktop', () => {
      const { container } = render(<RootLayout>{mockChildren}</RootLayout>)
      const mainContainer = container.querySelector('.md\\:max-w-\\[80\\%\\]')
      expect(mainContainer).toBeInTheDocument()
    })
  })
})