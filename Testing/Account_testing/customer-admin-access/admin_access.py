from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time

    
def test_admin_page_access(driver, admin_page_url, page_name):
    """Test if customer can access a specific admin page."""
    print(f"\nTesting access to: {page_name}")
    # Try to access the admin page
    driver.get(admin_page_url)
    time.sleep(2)
    
    current_url = driver.current_url
    
    # Check if access was denied
    if current_url != admin_page_url: 
        print(f"✓ Access Denied - Redirected to: {current_url}")
        return True
    else:
        print(f"✗ Access Granted")
        return False
  

def customer_access_test():
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
        
        # Test access to admin pages
        admin_pages = {
            "Admin Dashboard": "http://localhost:3000/admin",
            "Admin Catalogue": "http://localhost:3000/admin/catalogue",
            "Admin Engagement": "http://localhost:3000/admin/engagement",
            "Admin Orders": "http://localhost:3000/admin/orders",
            "Admin Order Details": "http://localhost:3000/admin/orders/2e1e0193-1951-484c-b8d5-d6e35765aee8",

        }
        results = {}
        for page_name, page_url in admin_pages.items():
            access_granted = test_admin_page_access(driver, page_url, page_name)
            results[page_name] = access_granted
            time.sleep(1)  # Small delay between tests
        return results            
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
    print("Starting Customer Access to Admin Page Test")
    print("=" * 50)

    results = customer_access_test()

    if results:
        for page_name, access_denied in results.items():
            status = "PASSED ✓ (Access Denied)" if access_denied else "FAILED ✗ (Access Granted)"
            print(f"{page_name:25} : {status}")
        
        all_passed = all(results.values())
        
        print("\n" + "=" * 60)
        if all_passed:
            print("ALL TESTS PASSED ✓")
            print("Customer Account cannot access any admin pages")
        else:
            print("SOME TESTS FAILED ✗✗✗")
            failed_pages = [page for page, denied in results.items() if not denied]
            print(f"Customer able to access: {', '.join(failed_pages)}")
        print("=" * 60)
    else:
        print("No tests were run")
        print("=" * 60)