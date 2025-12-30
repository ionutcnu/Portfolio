import React from 'react'
import { render } from '@testing-library/react'
import { Separator } from '@/components/ui/separator'

describe('Separator Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      const { container } = render(<Separator />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should render with default props', () => {
      const { container } = render(<Separator />)
      const separator = container.firstChild as HTMLElement
      expect(separator).toHaveClass('shrink-0', 'bg-border')
    })
  })

  describe('Orientation', () => {
    it('should render horizontal separator by default', () => {
      const { container } = render(<Separator />)
      const separator = container.firstChild as HTMLElement
      expect(separator).toHaveClass('h-[1px]', 'w-full')
    })

    it('should render horizontal separator when explicitly set', () => {
      const { container } = render(<Separator orientation="horizontal" />)
      const separator = container.firstChild as HTMLElement
      expect(separator).toHaveClass('h-[1px]', 'w-full')
    })

    it('should render vertical separator', () => {
      const { container } = render(<Separator orientation="vertical" />)
      const separator = container.firstChild as HTMLElement
      expect(separator).toHaveClass('h-full', 'w-[1px]')
    })

    it('should not have horizontal classes when vertical', () => {
      const { container } = render(<Separator orientation="vertical" />)
      const separator = container.firstChild as HTMLElement
      expect(separator).not.toHaveClass('h-[1px]', 'w-full')
    })
  })

  describe('Decorative Property', () => {
    it('should be decorative by default', () => {
      const { container } = render(<Separator />)
      const separator = container.firstChild as HTMLElement
      expect(separator).toHaveAttribute('data-orientation')
    })

    it('should accept decorative prop', () => {
      const { container } = render(<Separator decorative={true} />)
      expect(container.firstChild).toBeInTheDocument()
    })

    it('should accept non-decorative prop', () => {
      const { container } = render(<Separator decorative={false} />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Custom Styling', () => {
    it('should accept custom className', () => {
      const { container } = render(<Separator className="custom-class" />)
      const separator = container.firstChild as HTMLElement
      expect(separator).toHaveClass('custom-class')
    })

    it('should merge custom className with default classes', () => {
      const { container } = render(<Separator className="my-custom-class" />)
      const separator = container.firstChild as HTMLElement
      expect(separator).toHaveClass('my-custom-class')
      expect(separator).toHaveClass('shrink-0')
      expect(separator).toHaveClass('bg-border')
    })

    it('should allow custom className to override styles', () => {
      const { container } = render(<Separator className="bg-red-500" />)
      const separator = container.firstChild as HTMLElement
      expect(separator).toHaveClass('bg-red-500')
    })
  })

  describe('Additional Props', () => {
    it('should forward additional props', () => {
      const { container } = render(
        <Separator data-testid="my-separator" aria-label="Test separator" />
      )
      const separator = container.firstChild as HTMLElement
      expect(separator).toHaveAttribute('data-testid', 'my-separator')
      expect(separator).toHaveAttribute('aria-label', 'Test separator')
    })

    it('should handle style prop', () => {
      const { container } = render(<Separator style={{ margin: '10px' }} />)
      const separator = container.firstChild as HTMLElement
      expect(separator).toHaveStyle({ margin: '10px' })
    })

    it('should handle id prop', () => {
      const { container } = render(<Separator id="my-separator" />)
      const separator = container.firstChild as HTMLElement
      expect(separator).toHaveAttribute('id', 'my-separator')
    })
  })

  describe('Ref Forwarding', () => {
    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<Separator ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLElement)
    })

    it('should allow ref manipulation', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<Separator ref={ref} />)
      expect(ref.current).not.toBeNull()
      expect(ref.current?.classList.contains('shrink-0')).toBe(true)
    })
  })

  describe('Radix UI Integration', () => {
    it('should set data-orientation attribute', () => {
      const { container } = render(<Separator orientation="horizontal" />)
      const separator = container.firstChild as HTMLElement
      expect(separator).toHaveAttribute('data-orientation', 'horizontal')
    })

    it('should set vertical data-orientation', () => {
      const { container } = render(<Separator orientation="vertical" />)
      const separator = container.firstChild as HTMLElement
      expect(separator).toHaveAttribute('data-orientation', 'vertical')
    })
  })

  describe('Display Name', () => {
    it('should have proper display name from Radix', () => {
      expect(Separator.displayName).toBeTruthy()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty className', () => {
      const { container } = render(<Separator className="" />)
      const separator = container.firstChild as HTMLElement
      expect(separator).toHaveClass('shrink-0')
    })

    it('should handle undefined orientation gracefully', () => {
      const { container } = render(<Separator orientation={undefined} />)
      const separator = container.firstChild as HTMLElement
      // Should default to horizontal
      expect(separator).toHaveClass('h-[1px]', 'w-full')
    })

    it('should handle multiple class names', () => {
      const { container } = render(
        <Separator className="class1 class2 class3" />
      )
      const separator = container.firstChild as HTMLElement
      expect(separator).toHaveClass('class1', 'class2', 'class3')
    })
  })

  describe('Accessibility', () => {
    it('should have proper role when not decorative', () => {
      const { container } = render(<Separator decorative={false} />)
      const separator = container.firstChild as HTMLElement
      expect(separator).toHaveAttribute('role', 'separator')
    })

    it('should be semantically correct', () => {
      const { container } = render(<Separator />)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  describe('Layout Behavior', () => {
    it('should not shrink when space is limited', () => {
      const { container } = render(<Separator />)
      const separator = container.firstChild as HTMLElement
      expect(separator).toHaveClass('shrink-0')
    })

    it('should take full width when horizontal', () => {
      const { container } = render(<Separator orientation="horizontal" />)
      const separator = container.firstChild as HTMLElement
      expect(separator).toHaveClass('w-full')
    })

    it('should take full height when vertical', () => {
      const { container } = render(<Separator orientation="vertical" />)
      const separator = container.firstChild as HTMLElement
      expect(separator).toHaveClass('h-full')
    })
  })

  describe('Component Composition', () => {
    it('should work within a flex container', () => {
      const { container } = render(
        <div className="flex">
          <div>Content 1</div>
          <Separator orientation="vertical" />
          <div>Content 2</div>
        </div>
      )
      const separator = container.querySelector('.shrink-0')
      expect(separator).toBeInTheDocument()
    })

    it('should work within a grid', () => {
      const { container } = render(
        <div className="grid">
          <div>Content 1</div>
          <Separator />
          <div>Content 2</div>
        </div>
      )
      const separator = container.querySelector('.bg-border')
      expect(separator).toBeInTheDocument()
    })
  })
})