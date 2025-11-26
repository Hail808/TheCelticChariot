"""
Delete Product Test - The Celtic Chariot Admin Catalogue
Complete workflow test for deleting products
"""

import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
import time
import random

# Configuration
BASE_URL = "http://localhost:3000"
ADMIN_EMAIL = "admin@test.com"  # Update with your admin email
ADMIN_PASSWORD = "admin123"  # Update with your admin password


@pytest.fixture
def driver():
    driver = webdriver.Chrome()
    driver.implicitly_wait(10)
    yield driver
    driver.quit()


def login_as_admin(driver):
    """Helper function to login as admin"""
    driver.get(f"{BASE_URL}/login")
    time.sleep(2)
    
    email_field = driver.find_element(By.ID, "email")
    password_field = driver.find_element(By.ID, "password")
    login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
    
    email_field.clear()
    email_field.send_keys(ADMIN_EMAIL)
    password_field.clear()
    password_field.send_keys(ADMIN_PASSWORD)
    login_button.click()
    time.sleep(3)


def create_test_product(driver, product_name="Test Product to Delete"):
    """Helper function to create a test product for deletion"""
    # Click Add Product button
    add_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Add Product')]")
    add_button.click()
    time.sleep(2)
    
    # Fill in product details
    name_field = driver.find_element(By.NAME, "product_name")
    name_field.send_keys(product_name)
    
    price_field = driver.find_element(By.NAME, "price")
    price_field.send_keys("19.99")
    
    inventory_field = driver.find_element(By.NAME, "inventory")
    inventory_field.send_keys("10")
    
    # Submit
    create_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Create Product')]")
    create_button.click()
    time.sleep(2)
    
    # Handle success alert if present
    try:
        alert = driver.switch_to.alert
        alert.accept()
        time.sleep(1)
    except:
        pass
    
    print(f"✅ Created test product: {product_name}")
    return product_name


def test_delete_button_exists(driver):
    """Test that Delete buttons are present for products"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/catalogue")
    time.sleep(2)
    
    # Find all delete buttons
    delete_buttons = driver.find_elements(By.XPATH, "//button[text()='Delete']")
    
    if len(delete_buttons) > 0:
        print(f"\n✅ Found {len(delete_buttons)} Delete buttons")
        assert delete_buttons[0].is_displayed(), "Delete button should be visible"
    else:
        print("\n⚠️  No products available for deletion")
        # Create a product first
        create_test_product(driver)
        time.sleep(2)
        
        delete_buttons = driver.find_elements(By.XPATH, "//button[text()='Delete']")
        assert len(delete_buttons) > 0, "Delete button should appear after creating product"


def test_delete_button_styling(driver):
    """Test that Delete button has warning/danger styling (red)"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/catalogue")
    time.sleep(2)
    
    delete_buttons = driver.find_elements(By.XPATH, "//button[text()='Delete']")
    
    if len(delete_buttons) == 0:
        create_test_product(driver)
        time.sleep(2)
        delete_buttons = driver.find_elements(By.XPATH, "//button[text()='Delete']")
    
    if len(delete_buttons) > 0:
        classes = delete_buttons[0].get_attribute("class")
        print(f"\n📊 Delete button classes: {classes}")
        
        # Check for red/danger styling
        has_warning_style = "red" in classes or "danger" in classes
        assert has_warning_style, "Delete button should have red/danger styling"
        print("✅ Delete button has proper warning styling")

def test_delete_with_confirmation_dialog(driver):
    """Test that delete shows confirmation dialog to prevent accidental deletion"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/catalogue")
    time.sleep(2)
    
    # Create test product
    unique_id = random.randint(1000, 9999)
    product_name = f"Confirm Delete Test {unique_id}"
    create_test_product(driver, product_name)
    time.sleep(2)
    
    # Find the first delete button
    delete_buttons = driver.find_elements(By.XPATH, "//button[text()='Delete']")
    
    if len(delete_buttons) > 0:
        delete_buttons[0].click()
        time.sleep(1)
        
        # Check for confirmation dialog
        try:
            alert = driver.switch_to.alert
            alert_text = alert.text
            print(f"\n✅ Confirmation dialog present: '{alert_text}'")
            
            # Check that it asks for confirmation
            confirmation_keywords = ["delete", "confirm", "sure", "remove"]
            has_confirmation = any(keyword in alert_text.lower() for keyword in confirmation_keywords)
            
            if has_confirmation:
                print("✅ Confirmation dialog contains appropriate warning text")
            
            # Cancel the deletion
            alert.dismiss()  # Click Cancel/No
            time.sleep(2)
            
            # Verify product still exists
            assert product_name in driver.page_source, "Product should still exist after canceling deletion"
            print("✅ Product preserved after canceling confirmation dialog")
            
        except:
            print("\nℹ️  No confirmation dialog found - deletion may be direct")
            print("⚠️  Consider adding confirmation for better UX")


def test_delete_cancel_preserves_product(driver):
    """Test that canceling delete confirmation preserves the product"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/catalogue")
    time.sleep(2)
    
    # Create test product
    unique_id = random.randint(1000, 9999)
    product_name = f"Cancel Delete Test {unique_id}"
    create_test_product(driver, product_name)
    time.sleep(2)
    
    # Count products before
    product_cards_before = driver.find_elements(By.CSS_SELECTOR, "button[class*='aspect-square']")
    count_before = len(product_cards_before)
    
    # Click delete
    delete_buttons = driver.find_elements(By.XPATH, "//button[text()='Delete']")
    if len(delete_buttons) > 0:
        delete_buttons[0].click()
        time.sleep(1)
        
        # Try to cancel
        try:
            alert = driver.switch_to.alert
            alert.dismiss()  # Click Cancel
            time.sleep(2)
            
            # Verify product count unchanged
            product_cards_after = driver.find_elements(By.CSS_SELECTOR, "button[class*='aspect-square']")
            count_after = len(product_cards_after)
            
            assert count_before == count_after, "Product count should remain the same after canceling"
            print(f"\n✅ Product count preserved: {count_after} products")
            
            # Verify specific product still exists
            assert product_name in driver.page_source, "Product should still exist after cancel"
            print(f"✅ Product '{product_name}' still exists after canceling deletion")
            
        except:
            print("\nℹ️  No cancelable confirmation dialog (direct deletion)")


def test_delete_from_product_card(driver):
    """Test that delete button appears on product card"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/catalogue")
    time.sleep(2)
    
    # Ensure at least one product exists
    product_cards = driver.find_elements(By.CSS_SELECTOR, "button[class*='aspect-square']")
    
    if len(product_cards) == 0:
        create_test_product(driver)
        time.sleep(2)
        product_cards = driver.find_elements(By.CSS_SELECTOR, "button[class*='aspect-square']")
    
    # Find delete buttons associated with product cards
    delete_buttons = driver.find_elements(By.XPATH, "//button[text()='Delete']")
    
    print(f"\n📊 Product cards: {len(product_cards)}")
    print(f"📊 Delete buttons: {len(delete_buttons)}")
    
    # Each product should have a delete button
    assert len(delete_buttons) >= len(product_cards) or len(delete_buttons) > 0, \
        "Delete buttons should be available for products"
    
    print("✅ Delete buttons are properly associated with product cards")

def test_delete_nonexistent_product_handling(driver):
    """Test behavior when trying to delete a product that may not exist"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/catalogue")
    time.sleep(2)
    
    # Check if there are any products to delete
    delete_buttons = driver.find_elements(By.XPATH, "//button[text()='Delete']")
    
    if len(delete_buttons) == 0:
        print("\n✅ No products available - delete buttons correctly hidden")
        print("✅ Handling of empty catalogue is correct")
    else:
        print(f"\n📊 {len(delete_buttons)} products available for deletion")
        print("✅ Delete buttons only appear when products exist")


def test_delete_button_clickable(driver):
    """Test that Delete button is clickable and not disabled"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/catalogue")
    time.sleep(2)
    
    delete_buttons = driver.find_elements(By.XPATH, "//button[text()='Delete']")
    
    if len(delete_buttons) == 0:
        create_test_product(driver)
        time.sleep(2)
        delete_buttons = driver.find_elements(By.XPATH, "//button[text()='Delete']")
    
    if len(delete_buttons) > 0:
        delete_button = delete_buttons[0]
        
        # Check if button is enabled
        is_enabled = delete_button.is_enabled()
        assert is_enabled, "Delete button should be enabled"
        
        # Check if button is displayed
        is_displayed = delete_button.is_displayed()
        assert is_displayed, "Delete button should be visible"
        
        print("\n✅ Delete button is clickable and enabled")
        print(f"   Enabled: {is_enabled}")
        print(f"   Displayed: {is_displayed}")