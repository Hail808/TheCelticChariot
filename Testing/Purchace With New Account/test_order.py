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
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option("useAutomationExtension", False)

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

        name_field = wait.until(EC.presence_of_element_located((By.NAME, "username")))
        name_field.send_keys(test_name)

        email_field = driver.find_element(By.NAME, "email")
        email_field.send_keys(test_email)

        password_field = driver.find_element(By.NAME, "password")
        password_field.send_keys(test_password)

        signup_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        signup_button.click()

        time.sleep(2)

        # Go to cart
        print("Adding product to cart")
        time.sleep(1)
        driver.get("http://localhost:3000/cart")
        time.sleep(2)

        # Proceed to checkout
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
        print("\nManual Stripe input required ")
        print("Please complete the shipping and payment manually in the browser.")
        print("Use test name: test")
        print("For the aress, type 1234 and autofill to 1234 Howe Av")
        print("Use test card number: 4242 4242 4242 4242")
        print("Expiry: 4/44   CVC: 444")
        print("Uncheck 'Save my information for a faster checkout'")
        print("Then click 'Pay' on the Stripe page.")

        # Wait for redirect to success page
        wait.until(EC.url_contains("/success"))
        print("Payment completed successfully")

        # Check user dashboard
        print("Checking user dashboard...")
        driver.get("http://localhost:3000/user_dashboard")
        time.sleep(3)

        # Verify order appears
        print("Verifying order in dashboard...")
        orders_table = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "order-table")))
        order_rows = driver.find_elements(By.CSS_SELECTOR, ".order-table tbody tr")

        if len(order_rows) > 0:
            print(f"✓ Found {len(order_rows)} order(s) in dashboard")
            first_order = order_rows[0]
            cells = first_order.find_elements(By.TAG_NAME, "td")

            order_number = cells[0].text
            order_date = cells[1].text
            payment_status = cells[2].text
            total = cells[4].text

            print(f"  Order Number: {order_number}")
            print(f"  Date: {order_date}")
            print(f"  Payment Status: {payment_status}")
            print(f"  Total: {total}")

            assert "paid" in payment_status.lower(), "Order payment status should be 'paid'"
            print("Order verification successful!")
            return True
        else:
            print("No orders found in dashboard!")
            return False

    except Exception as e:
        print(f"Test failed with error: {str(e)}")
        return False

    finally:
        input("Press ENTER to end program")
        print("\nClosing browser...")
        driver.quit()


if __name__ == "__main__":
    print("=" * 50)
    print("Starting E2E Order Flow Test")
    print("=" * 50)

    success = test_order_with_new_account()

    print("\n" + "=" * 50)
    if success:
        print("TEST PASSED ")
    else:
        print("TEST FAILED ")
    print("=" * 50)
