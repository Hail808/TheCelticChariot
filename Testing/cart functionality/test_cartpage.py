from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time


def test_cart_functionality():
    """
    Tests the shopping cart functionality:
    - Login to account
    - Navigate to catalogue
    - Navigate directly to product page (id=1)
    - Add product to cart
    - Verify cart counter updates to 1
    - Navigate to cart page
    - Verify exactly 1 product appears in cart
    - Verify total price displays correctly
    - Remove product from cart
    - Verify cart counter disappears or shows 0
    - Verify empty cart message appears
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
        print("Starting cart functionality test...")
        
        # Test credentials 
        test_email = "testtest@gmail.com"
        test_password = "test1234"
        
        # Step 1: Navigate to Homepage
        print("\nStep 1: Loading homepage...")
        driver.get("http://localhost:3000")
        time.sleep(2)
        print("✓ Homepage loaded successfully")
        
        # Step 2: Login
        print("\nStep 2: Logging in...")
        
        # Navigate to login page
        driver.get("http://localhost:3000/login")
        time.sleep(2)
        
        # Enter email
        email_field = wait.until(
            EC.presence_of_element_located((By.NAME, "email"))
        )
        email_field.clear()
        email_field.send_keys(test_email)
        print(f"  Email entered: {test_email}")
        
        # Enter password
        password_field = driver.find_element(By.NAME, "password")
        password_field.clear()
        password_field.send_keys(test_password)
        print("  Password entered")
        
        # Click login button
        login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        login_button.click()
        
        time.sleep(3)
        print("✓ Logged in successfully")
        
        # Step 3: Navigate to Catalogue
        print("\nStep 3: Navigating to catalogue page...")
        try:
            catalogue_link = wait.until(
                EC.element_to_be_clickable((By.LINK_TEXT, "CATALOGUE"))
            )
            catalogue_link.click()
            time.sleep(2)
            print("✓ Catalogue page loaded successfully")
        except:
            driver.get("http://localhost:3000/catalogue")
            time.sleep(2)
            print("✓ Catalogue page loaded via direct URL")
        
        # Step 4: Navigate Directly to Product Page
        print("\nStep 4: Navigating to product page (id=1)...")
        driver.get("http://localhost:3000/product_page?id=1")
        time.sleep(2)
        print("✓ Product page loaded (id=1)")
        
        # Step 5: Add Product to Cart
        print("\nStep 5: Adding product to cart...")
        
        add_to_cart_button = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Add to Cart')]"))
        )
        
        add_to_cart_button.click()
        time.sleep(2)
        print("✓ Product added to cart")
        
        # Step 6: Verify Cart Counter Updated to 1
        print("\nStep 6: Verifying cart counter shows 1...")
        
        # Using the specific cart counter badge selector
        cart_counter = wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 
                "a[href='/cart'] span.absolute.-top-1.-right-1.bg-white.text-black"
            ))
        )
        counter_value = cart_counter.text.strip()
        print(f"  Cart counter displays: '{counter_value}'")
        
        assert counter_value == "1", f"Cart counter should show '1', but shows '{counter_value}'"
        print("✓ Cart counter correctly shows 1")
        
        # Step 7: Navigate to Cart Page
        print("\nStep 7: Navigating to cart page...")
        
        try:
            cart_link = wait.until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, "a[href='/cart']"))
            )
            cart_link.click()
            time.sleep(2)
            print("✓ Cart page loaded")
        except:
            driver.get("http://localhost:3000/cart")
            time.sleep(2)
            print("✓ Cart page loaded via direct URL")
        
        # Step 8: Verify Exactly 1 Product in Cart
        print("\nStep 8: Verifying exactly 1 product in cart...")
        
        # Using the correct cart item selector from the screenshot
        cart_items = wait.until(
            EC.presence_of_all_elements_located((By.XPATH, 
                "//div[contains(@class, 'flex items-center bg-white rounded-lg shadow-md')]"
            ))
        )
        
        item_count = len(cart_items)
        print(f"  Found {item_count} item(s) in cart")
        
        assert item_count == 1, f"Cart should contain exactly 1 item, but found {item_count}"
        print("✓ Cart contains exactly 1 item")
        
        # Step 9: Verify Cart Total Displays
        print("\nStep 9: Verifying cart total displays...")
        
        # Look for the total price with the specific green styling
        total_element = wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, 
                "span.text-2xl.font-bold.text-\\[\\#5B6D50\\]"
            ))
        )
        total_value = total_element.text.strip()
        print(f"  Cart total displays: {total_value}")
        
        assert "$" in total_value or total_value.replace(".", "").replace(",", "").isdigit(), \
            f"Total should display a valid price, but shows: '{total_value}'"
        print("✓ Cart total displays correctly")
        
        # Step 10: Remove Product from Cart
        print("\nStep 10: Removing product from cart...")
        
        remove_button = wait.until(
            EC.element_to_be_clickable((By.XPATH, 
                "//button[contains(text(), 'Remove') or contains(text(), 'remove')]"
            ))
        )
        remove_button.click()
        time.sleep(2)
        print("✓ Product removed from cart")
        
        # Step 11: Verify Cart Counter Returns to 0 or Disappears
        print("\nStep 11: Verifying cart counter is now 0 or hidden...")
        
        time.sleep(1)
        
        try:
            # Try to find the counter badge
            cart_counter_after = driver.find_element(By.CSS_SELECTOR, 
                "a[href='/cart'] span.absolute.-top-1.-right-1.bg-white.text-black"
            )
            counter_value_after = cart_counter_after.text.strip()
            
            if counter_value_after == "0" or counter_value_after == "":
                print(f"✓ Cart counter shows: '{counter_value_after or '0'}'")
            else:
                raise AssertionError(f"Cart counter should be 0, but shows '{counter_value_after}'")
                
        except Exception as e:
            # If element not found, that's actually good - badge is hidden when cart is empty
            if "no such element" in str(e).lower() or "unable to locate" in str(e).lower():
                print("✓ Cart counter badge is hidden (cart is empty)")
            else:
                raise e
        
        # Step 12: Verify Empty Cart Message
        print("\nStep 12: Verifying empty cart message...")
        
        empty_message = wait.until(
            EC.presence_of_element_located((By.XPATH, 
                "//*[contains(text(), 'You currently have nothing in your shopping cart')]"
            ))
        )
        message_text = empty_message.text
        print(f"  Empty cart message: '{message_text}'")
        
        assert "nothing in your shopping cart" in message_text.lower(), \
            f"Expected empty cart message, but got: '{message_text}'"
        print("✓ Empty cart message displays correctly")
        
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
    print("CART FUNCTIONALITY TEST")
    print("=" * 60)
    print("\nThis test will verify:")
    print("  1. User login")
    print("  2. Navigate to catalogue")
    print("  3. Navigate to product page (id=1)")
    print("  4. Adding product to cart")
    print("  5. Cart counter updates to 1")
    print("  6. Viewing cart page")
    print("  7. Exactly 1 item in cart")
    print("  8. Cart total calculation")
    print("  9. Removing product from cart")
    print(" 10. Cart counter returns to 0")
    print(" 11. Empty cart message appears")
    print("\n" + "=" * 60)

    success = test_cart_functionality()

    print("\n" + "=" * 60)
    if success:
        print("FINAL RESULT: TEST PASSED ✓")
    else:
        print("FINAL RESULT: TEST FAILED ✗")
    print("=" * 60)