from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
import time

service= Service(executable_path="chromedriver.exe")

driver = webdriver.Chrome(service=service)

driver.get("http://localhost:8080")
time.sleep(2)

# Signup_link_element = driver.find_element(By.CLASS_NAME,"link")
# Signup_link_element.send_keys(Keys.ENTER)
# time.sleep(2)

# Signup_User_element = driver.find_element(By.ID,"username")
# Signup_User_element.send_keys("foobar")
# time.sleep(2)

# Signup_Name_element = driver.find_element(By.ID,"name")
# Signup_Name_element.send_keys("tt")
# time.sleep(2)

# Signup_Pass_element = driver.find_element(By.ID,"password")
# Signup_Pass_element.send_keys("FuzzBall")
# time.sleep(2)

# Signup_Email_element = driver.find_element(By.ID,"email")
# Signup_Email_element.send_keys("blah@gmail.com" + Keys.ENTER)
# time.sleep(5)


# input_username_element = driver.find_element(By.ID, "username")
# input_username_element.send_keys("foobar")
# time.sleep(2)
# input_password_element = driver.find_element(By.ID, "password")
# input_password_element.send_keys("FuzzBall" + Keys.ENTER)
# time.sleep(2)

input_username_element = driver.find_element(By.ID, "username")
input_username_element.send_keys("t")
time.sleep(.5)
input_password_element = driver.find_element(By.ID, "password")
input_password_element.send_keys("t" + Keys.ENTER)
time.sleep(.5)

# logout_button = driver.find_element(By.CLASS_NAME, "logout-button")
# logout_button.send_keys(Keys.ENTER)

# time.sleep(2)

# input_username_element.send_keys("t")
# input_password_element.send_keys("t" + Keys.ENTER)

NewDocLink_element = driver.find_element(By.NAME, "NewDocLink")
NewDocLink_element.send_keys(Keys.ENTER)
time.sleep(2)

driver.get("http://localhost:8080/home")

time.sleep(2)

TeamsLink_element = driver.find_element(By.NAME, "TeamLink")
TeamsLink_element.send_keys(Keys.ENTER)

time.sleep(2)

TeamName_element = driver.find_element(By.ID, "teamName")
TeamName_element.send_keys("New Team")

TeamMemInput_element = driver.find_element(By.ID, "userNameToAdd")
TeamMemInput_element.send_keys("Mem1")

TeamMemPriv_element = driver.find_element(By.NAME, "checkbox")


driver.quit()