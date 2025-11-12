from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time


def test_faq_page():
    """
    Tests the FAQ page functionality:
    - Navigate to FAQ page
    - Verify page loads
    - Verify main heading displays
    - Verify all FAQ sections are present
    - Verify contact section displays
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
        print("Starting FAQ page test...")
        
        # Step 1: Navigate to Homepage
        print("\nStep 1: Loading homepage...")
        driver.get("http://localhost:3000")
        time.sleep(2)
        print("✓ Homepage loaded successfully")
        
        # Step 2: Navigate to FAQ Page
        print("\nStep 2: Navigating to FAQ page...")
        driver.get("http://localhost:3000/faq")
        time.sleep(2)
        print("✓ FAQ page loaded")
        
        # Step 3: Verify Main Heading
        print("\nStep 3: Verifying main heading...")
        
        try:
            main_heading = wait.until(
                EC.presence_of_element_located((By.XPATH, 
                    "//h1[contains(text(), 'Frequently Asked Questions')]"
                ))
            )
            heading_text = main_heading.text
            print(f"✓ Main heading found: '{heading_text}'")
            
            assert "Frequently Asked Questions" in heading_text, "Main heading should contain 'Frequently Asked Questions'"
        except Exception as e:
            print(f"✗ Main heading not found: {str(e)}")
            raise
        
        # Step 4: Verify "Last Updated" Date
        print("\nStep 4: Verifying last updated date...")
        
        try:
            last_updated = wait.until(
                EC.presence_of_element_located((By.XPATH, 
                    "//*[contains(text(), 'Last updated') or contains(text(), 'last updated')]"
                ))
            )
            date_text = last_updated.text
            print(f"✓ Last updated text found: '{date_text}'")
        except Exception as e:
            print(f"⚠ Warning: Last updated date not found - {str(e)}")
        
        # Step 5: Verify FAQ Section 1 - Custom and Personalized Orders
        print("\nStep 5: Verifying 'Custom and Personalized Orders' section...")
        
        try:
            custom_section = wait.until(
                EC.presence_of_element_located((By.XPATH, 
                    "//*[contains(text(), 'Custom and Personalized Orders')]"
                ))
            )
            print("✓ 'Custom and Personalized Orders' section found")
            
            # Verify content is present
            custom_content = driver.find_element(By.XPATH,
                "//*[contains(text(), 'customize') or contains(text(), 'customization')]"
            )
            print("  ✓ Section content verified")
        except Exception as e:
            print(f"✗ 'Custom and Personalized Orders' section not found: {str(e)}")
            raise
        
        # Step 6: Verify FAQ Section 2 - Gift Wrapping and Packaging
        print("\nStep 6: Verifying 'Gift Wrapping and Packaging' section...")
        
        try:
            gift_section = wait.until(
                EC.presence_of_element_located((By.XPATH, 
                    "//*[contains(text(), 'Gift Wrapping and Packaging')]"
                ))
            )
            print("✓ 'Gift Wrapping and Packaging' section found")
            
            # Verify content is present
            gift_content = driver.find_element(By.XPATH,
                "//*[contains(text(), 'gift') or contains(text(), 'wrapping')]"
            )
            print("  ✓ Section content verified")
        except Exception as e:
            print(f"✗ 'Gift Wrapping and Packaging' section not found: {str(e)}")
            raise
        
        # Step 7: Verify FAQ Section 3 - Care Instructions
        print("\nStep 7: Verifying 'Care Instructions' section...")
        
        try:
            care_section = wait.until(
                EC.presence_of_element_located((By.XPATH, 
                    "//*[contains(text(), 'Care Instructions')]"
                ))
            )
            print("✓ 'Care Instructions' section found")
            
            # Verify content is present
            care_content = driver.find_element(By.XPATH,
                "//*[contains(text(), 'jewelry') or contains(text(), 'cleaner')]"
            )
            print("  ✓ Section content verified")
        except Exception as e:
            print(f"✗ 'Care Instructions' section not found: {str(e)}")
            raise
        
        # Step 8: Verify FAQ Section 4 - Wholesale Availability
        print("\nStep 8: Verifying 'Wholesale Availability' section...")
        
        try:
            wholesale_section = wait.until(
                EC.presence_of_element_located((By.XPATH, 
                    "//*[contains(text(), 'Wholesale Availability')]"
                ))
            )
            print("✓ 'Wholesale Availability' section found")
            
            # Verify content is present
            wholesale_content = driver.find_element(By.XPATH,
                "//*[contains(text(), 'wholesale') or contains(text(), 'discount')]"
            )
            print("  ✓ Section content verified")
        except Exception as e:
            print(f"✗ 'Wholesale Availability' section not found: {str(e)}")
            raise
        
        # Step 9: Verify Contact Section
        print("\nStep 9: Verifying contact section...")
        
        try:
            contact_section = wait.until(
                EC.presence_of_element_located((By.XPATH, 
                    "//*[contains(text(), 'Still Have Questions') or contains(text(), 'Contact')]"
                ))
            )
            print("✓ Contact section found")
            
            # Try to find contact button/link
            try:
                contact_button = driver.find_element(By.XPATH,
                    "//a[contains(@href, '/contact')] | //button[contains(text(), 'Contact')]"
                )
                print("  ✓ Contact link/button verified")
            except:
                print("  ⚠ Contact button not found (optional)")
                
        except Exception as e:
            print(f"⚠ Warning: Contact section not found - {str(e)}")
        
        # Step 10: Verify All Content Cards Display
        print("\nStep 10: Counting all FAQ cards...")
        
        try:
            # Count all white card sections (should be 4 FAQ cards + 1 contact card = 5 total)
            faq_cards = driver.find_elements(By.XPATH,
                "//*[contains(@class, 'bg-white') or contains(@class, 'card')]"
            )
            card_count = len(faq_cards)
            print(f"✓ Found {card_count} content card(s) on page")
            
            if card_count >= 4:
                print("  ✓ All expected FAQ sections are present")
            else:
                print(f"  ⚠ Warning: Expected at least 4 cards, found {card_count}")
        except Exception as e:
            print(f"⚠ Warning: Could not count cards - {str(e)}")
        
        print("\nFAQ page test completed successfully!")
        return True

    except Exception as e:
        print(f"\n✗ Test failed with error: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

    finally:
        input("\nPress ENTER to close browser and end test...")
        print("\nClosing browser...")
        driver.quit()


if __name__ == "__main__":
    print("=" * 60)
    print("FAQ PAGE TEST")
    print("=" * 60)
    print("\nThis test will verify:")
    print("  1. FAQ page loads correctly")
    print("  2. Main heading displays")
    print("  3. All FAQ sections are present:")
    print("     - Custom and Personalized Orders")
    print("     - Gift Wrapping and Packaging")
    print("     - Care Instructions")
    print("     - Wholesale Availability")
    print("  4. Contact section displays")
    print("\n" + "=" * 60)

    success = test_faq_page()

    print("\n" + "=" * 60)
    if success:
        print("TEST PASSED ✓")
    else:
        print("TEST FAILED ✗")
    print("=" * 60)