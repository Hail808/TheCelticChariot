CART FUNCTIONALITY TEST

This test verifies the shopping cart feature including adding items, updating the cart counter, 
viewing cart contents, checking totals, and removing items.

Test Coverage:
    - Login to the website
    - Navigate to products/catalogue page
    - Add product to cart
    - Verify cart counter badge updates to 1
    - Navigate to cart page
    - Verify product appears in cart
    - Verify total price displays correctly
    - Remove product from cart
    - Verify cart counter returns to 0
    - Verify empty cart message appears

Instructions:
    This test is verified to work on:
        - Google Chrome VER 141.0.7390.123
        - Python Ver 3.13
        - Selenium 4.38.0

    Before running test:
        - Make sure dev server is running (npm run dev)
        - Ensure at least one product exists in the catalogue

    To run test, in command line:
        ./test-start.bat
    Or double click on test-start.bat

    The test will run automatically and complete all cart operations.
    The browser will remain open until you press ENTER in the console.
    Check console output for detailed test results.

Expected Result:
    All test steps should pass and show checkmarks (✓) in the console output.


Tyson Huynh
11/10/2025
CCW-275