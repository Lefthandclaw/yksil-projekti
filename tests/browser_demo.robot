*** Settings ***
Library     Browser    auto_closing_level=KEEP
Resource    variables.robot  
Resource    Keywords.robot

*** Test Cases ***
Test Web Form
    New Browser    chromium    headless=No  
    New Page       http://127.0.0.1:5500/frontend/index.html
    Get Title      ==    Web form  

    Type Text      [name="my-text"]        ${Username}    delay=0.1 s 
    Type Secret    [name="my-password"]    $Password    delay=0.1 s
    Type Text      [name="my-textarea"]    ${Message}     delay=0.1 s

    Browser.Select Options By    [name="my-select"]    value    2

    Type Text      [name="my-datalist"]    New York
    Sleep       1s
    Keyboard Key    press   Tab

    Upload file by selector    [name=my-file]    variables.robot

    Uncheck Checkbox      [id="my-check-1"]
    Check Checkbox          [id="my-check-2"]
    
    Check Checkbox      [id="my-radio-2"]
