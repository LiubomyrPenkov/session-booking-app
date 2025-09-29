# End-to-End Tests

This directory contains Playwright end-to-end tests for the Session Booking Application.

## Overview

The E2E tests cover the complete user journey from landing on the booking page to successful booking completion:

1. **Date Selection**: User selects an available date from the calendar
2. **Time Selection**: User chooses a time slot for the selected date  
3. **Confirmation**: User reviews booking details on confirmation page
4. **Success**: User sees booking success confirmation

## Test Structure

```
e2e/
├── pages/                          # Page Object Model
│   └── booking-flow.page.ts        # Main booking flow page object
├── utils/                          # Test utilities
│   └── test-utils.ts               # Helper functions and API mocks
├── complete-booking-flow.spec.ts   # Main happy path user journey
└── screenshots/                    # Test screenshots (gitignored)
```

## Test Files

### `complete-booking-flow.spec.ts`
- **Purpose**: Tests the main happy path user journey
- **Coverage**: Date → Time → Confirmation → Success flow
- **Browsers**: All (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari)
- **Features**: Responsive design validation, mobile/desktop differences, dynamic date handling

## Running Tests

### Prerequisites
```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Test Commands
```bash
# Run all E2E tests
npm run test:e2e

# Run tests in headed mode (visible browser)
npm run test:e2e:headed

# Run tests in debug mode
npm run test:e2e:debug

# Run specific test file
npx playwright test complete-booking-flow.spec.ts

# Run tests on specific browser
npx playwright test --project=chromium

# Run mobile tests only
npx playwright test --project="Mobile Chrome"
```

## Test Features

### Page Object Model
- **BookingFlowPage**: Encapsulates all booking flow interactions
- Clean separation of test logic from page implementation  
- Reusable methods for common actions
- Mobile-aware interactions with viewport detection

### API Mocking
- Mock GraphQL endpoints for consistent testing
- Dynamic date generation to handle month transitions
- Predictable test data for session and availability
- No dependency on external services

### Cross-Browser Testing
- Tests run on Chromium, Firefox, and WebKit
- Mobile viewport testing (Mobile Chrome, Mobile Safari)
- Responsive design validation with conditional assertions

### Visual Testing
- Screenshots on test failures
- Full-page screenshots for debugging
- Trace recording for detailed analysis

## Key Test Scenarios

1. **Complete Booking Flow**: End-to-end happy path across all browsers
2. **Mobile Responsiveness**: Different UI behavior on mobile vs desktop
3. **Calendar Navigation**: Automatic month navigation when needed
4. **Month Transitions**: Dynamic handling of dates across month boundaries
5. **Session Details**: Conditional visibility based on viewport size

## Browser-Specific Behaviors

### Desktop (≥960px)
- Session details visible on confirmation page
- Back arrow icon hidden in time selection
- Full calendar navigation available

### Mobile (<960px)  
- Session details hidden on confirmation page
- Back arrow icon visible in time selection
- Touch-optimized interactions

## CI/CD Integration

Tests run automatically on:
- Push to main/develop branches
- Pull requests to main
- Generated HTML reports available as artifacts
- 5 test configurations (3 desktop + 2 mobile browsers)

## Debugging

### Failed Tests
- Check `test-results/` for failure details
- Review screenshots for visual debugging
- Use `--debug` flag for step-by-step debugging
- Trace files available for detailed analysis

### Local Development
```bash
# Start dev server
npm start

# In another terminal, run specific test
npx playwright test complete-booking-flow.spec.ts --headed

# Debug specific browser
npx playwright test --project="Mobile Chrome" --debug
```

## Configuration

Test configuration is in `playwright.config.ts`:
- Base URL: `http://localhost:4200`
- Timeout: Default Playwright timeouts
- Retries: 2 on CI, 0 locally
- Parallel execution enabled
- 5 browser configurations for comprehensive coverage