USER DASHBOARD AND SETTINGS TEST

This test verifies the user dashboard and settings pages display correctly and navigation works as expected.

Test Coverage:
    USER DASHBOARD:
    - Login to user account
    - Verify dashboard page loads
    - Verify greeting displays with username
    - Verify "Orders" section displays
    - Verify "Account Details" section displays
    - Click "Settings" button and verify navigation
    - Test "Sign Out" button functionality
    - Sign back in to verify login works
    
    USER DASHBOARD SETTINGS:
    - Navigate to settings page
    - Verify settings page loads
    - Verify "Account Information" section displays
    - Verify "Change Password" section displays
    - Verify "Preferences" section displays
    - Verify "Sign Out" button
    - Test sign out functionality

Instructions:
    This test is verified to work on:
        - Google Chrome VER 141.0.7390.123
        - Python Ver 3.13
        - Selenium 4.38.0

    Before running test:
        - Make sure dev server is NOT already running
        - Ensure you have a test account with credentials:
            Email: testtest@gmail.com
            Password: testtest

    To run test, in command line:
        ./test-start.bat
    Or double click on test-start.bat

    The test will run automatically and verify all dashboard/settings functionality.
    The browser will remain open until you press ENTER in the console.
    Check console output for detailed test results.

Expected Result:
    All test steps should pass and show checkmarks (✓) in the console output.


Tyson Huynh
11/10/2025