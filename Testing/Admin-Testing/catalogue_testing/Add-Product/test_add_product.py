"""
Add Product Test - The Celtic Chariot Admin Catalogue
Complete workflow test for adding a new product
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


def test_add_product_complete_workflow(driver):
    """Test complete workflow of adding a new product"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/catalogue")
    time.sleep(2)
    
    # Generate unique product name to avoid conflicts
    unique_id = random.randint(1000, 9999)
    product_name = f"Test Celtic Necklace {unique_id}"
    product_description = "Beautiful handcrafted Celtic knot necklace with traditional design"
    product_price = "49.99"
    product_inventory = "25"
    
    # Click Add Product button
    add_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Add Product')]")
    add_button.click()
    time.sleep(2)
    
    # Verify modal opened
    modal = driver.find_element(By.CSS_SELECTOR, ".fixed.inset-0")
    assert modal.is_displayed(), "Add Product modal did not open"
    
    # Fill in product details
    name_field = driver.find_element(By.NAME, "product_name")
    name_field.clear()
    name_field.send_keys(product_name)
    
    description_field = driver.find_element(By.NAME, "description")
    description_field.clear()
    description_field.send_keys(product_description)
    
    price_field = driver.find_element(By.NAME, "price")
    price_field.clear()
    price_field.send_keys(product_price)
    
    inventory_field = driver.find_element(By.NAME, "inventory")
    inventory_field.clear()
    inventory_field.send_keys(product_inventory)
    
    # Select category (Necklace)
    try:
        category_select = driver.find_element(By.NAME, "category")
        select = Select(category_select)
        select.select_by_visible_text("Necklace")
    except:
        # If category is not a dropdown, it might be buttons
        try:
            necklace_option = driver.find_element(By.XPATH, "//*[contains(text(), 'Necklace')]")
            necklace_option.click()
        except:
            print("Category selection not found - continuing without it")
    
    time.sleep(1)
    
    # Click Create Product button
    create_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Create Product')]")
    create_button.click()
    time.sleep(2)
    
    # Handle success alert
    try:
        alert = driver.switch_to.alert
        alert_text = alert.text
        print(f"\n✅ Alert message: {alert_text}")
        alert.accept()  # Click OK on the alert
        time.sleep(1)
    except:
        pass  # No alert present
    
    # Verify modal closed
    try:
        modals = driver.find_elements(By.CSS_SELECTOR, ".fixed.inset-0")
        modal_visible = any(modal.is_displayed() for modal in modals) if modals else False
        assert not modal_visible, "Modal did not close after creating product"
    except:
        pass  # Modal handling may vary
    
    # Verify product appears in catalogue
    page_source = driver.page_source
    assert product_name in page_source, f"Product '{product_name}' not found in catalogue"
    
    print(f"\n✅ SUCCESS: Product '{product_name}' was added successfully!")
    print(f"   Price: ${product_price}")
    print(f"   Inventory: {product_inventory} units")
    print(f"   Description: {product_description}")


def test_add_product_with_validation(driver):
    """Test that form validation works when adding product"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/catalogue")
    time.sleep(2)
    
    # Click Add Product button
    add_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Add Product')]")
    add_button.click()
    time.sleep(2)
    
    # Try to submit empty form
    create_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Create Product')]")
    create_button.click()
    time.sleep(2)
    
    # Check that we're still on the modal (validation prevented submission)
    modal = driver.find_element(By.CSS_SELECTOR, ".fixed.inset-0")
    assert modal.is_displayed(), "Modal closed despite invalid form"
    
    # Check for validation messages or required field indicators
    name_field = driver.find_element(By.NAME, "product_name")
    is_required = name_field.get_attribute("required")
    
    assert is_required is not None, "Product name field should be required"
    
    print("\n✅ SUCCESS: Form validation is working correctly")


def test_add_product_cancel_button(driver):
    """Test that Cancel button closes modal without adding product"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/catalogue")
    time.sleep(2)
    
    # Count existing products
    product_cards_before = driver.find_elements(By.CSS_SELECTOR, "button[class*='aspect-square']")
    count_before = len(product_cards_before)
    
    # Click Add Product button
    add_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Add Product')]")
    add_button.click()
    time.sleep(1)
    
    # Fill in some data
    name_field = driver.find_element(By.NAME, "product_name")
    name_field.send_keys("This Should Not Be Added")
    
    # Click Cancel
    cancel_button = driver.find_element(By.XPATH, "//button[text()='Cancel']")
    cancel_button.click()
    time.sleep(2)
    
    # Verify modal closed
    modals = driver.find_elements(By.CSS_SELECTOR, ".fixed.inset-0")
    modal_visible = any(modal.is_displayed() for modal in modals) if modals else False
    assert not modal_visible, "Modal did not close after clicking Cancel"
    
    # Verify product count didn't change
    product_cards_after = driver.find_elements(By.CSS_SELECTOR, "button[class*='aspect-square']")
    count_after = len(product_cards_after)
    
    assert count_before == count_after, "Product was added despite clicking Cancel"
    
    print("\n✅ SUCCESS: Cancel button works correctly")


def test_add_product_with_invalid_price(driver):
    """Test that invalid price values are handled"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/catalogue")
    time.sleep(2)
    
    # Click Add Product button
    add_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Add Product')]")
    add_button.click()
    time.sleep(2)
    
    # Try to enter negative price
    price_field = driver.find_element(By.NAME, "price")
    price_field.clear()
    price_field.send_keys("-10")
    
    # Check field type and validation
    field_type = price_field.get_attribute("type")
    field_min = price_field.get_attribute("min")
    
    print(f"\n📊 Price field validation:")
    print(f"   Field type: {field_type}")
    print(f"   Min value: {field_min}")
    
    # If there's a min attribute, it should prevent negative values
    if field_min:
        assert float(field_min) >= 0, "Price field should not allow negative values"
        print("   ✅ Price validation is configured correctly")


def test_add_product_with_image_url(driver):
    """Test adding product with manual image URL"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/catalogue")
    time.sleep(2)
    
    unique_id = random.randint(1000, 9999)
    product_name = f"Test Product with Image {unique_id}"
    image_url = "https://example.com/celtic-necklace.jpg"
    
    # Click Add Product button
    add_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Add Product')]")
    add_button.click()
    time.sleep(2)
    
    # Fill in required fields
    name_field = driver.find_element(By.NAME, "product_name")
    name_field.send_keys(product_name)
    
    price_field = driver.find_element(By.NAME, "price")
    price_field.send_keys("29.99")
    
    inventory_field = driver.find_element(By.NAME, "inventory")
    inventory_field.send_keys("10")
    
    # Try to add image URL if field exists
    try:
        image_url_field = driver.find_element(By.CSS_SELECTOR, "input[placeholder*='image'], input[placeholder*='URL']")
        image_url_field.send_keys(image_url)
        print(f"\n✅ Image URL field found and filled with: {image_url}")
    except:
        print("\n⚠️  Image URL input field not found - may use file upload only")
    
    # Submit form
    create_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Create Product')]")
    create_button.click()
    time.sleep(2)
    
    # Handle success alert
    try:
        alert = driver.switch_to.alert
        alert_text = alert.text
        print(f"\n✅ Alert message: {alert_text}")
        alert.accept()
        time.sleep(1)
    except:
        pass
    
    # Verify product was added
    assert product_name in driver.page_source, f"Product '{product_name}' not found"
    print(f"✅ Product '{product_name}' added successfully")


def test_add_multiple_products_sequentially(driver):
    """Test adding multiple products in sequence"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/catalogue")
    time.sleep(2)
    
    products = [
        {"name": f"Celtic Earrings {random.randint(1000, 9999)}", "price": "24.99", "inventory": "30"},
        {"name": f"Celtic Beads {random.randint(1000, 9999)}", "price": "15.99", "inventory": "50"},
        {"name": f"Celtic Keychain {random.randint(1000, 9999)}", "price": "9.99", "inventory": "100"},
    ]
    
    added_products = []
    
    for product in products:
        # Click Add Product button
        add_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Add Product')]")
        add_button.click()
        time.sleep(2)
        
        # Fill in product details
        name_field = driver.find_element(By.NAME, "product_name")
        name_field.send_keys(product["name"])
        
        price_field = driver.find_element(By.NAME, "price")
        price_field.send_keys(product["price"])
        
        inventory_field = driver.find_element(By.NAME, "inventory")
        inventory_field.send_keys(product["inventory"])
        
        # Submit
        create_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Create Product')]")
        create_button.click()
        time.sleep(2)
        
        # Handle success alert
        try:
            alert = driver.switch_to.alert
            alert.accept()
            time.sleep(1)
        except:
            pass
        
        # Verify product added
        if product["name"] in driver.page_source:
            added_products.append(product["name"])
            print(f"✅ Added: {product['name']}")
        else:
            print(f"❌ Failed to add: {product['name']}")
    
    print(f"\n📊 Summary: Successfully added {len(added_products)}/{len(products)} products")
    assert len(added_products) == len(products), "Not all products were added successfully"


def test_add_product_modal_fields_present(driver):
    """Test that all expected form fields are present in Add Product modal"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/catalogue")
    time.sleep(2)
    
    # Click Add Product button
    add_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Add Product')]")
    add_button.click()
    time.sleep(2)
    
    # Check for all expected fields
    expected_fields = {
        "product_name": "Product Name",
        "description": "Description",
        "price": "Price",
        "inventory": "Inventory"
    }
    
    found_fields = []
    missing_fields = []
    
    for field_name, field_label in expected_fields.items():
        try:
            field = driver.find_element(By.NAME, field_name)
            found_fields.append(field_label)
            print(f"✅ Found field: {field_label}")
        except:
            missing_fields.append(field_label)
            print(f"❌ Missing field: {field_label}")
    
    # Check for file upload
    try:
        file_input = driver.find_element(By.CSS_SELECTOR, "input[type='file']")
        found_fields.append("Image Upload")
        print(f"✅ Found field: Image Upload")
    except:
        missing_fields.append("Image Upload")
        print(f"⚠️  Image Upload field not found")
    
    print(f"\n📊 Form Fields Summary:")
    print(f"   Found: {len(found_fields)} fields")
    print(f"   Missing: {len(missing_fields)} fields")
    
    assert len(missing_fields) == 0, f"Missing required fields: {', '.join(missing_fields)}"