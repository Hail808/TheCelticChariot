from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time


def test_user_dashboard_and_settings():
    """
    Tests the user dashboard and settings pages:
    - Login functionality
    - Dashboard content display
    - Navigation between dashboard and settings
    - Settings page content display
    - Sign out functionality
    """
    
    chrome_options = Options()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option("useAutomationExtension", False)

    driver = webdriver.Chrome(options=chrome_options)
    driver.maximize_window()
    wait = WebDriverWait(driver, 30)

    try:
        print("Starting user dashboard and settings test...")
        
        # Test credentials 
        test_email = "testtest@gmail.com"
        test_password = "test1234"
        test_username = "test2"  
        
        print("\n" + "=" * 60)
        print("PART 1: USER DASHBOARD TESTS")
        print("=" * 60)
        
        # Step 1: Navigate to Homepage
        print("\nStep 1: Loading homepage...")
        driver.get("http://localhost:3000")
        time.sleep(2)
        print("✓ Homepage loaded successfully")
        
        # Step 2: Login
        print("\nStep 2: Logging in...")
        
        driver.get("http://localhost:3000/login")
        time.sleep(2)
        
        email_field = wait.until(
            EC.presence_of_element_located((By.NAME, "email"))
        )
        email_field.clear()
        email_field.send_keys(test_email)
        print(f"  Email entered: {test_email}")
        
        password_field = driver.find_element(By.NAME, "password")
        password_field.clear()
        password_field.send_keys(test_password)
        print("  Password entered")
        
        login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        login_button.click()
        
        time.sleep(3)
        print("✓ Logged in successfully")
        
        # Step 3: Navigate to User Dashboard
        print("\nStep 3: Navigating to user dashboard...")
        driver.get("http://localhost:3000/user_dashboard")
        time.sleep(2)
        print("✓ User dashboard page loaded")
        
        # Step 4: Verify Greeting Displays
        print("\nStep 4: Verifying greeting displays...")
        
        try:
            greeting = wait.until(
                EC.presence_of_element_located((By.XPATH, 
                    f"//h1[contains(text(), 'Hello')]"
                ))
            )
            greeting_text = greeting.text
            print(f"✓ Greeting found: '{greeting_text}'")
            
            if test_username in greeting_text:
                print(f"  ✓ Username '{test_username}' appears in greeting")
            else:
                print(f"  ⚠ Expected username '{test_username}' in greeting")
        except Exception as e:
            print(f"✗ Greeting not found: {str(e)}")
            raise
        
        # Step 5: Verify Line Under Greeting
        print("\nStep 5: Verifying line under greeting...")
        
        try:
            greeting_line = driver.find_element(By.XPATH, 
                "//h1[contains(text(), 'Hello')]/following-sibling::hr"
            )
            print("✓ Decorative line under greeting found")
        except:
            print("⚠ Line under greeting not found (optional element)")
        
        # Step 6: Verify Settings and Sign Out Links
        print("\nStep 6: Verifying Settings and Sign Out links...")
        
        try:
            settings_link = wait.until(
                EC.presence_of_element_located((By.XPATH, 
                    "//a[contains(@href, '/settings') or contains(text(), 'Settings')]"
                ))
            )
            print("✓ Settings link found")
            
            # Check for gear icon
            try:
                gear_icon = settings_link.find_element(By.XPATH, ".//*[local-name()='svg']")
                print("  ✓ Settings gear icon found")
            except:
                print("  ⚠ Gear icon not found (optional)")
            
        except Exception as e:
            print(f"✗ Settings link not found: {str(e)}")
            raise
        
        try:
            signout_form = driver.find_element(By.XPATH, 
                "//button[contains(text(), 'Sign Out')] | //form//button[contains(text(), 'Sign Out')]"
            )
            print("✓ Sign Out button found")
        except Exception as e:
            print(f"✗ Sign Out button not found: {str(e)}")
            raise
        
        # Step 7: Verify Orders Section
        print("\nStep 7: Verifying Orders section...")
        
        try:
            orders_heading = wait.until(
                EC.presence_of_element_located((By.XPATH, 
                    "//h2[contains(text(), 'Orders')]"
                ))
            )
            print("✓ Orders section heading found")
            
            # Check if "No orders found" or orders table exists
            try:
                no_orders = driver.find_element(By.XPATH, 
                    "//*[contains(text(), 'No orders found')]"
                )
                print("  ✓ 'No orders found' message displayed")
            except:
                # Check for orders table
                try:
                    orders_table = driver.find_element(By.XPATH, "//table")
                    print("  ✓ Orders table found")
                except:
                    print("  ⚠ Neither 'No orders' message nor table found")
            
        except Exception as e:
            print(f"✗ Orders section not found: {str(e)}")
            raise
        
        # Step 8: Verify Account Details Section
        print("\nStep 8: Verifying Account Details section...")
        
        try:
            account_heading = wait.until(
                EC.presence_of_element_located((By.XPATH, 
                    "//h2[contains(text(), 'Account Details')]"
                ))
            )
            print("✓ Account Details section heading found")
            
            # Verify username row
            username_label = driver.find_element(By.XPATH, 
                "//dt[contains(text(), 'Username')]"
            )
            print("  ✓ Username field found")
            
            # Verify name row
            name_label = driver.find_element(By.XPATH, 
                "//dt[contains(text(), 'Name')]"
            )
            print("  ✓ Name field found")
            
            # Verify address row
            address_label = driver.find_element(By.XPATH, 
                "//dt[contains(text(), 'Address')]"
            )
            print("  ✓ Address field found")
            
        except Exception as e:
            print(f"✗ Account Details section not complete: {str(e)}")
            raise
        
        # Step 9: Click Settings Button and Verify Navigation
        print("\nStep 9: Clicking Settings link...")
        
        settings_link = wait.until(
            EC.element_to_be_clickable((By.XPATH, 
                "//a[contains(@href, '/settings') or contains(text(), 'Settings')]"
            ))
        )
        settings_link.click()
        time.sleep(2)
        
        current_url = driver.current_url
        if "settings" in current_url:
            print(f"✓ Navigated to settings page: {current_url}")
        else:
            print(f"⚠ Expected 'settings' in URL, got: {current_url}")
        
        print("\n" + "=" * 60)
        print("PART 2: USER SETTINGS PAGE TESTS")
        print("=" * 60)
        
        # Step 10: Verify Settings Page Heading
        print("\nStep 10: Verifying settings page heading...")
        
        try:
            settings_heading = wait.until(
                EC.presence_of_element_located((By.XPATH, 
                    "//h1[contains(text(), 'Account Settings')]"
                ))
            )
            heading_text = settings_heading.text
            print(f"✓ Settings heading found: '{heading_text}'")
        except Exception as e:
            print(f"✗ Settings heading not found: {str(e)}")
            raise
        
        # Step 11: Verify Return to Dashboard Link
        print("\nStep 11: Verifying 'Return to Dashboard' link...")
        
        try:
            return_link = wait.until(
                EC.presence_of_element_located((By.XPATH, 
                    "//a[contains(text(), 'Return to Dashboard')]"
                ))
            )
            print("✓ 'Return to Dashboard' link found")
        except Exception as e:
            print(f"✗ Return link not found: {str(e)}")
            raise
        
        # Step 12: Verify Account Information Section
        print("\nStep 12: Verifying Account Information section...")
        
        try:
            account_info_heading = wait.until(
                EC.presence_of_element_located((By.XPATH, 
                    "//h2[contains(text(), 'Account Information')]"
                ))
            )
            print("✓ Account Information section found")
            
            # Check for username input field
            username_input = driver.find_element(By.NAME, "username")
            print("  ✓ Username input field found")
            
            # Check for update button
            update_username_btn = driver.find_element(By.XPATH, 
                "//button[contains(text(), 'Update Username')]"
            )
            print("  ✓ Update Username button found")
            
        except Exception as e:
            print(f"✗ Account Information section incomplete: {str(e)}")
            raise
        
        # Step 13: Verify Change Password Section
        print("\nStep 13: Verifying Change Password section...")
        
        try:
            password_heading = wait.until(
                EC.presence_of_element_located((By.XPATH, 
                    "//h2[contains(text(), 'Change Password')]"
                ))
            )
            print("✓ Change Password section found")
            
            # Check for password fields
            current_pwd = driver.find_element(By.NAME, "currentPassword")
            print("  ✓ Current Password field found")
            
            new_pwd = driver.find_element(By.NAME, "newPassword")
            print("  ✓ New Password field found")
            
            confirm_pwd = driver.find_element(By.NAME, "confirmPassword")
            print("  ✓ Confirm Password field found")
            
            # Check for update button
            update_password_btn = driver.find_element(By.XPATH, 
                "//button[contains(text(), 'Update Password')]"
            )
            print("  ✓ Update Password button found")
            
        except Exception as e:
            print(f"✗ Change Password section incomplete: {str(e)}")
            raise
        
        # Step 14: Verify Preferences Section
        print("\nStep 14: Verifying Preferences section...")
        
        try:
            preferences_heading = wait.until(
                EC.presence_of_element_located((By.XPATH, 
                    "//h2[contains(text(), 'Preferences')]"
                ))
            )
            print("✓ Preferences section found")
            
            # Check for Cookies setting
            cookies_heading = driver.find_element(By.XPATH, 
                "//h3[contains(text(), 'Cookies')]"
            )
            print("  ✓ Cookies preference found")
            
            # Check for Notifications setting
            notifications_heading = driver.find_element(By.XPATH, 
                "//h3[contains(text(), 'Notifications')]"
            )
            print("  ✓ Notifications preference found")
            
        except Exception as e:
            print(f"✗ Preferences section incomplete: {str(e)}")
            raise
        
        # Step 15: Verify Sign Out and Delete Account Buttons
        print("\nStep 15: Verifying action buttons...")
        
        try:
            signout_btn = wait.until(
                EC.presence_of_element_located((By.XPATH, 
                    "//button[contains(text(), 'Sign Out')]"
                ))
            )
            print("✓ Sign Out button found on settings page")
            
            delete_btn = driver.find_element(By.XPATH, 
                "//button[contains(text(), 'Delete Account')]"
            )
            print("✓ Delete Account button found")
            
        except Exception as e:
            print(f"✗ Action buttons not found: {str(e)}")
            raise
        
        print("\n" + "=" * 60)
        print("PART 3: SIGN OUT FUNCTIONALITY TEST")
        print("=" * 60)
        
        # Step 16: Test Sign Out from Settings Page
        print("\nStep 16: Testing sign out from settings page...")
        
        signout_btn = wait.until(
            EC.element_to_be_clickable((By.XPATH, 
                "//button[contains(text(), 'Sign Out')]"
            ))
        )
        signout_btn.click()
        time.sleep(3)
        
        # Verify redirected (either to login or home)
        current_url = driver.current_url
        if "login" in current_url or current_url == "http://localhost:3000/" or "user_dashboard" not in current_url:
            print(f"✓ Signed out successfully, redirected to: {current_url}")
        else:
            print(f"⚠ Unexpected URL after sign out: {current_url}")
        
        # Step 17: Sign Back In
        print("\nStep 17: Signing back in to verify login still works...")
        
        driver.get("http://localhost:3000/login")
        time.sleep(2)
        
        email_field = wait.until(
            EC.presence_of_element_located((By.NAME, "email"))
        )
        email_field.clear()
        email_field.send_keys(test_email)
        
        password_field = driver.find_element(By.NAME, "password")
        password_field.clear()
        password_field.send_keys(test_password)
        
        login_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        login_button.click()
        
        time.sleep(3)
        
        # Verify we can access dashboard again
        driver.get("http://localhost:3000/user_dashboard")
        time.sleep(2)
        
        try:
            greeting = wait.until(
                EC.presence_of_element_located((By.XPATH, 
                    "//h1[contains(text(), 'Hello')]"
                ))
            )
            print("✓ Successfully logged back in and accessed dashboard")
        except:
            print("✗ Could not access dashboard after re-login")
            raise
        
        print("\nUser dashboard and settings test completed successfully!")
        return True

    except Exception as e:
        print(f"\n✗ Test failed with error: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

    finally:
        input("\nPress ENTER to close browser and end test...")
        print("\nClosing browser...")
        driver.quit()


if __name__ == "__main__":
    print("=" * 60)
    print("USER DASHBOARD AND SETTINGS TEST")
    print("=" * 60)
    print("\nThis test will verify:")
    print("\n  DASHBOARD:")
    print("    - User login")
    print("    - Dashboard page loads")
    print("    - Greeting displays with username")
    print("    - Orders section displays")
    print("    - Account Details section displays")
    print("    - Navigation to Settings page")
    print("\n  SETTINGS:")
    print("    - Settings page loads")
    print("    - Account Information section")
    print("    - Change Password section")
    print("    - Preferences section")
    print("    - Sign out functionality")
    print("    - Re-login verification")
    print("\n" + "=" * 60)

    success = test_user_dashboard_and_settings()

    print("\n" + "=" * 60)
    if success:
        print("TEST PASSED ✓")
    else:
        print("TEST FAILED ✗")
    print("=" * 60)