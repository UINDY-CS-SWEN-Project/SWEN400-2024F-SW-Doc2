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

Signup_link_element = driver.find_element(By.CLASS_NAME,"link")
Signup_link_element.send_keys(Keys.ENTER)
time.sleep(2)

Signup_User_element = driver.find_element(By.ID,"username")
Signup_User_element.send_keys("foobar")
time.sleep(2)

Signup_Name_element = driver.find_element(By.ID,"name")
Signup_Name_element.send_keys("tt")
time.sleep(2)

Signup_Pass_element = driver.find_element(By.ID,"password")
Signup_Pass_element.send_keys("FuzzBall")
time.sleep(2)

Signup_Email_element = driver.find_element(By.ID,"email")
Signup_Email_element.send_keys("blah@gmail.com" + Keys.ENTER)
time.sleep(2)


input_username_element = driver.find_element(By.ID, "username")
input_username_element.send_keys("foobar")
time.sleep(2)
input_password_element = driver.find_element(By.ID, "password")
input_password_element.send_keys("FuzzBall" + Keys.ENTER)
time.sleep(2)

logout_button = driver.find_element(By.CLASS_NAME, "logout-button")
logout_button.send_keys(Keys.ENTER)

time.sleep(2)
input_username_element = driver.find_element(By.ID, "username")
input_username_element.send_keys("t")
time.sleep(2)
input_password_element = driver.find_element(By.ID, "password")
input_password_element.send_keys("t" + Keys.ENTER)
time.sleep(2)
NewDocLink_element = driver.find_element(By.NAME, "NewDocLink")
NewDocLink_element.send_keys(Keys.ENTER)
time.sleep(2)

driver.get("http://localhost:8080/home")

time.sleep(.2)

TeamsLink_element = driver.find_element(By.NAME, "TeamLink")
TeamsLink_element.send_keys(Keys.ENTER)

time.sleep(.2)

TeamName_element = driver.find_element(By.ID, "teamName")
TeamName_element.send_keys("t New Team")

TeamMemInput_element = driver.find_element(By.ID, "userNameToAdd")
TeamMemInput_element.send_keys("Mem.2")


time.sleep(.2)

TeamMemPriv_element = driver.find_element(By.NAME, "checkbox")
TeamMemPriv_element.send_keys(Keys.ENTER)
time.sleep(.2)

AddMemBtn_element = driver.find_element(By.NAME, "addMemBtn")

time.sleep(.2)
TeamMemInput_element.send_keys("Mem2")
time.sleep(.2)
AddMemBtn_element.click()
time.sleep(.2)
TeamMemInput_element.send_keys("Mem3")
time.sleep(.2)
AddMemBtn_element.click()

CreateTeamBtn_element =driver.find_element(By.NAME, "creTeamBtn")
CreateTeamBtn_element.click()
time.sleep(.2)

driver.switch_to.alert.accept()

driver.get("http://localhost:8080/home")

time.sleep(.2)

viewTeamLink_element = driver.find_element(By.NAME, "ViewTeamLink")
viewTeamLink_element.click()
time.sleep(.2)

TeamNameView_element = driver.find_element(By.NAME, "teamName")
TeamNameView_element.send_keys("t New Team")
time.sleep(.2)

RemMem_element = driver.find_element(By.NAME, "userNameToRemove")
RemMem_element.send_keys("Mem2")
time.sleep(.2)

RemBtn_element = driver.find_element(By.NAME, "removeMember")
RemBtn_element.click()

time.sleep(.2)

driver.get("http://localhost:8080/home")

time.sleep(1)

DocSearch_element = driver.find_element(By.NAME, "TitleSearch")
DocSearch_element.send_keys("Template2")
DocSearchBtn_element = driver.find_element(By.CLASS_NAME, "DocSearchBtn")
DocSearchBtn_element.click()
time.sleep(1)

template_element = driver.find_element(By.CLASS_NAME,"template-button")
template_element.click()

time.sleep(2)

driver.quit()