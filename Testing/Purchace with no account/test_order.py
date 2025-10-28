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


def test_order_with_no_account():
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
        print(f"Starting test with email: {test_email}")

        # Go to cart
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
        
        #Check that the order was made and assigned a reference number
        order_element = wait.until(
            EC.presence_of_element_located((By.XPATH, "//p[contains(@class, 'font-mono') and contains(@class, 'font-bold')]"))
        )
        
        order_number = order_element.text.strip()
        if order_number:
            print(f"Order successfully saved in DB with reference {order_number}" )
            return True
        else:
            print("Order failed")

    except Exception as e:
        print(f"Test failed with error: {str(e)}")
        return False

    finally:
        input("Press ENTER to end program")
        print("\nClosing browser...")
        driver.quit()


if __name__ == "__main__":
    print("=" * 50)
    print("Starting Order with no account test")
    print("=" * 50)

    success = test_order_with_no_account()

    print("\n" + "=" * 50)
    if success:
        print("TEST PASSED ")
    else:
        print("TEST FAILED ")
    print("=" * 50)
