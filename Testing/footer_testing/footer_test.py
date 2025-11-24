from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time


def test_footer_navigation():
    """
    Tests footer navigation functionality:
    - All footer links route to correct pages
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
        print("Starting footer navigation test...")
        
        # Step 1: Navigate to Homepage
        print("\nStep 1: Loading homepage...")
        driver.get("http://localhost:3000")
        time.sleep(2)
        print("✓ Homepage loaded successfully")
        
        # Scroll to footer
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        
        print("\n" + "=" * 60)
        print("ABOUT SECTION")
        print("=" * 60)
        
        # Step 2: Test About Us Link
        print("\nStep 2: Testing About Us link...")
        
        about_links = driver.find_elements(By.XPATH, "//footer//a[contains(text(), 'About Us')]")
        about_links[0].click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert "about_me" in current_url, \
            f"About Us should navigate to '/about_me', but went to: {current_url}"
        print(f"✓ About Us link works - navigated to: {current_url}")
        
        # Navigate back to homepage and scroll to footer
        driver.get("http://localhost:3000")
        time.sleep(1)
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        
        # Step 3: Test Contact Link
        print("\nStep 3: Testing Contact link...")
        
        contact_link = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//footer//a[contains(text(), 'Contact')]"))
        )
        contact_link.click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert "about_me" in current_url, \
            f"Contact should navigate to '/about_me', but went to: {current_url}"
        print(f"✓ Contact link works - navigated to: {current_url}")
        
        print("\n" + "=" * 60)
        print("SHOP SECTION")
        print("=" * 60)
        
        # Navigate back and scroll
        driver.get("http://localhost:3000")
        time.sleep(1)
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        
        # Step 4: Test All Products Link
        print("\nStep 4: Testing All Products link...")
        
        all_products_link = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//footer//a[contains(text(), 'All Products')]"))
        )
        all_products_link.click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert "catalogue" in current_url, \
            f"All Products should navigate to '/catalogue', but went to: {current_url}"
        print(f"✓ All Products link works - navigated to: {current_url}")
        
        # Navigate back and scroll
        driver.get("http://localhost:3000")
        time.sleep(1)
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        
        # Step 5: Test Earrings Link
        print("\nStep 5: Testing Earrings link...")
        
        earrings_link = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//footer//a[contains(text(), 'Earrings')]"))
        )
        earrings_link.click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert "catalogue" in current_url and "category=earrings" in current_url, \
            f"Earrings should navigate to '/catalogue?category=earrings', but went to: {current_url}"
        print(f"✓ Earrings link works - navigated to: {current_url}")
        
        # Navigate back and scroll
        driver.get("http://localhost:3000")
        time.sleep(1)
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        
        # Step 6: Test DIY Beads Link
        print("\nStep 6: Testing DIY Beads link...")
        
        diy_link = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//footer//a[contains(text(), 'DIY Beads')]"))
        )
        diy_link.click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert "catalogue" in current_url and "category=" in current_url, \
            f"DIY Beads should navigate to '/catalogue?category=...', but went to: {current_url}"
        print(f"✓ DIY Beads link works - navigated to: {current_url}")
        
        print("\n" + "=" * 60)
        print("CUSTOMER CARE SECTION")
        print("=" * 60)
        
        # Navigate back and scroll
        driver.get("http://localhost:3000")
        time.sleep(1)
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        
        # Step 7: Test Shipping Info Link
        print("\nStep 7: Testing Shipping Info link...")
        
        shipping_link = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//footer//a[contains(text(), 'Shipping Info')]"))
        )
        shipping_link.click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert "shipping" in current_url, \
            f"Shipping Info should navigate to '/shipping', but went to: {current_url}"
        print(f"✓ Shipping Info link works - navigated to: {current_url}")
        
        # Navigate back and scroll
        driver.get("http://localhost:3000")
        time.sleep(1)
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        
        # Step 8: Test Returns Link
        print("\nStep 8: Testing Returns link...")
        
        returns_link = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//footer//a[contains(text(), 'Returns')]"))
        )
        returns_link.click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert "returns" in current_url, \
            f"Returns should navigate to '/returns', but went to: {current_url}"
        print(f"✓ Returns link works - navigated to: {current_url}")
        
        # Navigate back and scroll
        driver.get("http://localhost:3000")
        time.sleep(1)
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        
        # Step 9: Test FAQ Link
        print("\nStep 9: Testing FAQ link...")
        
        faq_link = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//footer//a[contains(text(), 'FAQ')]"))
        )
        faq_link.click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert "faq" in current_url, \
            f"FAQ should navigate to '/faq', but went to: {current_url}"
        print(f"✓ FAQ link works - navigated to: {current_url}")
        
        print("\n" + "=" * 60)
        print("LEGAL SECTION")
        print("=" * 60)
        
        # Navigate back and scroll
        driver.get("http://localhost:3000")
        time.sleep(1)
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        
        # Step 10: Test Privacy Policy Link
        print("\nStep 10: Testing Privacy Policy link...")
        
        privacy_link = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//footer//a[contains(text(), 'Privacy Policy')]"))
        )
        privacy_link.click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert "privacy" in current_url, \
            f"Privacy Policy should navigate to '/privacy', but went to: {current_url}"
        print(f"✓ Privacy Policy link works - navigated to: {current_url}")
        
        # Navigate back and scroll
        driver.get("http://localhost:3000")
        time.sleep(1)
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        
        # Step 11: Test Terms of Service Link
        print("\nStep 11: Testing Terms of Service link...")
        
        terms_link = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//footer//a[contains(text(), 'Terms of Service')]"))
        )
        terms_link.click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert "terms" in current_url, \
            f"Terms of Service should navigate to '/terms', but went to: {current_url}"
        print(f"✓ Terms of Service link works - navigated to: {current_url}")
        
        # Navigate back and scroll
        driver.get("http://localhost:3000")
        time.sleep(1)
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        
        # Step 12: Test Cookie Policy Link
        print("\nStep 12: Testing Cookie Policy link...")
        
        cookies_link = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//footer//a[contains(text(), 'Cookie Policy')]"))
        )
        cookies_link.click()
        time.sleep(2)
        
        current_url = driver.current_url
        assert "cookies" in current_url, \
            f"Cookie Policy should navigate to '/cookies', but went to: {current_url}"
        print(f"✓ Cookie Policy link works - navigated to: {current_url}")
        
        print("\n" + "=" * 60)
        print("SOCIAL MEDIA LINKS")
        print("=" * 60)
        
        # Navigate back and scroll
        driver.get("http://localhost:3000")
        time.sleep(1)
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        
        # Step 13: Test Instagram Link
        print("\nStep 13: Testing Instagram link...")
        
        instagram_link = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//footer//a[@aria-label='Follow us on Instagram']"))
        )
        
        # Get the href attribute
        instagram_href = instagram_link.get_attribute("href")
        assert "instagram.com" in instagram_href, \
            f"Instagram link should go to instagram.com, but href is: {instagram_href}"
        print(f"✓ Instagram link is correct: {instagram_href}")
        
        # Step 14: Test TikTok Link
        print("\nStep 14: Testing TikTok link...")
        
        tiktok_link = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//footer//a[@aria-label='Follow us on TikTok']"))
        )
        
        # Get the href attribute
        tiktok_href = tiktok_link.get_attribute("href")
        assert "tiktok.com" in tiktok_href, \
            f"TikTok link should go to tiktok.com, but href is: {tiktok_href}"
        print(f"✓ TikTok link is correct: {tiktok_href}")
        
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
    print("FOOTER NAVIGATION TEST")
    print("=" * 60)
    print("\nThis test will verify:")
    print("    - About section links")
    print("    - Shop section links")
    print("    - Customer Care section links")
    print("    - Legal section links")
    print("    - Social media links")
    print("\n" + "=" * 60)

    success = test_footer_navigation()

    print("\n" + "=" * 60)
    if success:
        print("FINAL RESULT: TEST PASSED ✓")
    else:
        print("FINAL RESULT: TEST FAILED ✗")
    print("=" * 60)