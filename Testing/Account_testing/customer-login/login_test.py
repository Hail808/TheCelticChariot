from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time

    
def login_test():
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

    try:
        # Test data
        test_email = 'automated_test@test.com'
        test_password = 'test1234'
        test_name = "Automated Test Account"

        print(f"Starting test for account: {test_email}")

        print("Logging in")
        driver.get("http://localhost:3000/login")
        time.sleep(2)  

        email_field = driver.find_element(By.NAME, "email")
        email_field.send_keys(test_email)

        password_field = driver.find_element(By.NAME, "password")
        password_field.send_keys(test_password)

        signup_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        signup_button.click()
        time.sleep(3)

        # Wait for redirect to user dashboard
        wait.until(EC.url_changes("http://localhost:3000/login"))
        
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
                print("✓ Valid account logged in successfully - Email and Name verified on dashboard")
                return True
            else:
                print("✗ Account logged in but user info not properly displayed")
                return False
        else:
            print(f"✗ Account Login Failed - Wrong URL: {driver.current_url}")
            return False
    except Exception as e:
        print(f"Test failed with error: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

    finally:
        input("Press ENTER to end program")
        print("\nClosing browser...")
        driver.quit()


if __name__ == "__main__":
    print("=" * 50)
    print("Starting Account Login Test")
    print("=" * 50)

    success = login_test()

    print("\n" + "=" * 50)
    if success:
        print("TEST PASSED ✓")
    else:
        print("TEST FAILED ✗")
    print("=" * 50)