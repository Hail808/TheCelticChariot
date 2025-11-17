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
        print(f"Starting test with email: {test_email}")

       
        driver.get("http://localhost:3000/catalogue")
        time.sleep(2)
        
        search_field = driver.find_element(By.CSS_SELECTOR, "input[placeholder='Search for products...']")
        search_field.send_keys("test_item")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        time.sleep(2)
        
        image_field = driver.find_element(By.XPATH, "//span[text()='No Image']/parent::div")
        image_field.click()
        time.sleep(2)
        add_to_cart = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[text()='Add to Cart']")))
        add_to_cart.click()
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
        
        # Wait for success page to stabilize
        time.sleep(3)
        return True
        
       

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
