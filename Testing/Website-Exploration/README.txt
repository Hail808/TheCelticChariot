# Website Testing Suite - The Celtic Chariot

## Overview
Automated testing suite for The Celtic Chariot e-commerce website using Selenium WebDriver and pytest. This suite validates navigation, page elements, footer links, and user interface components.

## Test Environment

### Verified Configuration
- **Browser:** Google Chrome Version 141.0.7390.123
- **Python:** Version 3.13.5
- **Selenium:** Version 4.38.0
- **pytest:** Version 8.3.4

## Prerequisites

### Installation
Ensure you have the required packages installed:
```bash
pip install selenium --break-system-packages
pip install pytest --break-system-packages
```

### ChromeDriver
ChromeDriver is automatically managed by Selenium 4.6+ (Selenium Manager). No manual installation required.

## Running the Tests

### Before Testing
Ensure your development server is running on `http://localhost:3000`
```bash
npm run dev
```

### Execute Test Suite

**Run all tests:**
```bash
pytest test_order.py -v
```

**Run specific test:**
```bash
pytest test_order.py::test_homepage_loads -v
```

**Run tests with console output:**
```bash
pytest test_order.py -v -s
```

**Run tests matching a keyword:**
```bash
pytest test_order.py -k "navigation" -v
```

## Test Coverage

### Navigation Tests
- ✅ Homepage loading and main heading display
- ✅ Main navigation links (HOME, CATALOGUE, REVIEWS, ABOUT ME)
- ✅ Navigation to catalogue page
- ✅ Navigation to reviews page
- ✅ Navigation to about me page
- ✅ Login link functionality
- ✅ Cart icon presence
- ✅ Category navigation (Earrings, DIY Beads)

### Content Section Tests
- ✅ Featured Items section display
- ✅ Categories section display
- ✅ Reviews section with carousel controls
- ✅ Footer sections (About, Shop, Customer Care, Legal)

### Footer Link Tests
- ✅ FAQ navigation
- ✅ All footer links functional

## Test Execution Flow

1. **Automatic Browser Launch:** Each test automatically opens Chrome browser
2. **Page Navigation:** Tests navigate to specified pages
3. **Element Verification:** Validates presence and functionality of elements
4. **Automatic Cleanup:** Browser closes after each test completes

## Test Results

All tests run automatically without manual intervention. View results in the command line output:
```
13 passed in 89.57s
```

## Optional: Advanced Testing

### Generate HTML Report
```bash
pip install pytest-html --break-system-packages
pytest test_order.py --html=report.html
```

### Run Tests in Parallel (Faster)
```bash
pip install pytest-xdist --break-system-packages
pytest test_order.py -n 4 -v
```

### Run Only Failed Tests
```bash
pytest test_order.py --lf -v
```

## Troubleshooting

### Common Issues

**Issue:** Tests fail with "no such element" error  
**Solution:** Increase wait time in tests or ensure Next.js app is fully loaded

**Issue:** Chrome version mismatch  
**Solution:** Update Chrome browser and Selenium will auto-update ChromeDriver

**Issue:** Port 3000 not available  
**Solution:** Ensure dev server is running and no other app is using port 3000

## Test Structure
```
test_order.py
├── test_homepage_loads              # Validates homepage
├── test_navigation_links_exist      # Checks nav links
├── test_navigate_to_catalogue       # Tests catalogue navigation
├── test_navigate_to_reviews         # Tests reviews navigation
├── test_navigate_to_about_me        # Tests about page navigation
├── test_login_link_exists           # Validates login link
├── test_cart_icon_exists            # Checks cart icon
├── test_featured_items_section      # Validates featured items
├── test_categories_section          # Checks categories section
├── test_navigate_to_earrings_category # Tests category navigation
├── test_reviews_section_on_homepage # Validates review carousel
├── test_footer_sections_exist       # Checks footer sections
└── test_footer_links_work           # Tests footer link functionality
```

## Notes

- Tests use 2-second delays to allow Next.js to fully render
- Each test runs independently with its own browser instance
- Screenshots can be captured by adding `driver.save_screenshot("test.png")` to any test
- Tests are designed for desktop viewport (default browser size)

## Future Enhancements

Potential additions to the test suite:
- Product detail page testing
- Add to cart functionality
- Search functionality testing
- Form submission validation
- Mobile responsive testing
- Performance testing
- Visual regression testing

## Support

For issues or questions about the test suite, refer to:
- [Selenium Documentation](https://www.selenium.dev/documentation/)
- [pytest Documentation](https://docs.pytest.org/)