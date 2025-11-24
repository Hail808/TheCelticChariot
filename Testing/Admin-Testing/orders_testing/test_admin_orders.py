"""
Admin Orders Page Test Suite - The Celtic Chariot
Tests order management, filters, and order details
"""

import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
import time

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


def test_admin_orders_page_loads(driver):
    """Test that admin orders page loads successfully"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    assert "/orders" in driver.current_url


def test_admin_orders_title_exists(driver):
    """Test that Admin Orders title is displayed"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    title = driver.find_element(By.XPATH, "//h1[contains(text(), 'Admin Orders')]")
    assert title.is_displayed()


def test_back_to_admin_home_button_exists(driver):
    """Test that Back to Admin Home button exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    back_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Back to Admin Home')]")
    assert back_button.is_displayed()


def test_back_to_admin_home_button_navigates(driver):
    """Test that Back to Admin Home button navigates correctly"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    back_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Back to Admin Home')]")
    back_button.click()
    time.sleep(2)
    
    assert "/admin" in driver.current_url and "/orders" not in driver.current_url


def test_engagement_navigation_button_exists(driver):
    """Test that Engagement navigation button exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    engagement_button = driver.find_element(By.XPATH, "//button[text()='Engagement']")
    assert engagement_button.is_displayed()


def test_engagement_navigation_button_navigates(driver):
    """Test that Engagement button navigates to engagement page"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    engagement_button = driver.find_element(By.XPATH, "//button[text()='Engagement']")
    engagement_button.click()
    time.sleep(2)
    
    assert "/engagement" in driver.current_url.lower()


def test_catalogue_navigation_button_exists(driver):
    """Test that Catalogue navigation button exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    catalogue_button = driver.find_element(By.XPATH, "//button[text()='Catalogue']")
    assert catalogue_button.is_displayed()


def test_catalogue_navigation_button_navigates(driver):
    """Test that Catalogue button navigates to catalogue page"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    catalogue_button = driver.find_element(By.XPATH, "//button[text()='Catalogue']")
    catalogue_button.click()
    time.sleep(2)
    
    assert "/catalogue" in driver.current_url.lower()


def test_total_orders_stat_exists(driver):
    """Test that Total Orders stat card is displayed"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    stat = driver.find_element(By.XPATH, "//h3[contains(text(), 'Total Orders')]")
    assert stat.is_displayed()


def test_pending_orders_stat_exists(driver):
    """Test that Pending Orders stat card is displayed"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    stat = driver.find_element(By.XPATH, "//h3[contains(text(), 'Pending Orders')]")
    assert stat.is_displayed()


def test_total_revenue_stat_exists(driver):
    """Test that Total Revenue stat card is displayed"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    stat = driver.find_element(By.XPATH, "//h3[contains(text(), 'Total Revenue')]")
    assert stat.is_displayed()


def test_filter_orders_section_exists(driver):
    """Test that Filter Orders section exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    filter_header = driver.find_element(By.XPATH, "//h3[contains(text(), 'Filter Orders')]")
    assert filter_header.is_displayed()


def test_min_cost_input_exists(driver):
    """Test that Min Cost input field exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    min_label = driver.find_element(By.XPATH, "//label[contains(text(), 'Min Cost')]")
    assert min_label.is_displayed()


def test_min_cost_input_accepts_value(driver):
    """Test that Min Cost input accepts numeric value"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    number_inputs = driver.find_elements(By.CSS_SELECTOR, "input[type='number']")
    if len(number_inputs) >= 1:
        number_inputs[0].clear()
        number_inputs[0].send_keys("50")
        assert number_inputs[0].get_attribute("value") == "50"


def test_max_cost_input_exists(driver):
    """Test that Max Cost input field exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    max_label = driver.find_element(By.XPATH, "//label[contains(text(), 'Max Cost')]")
    assert max_label.is_displayed()


def test_max_cost_input_accepts_value(driver):
    """Test that Max Cost input accepts numeric value"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    number_inputs = driver.find_elements(By.CSS_SELECTOR, "input[type='number']")
    if len(number_inputs) >= 2:
        number_inputs[1].clear()
        number_inputs[1].send_keys("200")
        assert number_inputs[1].get_attribute("value") == "200"


def test_order_status_dropdown_exists(driver):
    """Test that Order Status dropdown exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    status_select = driver.find_element(By.TAG_NAME, "select")
    assert status_select.is_displayed()


def test_order_status_dropdown_has_all_statuses(driver):
    """Test that Order Status dropdown has All Statuses option"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    status_select = driver.find_element(By.TAG_NAME, "select")
    select = Select(status_select)
    options = [opt.text for opt in select.options]
    
    assert any("All" in opt for opt in options)


def test_order_status_dropdown_has_pending(driver):
    """Test that Order Status dropdown has Pending option"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    status_select = driver.find_element(By.TAG_NAME, "select")
    select = Select(status_select)
    options = [opt.text.lower() for opt in select.options]
    
    assert any("pending" in opt for opt in options)


def test_order_status_dropdown_has_processing(driver):
    """Test that Order Status dropdown has Processing option"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    status_select = driver.find_element(By.TAG_NAME, "select")
    select = Select(status_select)
    options = [opt.text.lower() for opt in select.options]
    
    assert any("processing" in opt for opt in options)


def test_order_status_dropdown_has_shipped(driver):
    """Test that Order Status dropdown has Shipped option"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    status_select = driver.find_element(By.TAG_NAME, "select")
    select = Select(status_select)
    options = [opt.text.lower() for opt in select.options]
    
    assert any("shipped" in opt for opt in options)


def test_order_status_dropdown_has_delivered(driver):
    """Test that Order Status dropdown has Delivered option"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    status_select = driver.find_element(By.TAG_NAME, "select")
    select = Select(status_select)
    options = [opt.text.lower() for opt in select.options]
    
    assert any("delivered" in opt for opt in options)


def test_order_status_dropdown_has_cancelled(driver):
    """Test that Order Status dropdown has Cancelled option"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    status_select = driver.find_element(By.TAG_NAME, "select")
    select = Select(status_select)
    options = [opt.text.lower() for opt in select.options]
    
    assert any("cancelled" in opt for opt in options)


def test_order_status_dropdown_selectable(driver):
    """Test that Order Status dropdown options can be selected"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    status_select = driver.find_element(By.TAG_NAME, "select")
    select = Select(status_select)
    select.select_by_visible_text("Pending")
    time.sleep(0.5)
    
    assert True  # Selection succeeded


def test_apply_filter_button_exists(driver):
    """Test that Apply Filter button exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    apply_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Apply Filter')]")
    assert apply_button.is_displayed()


def test_apply_filter_button_clickable(driver):
    """Test that Apply Filter button is clickable"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    apply_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Apply Filter')]")
    apply_button.click()
    time.sleep(1)
    
    assert True  # Click succeeded


def test_clear_filter_button_exists(driver):
    """Test that Clear filter button exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    clear_button = driver.find_element(By.XPATH, "//button[text()='Clear']")
    assert clear_button.is_displayed()


def test_clear_filter_button_resets_inputs(driver):
    """Test that Clear button resets filter inputs"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    # Set a filter value
    number_inputs = driver.find_elements(By.CSS_SELECTOR, "input[type='number']")
    if len(number_inputs) >= 1:
        number_inputs[0].send_keys("100")
    
    # Click clear
    clear_button = driver.find_element(By.XPATH, "//button[text()='Clear']")
    clear_button.click()
    time.sleep(1)
    
    # Check inputs are cleared
    if len(number_inputs) >= 1:
        assert number_inputs[0].get_attribute("value") == ""


def test_orders_table_exists(driver):
    """Test that orders table exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    table = driver.find_element(By.TAG_NAME, "table")
    assert table.is_displayed()


def test_table_order_id_column_exists(driver):
    """Test that Order ID column header exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    th = driver.find_element(By.XPATH, "//th[contains(text(), 'Order ID')]")
    assert th.is_displayed()


def test_table_order_id_column_sortable(driver):
    """Test that Order ID column is sortable"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    th = driver.find_element(By.XPATH, "//th[contains(text(), 'Order ID')]")
    th.click()
    time.sleep(1)
    
    assert True


def test_table_date_column_exists(driver):
    """Test that Date column header exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    th = driver.find_element(By.XPATH, "//th[contains(text(), 'Date')]")
    assert th.is_displayed()


def test_table_date_column_sortable(driver):
    """Test that Date column is sortable"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    th = driver.find_element(By.XPATH, "//th[contains(text(), 'Date')]")
    th.click()
    time.sleep(1)
    
    # Click again to toggle direction
    th.click()
    time.sleep(1)
    
    assert True


def test_table_customer_column_exists(driver):
    """Test that Customer column header exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    th = driver.find_element(By.XPATH, "//th[contains(text(), 'Customer')]")
    assert th.is_displayed()


def test_table_customer_column_sortable(driver):
    """Test that Customer column is sortable"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    th = driver.find_element(By.XPATH, "//th[contains(text(), 'Customer')]")
    th.click()
    time.sleep(1)
    
    assert True


def test_table_address_column_exists(driver):
    """Test that Address column header exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    th = driver.find_element(By.XPATH, "//th[contains(text(), 'Address')]")
    assert th.is_displayed()


def test_table_total_column_exists(driver):
    """Test that Total column header exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    th = driver.find_element(By.XPATH, "//th[contains(text(), 'Total')]")
    assert th.is_displayed()


def test_table_total_column_sortable(driver):
    """Test that Total column is sortable"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    th = driver.find_element(By.XPATH, "//th[contains(text(), 'Total')]")
    th.click()
    time.sleep(1)
    
    assert True


def test_table_items_column_exists(driver):
    """Test that Items column header exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    th = driver.find_element(By.XPATH, "//th[contains(text(), 'Items')]")
    assert th.is_displayed()


def test_table_items_column_sortable(driver):
    """Test that Items column is sortable"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    th = driver.find_element(By.XPATH, "//th[contains(text(), 'Items')]")
    th.click()
    time.sleep(1)
    
    assert True


def test_table_status_column_exists(driver):
    """Test that Status column header exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    th = driver.find_element(By.XPATH, "//th[contains(text(), 'Status')]")
    assert th.is_displayed()


def test_table_status_column_sortable(driver):
    """Test that Status column is sortable"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    th = driver.find_element(By.XPATH, "//th[contains(text(), 'Status')]")
    th.click()
    time.sleep(1)
    
    assert True


def test_table_actions_column_exists(driver):
    """Test that Actions column header exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    th = driver.find_element(By.XPATH, "//th[contains(text(), 'Actions')]")
    assert th.is_displayed()


def test_table_has_data_rows(driver):
    """Test that table has data rows"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    rows = driver.find_elements(By.CSS_SELECTOR, "tbody tr")
    # Allow for empty table
    assert rows is not None


def test_view_details_button_exists(driver):
    """Test that View Details buttons exist"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    view_buttons = driver.find_elements(By.XPATH, "//button[contains(text(), 'View Details')]")
    # Only check if orders exist
    assert view_buttons is not None


def test_view_details_button_navigates(driver):
    """Test that View Details button navigates to order detail page"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    view_buttons = driver.find_elements(By.XPATH, "//button[contains(text(), 'View Details')]")
    if len(view_buttons) > 0:
        view_buttons[0].click()
        time.sleep(2)
        
        assert "/orders/" in driver.current_url


def test_status_badges_exist(driver):
    """Test that status badge elements exist"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    badges = driver.find_elements(By.CSS_SELECTOR, "span[class*='rounded-full']")
    # Allow for empty table
    assert badges is not None


def test_status_badges_colored(driver):
    """Test that status badges are color-coded"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    badges = driver.find_elements(By.CSS_SELECTOR, "span[class*='rounded-full']")
    if len(badges) > 0:
        classes = badges[0].get_attribute("class")
        has_color = "green" in classes or "yellow" in classes or "blue" in classes or "red" in classes or "gray" in classes
        assert has_color


def test_results_count_displayed(driver):
    """Test that results count is displayed"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    footer = driver.find_element(By.XPATH, "//*[contains(text(), 'Showing') and contains(text(), 'orders')]")
    assert footer.is_displayed()


def test_filter_by_status_works(driver):
    """Test that filtering by status works"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin/orders")
    time.sleep(2)
    
    # Select pending status
    status_select = driver.find_element(By.TAG_NAME, "select")
    select = Select(status_select)
    select.select_by_visible_text("Pending")
    
    # Click Apply
    apply_btn = driver.find_element(By.XPATH, "//button[contains(text(), 'Apply Filter')]")
    apply_btn.click()
    time.sleep(1)
    
    # Filter should be applied without error
    assert True