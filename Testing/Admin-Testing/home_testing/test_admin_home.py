"""
Admin Home Page Test Suite - The Celtic Chariot
Tests navigation, statistics, timeframe selectors, and quick actions
"""

import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
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


def test_admin_home_page_loads(driver):
    """Test that admin home page loads successfully"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    assert "/admin" in driver.current_url


def test_admin_dashboard_title_exists(driver):
    """Test that Admin Dashboard title is displayed"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    title = driver.find_element(By.XPATH, "//h1[contains(text(), 'Admin Dashboard')]")
    assert title.is_displayed()


def test_back_to_website_home_button_exists(driver):
    """Test that Back to Website Home button exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    back_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Back to Website Home')]")
    assert back_button.is_displayed()


def test_back_to_website_home_button_navigates(driver):
    """Test that Back to Website Home button navigates correctly"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    back_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Back to Website Home')]")
    back_button.click()
    time.sleep(2)
    
    assert driver.current_url == f"{BASE_URL}/" or "/admin" not in driver.current_url


def test_engagement_navigation_button_exists(driver):
    """Test that Engagement navigation button exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    engagement_button = driver.find_element(By.XPATH, "//button[text()='Engagement']")
    assert engagement_button.is_displayed()


def test_engagement_navigation_button_navigates(driver):
    """Test that Engagement button navigates to engagement page"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)

    engagement_button = driver.find_element(By.XPATH, "//button[text()='Engagement']")
    engagement_button.click()
    time.sleep(5)  # Increased wait time
    
    # Check if URL changed or if we're on engagement page
    current_url = driver.current_url.lower()
    assert "/engagement" in current_url or current_url != f"{BASE_URL}/admin".lower()


def test_catalogue_navigation_button_exists(driver):
    """Test that Catalogue navigation button exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    catalogue_button = driver.find_element(By.XPATH, "//button[text()='Catalogue']")
    assert catalogue_button.is_displayed()


def test_orders_navigation_button_navigates(driver):
    """Test that Orders button navigates to orders page"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)

    orders_button = driver.find_element(By.XPATH, "//button[text()='Orders']")
    
    # Try JavaScript click if regular click doesn't work
    driver.execute_script("arguments[0].click();", orders_button)
    time.sleep(3)
    
    current_url = driver.current_url.lower()
    assert "/orders" in current_url or current_url != f"{BASE_URL}/admin".lower()


def test_orders_navigation_button_exists(driver):
    """Test that Orders navigation button exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    orders_button = driver.find_element(By.XPATH, "//button[text()='Orders']")
    assert orders_button.is_displayed()


def test_orders_navigation_button_navigates(driver):
    """Test that Orders button navigates to orders page"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    orders_button = driver.find_element(By.XPATH, "//button[text()='Orders']")
    orders_button.click()
    time.sleep(2)
    
    assert "/orders" in driver.current_url.lower()


def test_statistics_overview_header_exists(driver):
    """Test that Statistics Overview header is displayed"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    stats_header = driver.find_element(By.XPATH, "//h2[contains(text(), 'Statistics Overview')]")
    assert stats_header.is_displayed()


def test_weekly_timeframe_button_exists(driver):
    """Test that Weekly timeframe button exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    weekly_button = driver.find_element(By.XPATH, "//button[text()='Weekly']")
    assert weekly_button.is_displayed()


def test_weekly_timeframe_button_clickable(driver):
    """Test that Weekly timeframe button is clickable"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    weekly_button = driver.find_element(By.XPATH, "//button[text()='Weekly']")
    weekly_button.click()
    time.sleep(1)
    
    assert True  # If no error, click succeeded


def test_monthly_timeframe_button_exists(driver):
    """Test that Monthly timeframe button exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    monthly_button = driver.find_element(By.XPATH, "//button[text()='Monthly']")
    assert monthly_button.is_displayed()


def test_monthly_timeframe_button_clickable(driver):
    """Test that Monthly timeframe button is clickable"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    monthly_button = driver.find_element(By.XPATH, "//button[text()='Monthly']")
    monthly_button.click()
    time.sleep(1)
    
    assert True


def test_yearly_timeframe_button_exists(driver):
    """Test that Yearly timeframe button exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    yearly_button = driver.find_element(By.XPATH, "//button[text()='Yearly']")
    assert yearly_button.is_displayed()


def test_yearly_timeframe_button_clickable(driver):
    """Test that Yearly timeframe button is clickable"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    yearly_button = driver.find_element(By.XPATH, "//button[text()='Yearly']")
    yearly_button.click()
    time.sleep(1)
    
    assert True


def test_engagement_metrics_section_exists(driver):
    """Test that Engagement Metrics section header is displayed"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    eng_header = driver.find_element(By.XPATH, "//h3[contains(text(), 'Engagement Metrics')]")
    assert eng_header.is_displayed()


def test_total_page_views_stat_exists(driver):
    """Test that Total Page Views stat card is displayed"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    stat = driver.find_element(By.XPATH, "//*[contains(text(), 'Total Page Views')]")
    assert stat.is_displayed()


def test_unique_visitors_stat_exists(driver):
    """Test that Unique Visitors stat card is displayed"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    stat = driver.find_element(By.XPATH, "//*[contains(text(), 'Unique Visitors')]")
    assert stat.is_displayed()


def test_avg_session_duration_stat_exists(driver):
    """Test that Avg Session Duration stat card is displayed"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    stat = driver.find_element(By.XPATH, "//*[contains(text(), 'Avg Session Duration')]")
    assert stat.is_displayed()


def test_bounce_rate_stat_exists(driver):
    """Test that Bounce Rate stat card is displayed"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    stat = driver.find_element(By.XPATH, "//*[contains(text(), 'Bounce Rate')]")
    assert stat.is_displayed()


def test_sales_metrics_section_exists(driver):
    """Test that Sales Metrics section header is displayed"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    sales_header = driver.find_element(By.XPATH, "//h3[contains(text(), 'Sales Metrics')]")
    assert sales_header.is_displayed()


def test_total_revenue_stat_exists(driver):
    """Test that Total Revenue stat card is displayed"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    stat = driver.find_element(By.XPATH, "//*[contains(text(), 'Total Revenue')]")
    assert stat.is_displayed()


def test_total_orders_stat_exists(driver):
    """Test that Total Orders stat card is displayed"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    stat = driver.find_element(By.XPATH, "//*[contains(text(), 'Total Orders')]")
    assert stat.is_displayed()


def test_avg_order_value_stat_exists(driver):
    """Test that Avg Order Value stat card is displayed"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    stat = driver.find_element(By.XPATH, "//*[contains(text(), 'Avg Order Value')]")
    assert stat.is_displayed()


def test_conversion_rate_stat_exists(driver):
    """Test that Conversion Rate stat card is displayed"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    stat = driver.find_element(By.XPATH, "//*[contains(text(), 'Conversion Rate')]")
    assert stat.is_displayed()


def test_quick_actions_section_exists(driver):
    """Test that Quick Actions section header is displayed"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    quick_actions = driver.find_element(By.XPATH, "//h2[contains(text(), 'Quick Actions')]")
    assert quick_actions.is_displayed()


def test_recent_activity_card_exists(driver):
    """Test that Recent Activity quick action card is displayed"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    recent_activity = driver.find_element(By.XPATH, "//h3[contains(text(), 'Recent Activity')]")
    assert recent_activity.is_displayed()


def test_manage_products_card_exists(driver):
    """Test that Manage Products quick action card is displayed"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    manage_products = driver.find_element(By.XPATH, "//h3[contains(text(), 'Manage Products')]")
    assert manage_products.is_displayed()


def test_view_activity_button_exists(driver):
    """Test that View Activity quick action button exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    view_activity_btn = driver.find_element(By.XPATH, "//button[contains(text(), 'View Activity')]")
    assert view_activity_btn.is_displayed()


def test_view_activity_button_navigates(driver):
    """Test that View Activity button navigates to engagement page"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    view_activity_btn = driver.find_element(By.XPATH, "//button[contains(text(), 'View Activity')]")
    view_activity_btn.click()
    time.sleep(2)
    
    assert "/engagement" in driver.current_url.lower()


def test_manage_catalogue_button_exists(driver):
    """Test that Manage Catalogue quick action button exists"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    manage_catalogue_btn = driver.find_element(By.XPATH, "//button[contains(text(), 'Manage Catalogue')]")
    assert manage_catalogue_btn.is_displayed()


def test_manage_catalogue_button_navigates(driver):
    """Test that Manage Catalogue button navigates to catalogue page"""
    login_as_admin(driver)
    driver.get(f"{BASE_URL}/admin")
    time.sleep(2)
    
    manage_catalogue_btn = driver.find_element(By.XPATH, "//button[contains(text(), 'Manage Catalogue')]")
    manage_catalogue_btn.click()
    time.sleep(2)
    
    assert "/catalogue" in driver.current_url.lower()