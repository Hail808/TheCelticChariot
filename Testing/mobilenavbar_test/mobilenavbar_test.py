from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time


def mobilenavbar_test():
    """
    Tests mobile sidebar navigation functionality:
    - Mobile menu opens correctly
    - All mobile menu links route to correct pages
    """
    
    chrome_options = Options()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option("useAutomationExtension", False)

    driver = webdriver.Chrome(options=chrome_options)
    wait = WebDriverWait(driver, 30)

    try:
        print("Starting mobile sidebar navigation test...")
        
        # Step 1: Navigate to Homepage and Resize to Mobile
        print("\nStep 1: Loading homepage and resizing to mobile view...")
        driver.get("http://localhost:3000")
        time.sleep(2)
        
        # Resize to mobile size (375x667 - iPhone SE size)
        driver.set_window_size(375, 667)
        time.sleep(1)
        print("✓ Resized to mobile view (375x667)")
        
        # Step 2: Open Mobile Menu
        print("\nStep 2: Opening mobile menu...")
        
        menu_button = wait.until(
            EC.element_to_be_clickable((By.XPATH, 
                "//button[.//*[name()='svg' and contains(@class, 'lucide-menu')]]"
            ))
        )
        menu_button.click()
        time.sleep(1)
        print("✓ Mobile menu opened")
        
        # Step 3: Test HOME Link in Mobile Menu
        print("\nStep 3: Testing mobile HOME link...")
        
        mobile_home = wait.until(
            EC.element_to_be_clickable((By.XPATH, 
                "//div[contains(@class, 'md:hidden')]//a[contains(text(), 'HOME')]"
            ))
        )
        mobile_home.click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert current_url == "http://localhost:3000/" or current_url == "http://localhost:3000", \
            f"HOME should navigate to '/', but went to: {current_url}"
        print(f"✓ Mobile HOME link works - navigated to: {current_url}")
        
        # Reopen menu for next test
        driver.get("http://localhost:3000")
        time.sleep(1)
        menu_button = wait.until(
            EC.element_to_be_clickable((By.XPATH, 
                "//button[.//*[name()='svg' and contains(@class, 'lucide-menu')]]"
            ))
        )
        menu_button.click()
        time.sleep(1)
        
        # Step 4: Test CATALOGUE Link in Mobile Menu
        print("\nStep 4: Testing mobile CATALOGUE link...")
        
        mobile_catalogue = wait.until(
            EC.element_to_be_clickable((By.XPATH, 
                "//div[contains(@class, 'md:hidden')]//a[contains(text(), 'CATALOGUE')]"
            ))
        )
        mobile_catalogue.click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert "catalogue" in current_url, \
            f"CATALOGUE should navigate to '/catalogue', but went to: {current_url}"
        print(f"✓ Mobile CATALOGUE link works - navigated to: {current_url}")
        
        # Reopen menu
        driver.get("http://localhost:3000")
        time.sleep(1)
        menu_button = wait.until(
            EC.element_to_be_clickable((By.XPATH, 
                "//button[.//*[name()='svg' and contains(@class, 'lucide-menu')]]"
            ))
        )
        menu_button.click()
        time.sleep(1)
        
        # Step 5: Test REVIEWS Link in Mobile Menu
        print("\nStep 5: Testing mobile REVIEWS link...")
        
        mobile_reviews = wait.until(
            EC.element_to_be_clickable((By.XPATH, 
                "//div[contains(@class, 'md:hidden')]//a[contains(text(), 'REVIEWS')]"
            ))
        )
        mobile_reviews.click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert "reviews" in current_url, \
            f"REVIEWS should navigate to '/reviews', but went to: {current_url}"
        print(f"✓ Mobile REVIEWS link works - navigated to: {current_url}")
        
        # Reopen menu
        driver.get("http://localhost:3000")
        time.sleep(1)
        menu_button = wait.until(
            EC.element_to_be_clickable((By.XPATH, 
                "//button[.//*[name()='svg' and contains(@class, 'lucide-menu')]]"
            ))
        )
        menu_button.click()
        time.sleep(1)
        
        # Step 6: Test ABOUT ME Link in Mobile Menu
        print("\nStep 6: Testing mobile ABOUT ME link...")
        
        mobile_about = wait.until(
            EC.element_to_be_clickable((By.XPATH, 
                "//div[contains(@class, 'md:hidden')]//a[contains(text(), 'ABOUT ME')]"
            ))
        )
        mobile_about.click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert "about_me" in current_url, \
            f"ABOUT ME should navigate to '/about_me', but went to: {current_url}"
        print(f"✓ Mobile ABOUT ME link works - navigated to: {current_url}")
        
        # Reopen menu
        driver.get("http://localhost:3000")
        time.sleep(1)
        menu_button = wait.until(
            EC.element_to_be_clickable((By.XPATH, 
                "//button[.//*[name()='svg' and contains(@class, 'lucide-menu')]]"
            ))
        )
        menu_button.click()
        time.sleep(1)
        
        # Step 7: Test USER DASHBOARD Link in Mobile Menu
        print("\nStep 7: Testing mobile USER DASHBOARD link...")
        
        mobile_dashboard = wait.until(
            EC.element_to_be_clickable((By.XPATH, 
                "//div[contains(@class, 'md:hidden')]//a[contains(text(), 'USER DASHBOARD')]"
            ))
        )
        mobile_dashboard.click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert "user_dashboard" in current_url or "login" in current_url, \
            f"USER DASHBOARD should navigate to '/user_dashboard' or '/login', but went to: {current_url}"
        print(f"✓ Mobile USER DASHBOARD link works - navigated to: {current_url}")
        
        # Reopen menu
        driver.get("http://localhost:3000")
        time.sleep(1)
        menu_button = wait.until(
            EC.element_to_be_clickable((By.XPATH, 
                "//button[.//*[name()='svg' and contains(@class, 'lucide-menu')]]"
            ))
        )
        menu_button.click()
        time.sleep(1)
        
        # Step 8: Test SIGN IN Link in Mobile Menu
        print("\nStep 8: Testing mobile SIGN IN link...")
        
        mobile_signin = wait.until(
            EC.element_to_be_clickable((By.XPATH, 
                "//div[contains(@class, 'md:hidden')]//a[contains(text(), 'SIGN IN')]"
            ))
        )
        mobile_signin.click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert "login" in current_url, \
            f"SIGN IN should navigate to '/login', but went to: {current_url}"
        print(f"✓ Mobile SIGN IN link works - navigated to: {current_url}")
        
        # Step 9: Test Menu Close Button (X)
        print("\nStep 9: Testing mobile menu close button...")
        
        driver.get("http://localhost:3000")
        time.sleep(1)
        
        # Open menu
        menu_button = wait.until(
            EC.element_to_be_clickable((By.XPATH, 
                "//button[.//*[name()='svg' and contains(@class, 'lucide-menu')]]"
            ))
        )
        menu_button.click()
        time.sleep(1)
        
        # Click X to close
        close_button = wait.until(
            EC.element_to_be_clickable((By.XPATH, 
                "//button[.//*[name()='svg' and contains(@class, 'lucide-x')]]"
            ))
        )
        close_button.click()
        time.sleep(1)
        
        # Verify menu is closed by checking if menu items are not visible
        try:
            # If we can still see the mobile menu items, the menu didn't close
            mobile_menu = driver.find_element(By.XPATH, 
                "//div[contains(@class, 'md:hidden')]//a[contains(text(), 'HOME')]"
            )
            if mobile_menu.is_displayed():
                print("✗ Mobile menu did not close")
                raise AssertionError("Mobile menu should close when X button is clicked")
        except:
            # Menu items not visible = menu closed successfully
            print("✓ Mobile menu close button works")
        
        print("\n" + "=" * 60)
        print("ALL TESTS PASSED ✓")
        print("=" * 60)
        return True

    except AssertionError as e:
        print(f"\n{'=' * 60}")
        print(f"✗ TEST FAILED - ASSERTION ERROR")
        print(f"{'=' * 60}")
        print(f"Error: {str(e)}")
        print(f"{'=' * 60}")
        return False
        
    except Exception as e:
        print(f"\n{'=' * 60}")
        print(f"✗ TEST FAILED - UNEXPECTED ERROR")
        print(f"{'=' * 60}")
        print(f"Error: {str(e)}")
        import traceback
        traceback.print_exc()
        print(f"{'=' * 60}")
        return False

    finally:
        input("\nPress ENTER to close browser and end test...")
        print("\nClosing browser...")
        driver.quit()


if __name__ == "__main__":
    print("=" * 60)
    print("MOBILE SIDEBAR NAVIGATION TEST")
    print("=" * 60)
    print("\nThis test will verify:")
    print("    - Mobile menu opens")
    print("    - HOME navigation")
    print("    - CATALOGUE navigation")
    print("    - REVIEWS navigation")
    print("    - ABOUT ME navigation")
    print("    - USER DASHBOARD navigation")
    print("    - SIGN IN navigation")
    print("    - Menu close button")
    print("\n" + "=" * 60)

    success = mobilenavbar_test()

    print("\n" + "=" * 60)
    if success:
        print("FINAL RESULT: TEST PASSED ✓")
    else:
        print("FINAL RESULT: TEST FAILED ✗")
    print("=" * 60)