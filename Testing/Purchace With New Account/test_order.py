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


def test_order_with_new_account():
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
        test_email = generate_random_email()
        test_password = "TestPassword123!"
        test_name = "Test User"

        print(f"Starting test with email: {test_email}")

        print("Creating account...")
        driver.get("http://localhost:3000/create_account")
        time.sleep(2)  # Wait for page load

        name_field = wait.until(EC.presence_of_element_located((By.NAME, "username")))
        name_field.send_keys(test_name)

        email_field = driver.find_element(By.NAME, "email")
        email_field.send_keys(test_email)

        password_field = driver.find_element(By.NAME, "password")
        password_field.send_keys(test_password)

        signup_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        signup_button.click()
        time.sleep(3)

        # Go to catalogue
        driver.get("http://localhost:3000/catalogue")
        time.sleep(2)
        
        search_field = driver.find_element(By.CSS_SELECTOR, "input[placeholder='Search for products...']")
        search_field.send_keys("test_item")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        time.sleep(2)
        
        image_field = driver.find_element(By.XPATH, "//span[text()='No Image']/parent::div")
        image_field.click()
        time.sleep(2)
        driver.find_element(By.XPATH, "//button[text()='Add to Cart']").click()
        time.sleep(2)

        # Proceed to checkout
        driver.get("http://localhost:3000/cart")
        print("Proceeding to checkout...")
        checkout_button = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Proceed to Checkout')]"))
        )
        checkout_button.click()
        
        # Wait for Stripe checkout page
        print("Waiting for Stripe Checkout page...")
        wait.until(EC.url_contains("checkout.stripe.com"))
        print("✓ Redirected to Stripe Checkout")

        email_input = wait.until(EC.presence_of_element_located((By.ID, "email")))
        email_input.clear()
        email_input.send_keys(test_email)
        
        time.sleep(1)

        # Wait for manual card entry
        print("\nManual Stripe input required")
        print("Please complete the shipping and payment manually in the browser.")
        print("Use test name: test")
        print("For the address, type 1234 and autofill to 1234 Howe Av")
        print("Use test card number: 4242 4242 4242 4242")
        print("Expiry: 4/44   CVC: 444")
        print("Uncheck 'Save my information for a faster checkout'")
        print("Then click 'Pay' on the Stripe page.")

        # Wait for redirect to success page
        print("\nWaiting for payment completion...")
        wait.until(EC.url_contains("/success"))
        print("✓ Redirected to success page")
        print("=" * 40 + "\n")
        
        # Wait for success page to stabilize
        time.sleep(3)

        # Check user dashboard
        print("Checking user dashboard...")
        driver.get("http://localhost:3000/user_dashboard")
        time.sleep(3)

        # Verify order appears
        print("Verifying order in dashboard...")
        orders_table = wait.until(
            EC.presence_of_element_located((By.XPATH, "//h2[text()='Orders']/following-sibling::div//table"))
        )
        print("✓ Orders table found")
        
        # Get all order rows from tbody
        order_rows = orders_table.find_elements(By.CSS_SELECTOR, "tbody tr")
        
        if len(order_rows) > 0:
            print(f"✓ Found {len(order_rows)} order(s) in dashboard")
            
            # Get the first order details
            first_order = order_rows[0]
            cells = first_order.find_elements(By.TAG_NAME, "td")
            
            # Extract order information based on the table structure
            order_id_link = cells[0].find_element(By.TAG_NAME, "a")
            order_number = order_id_link.text.replace('#', '') 
            order_date = cells[1].text
            
            # Get payment status from the span
            payment_status_span = cells[2].find_element(By.TAG_NAME, "span")
            payment_status = payment_status_span.text
            
            # Get fulfillment status from the span
            fulfillment_status_span = cells[3].find_element(By.TAG_NAME, "span")
            fulfillment_status = fulfillment_status_span.text
            
            total = cells[4].text
            
            print(f"  Order Number: {order_number}")
            print(f"  Date: {order_date}")
            print(f"  Payment Status: {payment_status}")
            print(f"  Fulfillment Status: {fulfillment_status}")
            print(f"  Total: {total}")
            
            # Verify payment status is "Paid"
            assert "paid" in payment_status.lower(), f"Order payment status should be 'Paid', got '{payment_status}'"
            print("✓ Order verification successful!")
            return True
        else:
            print("No orders found in dashboard!")
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
    print("Starting Order With New Account Test")
    print("=" * 50)

    success = test_order_with_new_account()

    print("\n" + "=" * 50)
    if success:
        print("TEST PASSED ✓")
    else:
        print("TEST FAILED ✗")
    print("=" * 50)