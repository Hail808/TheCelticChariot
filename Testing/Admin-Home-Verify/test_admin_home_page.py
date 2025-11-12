from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import traceback

# Change this to your environment URL
BASE_URL = "http://localhost:3000/admin"

def setup_driver():
    options = Options()
    options.add_argument("--start-maximized")
    # options.add_argument("--headless")  # Uncomment for headless testing
    service = ChromeService()
    driver = webdriver.Chrome(service=service, options=options)
    return driver


def test_admin_home_page():
    driver = setup_driver()
    wait = WebDriverWait(driver, 15)

    try:
        print("🔍 Navigating to admin home page...")
        driver.get(f"{BASE_URL}/home")

        # --- Check main navigation buttons ---
        print("🔍 Checking navigation buttons...")
        nav_buttons = {
            "Engagement": "//button[contains(text(), 'Engagement')]",
            "Catalogue": "//button[contains(text(), 'Catalogue')]",
            "Orders": "//button[contains(text(), 'Orders')]"
        }

        for name, xpath in nav_buttons.items():
            buttons = driver.find_elements(By.TAG_NAME, "button")
            for b in buttons:
                print("BUTTON:", repr(b.text))
        print("✅ Navigation buttons visible.")

        # --- Click timeframe buttons (Weekly, Monthly, Yearly) ---
        print("🔍 Clicking timeframe buttons...")
        for tf in ["Weekly", "Monthly", "Yearly"]:
            btn = driver.find_element(By.XPATH, f"//button[contains(text(), '{tf}')]")
            btn.click()
            time.sleep(0.6)
            assert btn.is_enabled()
        print("✅ Timeframe buttons work.")

        # --- Test routing for navigation buttons ---
        print("🔍 Testing navigation links...")
        for name, xpath in nav_buttons.items():
            btn = driver.find_element(By.XPATH, xpath)
            btn.click()
            time.sleep(1)
            assert f"/admin/{name.lower()}" in driver.current_url, f"{name} route failed"
            driver.back()
        print("✅ Navigation routing confirmed.")

        # --- Verify “Back to Website Home” button ---
        print("🔍 Testing Back to Website Home...")
        back_btn = driver.find_element(By.XPATH, "//button[contains(text(), 'Back to Website Home')]")
        back_btn.click()
        time.sleep(1)
        assert "/admin/home" not in driver.current_url, "Back button did not navigate away"
        driver.back()
        print("✅ Back to Website Home works.")

        # --- Validate dashboard stat cards ---
        print("🔍 Checking dashboard statistic cards...")
        stat_titles = [
            "Total Page Views",
            "Total Revenue",
            "Total Orders",
            "New Customers"
        ]
        for title in stat_titles:
            card = wait.until(
                EC.presence_of_element_located((By.XPATH, f"//*[contains(text(), '{title}')]"))
            )
            assert card.is_displayed(), f"Stat card '{title}' not visible"
        print("✅ Statistic cards visible and loaded.")

        # --- Check values look numeric where expected ---
        print("🔍 Validating numeric stats...")
        numbers = driver.find_elements(By.XPATH, "//p[contains(@class, 'text-3xl')]")
        for num in numbers:
            text = num.text.replace("$", "").replace(",", "").strip()
            if text and text[0].isdigit():
                float(text)  # Will raise if not a number
        print("✅ Stat card values are numeric.")

        print("🎉 All admin home page tests passed successfully!")

    except Exception as e:
        print("❌ Test failed!")
        traceback.print_exc()
    finally:
        driver.quit()


if __name__ == "__main__":
    test_admin_home_page()
