from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time
import random
import string


def generate_random_email():
    """Generate a random email for testing."""
    random_string = ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))
    return f"test_{random_string}@example.com"


def test_short_password(driver, wait):
    """Test that short passwords are rejected."""
    print("\n--- Testing Short Password ---")
    try:
        driver.get("http://localhost:3000/create_account")
        time.sleep(2)
        
        # Fill in form with short password
        name_field = wait.until(EC.presence_of_element_located((By.NAME, "username")))
        name_field.clear()
        name_field.send_keys("Test User")
        
        email_field = driver.find_element(By.NAME, "email")
        email_field.clear()
        email_field.send_keys("newuser@test.com")
        
        password_field = driver.find_element(By.NAME, "password")
        password_field.clear()
        password_field.send_keys("123")  # Too short
        
        # Get current URL before submission
        current_url = driver.current_url
        
        signup_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        signup_button.click()
        time.sleep(2)
        
        # Check if still on create account page (should not redirect)
        if driver.current_url == "http://localhost:3000/create_account":
            # Look for error message
            page_source = driver.page_source.lower()
            error_found = any(indicator in page_source for indicator in 'password too short')
            
            if error_found:
                print("✓ Short password rejected with error message")
                return True
            else:
                print("✓ Short password rejected (stayed on page)")
                return True
        else:
            print("✗ Short password was accepted (should have been rejected)")
            return False
            
    except Exception as e:
        print(f"✗ Short password test failed with error: {str(e)}")
        return False


def test_duplicate_email(driver, wait):
    """Test that duplicate emails are rejected."""
    print("\n--- Testing Duplicate Email ---")
    try:
        driver.get("http://localhost:3000/create_account")
        time.sleep(2)
        
        # Fill in form with existing email
        name_field = wait.until(EC.presence_of_element_located((By.NAME, "username")))
        name_field.clear()
        name_field.send_keys("Another User")
        
        email_field = driver.find_element(By.NAME, "email")
        email_field.clear()
        email_field.send_keys("test@test.com")  # Existing email
        
        password_field = driver.find_element(By.NAME, "password")
        password_field.clear()
        password_field.send_keys("ValidPassword123!")
        
        # Get current URL before submission
        current_url = driver.current_url
        
        signup_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        signup_button.click()
        time.sleep(2)
        
        # Check if still on create account page (should not redirect)
        if driver.current_url == "http://localhost:3000/create_account":
            # Look for error message
            page_source = driver.page_source.lower()
            error_found = any(indicator in page_source for indicator in 'already exists')
            
            if error_found:
                print("✓ Duplicate email rejected with error message")
                return True
            else:
                print("✓ Duplicate email rejected (stayed on page)")
                return True
        else:
            print("✗ Duplicate email was accepted (should have been rejected)")
            return False
            
    except Exception as e:
        print(f"✗ Duplicate email test failed with error: {str(e)}")
        return False


def test_valid_account_creation(driver, wait):
    """Test successful account creation with valid data."""
    print("\n--- Testing Valid Account Creation ---")
    try:
        # Test data
        test_email = generate_random_email()
        test_password = "TestPassword123!"
        test_name = "Test User"

        print(f"Creating account with email: {test_email}")

        driver.get("http://localhost:3000/create_account")
        time.sleep(2)

        name_field = wait.until(EC.presence_of_element_located((By.NAME, "username")))
        name_field.clear()
        name_field.send_keys(test_name)

        email_field = driver.find_element(By.NAME, "email")
        email_field.clear()
        email_field.send_keys(test_email)

        password_field = driver.find_element(By.NAME, "password")
        password_field.clear()
        password_field.send_keys(test_password)

        signup_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        signup_button.click()
        time.sleep(3)
        
        # Wait for redirect to user dashboard
        wait.until(EC.url_changes("http://localhost:3000/create_account"))
        
        # Verify we're on the user dashboard
        if driver.current_url == "http://localhost:3000/user_dashboard":
            print("✓ Redirected to user dashboard")
            
            # Wait for page to fully load
            time.sleep(2)
            
            # Verify email is displayed on the page
            page_source = driver.page_source
            email_found = False
            name_found = False
            
            # Check if email appears anywhere in page source
            if test_email in page_source:
                print(f"✓ Email '{test_email}' found on dashboard")
                email_found = True
            else:
                print(f"✗ Email '{test_email}' NOT found on dashboard")
            
            # Check if name appears anywhere in page source
            if test_name in page_source:
                print(f"✓ Name '{test_name}' found on dashboard")
                name_found = True
            else:
                print(f"✗ Name '{test_name}' NOT found on dashboard")
            
        
            if email_found and name_found:
                print("✓ Valid account created successfully - Email and Name verified on dashboard")
                return True
            else:
                print("✗ Account created but user info not properly displayed")
                return False
        else:
            print(f"✗ Account Creation Failed - Wrong URL: {driver.current_url}")
            return False
            
    except Exception as e:
        print(f"✗ Valid account creation test failed with error: {str(e)}")
        import traceback
        traceback.print_exc()
        return False


def run_all_tests():
    chrome_options = Options()
    
    # Basic options
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    
    # Anti-detection (enhanced)
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option("useAutomationExtension", False)
    
    # Cookie handling for automation
    chrome_options.add_argument("--disable-features=SameSiteByDefaultCookies")
    chrome_options.add_argument("--disable-features=CookiesWithoutSameSiteMustBeSecure")

    driver = webdriver.Chrome(options=chrome_options)
    wait = WebDriverWait(driver, 120)
    
    results = {
        'short_password': False,
        'duplicate_email': False,
        'valid_account': False
    }

    try:
        # Test 1: Short password should be rejected
        results['short_password'] = test_short_password(driver, wait)
        
        # Test 2: Duplicate email should be rejected
        results['duplicate_email'] = test_duplicate_email(driver, wait)
        
        # Test 3: Valid account should be created
        results['valid_account'] = test_valid_account_creation(driver, wait)
        
        return results

    except Exception as e:
        print(f"\nTest suite failed with error: {str(e)}")
        import traceback
        traceback.print_exc()
        return results

    finally:
        input("\nPress ENTER to end program")
        print("\nClosing browser...")
        driver.quit()


if __name__ == "__main__":
    print("=" * 60)
    print("ACCOUNT CREATION TEST SUITE")
    print("=" * 60)

    results = run_all_tests()

    print("\n" + "=" * 60)
    print("TEST RESULTS SUMMARY")
    print("=" * 60)
    
    print(f"\n1. Short Password Rejection: {'PASSED ✓' if results['short_password'] else 'FAILED ✗'}")
    print(f"2. Duplicate Email Rejection: {'PASSED ✓' if results['duplicate_email'] else 'FAILED ✗'}")
    print(f"3. Valid Account Creation:   {'PASSED ✓' if results['valid_account'] else 'FAILED ✗'}")
    
    all_passed = all(results.values())
    
    print("\n" + "=" * 60)
    if all_passed:
        print("ALL TESTS PASSED ✓✓✓")
    else:
        print("SOME TESTS FAILED ✗")
        failed_tests = [test for test, passed in results.items() if not passed]
        print(f"Failed tests: {', '.join(failed_tests)}")
    print("=" * 60)