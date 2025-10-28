import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

@pytest.fixture
def driver():
    driver = webdriver.Chrome()
    driver.implicitly_wait(10)
    yield driver
    driver.quit()

def test_homepage_loads(driver):
    """Test that homepage loads successfully"""
    driver.get("http://localhost:3000")
    time.sleep(2)  # Wait for Next.js to render
    
    # Check for the main heading
    heading = driver.find_element(By.XPATH, "//h1[text()='THE CELTIC CHARIOT']")
    assert heading.is_displayed()
    
    # Check URL is correct
    assert driver.current_url == "http://localhost:3000/"

def test_navigation_links_exist(driver):
    """Test that all main navigation links are present"""
    driver.get("http://localhost:3000")
    time.sleep(2)
    
    # Check main nav links
    home_link = driver.find_element(By.LINK_TEXT, "HOME")
    catalogue_link = driver.find_element(By.LINK_TEXT, "CATALOGUE")
    reviews_link = driver.find_element(By.LINK_TEXT, "REVIEWS")
    about_link = driver.find_element(By.LINK_TEXT, "ABOUT ME")
    
    assert home_link.is_displayed()
    assert catalogue_link.is_displayed()
    assert reviews_link.is_displayed()
    assert about_link.is_displayed()

def test_navigate_to_catalogue(driver):
    """Test navigation to catalogue page"""
    driver.get("http://localhost:3000")
    time.sleep(2)
    
    catalogue_link = driver.find_element(By.LINK_TEXT, "CATALOGUE")
    catalogue_link.click()
    time.sleep(2)
    
    assert "/catalogue" in driver.current_url

def test_navigate_to_reviews(driver):
    """Test navigation to reviews page"""
    driver.get("http://localhost:3000")
    time.sleep(2)
    
    reviews_link = driver.find_element(By.LINK_TEXT, "REVIEWS")
    reviews_link.click()
    time.sleep(2)
    
    assert "/reviews" in driver.current_url

def test_navigate_to_about_me(driver):
    """Test navigation to about me page"""
    driver.get("http://localhost:3000")
    time.sleep(2)
    
    about_link = driver.find_element(By.LINK_TEXT, "ABOUT ME")
    about_link.click()
    time.sleep(2)
    
    assert "/about_me" in driver.current_url

def test_login_link_exists(driver):
    """Test that login link is present and clickable"""
    driver.get("http://localhost:3000")
    time.sleep(2)
    
    login_link = driver.find_element(By.LINK_TEXT, "Login")
    assert login_link.is_displayed()
    
    # Click and verify navigation
    login_link.click()
    time.sleep(2)
    assert "/login" in driver.current_url

def test_cart_icon_exists(driver):
    """Test that cart icon/link exists"""
    driver.get("http://localhost:3000")
    time.sleep(2)
    
    # Cart link might be empty text, so find by href
    cart_link = driver.find_element(By.CSS_SELECTOR, "a[href='/cart']")
    assert cart_link is not None

def test_featured_items_section(driver):
    """Test that featured items section exists"""
    driver.get("http://localhost:3000")
    time.sleep(2)
    
    featured_heading = driver.find_element(By.XPATH, "//h1[text()='Featured Items']")
    assert featured_heading.is_displayed()

def test_categories_section(driver):
    """Test that categories section exists with links"""
    driver.get("http://localhost:3000")
    time.sleep(2)
    
    # Check categories heading
    categories_heading = driver.find_element(By.XPATH, "//h1[text()='Categories']")
    assert categories_heading.is_displayed()
    
    # Check category links exist
    earrings_link = driver.find_element(By.LINK_TEXT, "Earrings")
    beads_link = driver.find_element(By.LINK_TEXT, "DIY Beads")
    
    assert earrings_link.is_displayed()
    assert beads_link.is_displayed()

def test_navigate_to_earrings_category(driver):
    """Test navigation to earrings category"""
    driver.get("http://localhost:3000")
    time.sleep(2)
    
    earrings_link = driver.find_element(By.LINK_TEXT, "Earrings")
    earrings_link.click()
    time.sleep(2)
    
    assert "/earrings" in driver.current_url

def test_reviews_section_on_homepage(driver):
    """Test that reviews section exists on homepage"""
    driver.get("http://localhost:3000")
    time.sleep(2)
    
    reviews_heading = driver.find_element(By.XPATH, "//h1[text()='Reviews']")
    assert reviews_heading.is_displayed()
    
    # Check that review navigation buttons exist
    prev_button = driver.find_element(By.XPATH, "//button[text()='<']")
    next_button = driver.find_element(By.XPATH, "//button[text()='>']")
    
    assert prev_button.is_displayed()
    assert next_button.is_displayed()

def test_footer_sections_exist(driver):
    """Test that footer sections are present"""
    driver.get("http://localhost:3000")
    time.sleep(2)
    
    # Check footer headings
    about_section = driver.find_element(By.XPATH, "//h3[text()='About']")
    shop_section = driver.find_element(By.XPATH, "//h3[text()='Shop']")
    customer_care = driver.find_element(By.XPATH, "//h3[text()='Customer Care']")
    legal_section = driver.find_element(By.XPATH, "//h3[text()='Legal']")
    
    assert about_section.is_displayed()
    assert shop_section.is_displayed()
    assert customer_care.is_displayed()
    assert legal_section.is_displayed()

def test_footer_links_work(driver):
    """Test that footer links are clickable"""
    driver.get("http://localhost:3000")
    time.sleep(2)
    
    # Test FAQ link
    faq_link = driver.find_element(By.LINK_TEXT, "FAQ")
    faq_link.click()
    time.sleep(2)
    
    assert "/faq" in driver.current_url

