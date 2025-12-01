from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time


def test_navbar_navigation():
    """
    Tests navbar navigation functionality:
    - All navbar links route to correct pages
    """
    
    chrome_options = Options()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option("useAutomationExtension", False)

    driver = webdriver.Chrome(options=chrome_options)
    driver.maximize_window()
    wait = WebDriverWait(driver, 30)

    try:
        print("Starting navbar navigation test...")
        
        # Step 1: Navigate to Homepage
        print("\nStep 1: Loading homepage...")
        driver.get("http://localhost:3000")
        time.sleep(2)
        print("✓ Homepage loaded successfully")
        
        # Step 2: Test HOME Link
        print("\nStep 2: Testing HOME navigation...")
        
        home_link = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//a[contains(text(), 'HOME')]"))
        )
        home_link.click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert current_url == "http://localhost:3000/" or current_url == "http://localhost:3000", \
            f"HOME should navigate to '/', but went to: {current_url}"
        print(f"✓ HOME link works - navigated to: {current_url}")
        
        # Step 3: Test CATALOGUE Link
        print("\nStep 3: Testing CATALOGUE navigation...")
        
        catalogue_link = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//a[contains(text(), 'CATALOGUE')]"))
        )
        catalogue_link.click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert "catalogue" in current_url, \
            f"CATALOGUE should navigate to '/catalogue', but went to: {current_url}"
        print(f"✓ CATALOGUE link works - navigated to: {current_url}")
        
        # Step 4: Test REVIEWS Link
        print("\nStep 4: Testing REVIEWS navigation...")
        
        reviews_link = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//a[contains(text(), 'REVIEWS')]"))
        )
        reviews_link.click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert "reviews" in current_url, \
            f"REVIEWS should navigate to '/reviews', but went to: {current_url}"
        print(f"✓ REVIEWS link works - navigated to: {current_url}")
        
        # Step 5: Test ABOUT ME Link
        print("\nStep 5: Testing ABOUT ME navigation...")
        
        about_link = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//a[contains(text(), 'ABOUT ME')]"))
        )
        about_link.click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert "about_me" in current_url, \
            f"ABOUT ME should navigate to '/about_me', but went to: {current_url}"
        print(f"✓ ABOUT ME link works - navigated to: {current_url}")
        
        # Step 6: Test Login Link
        print("\nStep 6: Testing Login link...")
        
        login_link = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//a[contains(text(), 'Login')]"))
        )
        login_link.click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert "login" in current_url, \
            f"Login link should navigate to '/login', but went to: {current_url}"
        print(f"✓ Login link works - navigated to: {current_url}")
        
        # Step 7: Test Cart Link
        print("\nStep 7: Testing Cart navigation...")
        
        # Navigate back to homepage first
        driver.get("http://localhost:3000")
        time.sleep(2)
        
        cart_link = wait.until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "a[href='/cart']"))
        )
        cart_link.click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert "cart" in current_url, \
            f"Cart link should navigate to '/cart', but went to: {current_url}"
        print(f"✓ Cart link works - navigated to: {current_url}")
        
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
    print("NAVBAR NAVIGATION TEST")
    print("=" * 60)
    print("\nThis test will verify:")
    print("    - HOME navigation")
    print("    - CATALOGUE navigation")
    print("    - REVIEWS navigation")
    print("    - ABOUT ME navigation")
    print("    - Login link")
    print("    - Cart link")
    print("\n" + "=" * 60)

    success = test_navbar_navigation()

    print("\n" + "=" * 60)
    if success:
        print("FINAL RESULT: TEST PASSED ✓")
    else:
        print("FINAL RESULT: TEST FAILED ✗")
    print("=" * 60)