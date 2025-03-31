*** Settings ***
Library     Browser    auto_closing_level=KEEP
Variables   pythonkirjasto.py

*** Test Cases ***
Test Web Form
    New Browser    chromium    headless=No  
    New Page       http://127.0.0.1:5500/frontend/index.html    
    Get Title      ==    Diary App 
    Type Text      [id="username"]        ${Username}    delay=0.1 s 
    Type Secret    [id="password"]    $Password      delay=0.1 s
    Click        xpath=//button[text()='Log In']

    Sleep       2s

    
