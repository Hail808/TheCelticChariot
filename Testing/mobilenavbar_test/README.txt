MOBILE SIDEBAR NAVIGATION TEST

This test verifies the mobile sidebar menu opens correctly and all navigation links work properly.

Test Coverage:
    - Mobile menu hamburger button opens menu
    - HOME link navigation
    - CATALOGUE link navigation
    - REVIEWS link navigation
    - ABOUT ME link navigation
    - USER DASHBOARD link navigation
    - SIGN IN link navigation
    - Mobile menu close button (X) works

Instructions:
    This test is verified to work on:
        - Google Chrome VER 141.0.7390.123
        - Python Ver 3.13
        - Selenium 4.38.0

    Before running test:
        - Make sure dev server is not running 

    To run test, in command line:
        ./mobilenavbar_test.bat

    Or double click on mobilenavbar_test.bat

    The test will automatically resize the browser to mobile view (375x667).
    The test will run automatically and test all mobile menu navigation links.
    The browser will remain open until you press ENTER in the console.
    Check console output for detailed test results.

Expected Result:
    All test steps should pass and show checkmarks (✓) in the console output.