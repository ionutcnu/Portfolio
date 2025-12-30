# Test Suite Documentation

This document describes the comprehensive test suite for the Portfolio project.

## Overview

The test suite provides extensive coverage for all components and utilities that were modified in the current branch, with over **550 test cases** covering happy paths, edge cases, error handling, and accessibility.

## Test Framework

- **Jest 29.7.0** - Testing framework
- **React Testing Library 14.1.2** - React component testing utilities
- **@testing-library/user-event 14.5.1** - User interaction simulation
- **@testing-library/jest-dom 6.1.5** - Custom Jest matchers for DOM

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (useful during development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Coverage Thresholds

The project enforces minimum coverage thresholds:
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

## Test Files

### Component Tests

#### 1. Navigation Component (`__tests__/components/Navigation.test.tsx`)
**167 test cases covering:**
- Basic rendering and navigation items
- Breadcrumb generation and display
- Typing animation for path changes
- Interactive path editing with keyboard navigation
- Mobile menu toggling
- Accessibility features (ARIA labels, keyboard navigation)
- Edge cases (empty paths, special characters, rapid changes)

**Key Features Tested:**
- Real-time typing animation
- Editable breadcrumb navigation
- Enter key to navigate, Escape to cancel
- Blur to exit edit mode
- Dynamic input width adjustment
- Path normalization (adding leading slash)

#### 2. Experience Component (`__tests__/components/Experience.test.tsx`)
**88 test cases covering:**
- Company logo and information rendering
- Date formatting (Month Year format)
- Popover interactions (open/close)
- Current vs past position styling
- External links with proper attributes
- Accessibility (ARIA labels, keyboard navigation)
- Responsive design adjustments

**Key Features Tested:**
- Radix UI Popover integration
- Calendar icon and date ranges
- "Present" for current positions
- Company website links
- Visual distinction for past roles
- Hover and focus states

#### 3. About Component (`__tests__/components/About.test.tsx`)
**73 test cases covering:**
- Avatar section rendering
- Professional biography content
- Social media links (GitHub, LinkedIn, Email)
- Text emphasis and styling
- Grid layout responsiveness
- Framer Motion animations
- Link hover effects

**Key Features Tested:**
- Gradient avatar background
- Multi-paragraph content structure
- External link attributes
- Accent color highlights
- Responsive grid layout
- Icon rendering

#### 4. PortfolioHero Component (`__tests__/components/PortfolioHero.test.tsx`)
**47 test cases covering:**
- Heading and job title
- Company information and links
- Description paragraph
- Social media navigation
- Link styling and hover effects
- Responsive layout
- Icon rendering

**Key Features Tested:**
- External link relationships
- Hover transition effects
- Text color and emphasis
- Link separators
- Responsive spacing

#### 5. Separator UI Component (`__tests__/components/ui/Separator.test.tsx`)
**38 test cases covering:**
- Horizontal and vertical orientation
- Custom className merging
- Ref forwarding
- Radix UI integration
- Decorative property handling
- Accessibility roles
- Style overrides

**Key Features Tested:**
- Default horizontal orientation
- Configurable decorative prop
- CSS class merging with cn()
- Data attributes from Radix
- Layout behavior (shrink-0)

### API Tests

#### 6. GitHub API (`__tests__/lib/api/github.test.ts`)
**68 test cases covering:**
- Successful API calls
- Event filtering (PushEvent only)
- Commit data transformation
- Language statistics aggregation
- Authorization header handling
- Error handling and fallback data
- Network error resilience
- Caching configuration

**Key Features Tested:**
- Fetch with GitHub token
- Event filtering and limiting
- SHA truncation to 7 characters
- Repo name extraction
- Language color mapping
- Fallback data on errors
- Language sorting by size

### App Tests

#### 7. Layout Component (`__tests__/app/layout.test.tsx`)
**31 test cases covering:**
- HTML structure and attributes
- Component composition (Navigation, Footer, AccentColorPicker)
- Layout positioning (fixed sidebar)
- Main container styling
- Responsive max-width
- Component ordering
- Theme provider integration

**Key Features Tested:**
- Fixed accent picker sidebar
- Responsive container width
- Vertical centering
- z-index stacking
- Component nesting

#### 8. Home Page Component (`__tests__/app/page.test.tsx`)
**40 test cases covering:**
- All widget rendering
- Component order verification
- Layout structure
- Responsive padding and spacing
- BentoGrid integration
- Semantic HTML structure

**Key Features Tested:**
- Section organization
- Widget composition
- Responsive design classes
- Content hierarchy
- Main element structure

## Test Utilities and Mocking

### Global Mocks (jest.setup.js)

The setup file provides mocks for:

1. **next/navigation**
   - `useRouter()` - Navigation methods
   - `usePathname()` - Current pathname
   - `useSearchParams()` - URL search parameters

2. **next-themes**
   - `ThemeProvider` - Theme context
   - `useTheme()` - Theme state and setter

3. **framer-motion**
   - All motion components (motion.div, motion.h2, etc.)
   - AnimatePresence wrapper

4. **Browser APIs**
   - `window.matchMedia` - Media query matching
   - `IntersectionObserver` - Viewport intersection detection

### Testing Patterns

#### Component Rendering
```typescript
it('should render the component', () => {
  render(<Component />)
  expect(screen.getByRole('button')).toBeInTheDocument()
})
```

#### User Interactions
```typescript
it('should handle click events', async () => {
  const user = userEvent.setup()
  render(<Component />)
  await user.click(screen.getByRole('button'))
  expect(mockFunction).toHaveBeenCalled()
})
```

#### Async Operations with Timers
```typescript
beforeEach(() => {
  jest.useFakeTimers()
})

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

it('should handle animations', async () => {
  render(<Component />)
  jest.runAllTimers()
  await waitFor(() => {
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
```

#### API Mocking
```typescript
global.fetch = jest.fn()

it('should fetch data', async () => {
  ;(global.fetch as jest.Mock).mockResolvedValue({
    ok: true,
    json: async () => ({ data: 'value' })
  })
  
  const result = await fetchData()
  expect(result).toEqual({ data: 'value' })
})
```

## Coverage Goals

Each test file aims to achieve:
- **100% line coverage** for pure functions
- **90%+ branch coverage** for business logic
- **Full edge case coverage** including error states
- **Accessibility testing** for interactive elements

## Writing New Tests

When adding new features, ensure tests cover:

1. **Happy Path** - Expected usage scenarios
2. **Edge Cases** - Empty states, null values, boundaries
3. **Error Handling** - Network failures, invalid input
4. **Accessibility** - ARIA labels, keyboard navigation, screen reader support
5. **Responsive Design** - Mobile and desktop layouts
6. **User Interactions** - Clicks, keyboard events, form submissions
7. **State Management** - Initial state, transitions, cleanup

## Common Testing Utilities

### Query Priorities (in order of preference)
1. `getByRole` - Accessibility-focused queries
2. `getByLabelText` - Form elements
3. `getByPlaceholderText` - Input fields
4. `getByText` - Text content
5. `getByTestId` - Last resort for complex scenarios

### Waiting for Elements
```typescript
// Wait for element to appear
await waitFor(() => {
  expect(screen.getByText('Content')).toBeInTheDocument()
})

// Wait with custom timeout
await waitFor(() => {
  expect(screen.getByRole('button')).toBeEnabled()
}, { timeout: 3000 })
```

### User Event API
```typescript
const user = userEvent.setup()

await user.click(element)
await user.type(input, 'text')
await user.keyboard('{Enter}')
await user.hover(element)
```

## Troubleshooting

### Common Issues

**Tests timing out:**
- Check for missing `waitFor()` on async operations
- Ensure `jest.runAllTimers()` is called for animations
- Verify mock functions are properly set up

**Element not found:**
- Use `screen.debug()` to see current DOM
- Check if element is conditionally rendered
- Verify correct query method (getBy vs queryBy vs findBy)

**Act warnings:**
- Wrap state updates in `waitFor()`
- Use `userEvent` instead of `fireEvent` for interactions
- Ensure async operations complete before test ends

**Mock not working:**
- Clear mocks between tests: `jest.clearAllMocks()`
- Check mock is defined before component render
- Verify import path matches mock path

## CI/CD Integration

Tests are designed to run in CI environments:
- No external dependencies required
- Deterministic timing with fake timers
- Proper cleanup between tests
- Verbose output for debugging failures

## Best Practices

1. **Test Behavior, Not Implementation**
   - Focus on user-facing behavior
   - Avoid testing internal state directly
   - Use accessibility queries

2. **Keep Tests Isolated**
   - No shared state between tests
   - Clear mocks in `beforeEach`
   - Clean up side effects

3. **Write Descriptive Test Names**
   - Use "should" statements
   - Describe expected behavior
   - Group related tests

4. **Maintain Test Quality**
   - Refactor tests with production code
   - Remove obsolete tests
   - Update tests when requirements change

5. **Balance Coverage and Maintainability**
   - Focus on critical paths first
   - Don't test third-party library internals
   - Test interfaces, not implementation details

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [User Event API](https://testing-library.com/docs/user-event/intro)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)