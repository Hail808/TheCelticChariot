from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time
import random
import string

def test_commission_form():
    """
    Tests the Commission Request form:
    - Navigate to Commission page
    - Fill First Name
    - Fill Last Name
    - Fill Email
    - Fill Message/Request
    - Submit form
    """

    chrome_options = Options()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option("useAutomationExtension", False)

    driver = webdriver.Chrome(options=chrome_options)
    driver.maximize_window()
    wait = WebDriverWait(driver, 20)

    try:
        print("\n=== Starting Commission Form Test ===")

        # STEP 1 — Load homepage
        driver.get("http://localhost:3000")
        print("✓ Homepage loaded")

        # STEP 2 — Navigate to Commissions page  
        print("Navigating to Commissions page...")

        # Try clicking a button or link with text containing "Commission"
        try:
            commission_button = wait.until(
                EC.element_to_be_clickable(
                    (By.XPATH, "//a[contains(@href, 'commission') or contains(text(), 'Commission')]")
                )
            )
            commission_button.click()
        except:
            # Fallback: go directly
            driver.get("http://localhost:3000/commissions")

        print("✓ Commission page loaded")

        # STEP 3 — Fill First Name
        first_name_input = wait.until(
            EC.presence_of_element_located((By.XPATH, "//input[contains(@name, 'first') or contains(@id, 'first')]"))
        )
        first_name_input.send_keys("John")
        print("✓ First name entered")

        # STEP 4 — Fill Last Name
        last_name_input = driver.find_element(By.XPATH, "//input[contains(@name, 'last') or contains(@id, 'last')]")
        last_name_input.send_keys("Doe")
        print("✓ Last name entered")

        # STEP 5 — Email address
        email_input = driver.find_element(By.XPATH, "//input[@type='email' or contains(@name,'email')]")
        email_input.send_keys("john.doe@example.com")
        print("✓ Email entered")

        # STEP 6 — Message / Description Field  
        message_input = driver.find_element(By.XPATH, "//textarea[contains(@name, 'message') or contains(@id, 'message')]")
        message_input.send_keys("Hello! I would like to request a custom jewelry commission.")
        print("✓ Message entered")

        # STEP 7 — Submit form
        submit_button = wait.until(
            EC.element_to_be_clickable(
                (By.XPATH, "//button[contains(text(), 'Submit') or contains(text(), 'Send')]")
            )
        )
        submit_button.click()
        print("✓ Form submitted")

        time.sleep(2)

        print("\n=== Commission Form Test Completed Successfully ===")
        return True

    except Exception as e:
        print(f"✗ Test failed: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

    finally:
        input("\nPress ENTER to close browser and end test...")
        driver.quit()


if __name__ == "__main__":
    print("Running Commission Form Test")
    test_commission_form()
