*** Settings ***
Library     Browser    auto_closing_level=KEEP
Resource    Keywords.robot  

*** Test Cases ***
Test Web Form
    New Browser    chromium    headless=No  
    New Page       http://127.0.0.1:5500/frontend/index.html    
    Get Title      ==    Diary App 
    Type Text      [id="username"]        ${Username}    delay=0.1 s 
    Type Secret    [id="password"]    $Password      delay=0.1 s
    Click        xpath=//button[text()='Log In']

    Sleep       2s

    Type Text  id=new-entry-date    03242025    delay=0.5 s 
    Browser.Select Options by       [id="new-entry-mood"]    value      happy   delay=0.5 s 
    Type Text  id=new-entry-weight      53  delay=0.5 s 
    Type Text  id=new-entry-sleep-hours      8  delay=0.5 s
    Type Text  id=new-entry-notes      moikka   delay=0.5 s 
    Click       xpath=//button[text()='Add Entry']
    Sleep       5s