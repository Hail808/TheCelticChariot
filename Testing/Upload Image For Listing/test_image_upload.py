from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time
import os
import random
import string

def test_admin_create_listing():
    chrome_options = Options()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option("useAutomationExtension", False)

    driver = webdriver.Chrome(options=chrome_options)
    wait = WebDriverWait(driver, 30)

    try:
        print("=" * 50)
        print("Logging into admin account...")
        print("=" * 50)

        # Go to login page
        driver.get("http://localhost:3000/login")

        # Enter credentials
        email_field = wait.until(EC.presence_of_element_located((By.NAME, "email")))
        email_field.send_keys("admin@test.com")

        password_field = driver.find_element(By.NAME, "password")
        password_field.send_keys("admin123")
        time.sleep(1)
        login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        login_button.click()

        # Wait for dashboard to load
        wait.until(EC.url_contains("/user_dashboard"))
        print("✓ Logged in successfully as admin")

        # Navigate to catalogue page
        print("\nOpening admin catalogue page...")
        driver.get("http://localhost:3000/admin/catalogue")
        wait.until(EC.presence_of_element_located((By.TAG_NAME, "h1")))
        print("✓ Catalogue page loaded")

        # Click "Create New Listing" button
        print("\nOpening create listing page...")
        create_button = wait.until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), '+ Add Product')]"))
        )
        create_button.click()

        # Wait for create listing form
        wait.until(EC.presence_of_element_located((By.NAME, "product_name")))
        print("✓ Create Listing form loaded")

        # Fill out test product info
        random_id =''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
        product_name = f"Selenium Test Product {random_id}"
        driver.find_element(By.NAME, "product_name").send_keys(product_name)
        driver.find_element(By.NAME, "description").send_keys("This is a test product created by Selenium automation.")
        driver.find_element(By.NAME, "price").send_keys("19.99")
        driver.find_element(By.NAME, "inventory").send_keys("10")

                # Upload test image
        upload_input = driver.find_element(By.CSS_SELECTOR, "input[type='file'][multiple]")

        # Create test image path
        test_image_path = os.path.abspath("test_image.jpg")

        # Create dummy test image if it doesn't exist
        if not os.path.exists(test_image_path):
            from PIL import Image
            img = Image.new('RGB', (100, 100), color=(255, 0, 0))
            img.save(test_image_path)

        # Upload the image
        upload_input.send_keys(test_image_path)
        print(f"✓ Uploaded image: {test_image_path}")

        # Submit listing
        submit_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Create Product')]"))
        )
        submit_button.click()
        try:
            WebDriverWait(driver, 5).until(EC.alert_is_present())
            alert = driver.switch_to.alert
            print(f"Alert Text: {alert.text}")
            alert.accept()
            print("✓ Dismissed success alert")
        except:
            print("No alert appeared after submission")
        # Wait for success confirmation
        print("\nSubmitting listing...")
        time.sleep(1)
        

        search_bar = wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Search for products...']"))
        )

        # Search for the specific product name
        search_bar.clear()
        search_bar.send_keys(product_name)
        search_button = driver.find_element(
            By.XPATH, "//button[contains(text(), 'Search')]"
        )
        search_button.click()
        time.sleep(1)

        # Verify it appears in the catalogue list
        wait.until(EC.presence_of_element_located((By.XPATH, f"//*[contains(text(), '{product_name}')]")))
        print("✓ Verified product appears in catalogue list")


        # Find delete button in that row (adjust selector if your delete button differs)
        delete_button = driver.find_element(By.XPATH, ".//button[contains(text(), 'Delete')]")
        delete_button.click()
        WebDriverWait(driver, 5).until(EC.alert_is_present())

        confirm_alert = driver.switch_to.alert
        confirm_alert.accept()
        print("✓ Clicked OK on delete confirmation alert")

        return True

    except Exception as e:
        print(f"Test failed: {e}")
        return False

    finally:
        input("\nPress ENTER to close browser...")
        driver.quit()


if __name__ == "__main__":
    print("=" * 50)
    print("Starting Admin Create Listing Test")
    print("=" * 50)
    success = test_admin_create_listing()
    print("\n" + "=" * 50)
    print("TEST PASSED" if success else "TEST FAILED")
    print("=" * 50)
